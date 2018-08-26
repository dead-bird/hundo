'use strict';

const Clapp = require('clapp');
const help = 'run `-hundo text` or `-hundo "your text"`';

class App extends Clapp.App {
  constructor(options) {
    super(options);
  }

  _getHelp() {
    return help;
  }
}

class Command extends Clapp.Command {
  constructor(options) {
    super(options);
  }

  _getHelp() {
    return help;
  }
}

module.exports = {
  App: App,
  Argument: Clapp.Argument,
  Command: Command,
  Flag: Clapp.Flag,
};
