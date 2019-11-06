const db = require('../../config/db');
const { perfil: getPerfil } = require('../Query/perfil');

module.exports = {
  async newPerfil(_, { data }, ctx) {
    ctx && ctx.adminValidate();

    try {
      const [id] = await db('perfils').insert(data);
      return db('perfils')
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async removePerfil(_, args, ctx) {
    ctx && ctx.adminValidate();

    try {
      const perfil = await getPerfil(_, args);
      if (perfil) {
        const { id } = perfil;
        await db('users_perfils')
          .where({ perfils_id: id })
          .delete();
        await db('perfils')
          .where({ id })
          .delete();
      }
      return perfil;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async updatePerfil(_, { filter, data }, ctx) {
    ctx && ctx.adminValidate();
    try {
      const perfil = await getPerfil(_, { filter });
      if (perfil) {
        const { id } = perfil;
        await db('perfils')
          .where({ id })
          .update(data);
      }
      return { ...perfil, ...data };
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  }
};
