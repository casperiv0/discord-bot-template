import type * as DJS from "discord.js";
import type { Bot } from "./Bot.js";

export interface InteractionCommandOptions {
  name: string;
  description?: string;
  options?: DJS.ApplicationCommandOptionData[];

  ownerOnly?: boolean;
  nsfwOnly?: boolean;
}

export abstract class Command {
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
   * @returns {DJS.Awaitable<void>}
   */
  abstract execute(bot: Bot, interaction: DJS.Interaction): DJS.Awaitable<void>;
}
