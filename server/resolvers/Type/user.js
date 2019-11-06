const db = require('../../config/db');

module.exports = {
  perfils(user) {
    return db('perfils')
      .join('users_perfils', 'perfils.id', 'users_perfils.perfil_id')
      .where({ user_id: user.id });
  }
};
