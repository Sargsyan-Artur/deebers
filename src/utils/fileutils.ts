import * as fs from 'fs';
import { addLog } from './commands';
import * as path from 'path';

export const parseJsonFile = (datapath: string) => {
  const data = fs.readFileSync(datapath, 'utf-8');
  return JSON.parse(data);
};

export const deleteDirectory = (path: string) => {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path, { recursive: true });
    addLog(`Directory Deleted: ${path}`);
  }
};

export const deleteFilesInDirectory = (directory: string) => {
  if (fs.existsSync(directory)) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  }
};

export const saveScreenshotOnFailures = async (step: any, scenario: any, result: any) => {
  const stepTitle = `${scenario.name}_${step.text}_${Date.now()}`.split(' ').join('_');
  if (!result.passed) {
    await browser.saveScreenshot(`./test/tmp/screenshots/${stepTitle}.png`);
  }
};

export const createDir = (dirPath: string) => {
  fs.mkdir(path.join(__dirname, `..//..//${dirPath}`), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Tmp directory created successfully!');
  });
};

export const printFilesFromDir = (dirPath: string) => {
  let count = 0;
  fs.readdirSync(dirPath).forEach(file => {
    count++;
    console.log('File: ' + file);
  });
  console.log('Final amount of files: ' + count);
};
