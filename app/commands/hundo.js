const Clapp = require('../modules/clapp-discord');
const convert = require('svg2png');
const fs = require('pn/fs');

module.exports = new Clapp.Command({
  name: 'hundo',
  desc: '💯ify your text',
  fn: (argv, context) =>
    new Promise((resolve, reject) => {
      const file = `./data/${new Date().toJSON()}.png`;

      convert(Buffer.from(svg(argv.args.text)))
        .then(buffer => fs.writeFile(file, buffer).then(resolve(file)))
        .catch(err => console.error(err));
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

function svg(text) {
  let string = '';
  let width = -5;

  const tags = text.split('').map(t => {
    width = width + 15;

    return t;
    // return `<span>${t}</span>`;
  });

  tags.forEach(tag => {
    string += tag;
  });

  return template
    .replace(/\{\{text\}\}/g, string)
    .replace(/\{\{width\}\}/g, width);
}

const template = `<?xml version="1.0"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="{{width}}" height="40" viewBox="0 0 {{width}} 1">
  <title>Hundo</title>
  <style>
    #text {
      font-size: 20px;
      font-family: sans-serif;
      font-weight: 600;
      fill: #bb1a34;
      font-style: italic;
    }
  </style>

  <g id="hundo" data-name="hundo">
    <g><text id="text">{{text}}</text></g>

    <g class="under">
      <path id="path34" d="M13.75,20a2.5,2.5,0,0,1-.88-4.84A103.67,103.67,0,0,1,38.54,10,2.5,2.5,0,0,1,39,15a100.9,100.9,0,0,0-24.33,4.85,2.48,2.48,0,0,1-.88.16" fill="#bb1a34"/>
      <path id="path38" d="M2.5,12.5a2.5,2.5,0,0,1-.9-4.83C2.28,7.41,18.5,1.26,42.37,0a2.5,2.5,0,0,1,.26,5C19.6,6.21,3.56,12.27,3.4,12.33a2.39,2.39,0,0,1-.9.17" fill="#bb1a34"/>
    </g>
  </g>
</svg>`;
