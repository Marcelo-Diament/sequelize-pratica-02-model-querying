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
  update: (req, res, next) => {
    const idBuscado = req.params.id.replace('/', '')
    const usuariosOld = fs.readFileSync(path.join(__dirname, '..', 'data', 'usuariosPlaceholder.json'), 'utf-8')
    let usuarios = JSON.parse(usuariosOld)
    let usuario = usuarios.filter(usuario => usuario.id == idBuscado)[0]
    res.render('userUpdate', {
      titulo: 'Cadastro',
      subtitulo: req.cookies.usuario ? `Verifique os dados e atualize os que precisar` : 'Preencha os dados e complete seu cadastro!',
      usuarioLogado: req.cookies.usuario,
      usuarioAdmin: req.cookies.admin,
      usuarioEditando: usuario
    })
  },
  edit: (req, res, next) => {
    const idBuscado = req.params.id.replace('/', '')
    const usuariosOld = fs.readFileSync(path.join(__dirname, '..', 'data', 'usuariosPlaceholder.json'), 'utf-8')
    let usuarios = JSON.parse(usuariosOld)
    let usuario = usuarios.filter(usuario => usuario.id == idBuscado)[0]

    let usuarioAtualizado = req.body
    for (let prop in usuarioAtualizado) {
      if (usuarioAtualizado[prop] !== "") {
        usuario[prop] = usuarioAtualizado[prop]
      }
    }
    usuario.modificadoEm = new Date()

    usuarios.forEach(usuarioFinal => {
      if (usuarioFinal.id == usuario.id) {
        usuarioFinal = usuario
        usuarioFinal.id = parseInt(usuario.id)
      }
    })

    fs.writeFileSync(path.join(__dirname, '..', 'data', 'usuariosPlaceholder.json'), JSON.stringify(usuarios))

    if (req.cookies.usuario.id === usuario.id) {
      res.clearCookie('usuario').cookie('usuario', usuario)
    }
    res.render('user', {
      titulo: 'Usuário',
      subtitulo: `Usuário #${idBuscado}`,
      usuario,
      usuarioLogado: req.cookies.usuario,
      usuarioAdmin: req.cookies.admin,
      bannerTopo: '/images/banner-topo-usuario-1564x472.png',
      bannerMeio: '/images/banner-meio-usuario-1920x1080.png'
    })
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
