const axios = require('axios');

function loginBot(bot) {

  const pass = process.env.pass;

  bot.on('spawn', () => {
    console.log(`Mineflayer bot logged in as ${process.env.username}`);
  });
  
  bot.on("messagestr", (message) => {
    if (message.includes("Use the command /register <password> <password>.")) {
      bot.chat(`/register ${pass} ${pass}`);
    }
    if (message.includes("Use the command /login <password>.")) {
        bot.chat(`/login ${pass}`);
    }
    if  (message.includes(`Your login session has been continued.`)) {
      bot.chat(`/8b8t`);
    }
    if  (message.includes(`[8b8t] Unknown command do /help`)) {
      bot.chat(`/8b8t`);
    }
  });

  bot.on('messagestr', (message) => {
    if (message.includes( process.env.preifx + `ask `)) {
      const question = message.substring(5);
      axios.get(`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(question)}`)
        .then((response) => {
          bot.chat(response.data.cnt);
        })
        .catch((error) => {
          bot.chat(`Lỗi bot, vui lòng thử lại!`);
        });
    }
  });
}

module.exports = { loginBot };
