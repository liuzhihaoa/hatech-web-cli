const chalk = require('chalk');

const error = (message) => {
  console.error(chalk.red(message));
}

const log = (message) => {
  console.log(chalk.green(message));
};

const success = (message) => {
  console.log(chalk.white.bgGreen.bold(message));
};

const warning = message => {
  console.log(chalk.yellow.bold(message))
}

module.exports = {
  log,
  success,
  warning,
  error,
};
