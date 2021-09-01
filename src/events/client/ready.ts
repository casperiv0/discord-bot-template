import InteractionHandler from "../../handlers/InteractionHandler";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class ReadyEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "ready");
  }

  async execute(bot: Bot) {
    const userCount = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    const serverCount = bot.guilds.cache.size;

    console.log(`Bot is running  ${userCount} users and ${serverCount} servers`);

    new InteractionHandler(bot).loadInteractions();

    // change statuses every 60 seconds (Min is 15s)
    const statuses = [`${serverCount} servers.`, `${userCount} users`];

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot?.user?.setActivity(status!, { type: "WATCHING" });
    }, 60000);
  }
}
