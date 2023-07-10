import { DataSource } from 'typeorm';
import { Database } from './datasource';

const collectCoupang = async (database: Database) => {
  const dataSource: DataSource = await database.getDataSource();
};

export { collectCoupang };
