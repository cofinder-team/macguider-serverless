import { DataSource } from 'typeorm';
import { Database } from './datasource';
import { ItemService } from './services';
import { CoupangPriceDto } from './dtos';
import { collectPrice } from './lib/coupang/collect';

const collectCoupang = async (database: Database) => {
  const dataSource: DataSource = await database.getDataSource();

  const itemService: ItemService = new ItemService(dataSource);
  const items = await itemService.getTargetItems();

  const prices: CoupangPriceDto[] = await collectPrice(items);
  console.log(prices);
};

export { collectCoupang };
