import { Handler, Context, ScheduledEvent } from 'aws-lambda';
import { Database } from './datasource';
import { checkServerStatus, collectCoupang } from './run';
import { sendErrorToSlack, sendLogToSlack } from './lib/slack/slack';

const database = new Database();

const runWithLogging = async (
  event: unknown,
  context: Context,
  func: (database: Database) => Promise<unknown>,
): Promise<void> => {
  console.log('Event: ', event);
  context.callbackWaitsForEmptyEventLoop = false;

  const start: Date = new Date();
  return func(database)
    .then(async (result) => {
      console.log(result);

      const end: Date = new Date();
      const duration: number = end.getTime() - start.getTime();

      const { functionName } = context;
      return sendLogToSlack(
        `Lambda function successfully executed\nFunctionName: ${functionName}\nDuration: ${duration}ms`,
      );
    })
    .catch(async (error) => {
      console.log(error);
      return sendErrorToSlack(`Lambda function failed\nError: ${error}`);
    });
};

const collectCoupangHandler: Handler = async (
  event: ScheduledEvent,
  context: Context,
) => {
  return runWithLogging(event, context, collectCoupang);
};

const checkServerStatusHandler: Handler = async (
  event: ScheduledEvent,
  context: Context,
) => {
  return runWithLogging(event, context, checkServerStatus);
};

export { collectCoupangHandler, checkServerStatusHandler };
