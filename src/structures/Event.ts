import Bot from "./Bot";

export default class Event {
  bot: Bot;
  name: string;

  constructor(bot: Bot, name: string) {
    this.bot = bot;
    this.name = name;
  }

  /* eslint-disable */
  // @ts-expect-error ignore
  async execute(bot: Bot, ...args: any[]): Promise<any> {}
}
