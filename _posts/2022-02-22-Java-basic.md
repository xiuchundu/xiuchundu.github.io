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

二.List转为Array

1.实现：使用list.toArray()
```java
    public class Array2List {
        public static void main(String[] args){
            List<String> list=new ArrayList<>();
            list.add("dog");
            list.add("cat");
            list.add("cow");
            String[] animals=list.toArray(new String[0]);
            for(String animal:animals){
                System.out.println(animal);
            }
        }
    }
```

## 二、TreeMap 升序|降序排序
https://www.cnblogs.com/shamo89/p/9885779.html

(1)TreeMap升序降序排列
```java
    TreeMap<Integer,Integer> map1 = new TreeMap<Integer,Integer>();  // 默认的TreeMap升序排列
    TreeMap<Integer,Integer> map2= new TreeMap<Integer,Integer>(new Comparator<Integer>(){ // 降序排列
         /* 
         * int compare(Object o1, Object o2) 返回一个基本类型的整型， 
         * 返回负数表示：o1 小于o2， 
         * 返回0 表示：o1和o2相等， 
         * 返回正数表示：o1大于o2。 
         */  
        public int compare(Integer a,Integer b){
            return b-a;            
        }
        });
```

(2)TreeMap按照value排序
    TreeMap底层是根据红黑树的数据结构构建的，默认是根据key的自然排序来组织（比如integer的大小，String的字典排序）。所以，TreeMap只能根据key来排序，是不能根据value来排序的（否则key来排序根本就不能形成TreeMap）。

今天有个需求，就是要根据treeMap中的value排序。所以网上看了一下，大致的思路是把TreeMap的EntrySet转换成list，然后使用Collections.sor排序。代码：
```java
    public static void sortByValue() {
            Map<String,String> map = new TreeMap<String,String>();
            map.put("a", "dddd");
            map.put("d", "aaaa");
            map.put("b", "cccc");
            map.put("c", "bbbb");

            List<Entry<String, String>> list = new ArrayList<Entry<String, String>>(map.entrySet());

            Collections.sort(list,new Comparator<Map.Entry<String,String>>() {
                //升序排序
                public int compare(Entry<String, String> o1, Entry<String, String> o2) {
                    return o1.getValue().compareTo(o2.getValue());
                }
            });

            for (Entry<String, String> e: list) {
                System.out.println(e.getKey()+":"+e.getValue());
            }
        }
 ```

## 三、list排序
(1)使用Collections.sort()
```java
    List<Integer> list = new ArrayLIst<>();
    list.add(12);
    list.add(13);
    list.add(3);
    Collections.sort(list, (o1, o2) -> {
        return o2 - o1;
    });
```

(1)使用list自带的sort方法
```java
    List<Integer> list = new ArrayLIst<>();
    list.add(12);
    list.add(13);
    list.add(3);
    list.sort((o1, o2) -> {
        return o2 - o1;
    });
```
