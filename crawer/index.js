var Crawler = require("crawler");
const fs = require('fs')
const path=require('path')
// let url = Date.now()+`.txt`
// var c = new Crawler({
//     // `maxConnections` 将被强制修改为 1
//     maxConnections : 10,
//     jQuery:false,// set false to suppress warning message.
//     // 两次请求之间将闲置1000ms
//     rateLimit: 1000,

//     callback : function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             var $ = res.$;
//             fs.createWriteStream(res.options.filename).write(res.body); // 下载文件
//             console.log($("title").text(),res.options);
//             fs.appendFileSync(url, $("title").text());
//         }
//         done();
//     }
// });


var c = new Crawler({
    rateLimit: 2000,
    maxConnections: 1,
    callback: function(error, res, done) {
        if(error) {
            console.log(error)
        } else {
            var $ = res.$;
            // fs.createWriteStream("1.png").write(res.options); // 下载文件
            fs.appendFileSync(`json/`+Date.now()+`.json`, JSON.stringify(res.options));
            // console.log(Object.keys(res.options))
        }
        done();
    }
})
c.on('request',function(options){
    console.log("on request",options.uri)
});
c.on('schedule',function(options){
    // options.proxy = "http://proxy:port";
    console.log('schedule',options.uri)
});
c.on('limiterChange',function(options,limiter){
    console.log('limiterChange',options.uri,limiter)
});
c.on('drain',function(){
    // For example, release a connection to database.
    console.log("drain 队列为空时执行")
    // db.end();// close connection to MySQL
});//Emitted when queue is empty.

// if you want to crawl some website with 2000ms gap between requests
c.queue('http://www.xinhuanet.com/politics/xxjxs/#index_1')
c.queue({
    uri:'http://www.xinhuanet.com/politics/xxjxs/#index_2',
    skipDuplicates:false
})
c.queue({
    uri:'http://www.xinhuanet.com/politics/xxjxs/#index_3',
    preRequest: function(options, done) {
    setTimeout(function() {
    console.log("preRequest");
    done();
    }, 1000)
    },
    skipDuplicates:true,
    limiter:'1000',
    proxy:'http://www.baidu.com'
})

console.log(c.queueSize,"c.queueSize 队列大小")//queueSize


