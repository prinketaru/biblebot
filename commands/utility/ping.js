import { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Get the bot\'s latency')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM]);
export async function execute(interaction) {
    await interaction.reply(`Pong!\n-# ${interaction.client.ws.ping}ms`);
}