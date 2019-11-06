const jwt = require('jwt-simple');
const { perfils: getPerfils } = require('../Type/user');

module.exports = {
  async getLogedUser(user) {
    const perfils = await getPerfils(user);
    const now = Math.floor(Date.now() / 1000);

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      perfils: perfils.map(p => p.name),
      iat: now,
      exp: now + 3 * 24 * 60 * 60
    };

    return {
      ...userInfo,
      token: jwt.encode(userInfo, process.env.APP_AUTH_SECRET)
    };
  }
};
