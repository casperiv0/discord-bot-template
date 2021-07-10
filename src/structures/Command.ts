import * as DJS from "discord.js";
import Bot from "./Bot";

export interface CommandOptions {
  name: string;
  description?: string;
  category: string;

  usage?: string;
  cooldown?: number;
  aliases?: string[];
  ownerOnly?: boolean;
  nsfwOnly?: boolean;
}

export default abstract class Command {
  bot: Bot;
  name: string;
  options: CommandOptions;

  constructor(bot: Bot, options: CommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this.options = options;
  }

  /**
   * @param {Bot} bot The bot client
   * @param {DJS.Message} message discord.js message
   * @param {string[]} args message args
   * @returns {any}
   */
  abstract execute(bot: Bot, message: DJS.Message, args: string[]): Promise<any>;
}
