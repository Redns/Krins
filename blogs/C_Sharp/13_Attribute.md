---
title: C#笔记(十三)：特性(Attribute)
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 Obsolete

将`方法`标记为`弃用`，通常放在`方法`前，格式如下

```Java
// 1.标记为"弃用"
[Obsolete]

// 2.标记为"弃用"并显示提示信息
[Obsolete("information")]

// 3.标记为"弃用"并显示提示信息，禁止再使用
[Obsolete("information", true)]
```

<br>

# 2 Conditional

`Conditional`特性可以依据`某些条件`来选择是否执行`方法`。例如程序的调试信息我们不希望用户看到，但直接删去后期修改不方便，因此最佳方案是使用`Conditional`特性，选择性地使用/不适用某些方法。`Conditional`的格式如下

```Java
// 若Flag定义过则执行，否则不执行
[Conditional("Flag")]
```



举例说明`Conditional`特性的使用方法

```Java
#define ShowString	// 注释此定义则无法使用ShowString方法

[Conditional("ShowString")]
public static void ShowMessage(string message) {
    Console.WriteLine(message);
}

public static void main(string[] args){
    ShowString("Hello cSharp!");
}
```

<br>

# 3 Caller

`Caller`为我们提供了一系列特性，供我们查找方法调用的`行号（在哪一行调用）`、`路径（调用方法的cs文件绝对路径）`、`调用者（哪个函数调用了该方法）`，分别是`CallerLineNumber`、`CallerFilePath`、`CallerMemberName`。他们的使用方法如下

```Java
// 1.特性是加在参数前的
// 2.参数要有默认值，方法运行时系统自动把相应信息赋值给参数
public static void ShowMessage(string message, 
                              [CallerLineNumber]int lineNumber = 0,
                              [CallerFilePath]string filePath = "",
                              [CallerMemberName]string memberName){
    Console.WriteLine(message);
    Console.WriteLine(lineNumber);
    Console.WriteLine(filePath);
    Console.WriteLine(memberName);
}
```

<br>

# 4 DebugStepThrough

在`调试`时我们可以选择进入方法内部逐行执行代码，关键字`DebugStepThrough`可以修饰方法，当进入`Debug模式`且该方法处设置断点后，我们无法再进入该方法内部逐行执行代码，而是直接运行方法。使用格式如下

```Java
[DebugStepThrough]
public static void Test(){
    Console.WriteLine("This is a debug test.");
}
```

<br>

# 5 自定义特性

特性本质上是一个类，可以由用户自定义，但所有的特性必须继承自`Attribute类`。自定义特性的步骤如下

1. 创建属性类并继承==Attribute类==，名称必须以==Attribute==结尾
2. 创建属性相关变量，并建立构造方法
3. 指定属性的作用范围

下面以`开发者属性`为例，自定义一个包含开发者信息的属性

```Java
// Step3.指定属性的作用范围是类和方法
[AttributeUsage(AttributeTargets.Class |
                AttributeTargets.Method)]


// Step1.创建属性类并继承Attribute
public class DeveloperAttribute : Attribute {
    
    
    // Step2.创建相关变量和构造方法
    public string name;
    public string version;
    public string description;

    public DeveloperAttribute(string name, string version, string description) {
        this.name = name;
        this.version = version;
        this.description = description;
    }
}
```



注意！属性类中只能包含==构造方法==，不能包含其它方法！上述自定义属性的使用方法如下

```Java
[Developer("jing", "v1.0.0", "Attribute test")]
public static void CustomAttributeTest() {
    Console.WriteLine("This is a custom attribute test.");    
}
```