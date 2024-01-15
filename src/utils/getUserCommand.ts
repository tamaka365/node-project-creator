import prompts from 'prompts';
import type { Tcommand, TValue } from 'src/config/default';

const getUserCommand = async (list: Tcommand[]): Promise<TValue> => {
  const choices = list.map(command => {
    return {
      title: command.title,
      description:
        command.description ||
        (typeof command.value === 'string' ? command.value : 'list'),
      value: command,
    };
  });

  const { command } = await prompts({
    type: 'select',
    name: 'command',
    message: 'Select a command',
    choices,
  });

  if (command.type === 'list') {
    return await getUserCommand(command.value);
  }

  return command;
};

export default getUserCommand;
