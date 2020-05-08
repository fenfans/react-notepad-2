import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import * as fs from 'fs';

import db from './db';
import router from './router';
import config from './config';
import error from './middleware/error';
import commonConfig from '../common/config';

const defaultConfig = {
  allowSync: false
};

// check config folder
if (!fs.existsSync(config.configFolder)) {
  console.log('config folder created!')
  const result = fs.mkdirSync(config.configFolder);
};

// check config file
if (!fs.existsSync(config.configFile)) {
  fs.writeFileSync(config.configFile, JSON.stringify(defaultConfig));
}

const serverConfig = JSON.parse(fs.readFileSync(config.configFile, 'utf8'));
const previousDbVersion = serverConfig.dbVersion;

const app = new Koa();

app.context.db = db;

app.use(cors({
  // origin: '*',
  keepHeadersOnError: true,
  credentials: true
}));

app.use(error);

app.use(bodyParser());


app.use(router.routes());

export default {
  _server: null,

  start(port, callback) {
    // create folder for db
    if (!fs.existsSync(config.dbFileFolder)) {
      console.log('db folder created!')
      fs.mkdirSync(config.dbFileFolder);
    };

    if (!fs.existsSync(config.uploadFolder)) {
      console.log('upload folder created!')
      fs.mkdirSync(config.uploadFolder);
    };
    
    let dbSyncOption = {
    }
    if (previousDbVersion && previousDbVersion < commonConfig.dbVersion) {
      dbSyncOption = {
        ...dbSyncOption,
        // only add extra columns to make the alter operation safe.
        alter: true
      }
    }
    console.log('start sync db');
    db.sequelize.sync(dbSyncOption).then(() => {
      serverConfig.dbVersion = commonConfig.dbVersion;
      fs.writeFileSync(config.configFile, JSON.stringify(serverConfig));
      this._server = app.listen(port, callback);
    });
  },

  stop() {
    this._server.close();
  }
}
