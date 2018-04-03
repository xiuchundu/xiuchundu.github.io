---
layout: post
title:  "readline模块实现Node.js的输入输出"
categories: JavaScript
tags:  NodeJs readline
---

* content
{:toc}

学Java的时候，有println和Scanner控件，C++有cout和cin，Node.js也有如同Java和C++的标准输入，当然，是用JavaScript实现的，它就是Readline模块（从这个角度看的话，能不能把Node.js当作JavaScript的编译器？）。下面详细介绍一下这个模块，来实现Node.js的控制台输入输出。







## Readline

Readline是Node.js里实现标准输入输出的封装好的模块，通过这个模块我们可以以逐行的方式读取数据流。使用require(“readline”)可以引用模块。
如何使用Readline

以使用为角度的话，学习Readline，我们需要学习它的三个部分：

(1)创建Readline实例
(2)学习里面的接口方法
(3)学习监听与处理Readline事件

下面我们通过实例来学习这三个部分。
实例1：我叫小du

代码如下：

```js
	// 引入readline模块
	var readline = require('readline');
	
	//创建readline接口实例
	var  rl = readline.createInterface({
	    input:process.stdin,
	    output:process.stdout
	});
	
	// question方法
	rl.question("你的名字是？",function(answer){
	    console.log("我的名字是："+answer);
	    // 不加close，则程序不会结束
	    rl.close();
	});
	
	// close事件监听
	rl.on("close", function(){
	   // 结束程序
	    process.exit(0);
	});
```

 
上面的实例用到了我们需要学习到的三个部分，首先使用了createInterface创建了一个接口实例，然后使用了question方法来询问姓名，最后是监听readline的close事件，因为无论是方法名和事件的监听的名字都比较直观，关于它们的作用也能一目了然，我这里就只提了三点需要注意的：

* 在createInterface里，我们需要传入标准输入输出作为数据的输入输出流
* 在question方法的回调函数里，我们可以获取到用户的输入并进行处理，同时我们进行了close操作来结束程序，否则程序不会结束
* 在close事件的监听里，我们执行了process.exit(0)来使程序退出的操作，因为readline模块只要一开始获取用户输入就不会结束，必须使用这种直接的方式来结束程序

 
## 实例2：输入与输出
```js
	// 引入readline模块
	var readline = require('readline');
	
	var rl = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout
	});
	
	rl.on('line', function(line){
	    switch(line.trim()) {
	        case 'copy':
	            console.log("复制");
	            break;
	        case 'hello':
	            rl.write("Write");
	            console.log('world!');
	            break;
	        case 'close':
	            rl.close();
	            break;
	        default:
	            console.log('没有找到命令！');
	            break;
	    }
	});
	rl.on('close', function() {
	    console.log('bye bye');
	    process.exit(0);
	});
```

* `line`事件，这个事件就是在用户输完一行，按下回车后就会触发的事件，它会将用户输入的数据通过回调函数传回来，可在此方法里处理用户输入的数据。

## 实例3：类似命令行的输入输出
```js
	var readline = require('readline');
	var  rl = readline.createInterface(process.stdin, process.stdout);
	
	rl.setPrompt('Test> ');
	rl.prompt();
	
	rl.on('line', function(line) {
	    switch(line.trim()) {
	        case 'copy':
	            console.log("复制");
	            break;
	        case 'hello':
	            console.log('world!');
	            break;
	        case 'close':
	            rl.close();
	            break;
	        default:
	            console.log('没有找到命令！');
	            break;
	    }
	    rl.prompt();
	});
	
	rl.on('close', function() {
	    console.log('bye bye!');
	    process.exit(0);
	});
```

运行截图如下： 

![](https://i.imgur.com/wUtw3Ec.png)

这个实例里出现了两个新方法

* 方法`setPromat(promat)`，就是给每一行设置一个提示符，就好比window命令行的> ，我们这里设置的是`Test> `。
* `promat()`可以算是最重要的方法了，因为它才体现了Readline的核心作用，以行为单位读取数据，premat方法就是在等待用户输入数据。
这里又监听了`’line’ `事件，因为promat方法调用一次就只会读取一次数据，所以，在这个方法又调用了一次promat方法，这样就可以继续读取用户输入，从而达到一种命令行的效果。
