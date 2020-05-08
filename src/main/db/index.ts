import * as Sequelize from 'sequelize';
import * as path from 'path';
import * as fs from 'fs';
import config from '../config';

const sequelize = new Sequelize('database', 'admin', 'none', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // SQLite only
  storage: config.dbFilePath
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize
};

fs.readdirSync(config.modelFolderPath)
.filter((file) => {
	return (file.indexOf('.') !== 0 && file.indexOf('.map') === -1);
})
.forEach((file) => {
  const model = sequelize.import(path.resolve(config.modelFolderPath, `./${file}`));
  console.log(`dbname:` + model.name);
	db[model.name] = model;
});

Object.keys(sequelize.models).forEach(function(modelName) {
  if ("associate" in sequelize.models[modelName]) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});


export default db;