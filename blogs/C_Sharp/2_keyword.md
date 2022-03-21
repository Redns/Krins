---
title: C#笔记(二)：关键字与数据类型
date: 2022-01-14
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 关键字

## 1.1 一览表

![image-20220102233838783](https://s2.loli.net/2022/01/02/LWsi4ZPV2RMQo1f.png)

![image-20220102233852488](https://s2.loli.net/2022/01/02/al9XQpYkq1Fnyv6.png)



## 1.2 前缀

`C#`中的前缀包括`public`、`private`、`abstract`等等，其主要分为`权限类`和`功能类`。

- `权限类`：声明属性或方法的权限，限定其使用范围

- `功能类`：实现某种特定功能

  

**权限类**

- `public`：对访问成员==没有级别限制==

- `private`：只能在==类的内部==访问

- `protected`：在==类的内部==或者在==派生类==中访问，不管该类和派生类是不是在同一程序集中

- `internal`：只能在==同一程序集(Assembly)==中访问

  

**功能类**

- `virtual`和`override`：用于子类重写父类方法
- `abstract`：使用abstract修饰的类不能实例化，可以暂时不实现接口，等待子类实现



# 2 数据类型

`C#`中的数据类型关系如下

![image-20220103122510090](https://s2.loli.net/2022/01/03/uwMPznVt2oh9RiD.png)



## 2.1 值类型

![image-20220103120659991](https://s2.loli.net/2022/01/03/hwKjfaEiCYOFL81.png)



## 2.2 引用类型

**object 类型**

- 可以被分配给任何类型，但在分配值之前需要进行类型转换
- 值类型转换为对象类型时称为`装箱`，对象类型转换为值类型时称为`拆箱`

```C#
object obj;

// 装箱
obj = 100; 
```



**dynamic 类型**

- 可存储任何类型的数据在`dynamic`类型变量中，类型的检查发生在运行过程中
- 对象类型的检查发生在编译过程中

```C#
dynamic d = 99;
```



**String 类型**

- 派生自`Object`类型

- 可将任何字符串的值赋给`String`类型变量，赋值方式包括`@`和`“”`
  - `@`：编译器将转义符号当作普通字符处理，任意空格、换行、缩进都计算在内
  - `""`：对特殊符号进行转义

```C#
String str1 = "C:\\Windows";
String str2 = @"C:\Windows"
```



## 2.3 指针类型

- 存储另一种类型的地址
- 与`C`和`C++`中的指针功能一致

```C#
char* ptr1;
int* ptr2;
```



## 2.4 可空类型

可空类型是指除了除了存储正常的数据范围，变量还可以存储`null`，包括某些不能赋值`null`的类型如`int`、`double`，定义可空类型有两种方法

```C#
// 方法1
<var_type>? <var_name> = var_value;

// 方法2
Nullable<<var_type>> <var_name> = new Nullable<<var_type>>(var_value);
```



`可空类型`和`不可空类型`间可能相互赋值，若把存储`null`的`可空类型`赋值给`不可空类型`便会报错。为此，有必要为`不可空变量`保留一个预设值

```c#
// 若 n1 为 null 则把 preSet_value 赋给 n2，否则把 n1 赋给 n2
int? n1 = null;
int  n2;

n2 = n1 ?? preSet_value;

// 相当于
if(n1 == null){
    n2 = preSet_value;
}

else{
    n2 = n1;
}
```



## 2.5 值类型 VS 引用类型

- `struct`是值类型，`class`是引用类型
- `struct`直接在`栈`中分配内存，`class`直接在`堆`中分配内存
- `栈`中的内存，会在函数调用完成后自动回收；堆中的内存由`C#`运行时自动回收`(GC)`
- 函数调用过程中，`class`拷贝只是拷贝`地址(浅拷贝)`，`struct`拷贝是`所有数据`都拷贝`(深拷贝)`



## 2.6 类型转换

![image-20220103185853144](https://s2.loli.net/2022/01/03/zJOA23DFhInBcp1.png)



- 内置的类型转换方法如下，推荐使用`Convert`中的这些内部转换方法

![image-20220103190018228](https://s2.loli.net/2022/01/03/KLxmUCsVSXelwRo.png)

![image-20220103190044651](https://s2.loli.net/2022/01/03/OaRQudsl6nXcqor.png)



- 举例

```c#
double d = 3.1415926;

// 在变量前加转换后的类型
int i = (int)d;
Console.WriteLine("[i]" + i);

// 调用内部类型转换方法，可能无法完成某些转换
Console.WriteLine(i.ToString());

// 调用Convert中的内部转换方法(推荐)!!!!!!!!!!!
Console.WriteLine(Convert.ToBoolean(i));
```