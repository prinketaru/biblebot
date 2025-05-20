const { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType, Client } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the bot\'s latency')
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
        .setContexts([InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM]),
    async execute(interaction) {
        await interaction.reply(`Pong!\n-# ${interaction.client.ws.ping}ms`);
    }
}