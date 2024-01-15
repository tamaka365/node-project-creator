import fs from 'node:fs';

export default async (filePath: string, fileType: string = 'json') => {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return fileType === 'json' ? JSON.parse(fileContent) : fileContent;
};
