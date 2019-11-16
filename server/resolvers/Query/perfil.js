const db = require('../../config/db');

module.exports = {
  perfils(parent, args, ctx) {
    ctx && ctx.adminValidate();
    return db('perfils');
  },
  perfil(_, { filter }, ctx) {
    ctx && ctx.adminValidate();

    if (!filter) return null;
    const { id, name } = filter;
    if (id) {
      return db('perfils')
        .where({ user_id: id })
        .first();
    } else if (name) {
      return db('perfils')
        .where({ name })
        .first();
    } else {
      return null;
    }
  }
};
