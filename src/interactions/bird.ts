import { CommandInteraction, MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import Bot from "../structures/Bot";
import Interaction from "../structures/Interaction";

export default class BirdInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "bird",
      description: "Returns an image of a bird",
    });
  }

  async execute(_: Bot, interaction: CommandInteraction) {
    const data = await (await fetch("https://some-random-api.ml/img/birb")).json();

    const embed = new MessageEmbed().setImage(data.link);

    return interaction.reply(embed);
  }
}
