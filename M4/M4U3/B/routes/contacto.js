var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    /*res.send('Hola soy la pagina de contacto');*/
    res.render('contacto', { title: 'Mi app Express' });
});

module.exports = router;
