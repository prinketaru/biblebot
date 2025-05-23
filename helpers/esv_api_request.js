import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const esvApiKey = process.env.ESV_API_KEY;

if (!esvApiKey) {
    throw new Error("ESV_API_KEY is not defined in the environment variables.");
}

export default async function esvApiRequest(verse) {
    const url = `https://api.esv.org/v3/passage/text/?include-footnote-body=false&include-footnotes=false&include-passage-references=false&include-short-copyright=false&include-headings=false&q=${verse}`
    const options = {
        method: "GET",
        headers: {
            Authorization: `Token ${esvApiKey}`,
            "Content-Type": "application/json",
        }
    };
    const response = await fetch(url, options);

    if (!response.ok) {
        console.error("Error fetching verse:", response.status, response.statusText);
        throw new Error("Failed to fetch verse from ESV API");
    }

    const data = await response.json();
    
    return data;
}