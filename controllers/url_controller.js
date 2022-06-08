const {CreateURL,GetOriginalURL} = require('../models/url_model');
const {DB_HOST_1,DB_HOST_2} = process.env;

const CreateUrl = async (req,res)=>{
    const url = req.body.original_url;
    const id =  await CreateURL(url);
    let RDSip = '1.cub7m7zd2cmg,'+id.toString();
    // RDSip = new Buffer.from(RDSip, 'ascii')
    RDSip = new Buffer.from(RDSip,"utf-8");
    RDSip = RDSip.toString('base64');
    res.send({id:id,url:RDSip});


};
const DecodeUrl = async(req,res)=>{
    const hash = req.query.id
    const decode = new Buffer.from(hash,'base64').toString('utf-8');
    const host = DB_HOST_1 + decode.split(',')[0] + DB_HOST_2;
    const index = decode.split(',')[1];
    const originUrl = await GetOriginalURL('127.0.0.1',index);
    res.send({originUrl,host});
};

module.exports = {
    CreateUrl,
    DecodeUrl
}