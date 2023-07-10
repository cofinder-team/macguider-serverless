import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    (process.env.NODE_ENV === 'prod' ? '/var/task' : '.build') +
      '/**/*.entity.{ts,js}',
  ],
};

export class Database {
  dataSource: DataSource;

  initalizeDataSource = async () => {
    if (!this.dataSource?.isInitialized) {
      this.dataSource = await new DataSource(options).initialize();
      console.log('Datasource initialized');
    }
  };

  getDataSource = async () => {
    await this.initalizeDataSource();
    return this.dataSource;
  };
}
