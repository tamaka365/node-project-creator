import fs from 'node:fs';
import prompts from 'prompts';
import spawn from 'cross-spawn';
import { red, bgRed } from 'kolorist';
import {
  getUserCommand,
  loadConfig,
  fixPackageJson,
  handleArgs,
} from './utils';

const errorConsole = console.error;
console.error = (...messages: string[]) =>
  errorConsole(bgRed(' ERROR '), ...messages.map(mseeage => red(mseeage)));

async function init() {
  await handleArgs();
  const { commandList } = await loadConfig();
  const { type: commandType, value } = await getUserCommand(commandList);

  const IS_REPO = commandType === 'repo';

  let command = '';
  let args = [''];
  let projectName = '';

  if (commandType === 'command') {
    [command, ...args] = value.split(' ');
  } else if (IS_REPO) {
    projectName = (
      await prompts([
        {
          type: 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: 'my-app',
        },
      ])
    ).projectName;

    if (fs.existsSync(projectName)) {
      console.error(`Target directory "my-app" already exists`);
      process.exit(0);
    }

    command = 'git';
    args = ['clone', value, projectName];
  } else {
    process.exit(0);
  }

  const { status } = spawn.sync(command, args, { stdio: 'inherit' });

  if (IS_REPO) {
    await fixPackageJson(projectName);
  }

  process.exit(status ?? 0);
}

init().catch(e => {
  console.error(e);
});
