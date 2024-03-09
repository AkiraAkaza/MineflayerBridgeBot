const { createBot } = require('mineflayer');
const request = require('request');

function embedMessage(bot) {

  const host =  process.env.host;
  const username = process.env.username;
  const webhooks = process.env.webhooks;

  bot.once('login', () => {
    bot.once('spawn', () => {
    const embedData = {
      title: 'Bot đã đăng nhập vào server!',
      description: `**Bot ${username} đã đăng nhập thành công vào server ${host}.**`,
      color: 0x00ff00,
      timestamp: new Date().toISOString(),
      footer: {
        text: host,
      },
    };

    const data = {
      embeds: [embedData],
    };

    request.post({
      url: webhooks,
      json: data,
    }, (error, response, body) => {
      if (error) {
        console.error('Error sending webhook:', error);
      }
    });
  });
});

  bot.on('end', () => {
    const boterror = {
      title: 'Bot đã mất kết nối với server!',
      color: 0xff0000,
      timestamp: new Date().toISOString(),
    };

    const data = {
      embeds: [boterror],
    };

    request.post({
      url: webhooks,
      json: data,
    }, (error, response, body) => {
      if (error) {
        console.error('Error sending webhook:', error);
      }
    });

    setTimeout(() => {
      const botlog = {
        title: '**Bot đang kết nối lại đến server!**',
        color: 0xffff00,
        timestamp: new Date().toISOString(),
      };

      const data = {
        embeds: [botlog],
      };

      request.post({
        url: webhooks,
        json: data,
      }, (error, response, body) => {
        if (error) {
          console.error('Error sending webhook:', error);
        }
      });
      createBot(bot);
    }, 5000);
  });
  
  bot.on('chat', (sender, message) => {
    const embedData = {
      title: sender,
      description: message,
      color: 0xffffff,
      timestamp: new Date().toISOString(),
      footer: {
        text: host,
      },
    };

    const data = {
      embeds: [embedData],
    };

    request.post({
      url: webhooks,
      json: data,
    }, (error, response, body) => {
      if (error) {
        console.error('Error sending webhook:', error);
      }
    });
  });

  bot.on('playerJoined', (player) => {
    const embedData = {
      title: `Player <${player.username}> đã join server!`,
      color: 0x00ffff,
      timestamp: new Date().toISOString(),
    };

    const data = {
      embeds: [embedData],
    };

    request.post({
      url: webhooks,
      json: data,
    }, (error, response, body) => {
      if (error) {
        console.error('Error sending webhook:', error);
      }
    });
  });

  bot.on('playerLeft', (player) => {
    const embedData = {
      title: `Player <${player.username}> đã rời server!`,
      color: 0x00ffff,
      timestamp: new Date().toISOString(),
    };

    const data = {
      embeds: [embedData],
    };

    request.post({
      url: webhooks,
      json: data,
    }, (error, response, body) => {
      if (error) {
        console.error('Error sending webhook:', error);
      }
    });
  });
}

module.exports = { embedMessage };
