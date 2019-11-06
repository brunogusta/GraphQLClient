const db = require('../../config/db');

module.exports = {
  users(perfil) {
    return db('users')
      .join('users_perfils', 'users.id', 'users_perfils.user_id')
      .where({ perfil_id: perfil.id });
  }
};
