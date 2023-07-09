import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { AppDataSource } from './datasource';
import { DataSource } from 'typeorm';

const run: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('Event: ', event);

  try {
    const dataSource: DataSource = await AppDataSource.initialize();
    console.log('datasource initialized');
    dataSource.destroy();
  } catch (error) {
    throw error;
  }
};

export { run };
