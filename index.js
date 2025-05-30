const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags, ActivityType } = require('discord.js');
require('dotenv').config();
const schedule = require('node-schedule');
const dailyVersesPath = path.join(__dirname, 'daily_verses.json');
const dailyVersesData = JSON.parse(fs.readFileSync(dailyVersesPath, 'utf-8'));

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filepath} is missing a required "data" or "execute" property.`)
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command match ${interaction.commandName} was found.`)
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', flags: [MessageFlags.Ephemeral] });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: [MessageFlags.Ephemeral] });
        }
    }

});

client.once(Events.ClientReady, readyClient => {
    readyClient.user.setActivity(dailyVersesData.current_verse, { type: ActivityType.Listening  });

    schedule.scheduleJob({hour: 0, minute: 0, tz: 'America/New_York'}, () => {
        pickNewVerseAndUpdateStatus(readyClient);
    });

    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

function pickNewVerseAndUpdateStatus(client) {
    const verses = dailyVersesData.daily_bible_verses;

    // Pick a random verse different from the current one
    let newVerse;
    do {
        newVerse = verses[Math.floor(Math.random() * verses.length)];
    } while (newVerse === dailyVersesData.current_verse);

    // Update the JSON data and write to file
    dailyVersesData.current_verse = newVerse;
    fs.writeFileSync(dailyVersesPath, JSON.stringify(dailyVersesData, null, 2));

    // Set bot status to the new verse
    client.user.setActivity(newVerse, { type: ActivityType.Listening })
        .then(() => console.log(`Status updated to: ${newVerse}`))
        .catch(console.error);
}

client.login(process.env.TOKEN);