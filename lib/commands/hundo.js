const Clapp = require('../modules/clapp-discord');
const fs = require('fs');

module.exports = new Clapp.Command({
  name: 'hundo',
  desc: '💯ify your text',
  fn: (argv, context) => new Promise((resolve, reject) => {
    const file = new Date().toJSON();

    fs.writeFile(`./data/${file}.svg`, argv.args.text, err => {
      if (err) throw err;

      // This output will be redirected to your app's onReply function
      resolve(
        `this will do something cool maybe. You said: ${argv.args.text}.`
      );
    });
  }),
  args: [
    {
      name: 'text',
      desc: 'The text to be hundoed. Wrap multiple words in quotes plz',
      type: 'string',
      required: true,
      default: '',
    },
  ],
  // Flags: [
  //   {
  //     name: 'testflag',
  //     desc: 'A test flag',
  //     alias: 't',
  //     type: 'boolean',
  //     default: false,
  //   },
  // ],
});
