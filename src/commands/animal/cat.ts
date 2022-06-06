import * as DJS from "discord.js";
import { request } from "undici";
import { Command, type CommandContext } from "../../structures/Command.js";
import type { Bot } from "../../structures/Bot.js";

export default class CatCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cat",
      description: "Shows a picture of a cat",
    });
  }

  async execute({ interaction }: CommandContext) {
    try {
      const data = (await (await request("https://nekos.life/api/v2/img/meow")).body.json()) as {
        url: string;
      };

      const embed = new DJS.EmbedBuilder().setImage(data.url);

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      interaction.reply({ content: "An unexpected error occurred", ephemeral: true });
    }
  }
}
