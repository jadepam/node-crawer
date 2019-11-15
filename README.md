# nodecrawler


```
git clone git@gitee.com:jadepam/nodecrawler.git
npm install
puppeteer:npm run start
crawer:npm run start
```

## 命令行：npm run jsp

本地jspnew文件下，会生成上次执行npm run jsp后本地新增的路由页面

此处路由页面，指代config/routers文件下，设置jspPage:true的页面,如
```
  {
    path: '/member-all',
    name: '会员分析-整体',
    component: './member-all/index',
    jspPage:true
  }
``` 

适用：java老系统项目jsp页面(iframe)+react等单页面应用项目,根据路由配置自动生成jsp页面

iframe高度适应

1、[element-resize-detector]
原理：用该插件监听iframe元素高度，通过window.postMessage()传值给父标签，jsp页面通过 window.addEventListener('message',{})方法监听到高度变化并设置iframe父标签高度

单页面配置：
```
import elementResizeDetectorMaker from 'element-resize-detector'
const resize_height=elementResizeDetectorMaker()

class Box extends React.Component{
  componentDidMount() {
    resize_height.listenTo(this.body, (el) => {
      window.parent.postMessage(el.offsetHeight, '*');
    })
  }
}
export default Box
```
jsp页面配置：
```
<iframe id="vue-iframe" src="/resources/dist/index.html/#${item}" frameborder="0" width="100%"></iframe>
<script>
    window.addEventListener('message',function(e){
    document.getElementById('vue-iframe').height=e.data
    })
</script>
```

2、[iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer)




