import { parse } from "path";
import * as DJS from "discord.js";
import glob from "glob";
import Bot from "../structures/Bot";
import Command from "../structures/Command";

export default class CommandHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadCommands() {
    try {
      const files = glob.sync("./src/commands/**/*.ts");

      for (const file of files) {
        delete require.cache[file];
        const options = parse(`../../${file}`);
        const File = await (await import(`../../${file}`)).default;
        const command = new File(this.bot, options) as Command;

        if (!command.execute) {
          throw new Error(
            `[ERROR][COMMANDS]: 'execute' function is required for commands! (${file})`,
          );
        }

        if (!command.name || command.name === "") {
          throw new Error(`[ERROR][COMMANDS]: 'name' is required for commands! (${file})`);
        }

        this.bot.commands.set(command.name, command);

        command.options.aliases?.forEach((alias) => {
          this.bot.aliases.set(alias, command.name);
        });

        if (!this.bot.cooldowns.has(command.name)) {
          this.bot.cooldowns.set(command.name, new DJS.Collection());
        }
      }
    } catch (e) {
      console.log("An error occurred when loading the commands!", { e });
    }
  }
}
