# Node Project Creator

## Introduction

> English [中文文档](https://github.com/tamaka365/react-mono/blob/main/README.zh-cn.md)

> This document is written in Chinese and translated to English using Google `gemini`.

`npc` is a Node project creation command integration tool that supports creating custom commands.

### Example

```sh
pnpm add node-project-creator -g
npc
```

After this, you can create Node projects by selecting commands in your console.

## Getting Started

### Installation

```sh
# pnpm
pnpm add node-project-creator -g

# yarn
yarn add node-project-creator -g

# npm
npm install node-project-creator -g
```

### Usage

```sh
# run
npc

# get help
npc -h
# or
npc --help

# show version
npc -v
# or
npc --version
```

### Configuration

1.  un `npc -c` or `npc --configdir` to get the location of the custom configuration file.

2.  Create or open the configuration file and edit it.

3.  The configuration file format is roughly as follows:

```json
{
  "commandList": [
    {
      "title": "nextjs app",
      "type": "command",
      "value": "pnpm create next-app@latest",
      "index": 0,
      "override": false
    },
    {
      "title": "cra",
      "type": "repo",
      "value": "https://github.com/facebook/create-react-app.git",
      "index": 0
    },
    {
      "title": "vite app",
      "type": "list",
      "value": [
        {
          "title": "nextjs app",
          "type": "command",
          "value": "pnpm create next-app@latest"
        }
      ]
    }
  ]
}

```

#### Configuration option types

```typescript
interface TBase {
  title: string;
  description?: string;
  index?: number;
  override?: boolean;
}

export interface TValue extends TBase {
  type: 'command' | 'repo';
  value: string;
}

interface Tlist extends TBase {
  type: 'list';
  value: Tcommand[];
}

type Tcommand = TValue | Tlist;

interface TConfig {
  commandList: Tcommand[];
}
```

#### 配置参数说明

| Option        | Type                                | Required | Default     | Description                                                                                                                                                                                                                                                         |
| ------------- | ----------------------------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`                            | `true`   | `undefined` | -                                                                                                                                                                                                                                                                   |
| `description` | `string`                            | `true`   | `undefined` | -                                                                                                                                                                                                                                                                   |
| `index`       | `number`                            | `false`  | `0`         | Display order                                                                                                                                                                                                                                                       |
| `override`    | `boolean`                           | `false`  | `false`     | When set to `false`, it will be inserted at the position specified by `index`. When set to `true`, it will replace the command at the corresponding position. The project may change the default command list when updating, so it is not recommended to overwrite. |
| `type`        | `'command'` \| `'repo'` \| `'list'` | `true`   | `undefined` | -                                                                                                                                                                                                                                                                   |
| `value`       | `string` \| `Tcommand[]`            | `true`   | `undefined` | -                                                                                                                                                                                                                                                                   |
