import { Message, MessageEmbed } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class HelpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      aliases: ["h"],
      description: "Simple help command",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    try {
      const [commandName] = args;
      const commands = bot.commands;

      if (commandName) {
        const command =
          commands.get(commandName) ?? bot.commands.get(bot.aliases.get(commandName)!);

        if (!command) {
          return message.channel.send("Command not found!");
        }

        const embed = new MessageEmbed()
          .setTitle(command.name)
          .setDescription(command.options.description ?? "No description");

        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle(`${bot.user?.username}'s Commands`)
        .setDescription(`\`\`\`${commands.map((cmd) => cmd.name).join(", ")}\`\`\``);

      return message.channel.send(embed);
    } catch (err) {
      console.error(err);
      return message.channel.send("An unexpected error occurred");
    }
  }
}
