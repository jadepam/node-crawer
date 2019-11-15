// const path =require('path')
// module.exports={
//     mn:path.resolve(__dirname,'./mn')
// }

module.exports = {
    // 爬虫配置
    crawler: {
        // 超时时间
        timeout: 10000000,
        // 失败重试次数
        retries: 10,
        // 失败重试等待时间
        retryTimeout: 1000,
        // 最大并发数
        maxConnections: 1,
         // 两次请求之间将闲置1000ms
        rateLimit: 10000,
    },
}