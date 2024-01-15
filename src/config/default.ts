interface TBase {
  title: string;
  description?: string;
}

interface Tlist extends TBase {
  type: 'list';
  value: Tcommand[];
}

export interface TValue extends TBase {
  type: 'command' | 'repo';
  value: string;
}

export type Tcommand = Tlist | TValue;

export interface TConfig {
  commandList: Tcommand[];
}

const config: TConfig = {
  commandList: [
    {
      title: 'nextjs app',
      type: 'command',
      value: 'pnpm create next-app@latest',
    },
    {
      title: 'vite app',
      type: 'command',
      value: 'pnpm create vite@latest',
    },
    {
      title: 'cra',
      type: 'command',
      value: 'pnpm create react-app@latest',
    },
  ],
};

export default config;
