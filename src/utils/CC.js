
//effects escape codes
const modifiers = {
  technical: {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
  },
  fg: {
    blackF: '\x1b[30m',
    redF: '\x1b[31m',
    greenF: '\x1b[32m',
    yellowF: '\x1b[33m',
    blueF: '\x1b[34m',
    magentaF: '\x1b[35m',
    cyanF: '\x1b[36m',
    whiteF: '\x1b[37m',
  },
  bg: {
    blackB: '\x1b[40m',
    redB: '\x1b[41m',
    greenB: '\x1b[42m',
    yellowB: '\x1b[43m',
    blueB: '\x1b[44m',
    magentaB: '\x1b[45m',
    cyanB: '\x1b[46m',
    whiteB: '\x1b[47m',
  }
};

const _apply = (color, str) => `${color}${str}${modifiers.technical.reset}`;

const groups = Object.keys(modifiers);
for (const group of groups) {
  const groupKeys = Object.keys(modifiers[group]);
  for (const modifier of groupKeys) {
    module.exports[modifier] = (str) => _apply(modifiers[group][modifier], str);
  }
}

