import type * as DJS from "discord.js";
import type { Bot } from "./Bot.js";

export interface InteractionCommandOptions {
  name: string;
  description?: string;
  options?: DJS.ApplicationCommandOptionData[];

  ownerOnly?: boolean;
  nsfwOnly?: boolean;
}

export interface CommandContext {
  /** the interaction from Discord's API */
  interaction: DJS.CommandInteraction<"cached">;
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
   * @param {CommandContext} context discord.js interaction
   * @returns {DJS.Awaitable<void>}
   */
  abstract execute(context: CommandContext): DJS.Awaitable<void>;
}
