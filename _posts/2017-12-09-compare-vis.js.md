---
layout: post
title:  "vis.js介绍  "
categories: JavaScript
tags:   vis.js JavaScript 
author: DCX
---

* content
{:toc}

## Vis.js简介
  Vis.js是一个动态的、基于浏览器的可视化库，可处理大量的动态数据并能与这些数据进行交互操作。该项目包含 DataSet、Timeline, 和 Graph（2d和3d）。
  Vis.js是由Almende B.V公司开发的开源项目，基于Canvas绘制web可视化图形图表，简单易用，功能强大。
下面是vis.js的模块： 






![](http://img.blog.csdn.net/20170930200142755?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRENYX2FiYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 数据集（DataSet）：
灵活的键/值对，可添加、更新和删除项目。DataSet可以过滤和订制项目，转换项目领域。Vis.js带有一个灵活的数据集，其可以用于保持和操纵非结构化数据并监听数据的变化。该数据集是基于键/值对的。数据项可以被添加，从DataSet更新和删除，并且可以订阅DataSet中的变化。数据集中的数据可以被过滤和排序，以及字段（例如日期）可以被转换为特定的类型。

## 图表（Graph）：
显示2d图形或网络。
画出一个交互式图形时间轴和条形图并以想要的方式进行个性化。 

 ![](http://img.blog.csdn.net/20170930200513043?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRENYX2FiYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

特点：
支持折线图、条形图、堆叠图、散点图样式；支持在图形上添加文字、数轴定制、切换图形组、自定义范围等。图形美观，可组合使用，个性化定制。与时间轴模块结合使用产生可伸缩式的数据展示方式。

显示3d图形或网络： 

![](http://img.blog.csdn.net/20170930200635792?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRENYX2FiYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 时间轴（Timeline）：
显示不同类型的时间轴上的数据。在时间轴上的时间和项可以交互移动、缩放及控制。丰富的时间轴样式和交互是其最大的特点。

![](http://img.blog.csdn.net/20170930200827527?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRENYX2FiYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 网络图：
简单到复杂的可定制样式非常丰富，有较强的交互性。支持大量数据的展示，可动态更新数据、动态渲染图形（大赞），支持JSON数据导入。可动态配置样式。 

![](http://img.blog.csdn.net/20170930200918449?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRENYX2FiYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 小结：
   (1)基本图表如折线图、柱状图等的使用不如同为基于Canvas的echarts图表种类多而全，echarts也相对更美观易用，但是vis.js有多种的3D图表，如果需要展示3D效果可以使用vis.js。
   (2)vis.js的网络关系图样式使用D3.js也是可以做的，只不过vis.js有一些做好的示例效果非常不错，包括过渡动画，布局，样式等都比D3.js要好一些。vis.js是基于Canvas的，而D3.js是基于SVG的，所以在应用场景上可根据需求选择相对合适的一个。
   vis.js的时间轴很不错，需要时间轴的组件或者展示，可以用vis.js来做。

