const puppeteer = require('puppeteer');
// const images = require('images');


(async () => {
    const size = 800 // 等比缩放到300像素宽
    const quality = 100 // 压缩质量:1-100，质量越小图片占用空间越小

    const filePath = './cache/'
    // 保存截图的路径及文件名
    const path = filePath + `screenshot_${new Date().getTime()}.png`
    // 保存缩略图的文件名，路径及名称和截图一样，只是把后缀改了
    const thumbPath = path.replace('.jpeg', '.png')

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 800,
        height: 200,
        deviceScaleFactor: 4
    })
    await page.goto('https://www.baidu.com/');

    // page.on('load', async () => {
    //     console.log('load')

    //     await browser.close();
    // })
    await page.setDefaultTimeout(1000);
    await page.screenshot({ path, fullPage: true, quality: 100, type: 'jpeg' })
    // 生成缩略图
    // await compress();
    function compress() {
        // 压缩图片
        thumbPath &&
            images(path).size(+size || 300).save(thumbPath, { quality: +quality || 100 })
    }
    await browser.close();
})()








