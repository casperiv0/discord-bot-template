import type * as DJS from "discord.js";
import type { Bot } from "./Bot.js";

export type EventName = keyof DJS.ClientEvents;
export abstract class Event {
  bot: Bot;
  name: EventName;

  constructor(bot: Bot, name: EventName) {
    this.bot = bot;
    this.name = name;
  }

  /**
   * @param {Bot} bot The bot client
   * @param {string[]} args event args
   * @returns {DJS.Awaitable<void>}
   */
  abstract execute(bot: Bot, ...args: any[]): DJS.Awaitable<void>;
}
