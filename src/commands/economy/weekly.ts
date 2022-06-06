import type * as DJS from "discord.js";
import { Command } from "../../structures/Command.js";
import type { Bot } from "../../structures/Bot.js";
import { time } from "@discordjs/builders";

export default class WeeklyCommand extends Command {
  private SEVEN_DAYS_TIMEOUT_MS = 60 * 60 * 24 * 7 * 1000;
  private WEEKLY_CASH_AMOUNT = 1500;

  constructor(bot: Bot) {
    super(bot, {
      name: "weekly",
      description: "Collect your weekly reward (1500 cash)",
    });
  }

  async execute(interaction: DJS.CommandInteraction<"cached">) {
    const discordUser = await this.bot.prismaUtils.upsertDiscordGuildMember({ interaction });

    const lastWeeklyUsed = discordUser.lastWeeklyUsed?.getTime() ?? 0;
    const hasWeeklyExpired =
      discordUser.lastWeeklyUsed !== null &&
      this.SEVEN_DAYS_TIMEOUT_MS - (Date.now() - lastWeeklyUsed) > 0;

    if (!hasWeeklyExpired) {
      await this.bot.prisma.discordGuildMember.update({
        where: { id: discordUser.id },
        data: { lastWeeklyUsed: new Date(), cash: { increment: this.WEEKLY_CASH_AMOUNT } },
      });

      const timeLeft = new Date(Date.now() + this.SEVEN_DAYS_TIMEOUT_MS);
      return interaction.reply({
        content: `Successfully collected ${
          this.WEEKLY_CASH_AMOUNT
        } cash. Next reward can be collected ${time(timeLeft, "R")}`,
      });
    }

    const timeLeft = new Date(
      Date.now() + this.SEVEN_DAYS_TIMEOUT_MS - (Date.now() - lastWeeklyUsed),
    );

    await interaction.reply({
      content: `Please try again ${time(timeLeft, "R")}`,
    });
  }
}