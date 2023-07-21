import request from 'request-promise-native';

const url: string = process.env.SLACK_WEBHOOK_URL ?? '';

const sendToSlack = async (body: {
  channel: string;
  username: string;
  text: string;
}) => {
  await request({
    method: 'POST',
    url,
    body,
    json: true,
  });
};
export const sendLogToSlack = async (text: string) => {
  return sendToSlack({ channel: 'logs', username: 'log-bot', text });
};

export const sendErrorToSlack = async (text: string) => {
  return sendToSlack({ channel: 'errors', username: 'error-bot', text });
};
