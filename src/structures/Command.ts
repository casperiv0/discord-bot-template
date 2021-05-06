import { Message } from "discord.js";
import Bot from "./Bot";

export interface CommandOptions {
  name: string;
  description?: string;
  category: string;

  usage?: string;
  cooldown?: number;
  aliases?: string[];
  ownerOnly?: boolean;
}

export default class Command {
  bot: Bot;
  name: string;
  options: CommandOptions;

  constructor(bot: Bot, options: CommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this.options = options;
  }

  /**
   * @param {Message} message discord.js message
   * @param {string[]} args message args
   * @returns {any}
   */
  // @ts-expect-error ignore
  async execute(bot: Bot, message: Message, args: string[]): Promise<any> {}
}
