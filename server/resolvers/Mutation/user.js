const bcrypt = require('bcrypt-nodejs');
const db = require('../../config/db');
const { getLogedUser } = require('../comum/user');
const { perfil: getPerfil } = require('../Query/perfil');
const { user: getUser } = require('../Query/user');

const mutations = {
  async login(_, { data }) {
    const user = await db('users')
      .where({ email: data.email })
      .first();

    if (!user) {
      throw new Error('User/Password invalid');
    }

    const equals = bcrypt.compareSync(data.password, user.password);

    if (!equals) {
      throw new Error('User/Password invalid');
    }

    return getLogedUser(user);
  },
  async registerUser(_, { data }) {
    const email = await db('users')
      .where({ email: data.email })
      .first();

    const name = await db('users')
      .where({ name: data.name })
      .first();

    if (email) throw new Error('The entered email already exists.');
    if (name) throw new Error('The entered name already exists.');

    return mutations.newUser(_, {
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
  },
  async newUser(_, { data }, ctx) {
    ctx && ctx.adminValidate();
    try {
      const perfilsId = [];

      if (!data.perfils || !data.perfils.length) {
        data.perfils = [
          {
            name: 'Comum'
          }
        ];
      }

      for (let filter of data.perfils) {
        const perfil = await getPerfil(_, {
          filter
        });
        if (perfil) perfilsId.push(perfil.id);
      }

      const salt = bcrypt.genSaltSync();
      data.password = bcrypt.hashSync(data.password, salt);

      delete data.perfils;

      const [id] = await db('users').insert(data);

      for (let perfil_id of perfilsId) {
        await db('users_perfils').insert({ perfil_id, user_id: id });
      }

      return db('users')
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async removeUser(_, args, ctx) {
    if (!ctx.user) {
      ctx.userValidate();
    }

    ctx && ctx.adminValidate();
    try {
      const user = await getUser(_, args);
      if (user) {
        const { id } = user;
        await db('users_perfils')
          .where({ user_id: id })
          .delete();
        await db('users')
          .where({ id })
          .delete();
      }
      return user;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async updateUser(_, { filter, data }, ctx) {
    ctx && ctx.userFilterValidate(filter);
    try {
      const users = await db('users');
      const removedCurrentlyUser = users.find(
        user => JSON.stringify(user.email) === JSON.stringify(data.email)
      );

      if (removedCurrentlyUser) throw new Error('The email already exists');

      const user = await getUser(_, { filter });
      console.log(user);
      if (user) {
        const { id } = user;
        if (ctx.admin && data.perfils) {
          await db('users_perfils')
            .where({ user_id: id })
            .delete();

          for (let filter of data.perfils) {
            const perfil = await getPerfil(_, {
              filter
            });

            if (perfil) {
              await db('users_perfils').insert({
                perfil_id: perfil.id,
                user_id: id
              });
            }
          }
        }

        if (data.password) {
          // criptografar a password
          const salt = bcrypt.genSaltSync();
          data.password = bcrypt.hashSync(data.password, salt);
        }

        delete data.perfils;
        await db('users')
          .where({ id })
          .update(data);
      }
      return !user ? null : { ...user, ...data };
    } catch (e) {
      throw new Error(e);
    }
  }
};

module.exports = mutations;
