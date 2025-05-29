import bibliaApiRequest from "./biblia_api_request.js";

export default async function bibliaGetVerse(reference, translation) {
  const data = await bibliaApiRequest(reference, translation);

  // Extract reference
  const [refLine, ...rest] = data.text.split(/\r?\n/);
  const embedReference = refLine.replace(/\s*\(.*\)\s*/, "").trim();

  // Join the rest back together in case of multiple empty lines
  const verseBlock = rest.join(" ").trim();

  // Updated regex: match digits followed by optional space, then text
  const verseMatches = [
    ...verseBlock.matchAll(/(\d+)\s*(.*?)(?=\s*\d+\s*[^0-9]|$)/g),
  ];

  // Format the verse text
  let verseText = "";
  if (verseMatches.length > 0) {
    verseText = verseMatches
      .map(([_, num, text]) => `[${num}] ${text.trim()}`)
      .join(" ");
  }

  return {
    text: verseText,
    reference: embedReference,
  };
}
