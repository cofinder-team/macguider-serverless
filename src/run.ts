import { DataSource } from 'typeorm';
import { Database } from './datasource';
import { CoupangService, ItemService } from './services';
import { CoupangPriceDto } from './dtos';
import { collectPrice } from './lib/coupang/collect';
import { sendErrorToSlack } from './lib/slack/slack';
import { SNSEvent } from 'aws-lambda';

const collectCoupang = async (database: Database): Promise<unknown> => {
  const dataSource: DataSource = await database.getDataSource();

  const itemService: ItemService = new ItemService(dataSource);
  const coupangService: CoupangService = new CoupangService(dataSource);

  const items = await itemService.getTargetItems();
  const prices: CoupangPriceDto[] = await collectPrice(items);
  return coupangService.saveCoupangPrices(prices);
};

const checkServerStatus = async (): Promise<unknown> => {
  const servers = [
    'https://www.macguider.io',
    'https://dev.macguider.io',
    'https://api.macguider.io',
    'https://dev-api.macguider.io',
  ];

  return Promise.all(
    servers.map(async (server) => {
      fetch(server)
        .then((response) => {
          if (response?.status !== 200) {
            console.log(response);
            return sendErrorToSlack(
              `Server is Not Working!\nServer: ${server}, Response: ${JSON.stringify(
                response,
              )}`,
            );
          }
          return null;
        })
        .catch((error) => {
          console.log(error);
          sendErrorToSlack(
            `Server is Not Working!\nServer: ${server}\nError: ${JSON.stringify(
              error,
            )}`,
          );
        });
    }),
  );
};

const checkInfrastructure = async (event: SNSEvent): Promise<unknown> => {
  console.log(event);

  const text = event?.Records?.map((record) =>
    JSON.stringify(record?.Sns),
  ).join('\n');

  return sendErrorToSlack(text);
};

export { collectCoupang, checkServerStatus, checkInfrastructure };
