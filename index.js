const mineflayer = require('mineflayer');
const { Client, GatewayIntentBits } = require('discord.js')
const { MessageContent, GuildMessages, Guilds } = GatewayIntentBits
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

const { loginBot } = require('./login');
const { embedMessage } = require('./embedMessage')

const livechat = process.env.livechat;

reuire('dotenv').config();
require('./keepalive.js');

const bot = mineflayer.createBot({
  host: process.env.host,
  username: process.env.username,
  port: 25565,
  auth: 'offline',
  version: '1.17.1',
  keepAlive: true
});

loginBot(bot);
embedMessage(bot);

client.once('ready', () => {
  console.log(`Discord bot logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (!message.guild) return;
  if (message.author.bot || message.author.id === client.user.id) return;
  if (message.channel.id === livechat) {
    message.react('❤');
    bot.chat(`${message.content}`);
  }
});


client.login(process.env.token);
