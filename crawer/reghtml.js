var path = require('path'),
    root_path = process.cwd(),
    crawler = require('./crawer'),
    fs = require('fs');

    // fs.appendFileSync('./json/super-mario.json','[');
var headers = {}
let cNum = 0, imgNum = 0,index=0; // 计数
// 初始化clawler对象
crawler.initCrawler(headers, res => {
    // 格式化请求到的数据
    
    // let $ = res.$;
    let arr=Object.keys(Array.from({length:3}));
    arr.forEach(r=>{
        getPage(`https://www.stickpng.com/cat/games/new-super-mario-bros?page=${r}`, 'super-mario')
    })
    
})
// 开始请求
crawler.c.queue('https://www.easyicon.net/s/?q=hat&p=1')

// 请求每个品牌的页面
function getPage(url, name) {
    crawler.c.queue({
        uri: url,
        callback: function(err,res,done) {
            // console.log(res.body)

            var imgReg = /<img.*?(?:>|\/>)/gi;
            //匹配src属性
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var arr = res.body.match(imgReg);
            console.log('所有已成功匹配图片的数组：' + arr);
            for (var i = 0; i < arr.length; i++) {
               var src = arr[i].match(srcReg);
               index++;
               //获取图片地址
              if(src){
                 if (src[1]) {
                    //  console.log('已匹配的图片地址' + (i + 1) + '：' + src[1])
                    downImg( `https://www.stickpng.com`+src[1],index,`${name}/`)//下载log
                    var info = {
                        "type":name,
                        "fromPageTitleEnc":name,
                        "middleURL": `https://www.stickpng.com`+src[1]
                     }
                    fs.appendFile(`./json/${name}.json`,`${JSON.stringify(info)},`, function(err) {
                        if (err) {
                            console.error(err,"json err");
                            return;
                        }
                        // 写入成功
                        cNum++;
                    });
                   }
              }

               //当然你也可以替换src属性
            //    if (src[0]) {
            //       var t = src[0].replace(/src/i, "href");
            //       //alert(t);
            //    }
             }
            // if (err) {
            //     return err
            // }
            // let $ = res.$;
            // $('#results img').each((i, e) => {
            //     // downImg($(e).find('.content-png img').attr('src'), $(e).find('.content-png img').attr('alt'))
            //     crawler.num++; // 请求成功
            //     console.log($(e).attr('src'));
            //     var info = {
            //         "type":name,
            //         "fromPageTitleEnc":$(e).prev().find('.title').text(),
            //         "middleURL": `https://www.stickpng.com`+$(e).attr('src')
            //       }
            //     downImg($(e).attr('src'),i,`${name}/`)//下载log
            //     // 写入json文件, 存入数据库亦可
            //     fs.appendFile(`./json/${name}.json`,`${JSON.stringify(info)},`, function(err) {
            //         if (err) {
            //             console.error(err,"json err");
            //             return;
            //         }
            //         // 写入成功
            //         cNum++;
            //         end();
            //     });
            // })
            done()
        }
    })
}

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
                fs.createWriteStream(`${file?'./images/'+file:'./images/'}` + name+'.png').write(res.body);
                console.log('下载成功: %d', imgNum);
                end();
            }
            done();
        }
    });
}

function end() {
    if (crawler.num == cNum && cNum == imgNum) {
        fs.appendFileSync('super-mario.json',']');
        // 如果请求并且写入完成, 退出程序
        process.exit(1)
    }
}