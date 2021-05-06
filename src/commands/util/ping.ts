import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PingCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ping",
      description: "Returns the bot ping!",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message) {
    try {
      const ping = bot.ws.ping;

      return message.channel.send(`The bot's ping is: ${ping}`);
    } catch (err) {
      console.error(err);
      return message.channel.send("An unexpected error occurred");
    }
  }
}
