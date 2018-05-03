---
layout: post
title:  "JavaScript在chrome下的请求异常"
categories: JavaScript
tags: JavaScript 跨域 异常
---

* content
{:toc}

 问题：定义了一个lines-bus.json文件存储公交线路相关信息，在index.html中想通过$.getJSON("data/lines-bus.json" , function(data){...})方法获取并显示json文件中的内容。
 结果运行后chrome报错如下： 






![](https://i.loli.net/2018/05/03/5aeaebc739f0e.png)


### 思考： 百度了一下，似乎是Ajax跨域问题。

什么叫跨域？字面理解，跨是跨越，域是别的服务器，跨域就是到别的服务器上取东西。报错的意思应该就是chrome下，跨域请求只能通过通过这些协议标准实现：http、data、https、chrom-extension、chrom-extension-resource。

只要协议、域名、或端口有任何一个不同，就会被当做是不同的域。

但是仔细再一想，我请求的是本地文件，没有通过服务器请求啊，不能算跨域。

又百度了下发现，chrome在读取本地相对路径脚本时，禁止向第三方请求数据。 （只要是通过file://方式访问，或者直接拖进浏览器访问，都叫本地运行） 什么叫第三方？那就是不管本地文件、还是服务器url 文件都不行。
知道了原因就好解决了。

### 解决一：
在sublime里面 启动sublimeServer，开启服务器模式，在浏览器中通过localhost:8080/index.html访问，再看 debug tool，没有报错了，完美！~成功访问到本地json文件。

顺便测了测，在火狐下的运行情况，发现并没有报错。
原来是FireFox允许读取本地相对路径脚本。

### 解决二：
查资料，发现还有一种解决方法，不用启动服务器模式，直接更改chrome的设置就行。
在chrome属性设置中，添加启动参数：
--allow-file-access-from-files : 允许本地Ajax请求，也叫file协议下的Ajax请求
--enable-file-cookies : 允许chrome保存本地设置cookie

设置方法：chrome快捷方式–右键“属性”–快捷方式–目标 
![](https://img-blog.csdn.net/20170222112124257?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjc4NjcxNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
