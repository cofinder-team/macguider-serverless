import { DataSource } from 'typeorm';
import { Database } from './datasource';
import { CoupangService, ItemService } from './services';
import { CoupangPriceDto } from './dtos';
import { collectPrice } from './lib/coupang/collect';
import { sendErrorToSlack } from './lib/slack/slack';

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
          response?.status !== 200
            ? sendErrorToSlack(
                `Server is Not Working!\nServer: ${server}, Status: ${response?.status}`,
              )
            : null;
        })
        .catch((error) => {
          sendErrorToSlack(
            `Server is Not Working!\nServer: ${server}\nError: ${error}`,
          );
        });
    }),
  );
};

export { collectCoupang, checkServerStatus };
