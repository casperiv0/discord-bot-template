import type * as DJS from "discord.js";
import { Command } from "../../structures/Command.js";
import type { Bot } from "../../structures/Bot.js";

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
