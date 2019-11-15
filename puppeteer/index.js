const puppeteer = require('puppeteer');
const path =require('path');
const srcToImg = require('./srcToImg');
const {mn}=require('./config');
console.log(typeof mn);
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://cn.bing.com/');
//   await page.screenshot({path: 'example.png'});

//   await browser.close();
// })();
(async () => {
    const browser = await puppeteer.launch();
    const page =await browser.newPage();
    await page.goto('https://cn.bing.com/images/');
    await page.setViewport({
        width:1920,
        height:1080 
    })

    await page.focus("#sb_form_q");//搜索框id
    await page.keyboard.sendCharacter('皮卡丘')
    console.log("皮卡丘")
    await page.click('#sb_go_par')
    console.log("search")

    page.on('load',async ()=>{
     
        for (let i=1; i < 10; i ++) {
            const srcs= await page.evaluate((i)=>{
                window.scrollTo(0,i * 1080);
                const images = document.querySelectorAll("img.main_img")
                return Array.prototype.map.call(images,img=>img.src)
            });
            srcs.forEach(async (src) => {
                //sleep 避免调用过于频繁
                await page.waitFor(1000);
                await srcToImg(src,mn)
            });
        // await page.waitFor(200);
        // 为确保懒加载触发，需要等待一下。实际需要的时间可能不止100ms
        }
        // const srcs =await page.evaluate(()=>{
        //     const images = document.querySelectorAll(".img_cont .mimg")
            
        //     return Array.prototype.map.call(images,img=>img.src)
            
        // })
        // console.log(srcs,"srcs")
        // srcs.forEach(async (src) => {
        //     //sleep 避免调用过于频繁
        //     await page.waitFor(1000);
        //     await srcToImg(src,mn)
        // });
        
        await browser.close();
    })
})();