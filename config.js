require('dotenv').config({ path: '.env' });

// Server invite link:
// https://discordapp.com/oauth2/authorize?client_id=474240197329158165&scope=bot&permissions=34816

module.exports = {
  name: 'Hundo',
  prefix: '-hundo',
  token: process.env.TOKEN,

  // ATTENTION! In order for this to work, you need to give your bot the following permission:
  // MANAGE_MESSAGES - 	0x00002000
  deleteAfterReply: {
    enabled: false,
    time: 10000 // In milliseconds
  }
};
