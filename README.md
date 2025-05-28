# 📖 BibleBot

BibleBot is a simple, open-source Discord bot that allows users to search and read Bible verses directly in Discord using **slash commands only**. It currently supports the English Standard Version (ESV), with support for additional translations in development.

---

## ✨ Features

* 🔍 Search and display Bible verses by reference using slash commands (e.g. `/verse John 3:16`)
* 💾 Remembers your preferred Bible translation (currently ESV only)
* 🛡️ Privacy-focused — stores only your user ID to keep your version preference
* 🔓 100% open-source and community-friendly

---

## 📦 Getting Started

### Invite the Bot

> [Click here to invite BibleBot to your server](https://discord.com/oauth2/authorize?client_id=1291760421115527251&permissions=2048&integration_type=0&scope=bot+applications.commands)

### Self-Hosting

1. Clone the repository:

   ```bash
   git clone https://github.com/prinketaru/biblebot.git
   cd biblebot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your bot token and API keys:

   ```env
   DISCORD_TOKEN=your-discord-bot-token
   CLIENT_ID=your-discord-bot-client-id
   ESV_API_KEY=your-esv-api-key
   ```

4. Run the bot:

   ```bash
   node index.js
   ```

---

## 💡 Slash Commands

BibleBot uses Discord's built-in slash command system. After inviting the bot, you can use the following command:

| Command  | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| `/verse` | Search for and display a Bible verse (e.g. `/verse reference:John 3:16`) |

---

## 🔐 Privacy & Terms

BibleBot is built with your privacy in mind. We store only the minimum information necessary.

* [Privacy Policy](./PRIVACY.md)
* [Terms of Service](./TERMS.md)

---

## ⚙️ Configuration

BibleBot uses external APIs to fetch scripture text. Currently, only the ESV translation is supported via the [ESV.org API](https://api.esv.org/). More translations are planned.

See the [`.env.example`](./.env.example) file for required variables.

---

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome! Feel free to fork the repo and submit a pull request.

---

## 🛠 Built With

* JavaScript
* discord.js

---

## 📬 Contact

For support or questions, open an issue on the [GitHub repository](https://github.com/prinketaru/biblebot) or email [prince@prinke.dev](mailto:prince@prinke.dev).