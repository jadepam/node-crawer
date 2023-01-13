var path = require('path'),
    root_path = process.cwd(),
    crawler = require('./crawer'),
    fs = require('fs');
var headers = {}
// 初始化clawler对象
crawler.initCrawler(headers, res => {
    // 格式化请求到的数据
    
    res.body = res.body.replace('City_Select._$JSON_callback.$JSON(','')
    res.body = res.body.substr(0,res.body.lastIndexOf(')'))
    console.log( res.body,"ss")
    // res.body = JSON.parse(res.body);
    try {
        // 写入json文件, 存入数据库亦可
        fs.appendFile('city.json',res.body, function(err) {
            if (err) {
                console.error(err,"json err");
                return;
            }
            end();
        });
    } catch (error) {
        console.error(error,"err")                    
    }
})
// 开始请求
crawler.c.queue('http://cmsapi.bitauto.com/city/getcity.ashx?callback=City_Select._$JSON_callback.$JSON&requesttype=json&bizCity=1')


function end() {
    process.exit(1)
    // 如果请求并且写入完成, 退出程序
}