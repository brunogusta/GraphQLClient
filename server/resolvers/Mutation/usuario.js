const bcrypt = require('bcrypt-nodejs');
const db = require('../../config/db');
const { getUsuarioLogado } = require('../comum/usuario');
const { perfil: obterPerfil } = require('../Query/perfil');
const { usuario: obterUsuario } = require('../Query/usuario');

const mutations = {
  async login(_, { dados }) {
    const usuario = await db('usuarios')
      .where({ email: dados.email })
      .first();

    if (!usuario) {
      throw new Error('Usuário/Senha inválido');
    }

    const saoIguais = bcrypt.compareSync(dados.senha, usuario.senha);

    if (!saoIguais) {
      throw new Error('Usuário/Senha inválido');
    }

    return getUsuarioLogado(usuario);
  },
  async registrarUsuario(_, { dados }) {
    const email = await db('usuarios')
      .where({ email: dados.email })
      .first();

    const name = await db('usuarios')
      .where({ nome: dados.nome })
      .first();

    if (email) throw new Error('The entered email already exists.');
    if (name) throw new Error('The entered name already exists.');

    return mutations.novoUsuario(_, {
      dados: {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha
      }
    });
  },
  async novoUsuario(_, { dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const idsPerfis = [];

      if (!dados.perfis || !dados.perfis.length) {
        dados.perfis = [
          {
            nome: 'Comum'
          }
        ];
      }

      for (let filtro of dados.perfis) {
        const perfil = await obterPerfil(_, {
          filtro
        });
        if (perfil) idsPerfis.push(perfil.id);
      }

      // criptografar a senha
      const salt = bcrypt.genSaltSync();
      dados.senha = bcrypt.hashSync(dados.senha, salt);

      delete dados.perfis;
      const [id] = await db('usuarios').insert(dados);

      for (let perfil_id of idsPerfis) {
        await db('usuarios_perfis').insert({ perfil_id, usuario_id: id });
      }

      return db('usuarios')
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async excluirUsuario(_, args, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const usuario = await obterUsuario(_, args);
      if (usuario) {
        const { id } = usuario;
        await db('usuarios_perfis')
          .where({ usuario_id: id })
          .delete();
        await db('usuarios')
          .where({ id })
          .delete();
      }
      return usuario;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async alterarUsuario(_, { filtro, dados }, ctx) {
    ctx && ctx.validarUsuarioFiltro(filtro);
    try {
      const usuario = await obterUsuario(_, { filtro });
      if (usuario) {
        const { id } = usuario;
        if (ctx.admin && dados.perfis) {
          await db('usuarios_perfis')
            .where({ usuario_id: id })
            .delete();

          for (let filtro of dados.perfis) {
            const perfil = await obterPerfil(_, {
              filtro
            });

            if (perfil) {
              await db('usuarios_perfis').insert({
                perfil_id: perfil.id,
                usuario_id: id
              });
            }
          }
        }

        if (dados.senha) {
          // criptografar a senha
          const salt = bcrypt.genSaltSync();
          dados.senha = bcrypt.hashSync(dados.senha, salt);
        }

        delete dados.perfis;
        await db('usuarios')
          .where({ id })
          .update(dados);
      }
      return !usuario ? null : { ...usuario, ...dados };
    } catch (e) {
      throw new Error(e);
    }
  }
};

module.exports = mutations;
