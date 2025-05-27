import { EmbedBuilder } from "discord.js";

export default async function verseEmbed(verse, reference, translation) {
    let longtl = "";
    let iconURL = "";

    if (translation === "KJV")
        longtl = "King James Version";
    else if (translation === "NIV")
        longtl = "New International Version";
    else
        longtl = "English Standard Version";
        iconURL = "https://i.ibb.co/7xTStG05/id-B5-Dj4-ZHm-1748005133872.png";
    

    const embed = new EmbedBuilder()
        .setDescription(verse)
        .setColor("#824c22")
        .setTitle(reference)
        .setURL(`https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=${translation}`)
        .setAuthor({
            name: longtl,
            iconURL: iconURL,
        })
        .setTimestamp();

    // add a random chance to include a donation message
    if (Math.random() < 0.1) {
        embed.addFields({   
            name: "\u200B",
            value: "-# I'm building BibleBot solo—if it's blessed you, [buy me a coffee](https://buymeacoffee.com/prinke) and help keep it going.",
        })
    }

    return embed;
}