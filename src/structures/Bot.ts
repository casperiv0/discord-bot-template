import * as DJS from "discord.js";
import type { Command } from "./Command.js";
import { EventHandler } from "../handlers/EventHandler.js";

export class Bot extends DJS.Client {
  commands: DJS.Collection<string, Command> = new DJS.Collection();

  constructor() {
    super({
      intents: [
        DJS.Intents.FLAGS.GUILDS,
        /* provide your intents here */
      ],
    });

    new EventHandler(this).loadEvents();
  }
}
