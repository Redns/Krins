---
title: C#笔记(四)：常量和数组
date: 2022-01-14
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 常量

常量使用`const`关键字定义，大致可分为`整型常量`、`浮点型常量`、`字符常量`和`字符串常量`

![image-20220103194210844](https://s2.loli.net/2022/01/03/rQeh4WbAOVGcfqT.png)



常量定义格式如下：

```C#
const <val_type> <val_name> = <value>;
```



## 1.1 整型常量

可以包含`前缀`和`后缀`

![image-20220103194619112](https://s2.loli.net/2022/01/03/RCtwLQyNiqZ4dPv.png)



举例说明

```c#
212         /* 合法 */
215u        /* 合法 */
0xFeeL      /* 合法 */
078         /* 非法：8 不是一个八进制数字 */
032UU       /* 非法：不能重复后缀 */
```



## 1.2 浮点型常量

可使用`小数形式`或`指数形式`来表示

![image-20220103195034473](https://s2.loli.net/2022/01/03/HedC5i21SngkbTD.png)



举例

```c#
3.14159       /* 合法 */
314159E-5L    /* 合法 */
510E          /* 非法：不完全指数 */
210f          /* 非法：没有小数或指数 */
.e55          /* 非法：缺少整数或小数 */
```



## 1.3 字符常量

使用`单引号`括起，可存储`普通字符`、`转义字符`、`通用字符`，常用的转义字符如下

![image-20220103195236506](https://s2.loli.net/2022/01/03/IT59v4hWQlAs38N.png)



## 1.4 字符串常量

使用`双引号`括起，可包含`普通字符`、`转义字符`、`通用字符`



## 1.5 const VS static

### 区别

- `const`在`编译时`将变量替换为相应的值，`static`在`运行时`将变量替换为相应的值
- `const`编译完成后对应的值即被替换，`const`更改后所有调用过`该const变量`的文件都应该重新编译
- $const(CSharp) = final+static(Java)$



### 适用环境

- 永远不再改变的值使用`const`，如数学中的`pi`、`e`……
- 程序后期可能修改的值使用`static`



# 2 数组

## 2.1 创建和遍历

`C#`创建数组有以下几种方法

```c#
// 1.通过new声明
string[] strs = new string[2];

// 2.直接赋值
string[] strs = {"Hello", "World"};

// 3.声明并赋值
string[] strs = new string[2]{"Hello", "World"};
```



遍历数组除了基本的`for`和`while`循环外，`C#`还支持使用`forecah`语句

```c#
int[] nums = new int[10];
foreach(int n in nums){
    Console.WriteLine(n);
}
```



## 2.2 多维数组

多维数组的相关使用如下（以二维整形数组为例）

```c#
// 声明并初始化二维数组
int[,] matrix = new int[3, 3] {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
};

Console.WriteLine("The 3*3 matrix is below:");
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        Console.Write($"{matrix[i, j]} ");
    }
    Console.Write("\n");
}
```



## 2.3 交错数组

`交错数组`是`数组的数组`，类似`C语言`里的`数组指针`，每个元素指向一个`数组`。交错数组的定义和使用方法如下

```c#
int[][] scores = new int[2][] {
                new int[3]{1, 2, 3},
                new int[4]{4, 5, 6, 7}
};

Console.WriteLine("********************* 交错数组 *******************");
Console.WriteLine($"\n[scores.length]{scores.Length}");
foreach (int[] array in scores) {
    foreach (int n in array) {
        Console.Write($"{n} ");
    }
    Console.WriteLine();
}
```

- 交错数组的每个`元素(数组)`长度可以不等

- 交错数组的长度即为包含`数组的个数`

  

## 2.4 参数数组

`C#`中参数数组的用法和`Java`中的一致，举例如下

```c#
int[] nums = new int[] {1000, 2, 3, 17, 50};
getAverage(nums);

private static double getAverage(int[] nums) {
    double sum = 0;
    foreach (int num in nums) {
        sum += num;
    }

    return sum / nums.Length;
}
```



`C#`还提供了`params`关键字用于数组参数传递，使调用数组为形参的方法时，既可以传递数组实参，也可以传递一组数组元素。

```c#
getAverage(0, 1, 2, 3, 4);

private static double getAverage(params int[] nums) {
    double sum = 0;
    foreach (int num in nums) {
        sum += num;
    }

    return sum / nums.Length;
}
```



## 2.5 Array类

- 属性

![image-20220113192223638](https://s2.loli.net/2022/01/13/9MQDbjfO4RmZlGk.png)

- 方法

![image-20220113192312805](https://s2.loli.net/2022/01/13/FcIzpY7s1ZUo3vH.png)

![image-20220113192344341](https://s2.loli.net/2022/01/13/dnG4oye5R1LCmtP.png)