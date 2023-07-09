import { Handler, Context } from 'aws-lambda';

const run: Handler = async (event: any, context: Context) => {
  console.log('Event: ', event);
  console.log('env', process.env);
};

export { run };
