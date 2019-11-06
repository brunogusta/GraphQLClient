const db = require('./db');
const { getLogedUser } = require('../resolvers/comum/user');

const sql = `
    select
        u.*
    from
        users u,
        users_perfils up,
        perfils p
    where
        up.user_id = u.id and
        up.perfil_id = p.id and
        u.active = 1 and
        p.name = :namePerfil
    limit 1
`;

const getUser = async namePerfil => {
  const res = await db.raw(sql, { namePerfil });
  return res ? res[0][0] : null;
};

module.exports = async req => {
  const user = await getUser('admin');
  if (user) {
    const { token } = await getLogedUser(user);
    req.headers = {
      authorization: `Bearer ${token}`
    };
  }
};
