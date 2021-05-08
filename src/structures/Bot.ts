import { Client, Collection, Intents } from "discord.js";
import CommandHandler from "../handlers/CommandHandler";
import EventHandler from "../handlers/EventHandler";
import Command from "./Command";
import InteractionCommand from "./Interaction";

class Bot extends Client {
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  cooldowns: Collection<string, Collection<string, number>>;
  interactions: Collection<string, InteractionCommand>;

  constructor() {
    super({
      allowedMentions: { parse: ["roles", "users"] },
      intents: [Intents.ALL],
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.interactions = new Collection();

    new CommandHandler(this).loadCommands();
    new EventHandler(this).loadEvents();
  }
}

export default Bot;
