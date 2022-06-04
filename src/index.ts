import "dotenv/config";
import { Bot } from "./structures/Bot.js";

const bot = new Bot();

bot.login(process.env["BOT_TOKEN"]);
