const db = require('../utils/MysqlConn');
const otherDB = require('../utils/RDSConn');

const CreateURL = async(original_url)=>{
    const sql = `INSERT INTO shorturl SET ?`
    values = {
        id : null,
        original_url:original_url
    }
    const sqlres = await db.execute({sql:sql,values:values});
    console.log(sqlres[0]['insertId']);
    return (sqlres[0]['insertId']);
}
const GetOriginalURL = async(host,index)=>{
    const sql = 'SELECT original_url FROM shorturl where id = ?;'
    const RDSdb = await otherDB(host);
    const res = await RDSdb.execute(sql,[index]);
    console.log(res.original_url);
    RDSdb.end();
    return res.original_url;


};
module.exports = {
    CreateURL,
    GetOriginalURL
}