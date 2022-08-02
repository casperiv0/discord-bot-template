import * as DJS from "discord.js";
import type { Bot } from "../../structures/Bot.js";
import { Event } from "../../structures/Event.js";

export default class InteractionEvent extends Event {
  constructor(bot: Bot) {
    super({ bot, name: DJS.Events.InteractionCreate });
  }

  private isNsfwChannel(interaction: DJS.CommandInteraction<"cached">) {
    return interaction.channel instanceof DJS.TextChannel && !interaction.channel.nsfw;
  }

  private isOwner(interaction: DJS.CommandInteraction<"cached">) {
    const owners = process.env["OWNERS"];
    return owners?.includes(interaction.user.id);
  }

  async execute(bot: Bot, interaction: DJS.Interaction<"cached">) {
    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);
    if (!command) return;

    if (command.options.ownerOnly && !this.isOwner(interaction)) {
      await interaction.reply({ content: "This command is owner only", ephemeral: true });

      return;
    }

    if (command.options.nsfwOnly && this.isNsfwChannel(interaction)) {
      await interaction.reply({
        content: "Command can only be used in a NSFW channel!",
        ephemeral: true,
      });

      return;
    }

    try {
      await command.execute({ interaction });
    } catch (err) {
      console.error(err);
      if (interaction.replied) return;

      if (interaction.deferred) {
        interaction.editReply({ content: "An error occurred! Please try again later." });
      } else {
        interaction.reply({
          ephemeral: true,
          content: "An error occurred! Please try again later.",
        });
      }
    }
  }
}
