---
title: C#笔记(三)：输入和输出
date: 2022-01-14
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 输入

常用的输入函数包括`ReadKey`、`ReadLine`

```C#
/**
 * @brief 从键盘获取一个字符
 * @return 一个对象，描述按下的Unicode字符
 */
Console.ReadKey();


/**
 * @brief 从键盘获取字符串
 * @return 输入的字符串值
 */
Console.ReadLine();
```



# 输出

常用的输出函数包括`Write`、`WriteLine`

```C#
/**
 * @brief 在控制台打印字符串
 * @param format 待打印的字符串
 */
Console.Write(format);


/**
 * @brief 在控制台打印字符串，自动在结尾添加换行符
 * @param format 待打印的字符串
 */
Console.WriteLine(format);
```



在输出较为复杂的字符串时，`C#`允许我们使用`字符串拼接`、`格式化字符`、`值代替`等方法显示字符串

```C#
int i, j, k;
i = 0;
j = 1;
k = 2;

// 打印 i, j, k
Console.WriteLine("[i]" + i + "; [j]" + j + "; [k]" + k);
Console.WriteLine("[i]{0}; [j]{1}; [k]{2}", i, j, k);
Console.WriteLine($"{i};{j};{k}");
```