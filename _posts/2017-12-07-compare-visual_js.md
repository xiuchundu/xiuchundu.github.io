---
layout: post
title:  "D3.js和highcharts,echarts性能对比 "
categories: JavaScript
tags:   d3.js 数据可视化性能 JavaScript
author: DCX
---

* content
{:toc}

## 代理模式概念：

　　代理模式的中文含义就是帮别人做事，javascript的解释为：把对一个对象的访问, 交给另一个代理对象来操作.

 

## 代码实现：

　比如我们公司的补打卡是最后是要交给大boss来审批的，但是公司那么多人，每天都那么多补打卡，那大boss岂不是被这些琐事累死。所以大boss下会有一个助理，来帮忙做这个审批，最后再将每个月的补打卡统一交给大boss看看就行。




```js
// 补打卡事件  
var fillOut = function (lateDate) {  
  
    this.lateDate = lateDate;  
};  
  
// 这是bigBoss  
var bigBoss = function (fillOut) {  
  
    this.state = function (isSuccess) {  
        console.log("忘记打卡的日期为：" + fillOut.lateDate + ", 补打卡状态：" + isSuccess);  
    }  
};  
// 助理代理大boss 完成补打卡审批  
var proxyAssis = function (fillOut) {  
      
    this.state = function (isSuccess) {  
        (new bigBoss(fillOut)).state(isSuccess); // 替bigBoss审批  
    }  
};  
  
// 调用方法：  
var proxyAssis = new proxyAssis(new fillOut("2016-9-11"));  
proxyAssis.state("补打卡成功");  
  
// 忘记打卡的日期为：2016-9-11, 补打卡状态：补打卡成功  

```




## 应用场景：

　　比如图片的懒加载，我们就可以运用这种技术。在图片未加载完成之前，给个loading图片，加载完成后再替换成实体路径。

代码示例如下所示：
```js
var myImage = (function(){  
    var imgNode = document.createElement("img");  
    document.body.appendChild(imgNode);  
    return function(src){  
        imgNode.src = src;   
    }  
})();  
// 代理模式  
var ProxyImage = (function(){  
    var img = new Image();  
    img.onload = function(){  
        myImage(this.src);  
    };  
    return function(src) {  
                // 占位图片loading  
                myImage("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");  
        img.src = src;  
    }  
})();  
// 调用方式  
  
ProxyImage("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png"); // 真实要展示的图片  

```

当然，这种懒加载方法不用代理模式也是可以实现的，只是用代理模式,我们可以让 myImage 只做一件事，只负责将实际图片加入到页面中，而loading图片交给ProxyImage去做。从而降低代码的耦合度。因为当我不想用loading的时候，可以直接调用myImage 方法。也即是说假如我门不需要代理对象的话，直接可以换成本体对象调用该方法即可。