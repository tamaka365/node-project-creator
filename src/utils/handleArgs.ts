import minimist from 'minimist';
import { loadFileSync } from '.';

export default async function () {
  const helpText = `Version 8.14.1
Usage: npc
       npc [ -h | --help | -v | --version | -c | --configdir ]

Options:
  -h, --help               Show help information
  -v, --version            Show package version
  -c, --configdir          Show config file dir.
`;

  const argv = minimist(process.argv.slice(2));
  const { h, help, v, version, c, configdir, ...args } = argv;
  if (h || help || args.length) {
    console.log(helpText);
  }

  if (v || version) {
    const packageJson = await loadFileSync('./package.json');
    console.log(packageJson.version);
  }

  if (c || configdir) {
    const NPC_HOME = `${process.env.HOME}/.npc-cli`;
    console.log(`${NPC_HOME}/config.json`);
  }

  if (Object.keys(argv).length > 1) {
    process.exit(0);
  }
}
