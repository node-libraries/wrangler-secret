#!/usr/bin/env node
import path from 'path';
import minimist from 'minimist';
import '@colors/colors';
import { deploySecrets } from '..';

const readPackage = () => {
  try {
    return require(path.resolve(__dirname, '../../package.json'));
  } catch (e) {}
  return require(path.resolve(__dirname, '../package.json'));
};

const main = async () => {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      r: 'remote',
      c: 'config',
      e: 'env',
      l: 'log',
    },
    boolean: ['remote'],
  });

  const envPath = argv._[0];

  if (!envPath) {
    const pkg = readPackage();
    console.log(`${pkg.name} ${pkg.version}\n`.blue);
    console.log('USAGE'.bold);
    console.log(`\t${pkg.name} [options] <env_path>`);
    console.log('ARGUMENTS'.bold);
    console.log(`\t<path> Path to the env file`);
    console.log('OPTIONS'.bold);
    console.log(`\t-c, --config <path> Path to the wrangler config file(Default is wrangler.toml)`);
    console.log(`\t-e, --env <environment> Environment`);
  } else {
    const config = argv.config ?? 'wrangler.toml';
    const environment = argv.env;
    await deploySecrets({ envPath, config, environment });
    process.exit(0);
  }
};

main();
