import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.DOUBLE,
        altura: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default User;
