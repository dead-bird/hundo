'use strict';

const Clapp = require('./modules/clapp-discord');
require('dotenv').config({ path: '.env' });
const { Client } = require('discord.js');
const pkg = require('../package.json');
const API = require('dblapi.js');
const fs = require('fs');
const bot = new Client();
const api = new API(process.env.API, bot);

const perms = {
  manage: context => context.msg.guild.me.hasPermission('MANAGE_MESSAGES'),
};

const app = new Clapp.App({
  name: 'Hundo',
  desc: pkg.description,
  prefix: '-h',
  separator: '',
  version: pkg.version,
  onReply: (file, context) => {
    // Handle errors
    if (!file.includes('.png')) {
      return context.msg.reply('\n' + file).then(res => {
        context.msg.delete(10000).catch(console.error);
        res.delete(10000).catch(console.error);
      });
    }

    context.msg.channel
      .send({ file })
      .then(() => {
        if (perms.manage(context)) context.msg.delete().catch(console.error);

        context.msg.channel.stopTyping();

        fs.unlink(file, err => {
          if (err) throw err;
        });
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

bot.on('ready', () => {
  console.log('💯');

  bot.user.setActivity('💯', { type: 'Playing' });

  setInterval(() => {
    api.postStats(bot.guilds.size, bot.shards.Id, bot.shards.total);
  }, 1800000);
});

api.on('error', e => error.log(`discordbots API error: ${e}`));

bot.login(process.env.TOKEN).catch(console.error);
