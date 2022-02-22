---
layout: post
title:  "vue2.0的生命周期"
categories: vue
tags: vue 生命周期
---

* content
{:toc}
## 一、生命周期简介
学习vue时经常遇到vue的生命周期的相关问题，找了个空闲时间做个总结。
主要描述了vue生命周期钩子各阶段特点，以及存在的一些坑~。





![](https://image-static.segmentfault.com/350/409/3504099265-580628fd03258_articlex)

### 1.1 生命周期钩子
下图是vue1.0和2.0的对比
![](https://image-static.segmentfault.com/334/606/3346068135-580822cd52898_articlex)

### 1.2 在beforeCreate和created钩子函数间的生命周期
在beforeCreate和created之间，进行数据观测(data observer)，也就是在这个时候开始监控data中的数据变化了，同时初始化事件。

### 1.3 created钩子函数和beforeMount间的生命周期
#### 1.3.1 el选项的有无对生命周期过程的影响
	首先系统会判断对象中有没有el选项
	有el选项，则继续编译过程
	没有el选项，则停止编译，也意味着暂时停止了生命周期，直到vm.$mount(el)
	示例如下：
	
	```js
		new Vue({
			el: '#app',
			beforeCreate: function () {
				console.log('调用了beforeCreat钩子函数')
			},
			created: function () {
				console.log('调用了created钩子函数')
			},
			beforeMount: function () {
				console.log('调用了beforeMount钩子函数')
			},
			mounted: function () {
				console.log('调用了mounted钩子函数')
			}
		})
	```
	
![](https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170716220834722-1540352575.png)

可以看到，在el选项填写且正确的时候，生命周期将正常进行。
 
当我们把el去掉：

```js
	new Vue({
		beforeCreate: function () {
			console.log('调用了beforeCreat钩子函数')
		},
		created: function () {
			console.log('调用了created钩子函数')
		},
		beforeMount: function () {
			console.log('调用了beforeMount钩子函数')
		},
		mounted: function () {
			console.log('调用了mounted钩子函数')
		}
	})

```
![](https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170716220900332-377637202.png)

可以看到，生命周期的钩子函数执行到created就结束了
如果当我们不加el选项，但是手动执行vm.$mount(el)方法的话，也能够使暂停的生命周期进行下去，例如:

```js
	var vm = new Vue({
		beforeCreate: function () {
			console.log('调用了beforeCreat钩子函数')
		},
		created: function () {
			console.log('调用了created钩子函数')
		},
		beforeMount: function () {
			console.log('调用了beforeMount钩子函数')
		},
		mounted: function () {
			console.log('调用了mounted钩子函数')
		}
	})
	vm.$mount('#app')

```

如果如下，可以看到，这个时候虽然对象中没有el参数，但通过$mount(el)动态添加的方式，也能够使生命周期顺利进行。

![](https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170716220914082-523984759.png)

#### 1.3.2 template参数选项的有无对生命周期的影响

1.如果Vue实例对象中有template参数选项，则将其作为模板编译成render函数。
2.如果没有template参数选项，则将外部的HTML作为模板编译（template），也就是说，template参数选项的优先级要比外部的HTML高。
3.如果1,2条件都不具备，则报错。
那么当模板同时放在template参数选项和外部HTML中，情况如何？

```js
	<div id="app"><p>模板是在外部HTML中找到的~</p></div>
	// 创建Vue实例（包含template参数选项）
	new Vue({
	el: '#app',
	template: '<div id="app"><p>模板在templated参数中找到了哟~</p></div>'
	})
```
结果如下：

![](https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170716221128019-208776221.png)

这表明template参数的优先级比外部HTML的优先级要高。

【注意】
1.为什么判断el要发生在判断template前面呢？
 
因为Vue需要通过el的“选择器”找到对应的template。总结一下上述的过程，Vue通过el参数去找到对应的template。然后,根据el参数给出的“选择器”，首先去Vue实例对象本身的template选项参数中找，如果没有template参数，则到外部HTML中寻找，找到后将模板编译成render函数
 
2.实际上，在Vue中，有render函数这个选项,它以createElement作为参数，做渲染操作。当然你也可以不调用createElement，而直接嵌入JSX。

#### 1.3.3 Vue的编译过程——把模板编译成render函数
Vue的编译实际上是指Vue把模板编译成 render 函数的过程。
 
我们可以通过Vue.compile这个实时编译模板的函数来看一看：
用官方文档的例子做个解释：

```html
<div>
	<header>
		<h1>I'm a template!</h1>
	</header>
	<p v-if="message">
		{{ message }}
	</p>
	<p v-else>
		No message.
	</p>
</div>
```
会被渲染成

```js
	function anonymous() {
	with(this){return _c('div',[_m(0),(message)?_c('p',[_v(_s(message))]):_c('p',[_v("No message.")])])}
}
```

### 1.4 beforeMount和mounted钩子函数间的生命周期

![](https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170716221246832-16408336.png)

我的理解是这样的：正因为render函数和template选项的“优先级”比外部HTML要高，所以，最后一般会存在一个外部HTML模板被Vue实例本身配置的模板所“替代”的过程也就是上图所说的 “replace”。

### 1.5 beforeUpdate钩子函数和updated钩子函数间的生命周期
![](https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170716221345957-955065712.png)

在Vue中，数据更改会导致虚拟 DOM 重新渲染，并先后调用beforeUpdate钩子函数和updated钩子函数。
 
但要注意一点：重渲染（调用这两个钩子函数）的前提是被更改的数据已经被写入模板中！

### 1.6 beforeDestroy和destroyed钩子函数间的生命周期

![](https://images2015.cnblogs.com/blog/1060770/201707/1060770-20170716221516332-283548713.png)

beforeDestroy钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。
 
destroyed钩子函数在Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

【注意】就如同在Vue实例上调用$mounted会使暂停的生命周期继续一样，调用$destroy()会直接销毁实例。
