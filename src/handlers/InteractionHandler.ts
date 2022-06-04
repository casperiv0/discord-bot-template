import glob from "glob";
import type { Bot } from "../structures/Bot.js";
import type { Command } from "../structures/Command.js";
import type * as DJS from "discord.js";

// warning: This can only be initialized in the ready event!
export class InteractionHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadInteractions() {
    try {
      const path =
        process.env["NODE_ENV"] === "production"
          ? "./dist/commands/**/*.js"
          : "./src/commands/**/*.ts";
      const files = glob.sync(path);

      for (const file of files) {
        const File = await (await import(`../../${file}`)).default;
        const interaction = new File(this.bot) as Command;

        this.bot.commands.set(interaction.name, interaction);

        const data: DJS.ApplicationCommandData = {
          name: interaction.name,
          description: interaction.options.description ?? "Empty description",
          options: interaction.options.options ?? [],
        };

        if (process.env["DEV_GUILD_ID"]) {
          const guild = await this.bot.guilds.fetch(process.env["DEV_GUILD_ID"]);
          await guild.commands.create(data);
        } else {
          /**
           * note: commands might only show up after 30-60 minutes.
           */
          await this.bot.application?.commands.create(data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
