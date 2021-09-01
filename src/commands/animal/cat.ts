import * as DJS from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CatCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cat",
      description: "Shows a picture of a cat",
    });
  }

  async execute(_: Bot, interaction: DJS.CommandInteraction) {
    try {
      const data = (await fetch("https://nekos.life/api/v2/img/meow").then((res) =>
        res.json(),
      )) as { url: string };

      const embed = new DJS.MessageEmbed().setImage(data.url);

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      interaction.reply({ content: "An unexpected error occurred", ephemeral: true });
    }
  }
}
