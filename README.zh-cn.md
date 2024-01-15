# Node Project Creator

## 介绍

> 中文文档 [English](https://github.com/tamaka365/react-mono/blob/main/README.md)

`npc` 是一个支持创建自定义命令的， Node 项目创建命令集成工具.

### 示例

```sh
pnpm add node-project-creator -g
npc
```

之后你就可以在你的控制台通过选择命令来创建 Node 项目了

## 开始使用

### 安装方式

```sh
# pnpm
pnpm add node-project-creator -g

# yarn
yarn add node-project-creator -g

# npm
npm install node-project-creator -g
```

### 用法

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

### 配置

1.  执行 `npc -c` 或 `npc --configdir` 获取自定义配置文件位置
2.  创建/打开配置文件并编辑

3.  配置文件格式大致如下：

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

#### 配置选项类型

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

| 参数          | 类型                                | 是否必填 | 默认值      | 说明                                                                                                                                   |
| ------------- | ----------------------------------- | -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`                            | `true`   | `undefined` | -                                                                                                                                      |
| `description` | `string`                            | `true`   | `undefined` | -                                                                                                                                      |
| `index`       | `number`                            | `false`  | `0`         | 显示顺序                                                                                                                               |
| `override`    | `boolean`                           | `false`  | `false`     | 当设置为 `false` 时会插入到 `index` 指定的位置，设置为 `true` 时会替换对应位置的命令，项目更新时可能会更改默认命令列表，因此不建议覆盖 |
| `type`        | `'command'` \| `'repo'` \| `'list'` | `true`   | `undefined` | -                                                                                                                                      |
| `value`       | `string` \| `Tcommand[]`            | `true`   | `undefined` | -                                                                                                                                      |
