import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const bibliaApiKey = process.env.BIBLIA_API_KEY;

if (!bibliaApiKey) {
    throw new Error("BIBLIA_API_KEY is not defined in the environment variables.");
}

export default async function bibliaApiRequest(reference, translation) {

    const url = `https://api.biblia.com/v1/bible/content/${translation}.txt.json?passage=${reference}&style=fullyFormatted&key=${bibliaApiKey}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };
    const response = await fetch(url, options);

    if (!response.ok) {
        console.error("Error fetching verse:", response.status, response.statusText);
        throw new Error("Failed to fetch verse from Biblia API");
    }

    const data = await response.json();

    return data;
    
}