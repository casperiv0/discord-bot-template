import * as DJS from "discord.js";
import Bot from "./Bot";

export interface InteractionCommandOptions {
  name: string;
  description?: string;
  options?: DJS.ApplicationCommandOptionData[];

  ownerOnly?: boolean;
  nsfwOnly?: boolean;
}

export default abstract class Command {
  bot: Bot;
  name: string;
  options: InteractionCommandOptions;

  constructor(bot: Bot, options: InteractionCommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this.options = options;
  }

  /**
   * @param {Bot} bot The bot client
   * @param {DJS.Interaction} interaction discord.js interaction
   * @returns {any}
   */
  abstract execute(bot: Bot, interaction: DJS.Interaction): Promise<any>;
}
