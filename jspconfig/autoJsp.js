import fs from 'fs';
import {top, bottom} from './temp';
import routers from './../config/routers';
// import p from 'path';
import pages from './app.json'
let root_path = process.cwd(), newroot = 'jspnew', jspPages = routers[1].routes.filter(r => r.jspPage).map(r => r.path);
// console.log(pages,"pages")
fs.mkdir(`${root_path}/${newroot}`, function(error){
  if(error){
    // console.log(error);
    return false;
  }
  // console.error('新建根目录jspPage');
})
let fileNames=pages.pages//老文件page
jspPages.forEach(item => {
  let iframe =`<iframe id="vue-iframe" src="/resources/dist/index.html/#${item}" frameborder="0" width="100%"></iframe>`
  if(fileNames.indexOf(item)===-1){//新文件
    let file=item.split('/').splice(1).join('_') 
    fs.appendFile(`${root_path}/${newroot}/${file}.jsp`, `${top}${iframe}${bottom}`, function(err) {
      if (err) {
        console.error(err, "json err");
        return;
      }else{
      }
    });
  }
})


let appjson = {pages: [...new Set(pages.pages.concat(jspPages))]}
fs.writeFile(`${root_path}/jspconfig/app.json`, JSON.stringify(appjson), function(err) {
  if (err) {
    console.error(err, "json err");
    return;
  }
});
// console.log(appjson,"appjson")
// console.error(jspPages, "jspPage", fileNames)