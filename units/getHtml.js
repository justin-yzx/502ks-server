module.exports = {
    getHtml(obj) {

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>${obj.thistitl}</title>
    <link type="text/css" rel="stylesheet" href="/css/read.css"/>
</head>
<body>
<div id="app" :style="{ backgroundColor: bodyBg}">
    <!--内容区域-->
    <div @click="showMenu=!showMenu" id="readbox" class="content-box-p" :style="{ fontSize: fontSize+'px',color:colorFont}">
        <div style="font-size: 18px">${obj.thistitl}</div>
        ${obj.content}
    </div>
    <!--顶部操作区域-->
    <div v-if="showMenu" class="top-operate-zone">
        <span class="top-back" @click="back"><img src="/img/back.png"/></span>
        <div class="top-right">
            <span @click="gohome">首页</span>
            <span @click="join">加入书架</span>
            <img
                v-if="readFlag!==2"
                src="/img/play.png"
                @click="read">
            <img
                v-if="readFlag===2"
                src="/img/stop.png"
                @click="read">
        </div>
    </div>
    <!--底部操作区域-->
    <div class="operate-zone">
        <div v-if="setMenu && showMenu" class="zone-2">
            <div class="colors-arr"><span @click="changeBg(index)" v-for="(item,index) in colorArr"
                                          :class="borderIndex==index?'active':''"
                                          :style="{ backgroundColor: colorArr[index]}"></span></div>
            <div class="font-sizes">
                <span @click="changeSize('reduce')">Aa-</span>
                <span @click="changeSize('add')">Aa+</span>
            </div>
        </div>
        <div v-if="showMenu" class="zone-1">
            <span><img src="/img/last.png"/><em @click="previous">上一章</em></span>
            <span><img src="/img/content.png"/><em @click="mulu">目录</em></span>
            <span @click="setMenu=!setMenu"><img src="/img/set.png"/><em>设置</em></span>
            <span @click="setDayNight('night')" v-if="!nightDay"><img src="/img/night.png"/><em>夜间</em></span>
            <span @click="setDayNight('day')" v-else><img src="/img/day.png"/><em>白天</em></span>
            <span><img src="/img/next.png"/><em @click="nuxt">下一章</em></span>
        </div>
    </div>
</div>
</body>
</html>
<script type="text/javascript">
    var bookid="${obj.bookid}"
    var lastid="${obj.lastid}"
    var nuxtid="${obj.nuxtid}"
    var thisid="${obj.thisid}"
    var thistitle="${obj.thistitle}"
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script type="text/javascript" src="/js/read.js"></script>`

    }
}