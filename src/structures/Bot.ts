import * as DJS from "discord.js";
import CommandHandler from "../handlers/CommandHandler";
import EventHandler from "../handlers/EventHandler";
import Command from "./Command";
import InteractionCommand from "./Interaction";

class Bot extends DJS.Client {
  commands: DJS.Collection<string, Command>;
  aliases: DJS.Collection<string, string>;
  cooldowns: DJS.Collection<string, DJS.Collection<string, number>>;
  interactions: DJS.Collection<string, InteractionCommand>;

  constructor() {
    super({
      allowedMentions: { parse: ["roles", "users"] },
      intents: [
        /* provide your intents here */
      ],
    });

    this.commands = new DJS.Collection();
    this.aliases = new DJS.Collection();
    this.cooldowns = new DJS.Collection();
    this.interactions = new DJS.Collection();

    new CommandHandler(this).loadCommands();
    new EventHandler(this).loadEvents();
  }
}

export default Bot;
