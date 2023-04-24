var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/*GET Home Page*/

router.get('/novedades', async function (req, res, next) {
    let novedades = await novedadesModel.getNovedades();
  
    novedades = novedades.map(novedades => {  //se genera un nuevo array donde se chequea si la novedad tiene imagen o no
      if (novedades.img_id) {
        const imagen = cloudinary.url(novedades.img_id, {
          width: 960,
          height: 200,
          crop: 'fill'  //o relleno o se adapta al tamaño
        });
        return {
          ...novedades,
          imagen
        }
      } else {
        return {
          ...novedades,
          imagen: ''
        }
      }
    });
    
    res.json(novedades);

});

module.exports = router;
