import { DataSource } from 'typeorm';
import { Database } from './datasource';
import { CoupangService, ItemService } from './services';
import { CoupangPriceDto } from './dtos';
import { collectPrice } from './lib/coupang/collect';

const collectCoupang = async (database: Database) => {
  const dataSource: DataSource = await database.getDataSource();

  const itemService: ItemService = new ItemService(dataSource);
  const coupangService: CoupangService = new CoupangService(dataSource);

  const items = await itemService.getTargetItems();
  const prices: CoupangPriceDto[] = await collectPrice(items);
  await coupangService.saveCoupangPrices(prices);
  console.log('successfully updated');
};

export { collectCoupang };
