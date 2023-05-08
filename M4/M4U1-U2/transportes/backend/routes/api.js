var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

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


/*POST Home Page*/

router.post('/contacto', async (req,res)=> {
  const mail = {
    to: 'barbara.direnzo@gba.gob.ar',
    subject: 'contacto web',
    html: `${req.body.nombre} se contactó a traves de la web y quiere más información a este correo: ${req.body.email}
          <br/> Además, hizo el siguiente comentario: ${req.body.mensaje}
          <br/> Su teléfono es: ${req.body.telefono}`
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transport.sendMail(mail)

  res.status(201).json({
    error: false,
    message: 'Mensaje enviado'
  });

});


module.exports = router;
