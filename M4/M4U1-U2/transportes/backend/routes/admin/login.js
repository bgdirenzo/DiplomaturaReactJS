var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();  //destruye las variables de sesión
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

/*POST home page */
router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario; //captura la informacion ingresada por el usuario
    var password = req.body.password;

    var data = await usuariosModel.getUser(usuario, password); //el await le da un cierre a la funcion asincrónica

    if (data != undefined) { //si tengo un registro

      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.render('index', {
        layout: 'admin/layout',
        persona: req.session.nombre
      }); //redirije a la pagina de inicio
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;