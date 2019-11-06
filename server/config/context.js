const jwt = require('jwt-simple');

module.exports = async ({ req }) => {
  // Em desenvolvimento
  //await require('./userLogedSimulate')(req);

  const auth = req.headers.authorization;
  const token = auth && auth.substring(7);

  let user = null;
  let admin = false;

  if (token) {
    try {
      let tokenContent = jwt.decode(token, process.env.APP_AUTH_SECRET);
      if (new Date(tokenContent.exp * 1000) > new Date()) {
        user = tokenContent;
      }
    } catch (e) {
      console.log(e);
      // token inválido
    }
  }

  if (user && user.perfils) {
    admin = user.perfils.includes('admin');
  }

  const err = new Error('User is not an administrator.');
  const userErr = new Error('Comum user cannot search other users');
  const noUserErr = new Error('You must be logged in to perform the search.');
  console.log(user);
  return {
    user,
    admin,
    userValidate() {
      if (!user) throw noUserErr;
    },
    adminValidate() {
      if (!admin) throw err;
    },
    userFilterValidate(filtro) {
      if (admin) return;

      if (!user) throw noUserErr;
      if (!filtro) throw userErr;

      const { id, email } = filtro;
      if (!id && !email) throw userErr;
      if (id && id !== user.id) throw userErr;
      if (email && email !== user.email) throw userErr;
    }
  };
};
