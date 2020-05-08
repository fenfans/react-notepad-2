import * as path from 'path';

const isDevMode = process.env.MAIN_MODE === 'dev';

const appFolder = path.resolve(__dirname, '../../');
const configFolder = path.resolve(appFolder, './zhuomuniao_data/');

export default {
  isDevMode: isDevMode,
  appFolder: appFolder,
  configFolder: configFolder,
  configFile: path.resolve(configFolder, './config.json'),
  dbFileFolder: path.resolve(configFolder, './db/'),
  dbFilePath: path.resolve(configFolder, './db/database'),
  // exportFolder: path.resolve(configFolder, './export/'),
  uploadFolder: path.resolve(configFolder, './upload/'),

  modelFolderPath: path.resolve(__dirname, './db/model'),
  serverPort: 3007,
};