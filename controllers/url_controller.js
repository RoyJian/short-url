const {CreateURL,GetOriginalURL} = require('../models/url_model');
const dns = require('dns');

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
    const host = 'shorturl-'+decode.split(',')[0]+'.ap-northeast-1.rds.amazonaws.com';
    const index = decode.split(',')[1];
    const originUrl = await GetOriginalURL(host,index);
    res.send({originUrl});
};

module.exports = {
    CreateUrl,
    DecodeUrl
}