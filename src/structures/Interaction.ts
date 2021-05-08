import { ApplicationCommandOptionData, Interaction } from "discord.js";
import Bot from "./Bot";

export type Args = (string | number | boolean | undefined)[];

export interface InteractionCommandOptions {
  name: string;
  description?: string;
  options?: ApplicationCommandOptionData[];
}

export default class InteractionCommand {
  bot: Bot;
  name: string;
  options: InteractionCommandOptions;

  constructor(bot: Bot, options: InteractionCommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this.options = options;
  }

  /**
   * @param {Message} message discord.js message
   * @param {string[]} args message args
   * @returns {any}
   */
  /* eslint-disable */
  // @ts-expect-error
  async execute(bot: Bot, interaction: Interaction, args: Args): Promise<any> {}
}
