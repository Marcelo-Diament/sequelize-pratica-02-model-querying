const { User } = require('../models')
const fs = require('fs'),
  path = require('path')

const controller = {
  register: (req, res, next) => {
    res.render('register', {
      titulo: 'Cadastro',
      subtitulo: req.cookies.usuario ? 'Verifique o formulário e atualize os dados desejados.' : 'Preencha os dados e complete seu cadastro!',
      usuarioLogado: req.cookies.usuario,
      usuarioAdmin: req.cookies.admin
    });
  },
  add: async (req, res, next) => {
    let {
      nome,
      sobrenome,
      apelido,
      nascimento,
      senha,
      corPreferida,
      avatar,
      email,
      telefone,
      bio
    } = req.body
    telefone = telefone.replace(/\D/g, '')
    const plano_id = 1
    const papel_id = email.indexOf('@diament.com.br') > 0 ? 1 : 2
    const criadoEm = new Date()
    const modificadoEm = new Date()
    const user = await User.create({
      nome,
      sobrenome,
      apelido,
      nascimento,
      senha,
      corPreferida,
      avatar,
      email,
      telefone,
      bio,
      plano_id,
      papel_id,
      criadoEm,
      modificadoEm
    })
    if (user) {
      res.redirect('../../usuarios')
    } else {
      res.status(500).send('Ops... Algo de errado não deu certo!')
    }
  },
  login: (req, res, next) => {
    res.render('login', {
      titulo: 'Login',
      subtitulo: 'Preencha os dados e acesse seu perfil!',
      usuarioLogado: req.cookies.usuario,
      usuarioAdmin: req.cookies.admin
    });
  },
  auth: (req, res, next) => {
    res.redirect('../')
  },
  lostPass: (req, res, next) => {
    res.render('lostPassword', {
      titulo: 'Recuperação de Senha',
      subtitulo: 'Preencha os dados e recupere sua senha!',
      usuarioLogado: req.cookies.usuario,
      usuarioAdmin: req.cookies.admin
    });
  },
  update: async (req, res, next) => {
    const { id } = req.params
    const usuario = await User.findOne({ where: { id } })
    if (usuario) {
      res.render('userUpdate', {
        titulo: 'Cadastro',
        subtitulo: req.cookies.usuario ? `Verifique os dados e atualize os que precisar` : 'Preencha os dados e complete seu cadastro!',
        usuarioLogado: req.cookies.usuario,
        usuarioAdmin: req.cookies.admin,
        usuarioEditando: usuario
      })
    } else {
      res.status(500).send(`Ops... houve algum erro ao buscar pelo usuário de id ${id}`)
    }
  },
  edit: async (req, res, next) => {
    const id = req.params.id.replace('/', '')
    let {
      nome,
      sobrenome,
      apelido,
      nascimento,
      senha,
      corPreferida,
      email,
      telefone,
      bio
    } = req.body
    if (telefone) telefone = telefone.replace(/\D/g, '')
    modificadoEm = new Date()
    const user = await User.update({
      nome,
      sobrenome,
      apelido,
      nascimento,
      senha,
      corPreferida,
      email,
      telefone,
      bio,
      modificadoEm
    }, { where: { id } })
    if (user) {
      res.redirect('../../usuarios')
    } else {
      res.status(500).send('Ops... Algo de errado não deu certo!')
    }
  },
  delete: async (req, res, next) => {
    const idBuscado = req.params.id.replace('/', '')
    const user = await User.destroy({ where: { id: idBuscado } })
    if (user) {
      res.redirect('../')
    } else {
      res.status(500).send('Ops... Algo de errado não deu certo!')
    }
  },
  logout: (req, res, next) => {
    res.clearCookie('usuario').clearCookie('admin').redirect('../../')
  }
}

module.exports = controller
