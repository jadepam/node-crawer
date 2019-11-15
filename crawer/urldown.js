var path = require('path'),
    root_path = process.cwd(),
    crawler = require('./crawer'),
    fs = require('fs');
var headers = {}
// 初始化clawler对象
let cNum = 0, imgNum = 0; // 计数
// fs.appendFileSync('NBA.json','[');
crawler.initCrawler(headers, res => {
    // 格式化请求到的数据
  
   let $ = res.$;
   
//    $('.team.cf').each((i, e) => {
//         let url =$(e).find('img').attr('src')
//         console.log(url,typeof url)
//         if(url){
//             console.log("-------")
//             downImg(url,i)
//         //     fs.appendFile('NBA.json',JSON.stringify(url)+',', function(err) {
//         //         if (err) {
//         //             console.error(err,"json err");
//         //             return;
//         //         }
//         //         end();
//         // })
//             }
//         });
//    });
let img =["http://static.open.baidu.com/media/ch16/png/hulk_qjy_nba.png","http://static.open.baidu.com/media/ch16/png/wc-2019-bug-black.png.png","http://static.open.baidu.com/media/ch16/png/世界杯亚洲区预选赛.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_CBA.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_中超.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_欧冠.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_英超.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_西甲.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_意甲.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_德甲.png","http://hiphotos.baidu.com/xiaodu/pic/item/ac4bd11373f08202d9d3fb8c46fbfbedab641b3b.jpg","http://static.open.baidu.com/media/ch16/png/hulk_qjy_欧联杯.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_法甲.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_足协杯.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_中甲.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_英冠.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_足总杯.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_国王杯.png","http://static.open.baidu.com/media/ch16/png/hulk_qjy_LPL.png","http://static.open.baidu.com/media/ch16/jpeg/hulk_qjy_kpl_2019.jpeg"]
    img.forEach((i,index) => {
        downImg(i,index)
    });
});
// 开始请求
// crawler.c.queue('https://tiyu.baidu.com/match/NBA/tab/%E6%8E%92%E5%90%8D')
// crawler.c.queue('https://nba.stats.qq.com/player/list.htm#teamId=29')
crawler.c.queue('https://tiyu.baidu.com/matchlist')


function downImg(link, name) {
    
    crawler.c.queue({
        uri: encodeURI(link),
        encoding: null,
        jQuery: false, 
        callback: function (err, res, done) {
            
            if (err) {
                console.error(err.stack);
            } else {
                imgNum++;
                fs.createWriteStream(`./images/${name}.png`).write(res.body);
                console.log('下载成功: %d', imgNum);
                end();
            }
            done();
        }
    });
}

function end() {
    if (crawler.num == cNum && cNum == imgNum) {
    // fs.appendFileSync('NBA.json',']');
    process.exit(1)
    // 如果请求并且写入完成, 退出程序
    }
}