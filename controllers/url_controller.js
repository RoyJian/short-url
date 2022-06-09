const {CreateURL,GetOriginalURL} = require('../models/url_model');
const getRandomInt = require('../utils/GetRandomInt');
const {DB_HOST_p1,DB_HOST_p2,DB_HOST_p3,DB_Num} = process.env;

const CreateUrl = async (req,res)=>{
    const url = req.body.original_url;
    const id =  await CreateURL(url);
    let RDSip = `${DB_Num},${id.toString()}`;
    RDSip = new Buffer.from(RDSip,"utf-8");
    RDSip = RDSip.toString('base64');
    res.send({id:id,url:RDSip});


};
const DecodeUrl = async(req,res)=>{
    const hash = req.query.id
    const decode = new Buffer.from(hash,'base64').toString('utf-8');
    const replicaSelect = getRandomInt(2) + 1;
    const addressArr = decode.split(',');
    const host = `${DB_HOST_p1}${addressArr[0]}-${replicaSelect}${DB_HOST_p2}${DB_HOST_p3}`;
    const index = addressArr[1];
    const originUrl = await GetOriginalURL(host,index);
    res.send({originUrl,host});
};

module.exports = {
    CreateUrl,
    DecodeUrl
}