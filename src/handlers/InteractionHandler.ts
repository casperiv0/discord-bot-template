import { globby } from "globby";
import type { Bot } from "../structures/Bot.js";
import type { Command } from "../structures/Command.js";
import type * as DJS from "discord.js";
import { importFileFromFilename } from "../lib/utils.js";

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

      const files = await globby(path);
      const loadInteractionsStart = Date.now();

      await Promise.all(files.map(async (filename) => this.loadInteraction(filename)));

      const interactionLoadTime = Date.now() - loadInteractionsStart;
      console.log(`Interactions loaded: ${interactionLoadTime}ms`);
    } catch (e) {
      console.log(e);
    }
  }

  private async loadInteraction(filename: string) {
    const interaction = await importFileFromFilename<Command>({
      filename,
      constructorOptions: [this.bot],
    });

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
}
