import * as DJS from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class InteractionEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "interactionCreate");
  }

  isNsfwChannel(interaction: DJS.CommandInteraction) {
    return interaction.channel instanceof DJS.TextChannel && !interaction.channel.nsfw;
  }

  async execute(bot: Bot, interaction: DJS.Interaction) {
    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);
    if (!command) return;

    const owners = process.env["OWNERS"];
    if (command.options.ownerOnly && !owners?.includes(interaction.user.id)) {
      return interaction.reply({ content: "This command is owner only", ephemeral: true });
    }

    if (command.options.nsfwOnly && this.isNsfwChannel(interaction)) {
      return interaction.reply({
        content: "Command can only be used in a NSFW channel!",
        ephemeral: true,
      });
    }

    try {
      await command?.execute(bot, interaction);
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
