import { Command, type CommandContext } from "../../structures/Command.js";
import type { Bot } from "../../structures/Bot.js";
import { time } from "@discordjs/builders";

export default class DailyCommand extends Command {
  private TWENTY_FOUR_HOUR_TIMEOUT_MS = 60 * 60 * 24 * 1000;
  private DAILY_CASH_AMOUNT = 500;

  constructor(bot: Bot) {
    super(bot, {
      name: "daily",
      description: "Collect your daily reward (500 cash)",
    });
  }

  async execute({ interaction }: CommandContext) {
    const discordUser = await this.bot.prismaUtils.upsertDiscordGuildMember({ interaction });

    const lastDailyUsed = discordUser.lastDailyUsed?.getTime() ?? 0;
    const hasDailyExpired =
      discordUser.lastDailyUsed !== null &&
      this.TWENTY_FOUR_HOUR_TIMEOUT_MS - (Date.now() - lastDailyUsed) > 0;

    if (!hasDailyExpired) {
      await this.bot.prisma.discordGuildMember.update({
        where: { id: discordUser.id },
        data: { lastDailyUsed: new Date(), cash: { increment: this.DAILY_CASH_AMOUNT } },
      });

      const timeLeft = new Date(Date.now() + this.TWENTY_FOUR_HOUR_TIMEOUT_MS);
      interaction.reply({
        content: `Successfully collected ${
          this.DAILY_CASH_AMOUNT
        } cash. Next reward can be collected ${time(timeLeft, "R")}`,
      });

      return;
    }

    const timeLeft = new Date(
      Date.now() + this.TWENTY_FOUR_HOUR_TIMEOUT_MS - (Date.now() - lastDailyUsed),
    );

    await interaction.reply({
      content: `Please try again ${time(timeLeft, "R")}`,
    });
  }
}
