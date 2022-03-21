---
title: C#笔记(十二)：反射
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

反射就是根据`类名`或`实例`来获取类中的`变量`、`属性`、`方法`的一种形式。

<br>

# 1 Type

## 1.1 定义

所有的类在创建时系统都会自动创建一个`Type`字段，该字段记录了每个类的所有信息，可以帮助我们将不同的类加以区分。获取`Type`字段的方法有两种

```Java
// 1.通过类名获取
Type type = typeof(ClassName);

// 2.通过实例获取
ClassName myClass = new ClassName();
Type type = myClass.GetType();
```

<br>

## 1.2 类的组成

利用该`Type类型`的变量可以获取类的`变量`、`属性`和`方法`，首先我们需要区分一下类中的不同组成

```Java
namespace Basic; 

/*
 * 用于测试反射的类
 */
public class ReflectTest {
    // Field
    public string size;
    public int stage;
    
    // Property
    public string name { get; }
    public int age { get; }
    
    public ReflectTest(string size, int stage, string name, int age) {
        this.size = size;
        this.stage = stage;
        this.name = name;
        this.age = age;
    }

    // Method
    public void PrintInfo() {
        Console.WriteLine($"Size:{size}\nStage:{stage}\nName:{name}\nAge:{age}");
    }
}
```

<br>

## 1.3 获取类的成分

获取类中的`变量`、`属性`、`方法`的格式如下

```Java
Type type = typeof(ReflectTest);    // 获取类中的Type信息
Console.WriteLine(type.Name);       // 获取类名
Console.WriteLine(type.Namespace);  // 获取类所在的命名空间
Console.WriteLine(type.Assembly);   // 获取类所在的程序集
            
// 获取类中的变量
Console.WriteLine("*********** Fields ************");
FieldInfo[] fieldInfos = type.GetFields();
foreach (FieldInfo fieldInfo in fieldInfos) {
    Console.WriteLine(fieldInfo.Name);
}
            
// 获取属性
Console.WriteLine("*********** Properties ************");
PropertyInfo[] propertyInfos = type.GetProperties();
foreach (PropertyInfo propertyInfo in propertyInfos) {
    Console.WriteLine(propertyInfo.Name);
}
            
// 获取方法
Console.WriteLine("*********** Methods ************");
MethodInfo[] methodInfos = type.GetMethods();
foreach (MethodInfo methodInfo in methodInfos) {
    Console.WriteLine(methodInfo.Name);
}
```

<br>

## 1.4 注意

1. 无法获取类中==私有==的成分，包括私有的==set==和==get==方法
2. 每个类在创建时，系统会默认创建四个方法，即`ToString()`、`GetType()`、`Equals()`、`GetHashCode()`

<br>

# 2 Assembly

`程序集`即程序的集和，表现形式为`.exe`或`.dll`文件，我们的各种类都必须编译为这些程序集才能够使用。

<br>

## 2.1 获取

程序集也包含了各种`类`，我们可以通过加载程序集来获取其中的各种信息。加载程序集有两种方法

```Java
// 1.根据程序集名称加载，它会在本地目录和全局程序缓存目录查找
Assembly assembly = Assembly.Load("AssemblyName");

// 2.根据路径查找
Assembly assembly = Assembly.LoadFrom(AssembltPath);
```

<br>

## 2.2 使用

程序集中包含了我们所有定义的`类`，获得这些类我们就能够使用`7.1`中的方法来获取类的成分，因此问题的关键是获取程序集中所有的`类`。获取类的方法如下

```Java
Type[] types = assembly.GetTypes();
foreach(Type type in types){
    // Get fields、properties、methods
}
```