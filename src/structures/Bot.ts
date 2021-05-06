import { Client, Collection } from "discord.js";
import CommandHandler from "../handlers/CommandHandler";
import EventHandler from "../handlers/EventHandler";
import Command from "./Command";

class Bot extends Client {
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  cooldowns: Collection<string, Collection<string, number>>;

  constructor() {
    super({
      allowedMentions: { parse: ["roles", "users"] },
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();

    new CommandHandler(this).loadCommands();
    new EventHandler(this).loadEvents();
  }
}

export default Bot;
