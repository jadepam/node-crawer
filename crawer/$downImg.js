var path = require('path'),
    root_path = process.cwd(),
    crawler = require('./crawer'),
    fs = require('fs');

    // fs.appendFileSync('getImg.json','[');
var headers = {}
let host = 'http://www.lanrentuku.com';
let cNum = 0, imgNum = 0,index=0; // 计数
// 初始化clawler对象
crawler.initCrawler(headers, res => {
    let $ = res.$;
    console.log($('.ol_layout.fn-clear .k_left').length)



    // https://www.easyicon.net/update/
    // 格式化请求到的数据
    // let arr=Object.keys(Array.from({length:21}));
    // arr.forEach(r=>{
    //     if(r>1){
    //         fs.mkdir(`./images/${r}`,function(error){
    //             if(error){
    //                 console.log(error);
    //                 return false;
    //             }
    //             console.log('创建目录成功');
    //         })
    //         getNEXPage(`https://www.easyicon.net/update/${r}/`,`./images/${r}`)
    //     }
    // })

    let pages=[{page:20,data:[0]}]
    pages.map(r=>{
        let name = `./images/${r.page}`
        fs.mkdir(name,function(error){
            if(error){
                console.log(error);
                return false;
            }
            console.log('创建目录成功');
        })
        getNEXPage(`https://www.easyicon.net/update/${r.page}`,`./images/${r.page}`,r.data)
    })
    
   
   
   
})
// 开始请求
crawler.c.queue('https://www.easyicon.net/update/1')


function getNEXPage(url,dir,arr) {
    crawler.c.queue({
        uri: url,
        callback: function(err,res,done) {
            if (err) {
                return err
            }
            let $ = res.$;
            $('.ol_layout.fn-clear').each((i, e) => { 
                if(arr.find(r=> r===i)){
                    fs.mkdir(`${dir}/${i}/`,function(error){
                        if(error){
                            console.log(error);
                            return false;
                        }
                        console.log('创建目录成功');
                    })
                    $(e).find('.k_left').each((k,item)=>{
                        let url = $(item).find('a').attr('href')
                        let id =url.split('/')[5]
                        downImg(`https://www.easyicon.net/download/png/${id}/64/`,k,`${dir}/${i}/`)//下载log
                    })
                }

               
            })
            done()
        }
    })
}


// 请求每个品牌的页面
// function getPage(url, index,name) {
//     crawler.c.queue({
//         uri: url,
//         callback: function(err,res,done) {
//             if (err) {
//                 return err
//             }
//             let $ = res.$;
//             let str={type:name,list:[]}
//             $('.content-png img').each((i, e) => {
//                 index++;
//                 crawler.num++; // 请求成功
//                 str.list.push({
//                     "type":name,
//                     "fromPageTitleEnc": $(e).attr('alt'),
//                     "middleURL":`${name}/${index}.png`
//                 }) 
//                 downImg($(e).attr('src'),i,`type/${name}/`)//下载log
//                 cNum++;
//             })
//             // 写入json文件, 存入数据库亦可
//             fs.appendFile('./json/getImg.json',JSON.stringify(str)+',', function(err) {
//                 if (err) {
//                     console.error(err,"json err");
//                     return;
//                 }
//                 // 写入成功
                
//             });
//             done()
//         }
//     })
// }

function downImg(link, name,file) {
    crawler.c.queue({
        uri: link,
        encoding: null,
        jQuery: false, 
        callback: function (err, res, done) {
            if (err) {
                console.error(err.stack);
            } else {
                imgNum++;
                fs.createWriteStream(`${file?file:'./images/'}` + name+'.png').write(res.body);
                console.log('下载成功: %d', imgNum);
                end();
            }
            done();
        }
    });
}

function end() {
    if (crawler.num == cNum && cNum == imgNum) {
        // fs.appendFileSync('getImg.json',']');
        // 如果请求并且写入完成, 退出程序
        process.exit(1)
    }
}