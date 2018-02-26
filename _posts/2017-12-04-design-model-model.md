---
layout: post
title:  "JavaScript设计模式之模板模式"
categories: JavaScript
tags:  模板模式 JavaScript
author: DCX
---

* content
{:toc}

## 模板模式概念：

 定义了一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。
 通俗的讲，就是将一些公共方法封装到父类，子类可以继承这个父类，并且可以在子类中重写父类的方法，从而实现自己的业务逻辑。







## 代码实现：

比如前端面试，基本包括笔试，技术面试，领导面试，HR面试等，但是每个公司的笔试题，技术面可能不一样，也可能一样，一样的就继承父类的方法，不一样的就重写父类的方法。
```js

var Interview = function(){};  
// 笔试  
Interview.prototype.writtenTest = function(){  
    console.log("这里是前端笔试题");  
};  
// 技术面试  
Interview.prototype.technicalInterview = function(){  
    console.log("这里是技术面试");  
};   
// 领导面试  
Interview.prototype.leader = function(){  
    console.log("领导面试");  
};  
// 领导面试  
Interview.prototype.HR = function(){  
    console.log("HR面试");  
};  
// 等通知  
Interview.prototype.waitNotice = function(){  
    console.log("等通知啊，不知道过了没有哦");  
};  
// 代码初始化  
Interview.prototype.init = function(){  
    this.writtenTest();  
    this.technicalInterview();  
    this.leader();  
    this.HR();  
    this.waitNotice();  
};  
  
// 阿里巴巴的笔试和技术面不同，重写父类方法，其他继承父类方法。  
var AliInterview = function(){};  
AliInterview.prototype = new Interview();  
  
// 子类重写方法 实现自己的业务逻辑  
AliInterview.prototype.writtenTest = function(){  
    console.log("阿里的技术题就是难啊");  
}  
AliInterview.prototype.technicalInterview = function(){  
    console.log("阿里的技术面就是叼啊");  
}  
var AliInterview = new AliInterview();  
AliInterview.init();  
  
// 阿里的技术题就是难啊  
// 阿里的技术面就是叼啊  
// 领导面试  
// HR面试  
// 等通知啊，不知道过了没有哦  

```
## 应用场景：

　　模板模式主要应用在一些代码刚开要一次性实现不变的部分。但是将来页面有修改，需要更改业务逻辑的部分或者重新添加新业务的情况。主要是通过子类来改写父类的情况，其他不需要改变的部分继承父类。



