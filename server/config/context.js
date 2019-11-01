const jwt = require('jwt-simple');

module.exports = async ({ req }) => {
  // Em desenvolvimento
  // await require('./simularUsuarioLogado')(req);

  const auth = req.headers.authorization;
  const token = auth && auth.substring(7);

  let usuario = null;
  let admin = false;

  if (token) {
    try {
      let conteudoToken = jwt.decode(token, process.env.APP_AUTH_SECRET);
      if (new Date(conteudoToken.exp * 1000) > new Date()) {
        usuario = conteudoToken;
      }
    } catch (e) {
      console.log(e);
      // token inválido
    }
  }

  if (usuario && usuario.perfis) {
    admin = usuario.perfis.includes('admin');
  }

  const err = new Error('User is not an administrator.');
  const userErr = new Error('Comum user cannot search other users');
  const noUserErr = new Error('You must be logged in to perform the search.');

  return {
    usuario,
    admin,
    validarUsuario() {
      if (!usuario) throw noUserErr;
    },
    validarAdmin() {
      if (!admin) throw err;
    },
    validarUsuarioFiltro(filtro) {
      if (admin) return;

      if (!usuario) throw noUserErr;
      if (!filtro) throw userErr;

      const { id, email } = filtro;
      if (!id && !email) throw userErr;
      if (id && id !== usuario.id) throw userErr;
      if (email && email !== usuario.email) throw userErr;
    }
  };
};
