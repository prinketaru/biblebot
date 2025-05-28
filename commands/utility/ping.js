import { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType, MessageFlags } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Get the bot\'s latency')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM]);
export async function execute(interaction) {
    return await interaction.reply({
        content: `Pong! (${interaction.client.ws.ping}ms)`,
        flags: [MessageFlags.Ephemeral]
    });
}