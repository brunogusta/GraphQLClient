const user = require('./user');
const perfil = require('./perfil');

module.exports = {
  ...user,
  ...perfil
};
