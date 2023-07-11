import request from 'request-promise-native';

const slackWebhookUrl: string = process.env.SLACK_WEBHOOK_URL ?? '';

export const sendLogToSlack = async (text: string) => {
  await request({
    method: 'POST',
    url: slackWebhookUrl,
    body: {
      channel: 'logs',
      username: 'log-bot',
      text: text,
    },
    json: true,
  });
};
