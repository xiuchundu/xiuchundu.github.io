---
layout: post
title:  "Java基础知识"
categories: Java
tags: Java 基础知识
---

* content
{:toc}
## 一、Java List和Array之间的转换
https://blog.csdn.net/lpq374606827/article/details/93203927

一.Array 转为List
    ```java
    public class Array2List {
        public static void main(String[] args){
            List<String> listA=Arrays.asList("dog","cat","cow");
            String[] strs={"dog","cat","cow"};
            List<String> listB= Arrays.asList(strs);
            System.out.println(listA);
            System.out.println(listB);
        }
    }
    ```
  
### 注意事项 ###
1）Arrays.asList()方法返回的对象是Arrays的内部类，对list的操作仍然反映在原数组上，因此这个list是定长的，不支持add、remove操作。

2）由于asList方法接受的泛型参数，因此不能用于基本类型，只能使用如下方法：  
    ```java
      public class Array2List {
        public static void main(String[] args){
            int[] a={1,2,3,4,5};
            List<Integer> list=new ArrayList<>();
            for(int i:a){
                list.add(i);
            }
            System.out.println(list);
        }
    }
    ```

