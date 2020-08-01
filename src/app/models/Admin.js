import Sequelize, { Model } from 'sequelize';
import bcript from 'bcryptjs';

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcript.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcript.compare(password, this.password_hash);
  }
}

export default Admin;
