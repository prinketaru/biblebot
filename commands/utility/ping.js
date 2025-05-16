const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the bot\'s latency'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}