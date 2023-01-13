const https = require('https');
const http = require('http');
const fs = require('fs')
const path=require('path')
const {promisify}=require('util')
const writeFile=promisify(fs.writeFile)


const urlToImg = promisify((url,dir) =>{
    const mod=/^https:/.test(url) ? https:http;
    const ext = path.extname(url);
    const file =path.join(dir,`${new Date()}.${ext}`)
    mod.get(url,res=>{
        res.pipe(fs.createWriteStream(file)).on(
            "finish",()=>{
                //  callback();
                console.log(file,"img")
            }
        )
    })
});

const base64ToImg=async function(base64Str,dir){
    //data:image/jpeg;base64,/...
    const matchs= base64Str.match(/^data:(.+?);base64,(.+)$/)
    try{
        const ext=matchs[1].split('/')[1].replace('jpeg','jpg');
        const file =path.join(dir,`${Date.now()}.${ext}`);
        await writeFile(file,matchs[2],'base64');
        console.log(file)
    }catch(ex){
        console.log('非法base64字符串');
    }
    
}
module.exports =async(src,dir)=>{
    if(/\.(jpg|png|gif)$/.test(src)){
        await urlToImg(src,dir)
    }else{
        await base64ToImg(src,dir)
    }
}