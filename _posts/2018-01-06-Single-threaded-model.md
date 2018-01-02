---
layout: post
title:  "单线程模型"
categories: JAVASCRIPT
tags: 单线程 模型 JAVASCRIPT
author: DCX
---

* content
{:toc}

## 相同点：
两个方法产生的作用是完全一样的，都用来改变当前函数调用的对象。

## 不同点：调用的参数不同，来个精辟的总结：
    foo.call(this,arg1,arg2,arg3) == foo.apply(this, arguments)==this.foo(arg1, arg2, arg3)



## 具体的使用

## 1.call的使用

语法
call([thisObj[,arg1[, arg2[, [,.argN]]]]])

参数
thisObj  可选项。将被用作当前对象的对象。
arg1,arg2, , argN  可选项。将被传递方法参数序列。

说明

call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

示例
<input id="myText">  
    
    function Obj()  
    {  
       this.value="对象！";  
    }  
    varvalue="global 变量";  
    function Fun1(a,b){  
       alert(this.value);  
    }  
    window.Fun1();   //global 变量  
    Fun1.call(window,1,2);  //global 变量  
    Fun1.call(document.getElementById('myText'));  //input text  
    Fun1.call(new Obj());   //对象！  
  

## 2.apply()

apply与call的功能几乎一样，第一个参数意义都一样，只是第二个参数有点不同apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，call从第二个参数开始，依次传值给调用函数的参数 

## 3.代码比较
    function print(a, b, c, d){  
      alert(a + b + c + d);  
    }  
    functionexample(a, b , c , d){  
     //用call方式借用print,参数显式打散传递  
     print.call(this, a, b, c, d);  
     //用apply方式借用print, 参数作为一个数组传递,  
     //这里直接用JavaScript方法内本身有的arguments数组  
     print.apply(this, arguments);  
     //或者封装成数组  
     print.apply(this, [a, b, c, d]);  
    }  
    //下面将显示”智学无忧”  
    example("智" , "学" , "无", "忧");  
