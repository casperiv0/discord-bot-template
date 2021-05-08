import { Message, Permissions } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class MessageEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "message");
  }

  async execute(bot: Bot, message: Message) {
    try {
      if (message.author.id === bot.user?.id) return;
      if (!message.guild?.available || !message.guild) return;
      if (message.channel.type === "dm") return;
      if (!message.guild?.me) return;

      if (
        !message.channel.permissionsFor(message.guild?.me)?.has(Permissions.FLAGS.SEND_MESSAGES)
      ) {
        return;
      }

      const userId = message.author.id;
      const prefix = process.env["BOT_PREFIX"];

      const [arg, ...args] = message.content.slice(prefix?.length).trim().split(/ +/g);
      const cmd = arg?.toLowerCase();
      if (!cmd) return; // an error occurred

      const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd)!);
      if (!command) return;

      const owners = process.env["OWNERS"];

      if (command.options.ownerOnly && !owners?.includes(`${message.author.id}`)) {
        return message.reply("This command is owner only");
      }

      if (command.options.nsfwOnly && !message.channel.nsfw) {
        return message.channel.send("Command can only be used in a NSFW channel!");
      }

      const timestamps = bot.cooldowns.get(command.name);
      const now = Date.now();
      const cooldown = command.options.cooldown ? command?.options?.cooldown * 1000 : 3000;

      if (timestamps?.has(userId)) {
        const userTime = timestamps.get(userId);
        const expireTime = userTime! + cooldown;

        if (now < expireTime) {
          const timeLeft = ((expireTime - now) / 1000).toFixed(1);

          return message.reply(
            `Please wait ${timeLeft} more seconds before using the **${command.name}** command`,
          );
        }
      }

      timestamps?.set(userId, now);
      setTimeout(() => timestamps?.delete(userId), cooldown);

      return command.execute(bot, message, args);
    } catch (err) {
      console.error(err);
      return message.channel.send("An unexpected error occurred");
    }
  }
}
