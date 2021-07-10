import * as DJS from "discord.js";
import Bot from "./Bot";

export type Args = (string | number | boolean | undefined)[];

export interface InteractionCommandOptions {
  name: string;
  description?: string;
  options?: DJS.ApplicationCommandOptionData[];
}

export default abstract class InteractionCommand {
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
   * @param {string[]} args message args
   * @returns {any}
   */
  abstract execute(bot: Bot, interaction: DJS.Interaction, args: Args): Promise<any>;
}
