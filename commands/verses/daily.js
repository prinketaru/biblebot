import {
  SlashCommandBuilder,
  InteractionContextType,
  ApplicationIntegrationType,
  MessageFlags,
} from "discord.js";
import fs from "fs";
import bibliaGetVerse from "../../helpers/biblia/biblia_get_verse.js";
import esvApiRequest from "../../helpers/esv_api_request.js";
import verseEmbed from "../../helpers/verse_embed.js";

export const data = new SlashCommandBuilder()
  .setName("daily-verse")
  .setDescription("Get the daily verse")
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
  const dailyVersesPath = "./daily_verses.json";
  const dailyVersesData = JSON.parse(fs.readFileSync(dailyVersesPath, "utf-8"));
  const currentVerse = dailyVersesData.current_verse;

  let translation = interaction.options.getString("translation");

  if (translation === null) {
    translation = "ESV";
  }

  if (
    translation === "DARBY" ||
    translation === "SCRMORPH" ||
    translation === "ASV" ||
    translation === "KJV"
  ) {
    const verseData = await bibliaGetVerse(currentVerse, translation);
    const verseEmbedData = await verseEmbed(
      verseData.text,
      verseData.reference,
      translation
    );

    return await interaction.reply({
      embeds: [verseEmbedData],
    });
  } else {
    const data = await esvApiRequest(currentVerse);
    console.log("PASSASGAGASGAEGG" + data.passages[0]);

    const verseEmbedData = await verseEmbed(
      data.passages[0],
      data.passage_meta[0].canonical,
      translation
    );

    return await interaction.reply({
      embeds: [verseEmbedData],
    });
  }
}
