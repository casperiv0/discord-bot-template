import * as DJS from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PingCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ping",
      description: "Returns the bot ping!",
    });
  }

  async execute(bot: Bot, interaction: DJS.CommandInteraction) {
    const ping = bot.ws.ping;

    await interaction.reply(`The bot's ping is: ${ping}`);
  }
}
