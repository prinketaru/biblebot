import {
  SlashCommandBuilder,
  ApplicationIntegrationType,
  InteractionContextType,
  MessageFlags,
} from "discord.js";
import esvApiRequest from "../../helpers/esv_api_request.js";
import verseEmbed from "../../helpers/verse_embed.js";
import bibliaGetVerse from "../../helpers/biblia/biblia_get_verse.js";

export const data = new SlashCommandBuilder()
  .setName("verse")
  .setDescription("Search for a verse in the Bible.")
  .setIntegrationTypes([
    ApplicationIntegrationType.GuildInstall,
    ApplicationIntegrationType.UserInstall,
  ])
  .setContexts([
    InteractionContextType.Guild,
    InteractionContextType.PrivateChannel,
    InteractionContextType.BotDM,
  ])
  .addStringOption((option) =>
    option
      .setName("reference")
      .setDescription(
        "The reference of the verse to search for (e.g. John 3:16)"
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("translation")
      .setDescription("The translation to use")
      .addChoices({ name: "English Standard Version (ESV)", value: "ESV" })
      .addChoices({ name: "King James Version (KJV)", value: "KJV" })
      .addChoices({ name: "American Standard Version (ASV)", value: "ASV" })
      .addChoices({ name: "Darby Translation (DARBY)", value: "DARBY" })
      .addChoices({
        name: "The New Testament in Greek (Scrivener 1881)",
        value: "SCRMORPH",
      })
      .setRequired(false)
  );
export async function execute(interaction) {
  let translation = interaction.options.getString("translation");

  if (translation === null) {
    translation = "ESV";
  }

  const reference = interaction.options.getString("reference");

  if (
    translation === "DARBY" ||
    translation === "SCRMORPH" ||
    translation === "ASV" ||
    translation === "KJV"
  ) {
    bibliaGetVerse(reference, translation)
      .then(async (data) => {
        // create passage embed
        const embed = await verseEmbed(data.text, data.reference, translation);

        // send the embed
        return await interaction.reply({
          embeds: [embed],
        });
      })
      .catch(async (error) => {
        return await interaction.reply({
          content: `No verse found for \`${reference}\`. Please check the reference and try again.`,
          flags: [MessageFlags.Ephemeral],
        });
      });
  } else {
    // esv api (default)
    const data = await esvApiRequest(reference);
    // check if verse exists
    if (data.passages.length === 0) {
      return await interaction.reply({
        content: `No verse found for \`${reference}\`. Please check the reference and try again.`,
        flags: [MessageFlags.Ephemeral],
      });
    }
    // check for any errors
    if (data.error) {
      return await interaction.reply({
        content: "There was an error while executing this command!",
        flags: [MessageFlags.Ephemeral],
      });
    }

    // create passage embed
    const embed = await verseEmbed(
      data.passages[0],
      data.passage_meta[0].canonical,
      translation
    );

    // send the embed
    return await interaction.reply({
      embeds: [embed],
    });
  }
}
