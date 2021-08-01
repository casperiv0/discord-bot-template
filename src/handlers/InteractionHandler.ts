import { parse } from "path";
import glob from "glob";
import Bot from "../structures/Bot";
import InteractionCommand from "../structures/Command";
import * as DJS from "discord.js";

// warning: This can only be initialized in the ready event!
export default class InteractionHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadInteractions() {
    try {
      const files = glob.sync("./src/interactions/**/*.ts");

      for (const file of files) {
        delete require.cache[file];
        const options = parse(`../../${file}`);
        const File = await (await import(`../../${file}`)).default;
        const interaction = new File(this.bot, options) as InteractionCommand;

        if (!interaction.execute) {
          new Error(
            `[ERROR][INTERACTIONS]: 'execute' function is required for interactions! (${file})`,
          );
          process.exit();
        }

        if (!interaction.name) {
          new Error(`[ERROR][INTERACTIONS]: 'name' is required for interactions! (${file})`);
          process.exit();
        }

        this.bot.commands.set(interaction.name, interaction);

        const data: DJS.ApplicationCommandData = {
          name: interaction.name,
          description: interaction.options.description ?? "Empty description",
          options: interaction.options.options ?? [],
        };

        /**
         * note: commands might only show up after 30-60 minutes.
         */
        await this.bot.application?.commands.create(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
