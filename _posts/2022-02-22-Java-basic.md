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
(1)Arrays.asList()方法返回的对象是Arrays的内部类，对list的操作仍然反映在原数组上，因此这个list是定长的，不支持add、remove操作。

(2)由于asList方法接受的泛型参数，因此不能用于基本类型，只能使用如下方法：  
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

(1)实现：使用list.toArray()
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
                    return o1.getValue().compareTo(o2.getValue()); // 字符串比较使用a.compareTo(b)
                }
            });

            for (Entry<String, String> e: list) {
                System.out.println(e.getKey() + ":" + e.getValue());
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

(2)使用list自带的sort方法
```java
    List<Integer> list = new ArrayLIst<>();
    list.add(12);
    list.add(13);
    list.add(3);
    list.sort((o1, o2) -> {
        return o2 - o1;
    });
```

## 四、数组的的骚操作
(1) 取子数组
```java
    int[] cal = new int[5];
    int [] newInt =Arrays.copyOfRange(cal, 1, 2);
```
(2) 数组求和
```java
    int[] cal = new int[5];
    int sum = Arrays.stream(cal).sum();
```
(3) 数组排序(正序、反序)
```java
    Integer[] arr = {1, 22, 3};
    List<Integer> aa = Arrays.stream(arr).sorted(Comparator.naturalOrder()).collect(Collectors.toList()); // 正序
    List<Integer> bb = Arrays.stream(arr).sorted(Comparator.reverseOrder()).collect(Collectors.toList()); // 反序
```
(4) 二维数组排序
方法一:
```java
	int[][] p={p1,p2,p3,p4};
	Arrays.sort(p, new Comparator<int[]>() {
	@Override
	public int compare(int[] o1, int[] o2) {
		return o2[0] == o1[0] ? o1[1] - o2[1] : o1[0] - o2[0];
	}
	});
```

方法二:
```java
	int[][] p={p1,p2,p3,p4};
	Arrays.sort(p, (l1, l2) -> l2[0] == l1[0] ? l1[1] - l2[1] : l1[0] - l2[0]);
```


## 五、队列
学习链接：https://blog.csdn.net/JackComeOn/article/details/85455735

(1) 双向队列
```java
    Deque<Integer> deue = new LinkList();
    Deque<Integer> deue = new ArrayDeque();
    ArrayDeque采用数组的实现方式，LinkedList采用链表的实现方法。如果数据量较大，则使用LinkedList，否则优先使用ArrayDeque.
    pollLast和offerLast分别表示从尾部弹出、插入。
    peekFirst、peekLast分别表示获取队列中队首、队尾的第一个元素。
    poolFirst、offerFirst分别表示从队列的队首弹出、插入一个元素。
```


(2) 优先级队列
leetcode_239 使用比较器
```java
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        PriorityQueue<int[]> pq = new PriorityQueue<int[]>(new Comparator<int[]>() {
            public int compare(int[] pair1, int[] pair2) {
                return pair1[0] != pair2[0] ? pair2[0] - pair1[0] : pair2[1] - pair1[1];
            }
        });
        for (int i = 0; i < k; ++i) {
            pq.offer(new int[]{nums[i], i});
        }
        int[] ans = new int[n - k + 1];
        ans[0] = pq.peek()[0];
        for (int i = k; i < n; ++i) {
            pq.offer(new int[]{nums[i], i});
            while (pq.peek()[1] <= i - k) {
                pq.poll();
            }
            ans[i - k + 1] = pq.peek()[0];
        }
        return ans;
    }
```

## 六、Java比较器
学习链接：
https://blog.csdn.net/wo8vqj68/article/details/81164163

```java
    public class Main {

        public static void main(String[] args) {
        // write your code here
            int[] a = new int[]{2,4};
            System.out.println(a[0]);


            HashMap<Integer, Integer> map = new HashMap<>();
            map.put(1,2);
            map.put(2,32);
            for (Integer i : map.keySet()) {
                System.out.println(i);
            }

            Room room1 = new Room(2,2,10);
            Room room2 = new Room(2,1,10);
            Room room3 = new Room(3,2,20);
            Room room4 = new Room(3,1,15);
            Room room5 = new Room(3,1,25);
            List<Room> list = new ArrayList<>();
            List<Room1> list1 = new ArrayList<>();
            list.add(room1);
            list.add(room2);
            list.add(room3);
            list.add(room4);
            list.add(room5);
            Collections.sort(list);

            list1.add(new Room1(2,2,10));
            list1.add(new Room1(2,1,10));
            list1.add(new Room1(3,2,20));
            list1.add(new Room1(3,1,15));
            list1.add(new Room1(3,1,25));
            Collections.sort(list1, new Comparator<Room1>() {
                @Override
                public int compare(Room1 o1, Room1 o2) {
                    if (o1.length == o2.length) {
                        if (o1.width != o2.width) {
                            return o1.width - o2.width;
                        }

                        return o1.price - o2.price;
                    }
                    return o1.length - o2.length;
            }});
            System.out.println(list);
        }

        public static class Room1 {
            public int length;
            public int width;
            public int price;
            public Room1(int length, int width, int price) {
                this.length = length;
                this.width = width;
                this.price = price;
            }
        }

        public static class Room implements Comparable<Room> {
            public int length;
            public int width;
            public int price;
            public Room(int length, int width, int price) {
                this.length = length;
                this.width = width;
                this.price = price;
            }

            @Override
            public int compareTo(Room o) {
                if (this.length == o.length) {
                    if (this.width != o.width) {
                        return this.width - o.width;
                    }

                    return this.price - o.price;
                }

                return this.length - o.length;
            }
        }
    }
```
## 七、stream简单使用

```java
        HashMap<Integer, Test> roomDb = new HashMap<>();
        roomDb.put(1, new Test(1, 2,3));
        roomDb.put(3, new Test(3, 1,2));
        roomDb.put(4, new Test(23, 1,2));
        List<Test> test = roomDb.values().stream().filter(rm ->rm.area >= 2).collect(Collectors.toList());
        List<Integer> test1 = test.stream().map(Test::getArea).collect(Collectors.toList());
```
