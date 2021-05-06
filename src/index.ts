import "dotenv/config";
import Bot from "./structures/Bot";

const bot = new Bot();

bot.login(process.env["BOT_TOKEN"]);
