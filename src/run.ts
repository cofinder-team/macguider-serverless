import { DataSource } from 'typeorm';
import { Database } from './datasource';
import { ItemService } from './services';

const collectCoupang = async (database: Database) => {
  const dataSource: DataSource = await database.getDataSource();

  const itemService: ItemService = new ItemService(dataSource);
  const items = await itemService.getTargetItems();
};

export { collectCoupang };
