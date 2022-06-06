import type * as DJS from "discord.js";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

interface Options {
  interaction: DJS.CommandInteraction<"cached">;
}

export class PrismaUtils {
  async upsertDiscordGuildMember({ interaction }: Options) {
    return prisma.discordGuildMember.upsert({
      where: {
        discordIdGuildId: { discordId: interaction.user.id, guildId: interaction.guildId },
      },
      create: { discordId: interaction.user.id, guildId: interaction.guildId },
      update: { discordId: interaction.user.id, guildId: interaction.guildId },
    });
  }
}
