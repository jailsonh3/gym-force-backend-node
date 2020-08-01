import Sequelize from 'sequelize';

import User from '../app/models/User';
import Admin from '../app/models/Admin';

import databaseConfig from '../config/database';

const models = [Admin, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
