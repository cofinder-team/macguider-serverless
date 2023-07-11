import { Handler, Context, ScheduledEvent } from 'aws-lambda';
import { Database } from './datasource';
import { collectCoupang } from './run';
import { sendLogToSlack } from './lib/slack/slack';

const database = new Database();

const runWithLogging = async (
  event: unknown,
  context: Context,
  func: (database: Database) => Promise<void>,
) => {
  console.log('Event: ', event);
  context.callbackWaitsForEmptyEventLoop = false;

  const start: Date = new Date();
  await func(database)
    .then(async () => {
      const end: Date = new Date();
      const duration: number = end.getTime() - start.getTime();

      const { functionName } = context;
      await sendLogToSlack(
        `Lambda function successfully executed\nFunctionName: ${functionName}\nDuration: ${duration}ms`,
      );
    })
    .catch(async (error) => {
      console.log(error);
      return sendLogToSlack(`Lambda function failed\nError: ${error}`);
    });
};

const collectCoupangHandler: Handler = async (
  event: ScheduledEvent,
  context: Context,
) => {
  return runWithLogging(event, context, collectCoupang);
};

export { collectCoupangHandler };
