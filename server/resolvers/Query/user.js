const db = require('../../config/db');

module.exports = {
  users(parent, args, ctx) {
    if (!ctx.user) {
      ctx.userValidate();
    }

    ctx && ctx.adminValidate();

    return db('users');
  },
  async user(_, { filter }, ctx) {
    ctx && ctx.userFilterValidate(filter);

    if (!filter) return null;
    const { id, email } = filter;
    if (id) {
      const user = await db('users')
        .where({ id })
        .first();
      return user;
    } else if (email) {
      const user = await db('users')
        .where({ email })
        .first();
      return user;
    } else {
      return null;
    }
  }
};
