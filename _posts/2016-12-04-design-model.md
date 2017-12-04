---
layout: post
title:  "JavaScript设计模式之观察者模式"
categories: JavaScript
tags: 观察者模式 JavaScript
author: DCX
---

* content
{:toc}

## 观察者模式概念：

　　定义对象间的一种一对多的依赖关系，以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动刷新，也被称为是发布订阅模式。
   
   它需要一种高级的抽象策略，以便订阅者能够彼此独立地发生改变，而发行方能够接受任何有消费意向的订阅者。




## 应用场景：　　

　　这个模式要先说应用场景，比较好理解。

　　打一个离我们比较近的一个场景，博客园里面有一个订阅的按钮（貌似有bug），比如小A,小B,小C都订阅了我的博客，当我的博客一有更新时，就会统一发布邮件给他们这三个人，就会通知这些订阅者

　　发布订阅模式的流程如下：

   1. 确定谁是发布者(比如我的博客)。

   2. 然后给发布者添加一个缓存列表，用于存放回调函数来通知订阅者。

   3. 发布消息，发布者需要遍历这个缓存列表，依次触发里面存放的订阅者回调函数。
   
   4. 退订（比如不想再接收到这些订阅的信息了，就可以取消掉）
   
## JS代码实现如下：
```js

var pubsub = {};   // 定义发布者  
  
(function (q) {  
  
    var list = [],  //回调函数存放的数组，也就是记录有多少人订阅了我们东西  
        subUid = -1;  
  
    // 发布消息,遍历订阅者  
    q.publish = function (type, content) {  
        // type 为文章类型，content为文章内容  
          
        // 如果没有人订阅，直接返回  
        if (!list[type]) {  
  
            return false;  
        }  
  
        setTimeout(function () {  
            var subscribers = list[type],  
                len = subscribers ? subscribers.length : 0;  
  
            while (len--) {  
                // 将内容注入到订阅者那里  
                subscribers[len].func(type, content);  
            }  
        }, 0);  
  
        return true;  
  
    };  
    //订阅方法，由订阅者来执行  
    q.subscribe = function (type, func) {  
        // 如果之前没有订阅过  
        if (!list[type]) {  
            list[type] = [];  
        }  
  
        // token相当于订阅者的id，这样的话如果退订，我们就可以针对它来知道是谁退订了。  
        var token = (++subUid).toString();  
        // 每订阅一个，就把它存入到我们的数组中去  
        list[type].push({  
            token: token,  
            func: func  
        });  
        return token;  
    };  
    //退订方法  
    q.unsubscribe = function (token) {  
        for (var m in list) {  
            if (list[m]) {  
                for (var i = 0, j = list[m].length; i < j; i++) {  
                    if (list[m][i].token === token) {  
                        list[m].splice(i, 1);  
                        return token;  
                    }  
                }  
            }  
        }  
        return false;  
    };  
  
} (pubsub));  
  
//将订阅赋值给一个变量，以便退订  
var girlA = pubsub.subscribe('js类的文章', function (type, content) {  
    console.log('girlA订阅的'+type + ": 内容内容为：" + content);  
});  
var girlB = pubsub.subscribe('js类的文章', function (type, content) {  
    console.log('girlB订阅的'+type + ": 内容内容为：" + content);  
});  
var girlC = pubsub.subscribe('js类的文章', function (type, content) {  
    console.log('girlC订阅的'+type + ": 内容内容为：" + content);  
});  
  
//发布通知  
pubsub.publish('js类的文章', '关于js的内容');    
// 输出：  
// girlC订阅的js类的文章: 内容内容为：关于js的内容  
// test3.html:78 girlB订阅的js类的文章: 内容内容为：关于js的内容  
// test3.html:75 girlA订阅的js类的文章: 内容内容为：关于js的内容  
  
  
//girlA退订了关于js类的文章   
setTimeout(function () {  
    pubsub.unsubscribe(girlA);  
}, 0);  
  
//再发布一次，验证一下是否还能够输出信息  
pubsub.publish('js类的文章', "关于js的第二篇文章");  
// 输出：  
// girlB订阅的js类的文章: 内容内容为：关于js的第二篇文章  
// girlC订阅的js类的文章: 内容内容为：关于js的第二篇文章  

```
## 优缺点比较：

　　<font color=green>优点：</font>当我们需要维护相关对象的一致性的时候，使用观察者模式，就可以避免对象之间的紧密耦合。例如，一个对象可以通知另外一个对象，而不需要知道这个对象的信息。

　　<font color=green>缺点：</font>在发布/订阅模式中，如果我们需要将发布者同订阅者上解耦，将会在一些情况下，导致很难确保我们应用中的特定部分按照我们预期的那样正常工作。也就是说它的优点也可能是它的缺点。

