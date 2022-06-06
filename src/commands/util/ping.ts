import { Command, type CommandContext } from "../../structures/Command.js";
import type { Bot } from "../../structures/Bot.js";

export default class PingCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ping",
      description: "Returns the bot ping!",
    });
  }

  async execute({ interaction }: CommandContext) {
    const ping = this.bot.ws.ping;

    await interaction.reply(`The bot's ping is: ${ping}`);
  }
}
