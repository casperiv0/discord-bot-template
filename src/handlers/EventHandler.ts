import glob from "glob";
import type { Bot } from "../structures/Bot.js";
import type { Event } from "../structures/Event.js";

export class EventHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadEvents() {
    try {
      const path =
        process.env["NODE_ENV"] === "production" ? "./dist/events/**/*.js" : "./src/events/**/*.ts";
      const files = glob.sync(path);

      for (const file of files) {
        const File = await (await import(`../../${file}`)).default;
        const event = new File(this.bot) as Event;

        this.bot.on(event.name, event.execute.bind(null, this.bot));
      }
    } catch (e) {
      console.log("An error occurred when loading the events", { e });
    }
  }
}
