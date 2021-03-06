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
    context.msg.channel.stopTyping();

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

        fs.unlink(file, err => {
          if (err) throw err;
        });
      })
      .catch(console.error);
  },
});

fs.readdirSync('./app/commands/').forEach(file => {
  app.addCommand(require('./commands/' + file));
});

bot.on('message', msg => {
  if (app.isCliSentence(msg.content)) {
    app.parseInput(msg.content, { msg });
  }
});

bot.on('ready', () => {
  console.log('💯');

  bot.user.setActivity('💯', { type: 'Playing' });
});

bot.on('error', e => console.error(e));
bot.on('warn', e => console.warn(e));
bot.on('debug', e => {});

api.on('posted', () => console.log('discordbots API: server count posted'));
api.on('error', e => error.log(`discordbots API error: ${e}`));

bot.login(process.env.TOKEN).catch(console.error);
