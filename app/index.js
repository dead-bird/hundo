'use strict';

const Clapp = require('./modules/clapp-discord');
require('dotenv').config({ path: '.env' });
const pkg = require('../package.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const app = new Clapp.App({
  name: 'Hundo',
  desc: pkg.description,
  prefix: '-',
  separator: '',
  version: pkg.version,
  onReply: (file, context) => {
    context.msg.channel
      .send({ file })
      .then(() => {
        if (context.msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
          context.msg.delete().catch(console.error);
        }
      })
      .catch(console.error);
  },
});

// Load every command in the commands folder
fs.readdirSync('./app/commands/').forEach(file => {
  app.addCommand(require('./commands/' + file));
});

bot.on('message', msg => {
  if (app.isCliSentence(msg.content)) {
    // Keep adding properties to the context as you need them
    app.parseInput(msg.content, { msg });
  }
});

bot
  .login(process.env.TOKEN)
  .then(() => console.log('💯'))
  .catch(console.error);
