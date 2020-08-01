const bcript = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'admins',
      [
        {
          name: 'Administrador',
          email: 'admin@gymforce.com',
          password_hash: await bcript.hash('1234567', 8),
          provider: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('admins', null, {});
  },
};
