import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default (pathName: string) =>
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), pathName);
