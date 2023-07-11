import request from 'request';

const slackWebhookUrl: string = process.env.SLACK_WEBHOOK_URL ?? '';

export const sendLogToSlack = async (text: string) => {
  return request.post({
    url: slackWebhookUrl,
    body: {
      channel: 'logs',
      username: 'log-bot',
      text: text,
    },
    json: true,
  });
};
