var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');
var util = require('util'); //facilita la subida
var cloudinary = require('cloudinary').v2; //para subir a cloudinary, se codifica la imagen
const uploader = util.promisify(cloudinary.uploader.upload); //va a subir la imagen
const destroy = util.promisify(cloudinary.uploader.destroy); //va a subir la imagen


/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.map(novedad => {  //se genera un nuevo array donde se chequea si la novedad tiene imagen o no
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 70,
        height: 70,
        crop: 'fill'  //o relleno o se adapta al tamaño
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: ''
      }
    }
  })

  res.render('admin/novedades', {
    layout: 'admin/layout',
    novedades
  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  let novedad = await novedadesModel.getNovedadById(id);
  if (novedad.img_id) {
    await destroy(novedad.img_id);
  }

  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades')
});

router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});

/*POST home page */
router.post('/agregar', async (req, res, next) => {
  try {

    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) { //si hay un archivo entonces realizamos este ifs
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") { //chequear que tenga algo en título, subtítulo o cuerpo.
      await novedadesModel.insertNovedad({ //lo paso como propiedad
        ...req.body, // spread > titulo, dbtitulo, cuerpo
        img_id
      }); //le paso los elementos
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, //siempre pasamos el error con un mensaje
        message: 'Todos los campos son requeridos'
      })
    }

  } catch (error) {

    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    });

  }

});

router.post('/modificar', async (req, res, next) => {
  try {

    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }

    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id
    }
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    });
  }
});

module.exports = router;