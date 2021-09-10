import slack from '@slack/web-api';

export class SlackClient {
  #logger;
  #slack;
  #channelID;

  constructor(logger, botToken, channelID) {
    this.#logger = logger;
    this.#slack = new slack.WebClient(botToken);
    this.#channelID = channelID;
  }

  async send(message) {
    if (this.#channelID === '') {
      this.#logger.info(`Processing is skipped because the channel ID is not specified`);
      return;
    }

    const result = await this.#slack.chat.postMessage({
      text: message,
      channel: this.#channelID,
    });

    this.#logger.info(`Successfully send message ${result.ts} in conversation ${this.#channelID}`);
  }
}
