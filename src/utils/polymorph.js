function polymorph(...args) {
  const config = {};
  let types = null;
  for (let i = 0; i < args.length; i++) {
    console.log(typeof(args[i]));
    if (Array.isArray(args[i])) {
      types = args[i];
    } else if (typeof(args[i]) === 'function') {
      console.log(config);
      if (!config[args[i].length]) config[args[i].length] = [];
      config[args[i].length].push({ func: args[i] });
      if (types) {
        const overloadsCount = config[args[i].length].length;
        config[args[i].length][overloadsCount - 1].types = types;
      }
      types = null;
    }
  }

  console.log(config);
  return (...args) => {
    const overloads = config[args.length];
    if (!overloads) return false;
    for (const overload of overloads) {
      let match = true;
      if (!overload.types) return overload.func.apply(this, args);
      for (let i = 0; i < args.length; i++) {
        if (typeof(args[i]) !== overload.types[i]) match = false;
      }
      if (match) {
        return overload.func.apply(this, args);
      } else {
        return false;
      }
    }
  };
}

const p = polymorph(
  ['string', 'string'],
  (arg1, arg2) => ({ arg1, arg2 }),

  (config) => config
);

console.log(p('bad 2 args', 1));
console.log(p('good 2 args', 'arg2'));
console.log(p('one arg'));

module.exports = {
  polymorph,
};
