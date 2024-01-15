import fs from 'node:fs';
import defaultConfig, { type Tcommand } from 'src/config/default';
import { loadFileSync } from './index';

type Typecommand = Tcommand & {
  index?: number;
  override?: boolean;
};

interface TConfig {
  commandList: Typecommand[];
}

export default async function () {
  const NPC_HOME = `${process.env.HOME}/.npc-cli`;

  if (fs.existsSync(NPC_HOME)) {
    const { commandList } = (await loadFileSync(
      `${NPC_HOME}/config.json`
    )) as TConfig;
    if (commandList) {
      const newCommandList = [...defaultConfig.commandList];
      commandList.forEach(command => {
        if (command.index === undefined) {
          newCommandList.push(command);
        } else {
          if (command.override) {
            newCommandList[command.index] = command;
          } else {
            newCommandList.splice(command.index, 0, command);
          }
        }
      });

      newCommandList.filter(command => !!command);
      defaultConfig.commandList = newCommandList;
    }
  } else {
    fs.mkdirSync(NPC_HOME);
    fs.writeFileSync(`${NPC_HOME}/config.json`, '{commandList: []}');
  }

  return defaultConfig;
}
