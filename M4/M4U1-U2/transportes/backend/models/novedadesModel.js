var pool = require('./bd'); 

async function getNovedades() { 
    var query = 'select * from novedad';
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj) {
    try {
        var query = "insert into novedad set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteNovedadById(id) {
    var query = "delete from novedad where id_novedad = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
}

module.exports = { getNovedades, insertNovedad, deleteNovedadById }