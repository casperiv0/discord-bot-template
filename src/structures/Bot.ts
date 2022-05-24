import * as DJS from "discord.js";
import EventHandler from "../handlers/EventHandler";
import InteractionCommand from "./Command";

class Bot extends DJS.Client {
  commands: DJS.Collection<string, InteractionCommand> = new DJS.Collection();

  constructor() {
    super({
      intents: [
        /* provide your intents here */
      ],
    });

    new EventHandler(this).loadEvents();
  }
}

export default Bot;
