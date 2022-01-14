---
title: C#笔记(一)：程序结构
date: 2022-01-03
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 程序结构

- `C#`中的程序结构包含`命名空间`、`类`、`方法`、`属性`，其相互之间的关系如下

![image-20220102232827756](https://s2.loli.net/2022/01/02/G2haZpAy6Yw3Ble.png)
<br>


- 一个命名空间可包含多个类，`.cs`文件中可通过`using`关键字引入其它的`命名空间`及其中的`类`，从而调用其中的`属性`和`方法`，常见的程序结构如下所示

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basic
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello .NET");
            Console.ReadKey();
        }
    }
}
```

