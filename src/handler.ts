import { Handler, Context, ScheduledEvent } from 'aws-lambda';
import { Database } from './datasource';
import { collectCoupang } from './run';

const database = new Database();

const logEvent = (event: ScheduledEvent) => {
  console.log('Event: ', event);
};

const setContext = (context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
};

const collectCoupangHandler: Handler = async (
  event: ScheduledEvent,
  context: Context,
) => {
  logEvent(event);
  setContext(context);
  collectCoupang(database);
};

export { collectCoupangHandler };
