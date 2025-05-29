import { EmbedBuilder } from "discord.js";

export default async function verseEmbed(text, reference, translation) {
  let longtl = "";
  let iconURL = "https://cdn.discordapp.com/avatars/1291760421115527251/d1d49ff27df4e3d496a87256b7e2049e.webp?size=240";

  if (translation === "KJV") {
    longtl = "King James Version";
    iconURL = "https://i.ibb.co/XrQ95hxk/KJV-png-1.png";
  } else if (translation === "NIV") {
    longtl = "New International Version";
  } else if (translation === "ASV") {
    longtl = "American Standard Version";
    iconURL = "https://i.ibb.co/tf6NFyw/ASV.webp"
  } else if (translation === "DARBY") {
    longtl = "Darby Translation";
  } else if (translation === "SCRMORPH") {
    longtl = "The New Testament in Greek (Scrivener 1881)";
  } else {
    longtl = "English Standard Version";
    iconURL = "https://i.ibb.co/7xTStG05/id-B5-Dj4-ZHm-1748005133872.png";
  }

  console.log(text + reference + translation + longtl + iconURL);
  

  const embed = new EmbedBuilder()
    .setDescription(text)
    .setColor("#824c22")
    .setTitle(reference)
    .setURL(
      `https://www.biblegateway.com/passage/?search=${encodeURIComponent(
        reference
      )}&version=${translation}`
    )
    .setAuthor({
      name: longtl,
      iconURL: iconURL,
    })
    .setTimestamp();

  // add a random chance to include a donation message
  if (Math.random() < 0.1) {
    embed.addFields({
      name: "\u200B",
      value:
        "-# I'm building BibleBot solo—if it's blessed you, [buy me a coffee](https://buymeacoffee.com/prinke) and help keep it going.",
    });
  }

  return embed;
}
