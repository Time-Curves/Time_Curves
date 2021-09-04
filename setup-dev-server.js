const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const CCJS = require('./src/utils/CC.js');
const { pipeline } = require('stream');

//const
const VUE_CLI_WEBPACK_CONFIG_PATH = path.resolve(path.join('node_modules', '@vue', 'cli-service', 'webpack.config.js'));

/**
 * returns vue-cli-service generated ssr or client webpack config
 * @param { boolean } SSR - is ssr config?
 * @returns { object } webpack config
 */
const getWebpackConfig = (SSR = false) => {
  if (SSR) process.env.SSR = 1;
  else delete process.env.SSR;
  delete require.cache[require.resolve(VUE_CLI_WEBPACK_CONFIG_PATH)];
  return require(VUE_CLI_WEBPACK_CONFIG_PATH);
};


/**
 * copy file
 * @param { string } file - absolute path to source file
 * @param { string } target - absolute path to target file ot dir
 * @param { fs } _fs - file system
 * @returns { Promise.<null|Error> }
 */
const copyFile = (file, target, _fs = fs) => new Promise((resolve, reject) => {
  if (!path.isAbsolute(file) || !path.isAbsolute(target)) {
    reject(new Error('path has to be absolute'));
  }
  let targetFile = target;
  if (_fs.existsSync(target)) {
    if (_fs.statSync(target).isDirectory()) {
      targetFile = path.resolve(target, file);
    }
  }
  pipeline(
    _fs.createReadStream(file),
    fs.createWriteStream(targetFile),
    (err) => {
      if (err) {
        console.log(`${CCJS.redF('Error on file')}: ${file + CCJS.redF(' >>> ') + targetFile}`);
        reject(err);
      }
      console.log(`${CCJS.greenF('Coped file')}: ${file + CCJS.greenF(' >>> ') + targetFile}`);
      resolve();
    }
  );
});


/**
 * parallel directory copy to some fs
 * @param { string } source - path to source
 * @param { string } target - path to target
 * @param { object } [options] - copy options
 * @param { fs } [options.fs=fs] - file system to work with
 * @param { (RegExp|false) } [options.ignore=false] - regExp to filter coped files
 * @returns { Promise.<null|Error> } resolves when file transfer is ready
 */
const copyDir = async (source, target, options) => new Promise((resolve, reject) => {
  const defaultOptions = {
    fs: require('fs'),
    ignore: false,
  };

  const _options = { ...defaultOptions, ...options };
  const { fs: _fs, ignore } = _options;

  let files = _fs.readdirSync(source, 'utf-8');
  for (const _relativePath of files) {
    const fullPath = path.resolve(path.join(source, _relativePath));
    if (_fs.statSync(fullPath).isDirectory()) {
      const index = files.indexOf(_relativePath);
      files.splice(index, 1);
      files = files.concat(_fs.readdirSync(fullPath)
        .map((baseName) => path.join(_relativePath, baseName)));
    }
  }
  files = files.map((fileName) => path.join(source, fileName));

  if (ignore) {
    files = files.filter((fileName) => !ignore.test(fileName));
  }

  const _copyFile = ((arg) => (file, target) => copyFile(file, target, arg))(_fs);
  Promise.all(files.map((file) => _copyFile(file, target)))
    .then(() => {
      resolve();
    }, (err) => {
      reject(err);
    });
});

//webpack configs for server & client

const clientConfig = getWebpackConfig();
const serverConfig = getWebpackConfig(true);

//fix import cache clearing problem with vue js config | see more: https://github.com/nodejs/modules/issues/307
serverConfig.output.path = path.join(serverConfig.output.path, 'server');
clientConfig.output.path = path.join(clientConfig.output.path, 'client');

//ram fs
const mfs = new MFS();

//clientCompiler
const clientCompiler = webpack(clientConfig);
clientCompiler.outputFileSystem = mfs;

//serverCompiler
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;

/**
 * setup compilers hooks and file watchers
 * @param { object } options - func options
 * @param { string } options.templatePath - path to html template
 * @param { string } options.pathToClientBundle - path to webpack generated client dir
 * @param { boolean } options.compileToFs - save compiled files to real fs if true
 * @param { (RegExp|false) } options.ignore - regExp to filter saved files (compileToFs option)
 */
const setHooks = (options) => {
  const { templatePath, compileToFs } = options;
  const copyOptions = {
    'fs': mfs,
    ignore: options.ignore,
  };

  // read template from disk and watch
  let template = fs.readFileSync(templatePath, 'utf-8');
  fs.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');
    mfs.writeFileSync(templatePath, template, 'utf-8');
  });

  // set clientCompiler done BuildStatsPlugin hook
  clientCompiler.hooks.done.tap('BuildStatsPlugin', async (stats) => {
    stats = stats.toJson();
    stats.errors.forEach((err) => console.error(err));
    stats.warnings.forEach((err) => console.warn(err));
    if (stats.errors.length) return;
    const ccop = clientConfig.output.path;
    if (compileToFs) await copyDir(ccop, ccop, copyOptions);
  });

  // watch and update server renderer
  serverCompiler.watch({}, async (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    if (stats.errors.length) return;
    const scop = serverConfig.output.path;
    if (compileToFs) await copyDir(scop, scop, copyOptions);
  });

};

/**
 * it creates dev middleware function
 * @returns { async } return async middleware function
 */
const getMiddleware = () => {
  // dev middleware
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
    index: false,
    serverSideRender: true,
  });
  // hot middleware
  const hotMiddleware = require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 });
  return async (req, res, next) => {
    await devMiddleware(req, res, async () => {
      await hotMiddleware(req, res, async () => {
        await next(req, res);
      });
    });
  };
};


module.exports = {
  setHooks,
  getMiddleware,
};
