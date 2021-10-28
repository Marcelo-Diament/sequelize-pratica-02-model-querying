const { User } = require('../models')

const usuariosPlaceholder = require('../data/usuariosPlaceholder.json')

const controller = {
  index: async (req, res, next) => {
    const usuarios = await User.findAll()
    res.render('users', {
      titulo: 'Usuários',
      subtitulo: 'Listagem de Usuários',
      usuarios,
      usuarioLogado: req.cookies.usuario,
      usuarioAdmin: req.cookies.admin,
      bannerTopo: '/images/banner-topo-usuarios-1564x472.png',
      bannerMeio: '/images/banner-meio-usuarios-1920x1080.png'
    });
  },
  show: async (req, res, next) => {
    const { id } = req.params
    const usuario = await User.findOne({ where: { id } })
    if (usuario) {
      res.render('user', {
        titulo: 'Usuário',
        subtitulo: `Usuário #${id}`,
        usuario,
        usuarioLogado: req.cookies.usuario,
        usuarioAdmin: req.cookies.admin,
        bannerTopo: '/images/banner-topo-usuario-1564x472.png',
        bannerMeio: '/images/banner-meio-usuario-1920x1080.png'
      })
    } else {
      res.status(500).send(`Ops, houve algum erro ao buscar pelo usuário de id ${id}`)
    }
  },
  list: async (req, res, next) => {
    const usuarios = await User.findAll()
    let admin = req.cookies.admin
    if (!admin || admin === 'false') {
      res.render('users', {
        titulo: 'Ops!',
        subtitulo: 'Você não pode gerenciar usuários, apenas visualizá-los.',
        usuarios,
        usuarioLogado: req.cookies.usuario,
        usuarioAdmin: admin,
        bannerTopo: '/images/banner-topo-usuarios-1564x472.png',
        bannerMeio: '/images/banner-meio-usuarios-1920x1080.png'
      });
    } else {
      res.render('usersList', {
        titulo: 'Usuários',
        subtitulo: 'Listagem de Usuários',
        usuarios,
        usuarioLogado: req.cookies.usuario,
        usuarioAdmin: admin
      });
    }
  }
}

module.exports = controller
