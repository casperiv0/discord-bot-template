import * as DJS from "discord.js";
import EventHandler from "../handlers/EventHandler";
import InteractionCommand from "./Command";

class Bot extends DJS.Client {
  commands: DJS.Collection<string, InteractionCommand>;
  cooldowns: DJS.Collection<string, DJS.Collection<string, number>>;

  constructor() {
    super({
      allowedMentions: { parse: ["roles", "users"] },
      intents: [
        /* provide your intents here */
      ],
    });

    this.commands = new DJS.Collection();
    this.cooldowns = new DJS.Collection();

    new EventHandler(this).loadEvents();
  }
}

export default Bot;
