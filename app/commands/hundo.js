const Clapp = require('../modules/clapp-discord');
const sharp = require('sharp');
const cooldown = new Set();

module.exports = new Clapp.Command({
  name: 'undo',
  desc: '💯ify your text',
  fn: (argv, context) =>
    new Promise((resolve, reject) => {
      const file = `./data/${new Date().toJSON()}.png`;
      const id = context.msg.author.id;

      if (cooldown.has(id)) return resolve('Woah, just take it easy man.');

      context.msg.channel.startTyping();

      // Add to cooldown for 5 seconds
      cooldown.add(id);
      setTimeout(() => cooldown.delete(id), 5000);

      console.log(svg(argv.args.text));

      sharp(Buffer.from(svg(argv.args.text))).toFile(file, err => {
        if (err) {
          context.msg.channel.stopTyping();
          return console.error(err);
        }

        resolve(file);
      });
    }),
  args: [
    {
      name: 'text',
      desc: 'The text to be hundoed. Wrap multiple words in quotes plz',
      type: 'string',
      required: true,
      default: '',
      validations: [
        {
          errorMessage: 'Too many characters!',
          validate: t => t.split('').length <= 14,
        },
      ],
    },
  ],
});

function svg(text) {
  let width = 0;

  text.split('').forEach(() => (width += 20));

  if (width < 50) width = 50;

  return template
    .replace(/\{\{text\}\}/g, text)
    .replace(/\{\{width\}\}/g, width)
    .replace(/\{\{half\}\}/g, width / 2)
    .replace(/\{\{push\}\}/g, width / 2 - 22.5);
}

const template = `<?xml version="1.0"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="{{width}}" height="60" viewBox="0 0 {{width}} 1">
  <title>Hundo</title>
  <style>
    #text {
      font-size: 28px;
      font-family: 'Patrick Hand', sans-serif;
      font-weight: 800;
      fill: #bb1a34;
    }
  </style>

  <g transform="rotate(-10,{{half}},0)">
    <text id="text" x="50%" text-anchor="middle">{{text}}</text>
    
    <g transform="translate({{push}},5)">
      <path id="path34" d="M11.67,15.78a2.5,2.5,0,0,1,0-4.92A103.88,103.88,0,0,1,37.9,10.6a2.51,2.51,0,0,1-.49,5,101,101,0,0,0-24.81.2,2.66,2.66,0,0,1-.89,0" fill="#bb1a34"/>
      <path id="path38" d="M2,6.3a2.5,2.5,0,0,1,0-4.91c.71-.13,17.8-3.13,41.48.11a2.5,2.5,0,0,1-.68,5C20,3.33,3.11,6.28,2.94,6.3A2.32,2.32,0,0,1,2,6.3" fill="#bb1a34"/>
    </g>
  </g>
</svg>`;
