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
    'https://scrapy.macguider.io',
  ];

  return Promise.all(
    servers.map(async (server) => {
      const start = new Date();

      return fetch(server)
        .then(async (response) => {
          const end = new Date();
          const duration = end.getTime() - start.getTime();

          const { status, statusText } = response;
          const body = await response.json().catch(() => '');
          const log = { status, statusText, body };

          if (response?.status !== 200) {
            await sendErrorToSlack(
              `Server is Not Working!\nServer: ${server}, Duration: ${duration}ms, Response: ${JSON.stringify(
                log,
              )}`,
            );
          }

          if (duration > 100) {
            await sendErrorToSlack(
              `Server is Slow!\nServer: ${server}, Duration: ${duration}ms, Response: ${JSON.stringify(
                log,
              )}`,
            );
          }

          return log;
        })
        .catch(async (error) => {
          await sendErrorToSlack(
            `Server is Not Working!\nServer: ${server}\nError: ${JSON.stringify(
              error,
            )}`,
          );
          return error;
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
