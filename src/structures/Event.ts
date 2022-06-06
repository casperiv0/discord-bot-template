import type * as DJS from "discord.js";
import type { Bot } from "./Bot.js";

export type EventName = keyof DJS.ClientEvents;

interface EventOptions {
  bot: Bot;
  name: EventName;
}

export abstract class Event {
  bot: Bot;
  name: EventName;

  constructor(options: EventOptions) {
    this.bot = options.bot;
    this.name = options.name;
  }

  /**
   * @param {Bot} bot The bot client
   * @param {string[]} args event args
   * @returns {DJS.Awaitable<void>}
   */
  abstract execute(bot: Bot, ...args: any[]): DJS.Awaitable<void>;
}
