import * as DJS from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class InteractionEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "interactionCreate");
  }

  async execute(bot: Bot, interaction: DJS.Interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.command) return;

    const command = bot.interactions.get(interaction.command.name);

    try {
      await command?.execute(
        bot,
        interaction,
        interaction.options.map((v) => v.value),
      );
    } catch (err) {
      console.error(err);
      return interaction.reply("An unexpected error occurred");
    }
  }
}
