---
layout: post
title:  "D3.js和highcharts,echarts性能对比 "
categories: JavaScript
tags:   d3.js 数据可视化性能 JavaScript
author: DCX
---

* content
{:toc}

## 常用的可视化插件

　　前端做数据可视化开发时，经常会用到D3.js、highcharts、echarts这些可视化插件，如何选择一款合适的插件，常常困扰着开发人员。我也遇到过这个问题，下面我就就这三者在性能上的区别做一个简单的介绍： 

 




(1).Highcharts和echarts是一类东西，但跟d3.js维度不同。假如前面两个能解决你的需求，那么就可以先不考虑d3。英语好highcharts，英语不好选echarts。当然最好要先评估一下它们对浏览器的兼容性，免得写完了发现用户那运行不了。

(2).Highcharts和echarts基本上就是画图表用的，它们自带的图表类型能满足你最好，满足不了的话你就只能自己造轮子了。

(3)d3.js 更自由些，你很容易去做出自己想要的效果，比如mind chart、heat chart、tile chart 之类的东西。某天客户要求你做一个xx chart，你一看卧槽highcharts没有，就只能找d3.js或者raphaël js自己撸一个，美观度和工作量都要自己把握。

(4)性能方面，简单图表都没什么问题，数据量大、复杂运算、动画效果多的话，都快不了，区别就是svg性能更差，canvas能好不少罢了。

总的来说，所有的第三方库都是基于这两种浏览器图形渲染技术实现的： Canvas 和 SVG 。下面用图形展示它们的区别： 


![](http://img.blog.csdn.net/20170930162402733?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRENYX2FiYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

