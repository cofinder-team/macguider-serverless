import { Handler, Context, ScheduledEvent } from 'aws-lambda';
import { Database } from './datasource';
import { DataSource } from 'typeorm';

const database = new Database();

const logEvent = (event: ScheduledEvent) => {
  console.log('Event: ', event);
};

const setContext = (context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
};

const run: Handler = async (event: ScheduledEvent, context: Context) => {
  logEvent(event);
  setContext(context);

  const dataSource: DataSource = await database.getDataSource();
  console.log(dataSource);
};

export { run };
