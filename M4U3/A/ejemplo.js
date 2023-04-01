const moment = require('moment');
moment.locale('es');

console.log('Naci ' + moment('12/05/1999','DD/MM/YYYY').fromNow());