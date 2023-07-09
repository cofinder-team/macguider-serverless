import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
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
});
