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

  const slowDuration = 100; // ms

  const fetchServer = async (
    server: string,
  ): Promise<{
    duration: number;
    type: 'success' | 'error' | 'slow';
    log: string;
    msg: string;
  }> => {
    const start = new Date();

    return fetch(server)
      .then(async (response) => {
        const end = new Date();
        const duration = end.getTime() - start.getTime();

        const { status, statusText } = response;
        const type: 'success' | 'error' | 'slow' =
          status !== 200
            ? 'error'
            : duration > slowDuration
            ? 'slow'
            : 'success';
        const body = await response.json().catch(() => '');

        const log = JSON.stringify({ response });
        const msg = JSON.stringify({ status, statusText, body });

        return { duration, type, log, msg };
      })
      .catch(async (error) => {
        const end = new Date();
        const duration = end.getTime() - start.getTime();

        const type = 'error';

        const log = JSON.stringify({ error });
        const msg = JSON.stringify({ error });

        return { duration, type, log, msg };
      });
  };

  return Promise.all(
    servers.map(async (server) => {
      const { duration, type, log, msg } = await fetchServer(server).then(
        async (result) =>
          result.type === 'slow' ? fetchServer(server) : result,
      );

      switch (type) {
        case 'slow':
        case 'error':
          await sendErrorToSlack(
            `Server ${type}: ${server}\n${duration}\n${msg}`,
          );
      }

      return { server, duration, log };
    }),
  );
};

const checkInfrastructure = async (event: SNSEvent): Promise<unknown> => {
  console.log(event);

  const text = event?.Records?.map((rcd) => rcd?.Sns?.Subject ?? '').join('\n');
  return sendErrorToSlack(text);
};

export { collectCoupang, checkServerStatus, checkInfrastructure };
