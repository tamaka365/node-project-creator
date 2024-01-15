import fs from 'node:fs';
import { loadFileSync } from '.';

export default async function (projectName: string) {
  const packageJson = await loadFileSync(
    `${process.env.PWD}/${projectName}/package.json`
  );

  packageJson.name = projectName;
  packageJson.version = '1.0.0';

  fs.writeFileSync(
    `${process.env.PWD}/${projectName}/package.json`,
    JSON.stringify(packageJson, null, 2)
  );
}
