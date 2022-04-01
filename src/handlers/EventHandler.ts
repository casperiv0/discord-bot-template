import { parse } from "node:path";
import glob from "glob";
import Bot from "../structures/Bot";
import Event from "../structures/Event";

export default class EventHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadEvents() {
    try {
      const files = glob.sync("./src/events/**/*.ts");

      for (const file of files) {
        delete require.cache[file];
        const { name } = parse(`../../${file}`);

        if (!name) {
          throw new Error(`[ERROR][EVENT]: event must have a name (${file})`);
        }

        const File = await (await import(`../../${file}`)).default;
        const event = new File(this.bot, name) as Event;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!event.execute) {
          throw new TypeError(
            `[ERROR][events]: execute function is required for events! (${file})`,
          );
        }

        this.bot.on(event.name, event.execute.bind(null, this.bot));
      }
    } catch (e) {
      console.log("An error occurred when loading the events", { e });
    }
  }
}
