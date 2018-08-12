'use strict';

const fs = require('fs');
const Clapp = require('./modules/clapp-discord');
const cfg = require('../config.js');
const pkg = require('../package.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

const app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  separator: cfg.separator,
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
  .login(cfg.token)
  .then(() => console.log('💯'))
  .catch(console.error);
