---
title: C#笔记(十五)：JSON文件
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 简介

`Json`是一种简洁、高效、易用的数据格式，基本组成是`列表`和`字典`

<br>

## 1.1 组成结构

- 每个`大括号`中的内容应被视为一个`类`，每个`中括号`中的内容被视为一个`数组`
- `大括号`间的嵌套看作`类`的嵌套，应当为每个不同类型的大括号创建类

![image-20220119160318490](https://s2.loli.net/2022/01/19/kptgZaydGYS8jAw.png)

<br>

## 1.2 创建类

以上述`Json文件`为例，其应该创建两个类：`Cloud`和`Size`，其中`Cloud`中的一个变量类型为`Size`。

```Java
public class Cloud {
    public string? time { get; set; }
    public string? name { get; set; }
    public int age { get; set; }
    public Size size = new Size();			// 此处最好创建一个实例，否则反序列化能成功，序列化失败
    public int stage { get; set; }
}


public class Size {
    public int up = 0;
    public int down = 0;
    public int middle = 0;

    public override string ToString() {
        return $"{up}-{down}-{middle}";
    }
}
```

<br>

# 2 序列化

`序列化`就是把`对象`转换为`字符串`的过程，序列化后的`对象`可用于设备之间交换数据，通常我们把数据存储在`json`文件中。序列化的基本步骤为：

1. 创建实例并赋值
2. 调用序列化函数

```Java
Cloud cloud = new Cloud();
string str = JsonConvert.SerializeObject(cloud);
Console.WriteLine(str);
```

<br>

# 3 反序列化

以如下文件为例，可见该文件存储了一个`Cloud数组`，因此反序列化时应指明类型为`Cloud[]`

```json
[
    {
        "time": "senior",
        "name": "Yuanke",
        "age": 21,
        "size": {
            "up": 37,
            "down": 36,
            "middle": 39
        },
        "stage": 1
    },

    {
        "time": "college",
        "name": "Jingke",
        "age": 22,
        "size": {
            "up": 36,
            "down": 37,
            "middle": 39
        },
        "stage": 1
    }
]
```

```Java
Cloud[]? clouds = JsonConvert.DeserializeObject<Cloud[]>(File.ReadAllText(@"Clouds.json"));
foreach (Cloud cloud in clouds) {
    Console.WriteLine($"[Cloud]{cloud.name} {cloud.time} {cloud.age} {cloud.size} {cloud.stage}");
}
```