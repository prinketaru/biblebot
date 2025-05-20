import {
  SlashCommandBuilder,
  EmbedBuilder,
  ApplicationIntegrationType,
  InteractionContextType,
} from "discord.js";
import fetch from "node-fetch";

export const data = new SlashCommandBuilder()
  .setName("verse")
  .setDescription("Search for a verse or get the daily verse")
  .setIntegrationTypes([
    ApplicationIntegrationType.GuildInstall,
    ApplicationIntegrationType.UserInstall,
  ])
  .setContexts([
    InteractionContextType.Guild,
    InteractionContextType.PrivateChannel,
    InteractionContextType.BotDM,
  ])
  .addSubcommand((subcommand) =>
    subcommand
      .setName("search")
      .setDescription("Search for a verse.")
      .addStringOption((option) =>
        option
          .setName("verse")
          .setDescription("The verse to search for")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("translation")
          .setDescription("The translation to use")
          .addChoices(
            { name: "KJV", value: "KJV" },
            { name: "NIV", value: "NIV" },
            { name: "ESV", value: "ESV" }
          )
          .setRequired(false)
      )
  );
export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();
  let translation = interaction.options.getString("translation");

  if (translation === null) {
    translation = "ESV";
  }

  if (subcommand === "search") {
    if (translation === "KJV") {
      // kjv api
    } else if (translation === "NIV") {
      // niv api
    } else {
      // esv api (default)
      const url = `https://api.esv.org/v3/passage/text/?include-footnote-body=false&include-footnotes=false&include-passage-references=false&include-short-copyright=false&include-headings=false&q=`;
      const verse = interaction.options.getString("verse");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Token ${process.env.ESV_API_KEY}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url + verse, options);

      // make sure the response is ok
      if (!response.ok) {
        await interaction.reply({
          content: "There was an error while executing this command!",
        });
        console.error(
          "Error fetching verse:",
          response.status,
          response.statusText
        );
        return;
      }

      const data = await response.json();
      console.log(data);

      // check if the response is empty
      if (data.passages.length === 0) {
        return await interaction.reply({
          content: "Verse not found.",
          ephemeral: true,
        });
      }

      // check for any errors
      if (data.error) {
        return await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }

      // get data from the response
      const verseText = data.passages[0];
      const verseReference = data.passage_meta[0].canonical;

      // create passage embed
      const embed = new EmbedBuilder()
        .setColor("#824c22")
        .setTitle(`${verseReference} (${translation})`)
        .setURL(`https://www.biblegateway.com/passage/?search=${encodeURIComponent(verseReference)}&version=${translation}`)
        .setDescription(verseText)
        .setFooter({ text: "English Standard Version" })
        .setTimestamp();

      // send the embed
      return await interaction.reply({
        embeds: [embed],
      });
    }
  }
}
