---
title: C#笔记(十)：委托
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 定义

`委托`是一个类型，可以把`方法`赋值给该类型，从而通过该类型间接调用`方法`。`委托`的定义要包含`关键字delegate`、`返回值`、`类型名`和`参数列表`，格式如下

```Java
delegate <return_Type> InvokerName(<params>);
```

上述声明表示，`InvokerName`可以代表参数为`params`、返回值为`return_Type`的一簇函数。

<br>

# 2 基本使用

## **静态方法**

所有`委托`必须先定义，之后声明`委托变量`并赋给`委托变量`相应方法，最终才能通过`委托变量`间接调用方法。使用流程如下

```Java
// Step1.定义委托类型
delegate void IntMethodInvoker(int n);

// Step2.声明委托变量
IntMethodInvoker invoker = null;

// Step3.赋给委托变量对应的方法
public static void showValue(int n){
    Console.WriteLine($"Here is showValue, n is {n}.");
}
invoker = showValue;

// Step4.调用委托变量
invoker(100);
```

结果

```Java
Here is showValue, n is 100.
```

<br>

## **实例方法**

除了`静态方法`，`委托变量`还可以接受`实例方法`

```Java
delegate void GetString();

// 接收实例方法
double d = 3.14;
GetString getString = d.ToString;
getString();

// 调用委托变量
getString();
```

结果

```Java
3.14
```

<br>

# 5.3 委托数组与参数传递

`委托`定义和使用起来起始和`类型-变量`没有太大区别，只是它除了可以`存储数据`外，还可以作为`方法`使用。实际上，`委托变量`也可以构建`数组`并作为`参数`传递。

<br>

## 委托数组

`委托类型`可以定义数组，其中的每个元素都是`委托变量`，存储的都是`方法`。

```Java
public class Math{
    public static double Square(double d){
        return d*d;
    }
    
    public static double Mult2(double d){
        return d*2;
    }
}

// 定义委托类型
delegate double MathOperation(double d);

public static void Main(string[] args){
	// 创建委托数组
    MathOperation[] mathOperations = {
        Math.Square,
        Math.Mult2
    };
    
    // 调用委托数组中的委托变量
    foreach(MathOperation op in mathOperations){
        Console.WriteLine(op(100.0));
    }
}
```

<br>

## 参数传递

`委托变量`可以作为函数的`参数`传递。

```Java
public static void CalculateAndShowValue(MathOperation op, double value){
    Console.WriteLine(op(value));
}

CalculateAndShowValue(Math.Square, 10);
```

<br>

# 4 Action 和 Func

`C#`为我们提供了`Action`和`Func`委托类型，能够基本满足我们对委托的需求，他们的区别如下：

- `Action`：只能委托==无返回值==的方法，参数类型和数量任意
- `Func`：只能委托==有返回值==的方法，参数类型和数量任意

<br>

## Action

1. 无参数

   ```Java
   public static void ActionTest1() {
   
   }
   
   Action action1 = ActionTest1;
   action1();
   ```



2. 多个参数

   ```Java
   public static void ActionTest2(int n, double d){
       
   }
   
   // 参数类型用逗号隔开
   Action<int, double> action2 = ActionTest2;
   action2(9, 0.99);
   ```

   <br>

## Func

1. 无参数

   ```Java
   public static string FuncTest1(){
       
   }
   
   // Func委托的参数一定有返回值，所以必须指定返回值类型
   Func<string> func1 = FuncTest1;
   func1();
   ```



2. 多个参数

   ```Java
   public static string FuncTest2(int n, double d){
       
   }
   
   // 参数类型在前，返回值类型在后
   Func<int, double, string> func2 = FuncTest2;
   func2(9, 0.99);
   ```

   <br>

# 5 多播委托

单个`委托变量`可以指代多个方法，其是通过维护一个`Delegate数组`实现的。

<br>

## 增添方法

通过`+`、`-`可以`增加`、`减少`委托变量指代的方法。调用委托变量时，会依次调用`Delegate数组`里的方法，当其中任何一个方法抛出异常时，迭代过程停止

```Java
Action action = CSharp.ActionTest1;
action += CSharp.ActionTest1;
action();
```

<br>

## 遍历

遍历`委托变量`指代的方法的过程如下

```Java
// Step1.获取Delegate数组
Delegate[] delegates = action.GetInvocationList();

// Step2.遍历Delegate数组
foreach (Delegate d in delegates) {
    // Step3.调用指代的方法
    d.DynamicInvoke();
}
```

<br>

# 6 匿名函数

在函数体较小时，通过`定义函数-委托类型-调用委托变量`的过程显得较为繁琐，尤其是定义函数，可能会影响我们对整个主函数的把控。为此，`C#`允许我们定义匿名函数以简化操作，下面以`平方函数`为例展示匿名函数具体流程

```Java
Func<double, double> Square = delegate(double d){
    return d*d;
}

Square(10.0);
```



我们还可以不定义`委托变量`，直接定义`函数`，这种写法就是`Lambda表达式`

```Java
public static double Square(double d) => d*d;

Square(10.0);
```

<br>

# 7 订阅与发布

机制类似于`中断`，即预先设定好事件触发时所要执行的任务，待事件触发后便自动执行。`C#`中的`订阅与发布`是通过`关键字event`和`委托`实现的，基本流程为

1. 定义`委托类型`，声明`委托变量`
2. 将要执行的任务添加到`委托变量`中（+=、-=）
3. 运行`委托变量`所指代的方法

<br>

## 7.1 工具人下楼问题

`工具人下楼`问题即，某位同学下楼为`事件`，其他同学可`订阅`该事件，请求下楼同学帮忙做某项任务。

**ToolMan.cs**

```Java
// 任务清单
public delegate void DownStairDelegate();

public class ToolMan {
    public string name { get; }
    public DownStairDelegate? downStairDelegate;

    public void DownStair() {
        // 做自己的事
        Console.WriteLine($"工具人{name}下楼了");
        
        // 做订阅清单上的事
        if (downStairDelegate != null) {
            downStairDelegate();
        }
    }
}

```



**LazyMan.cs**

```Java
public class LazyMan {
    public string name { get; }

    public void TakeFood() {
        Console.WriteLine($"帮懒人{name}拿外卖");
    }

    public void TakePackage() {
        Console.WriteLine($"帮懒人{name}拿快递");
    }
}
```



**Program.cs**

```Java
class Program{
    public static void Main(string[] args){
        ToolMan toolMan = new ToolMan("Jing");
            
        LazyMan lazyMan1 = new LazyMan("Chang");
        LazyMan lazyMan2 = new LazyMan("Jingke");
        LazyMan lazyMan3 = new LazyMan("Gejun");
            
        // 订阅消息
        toolMan.downStairDelegate += lazyMan1.TakeFood;
        toolMan.downStairDelegate += lazyMan2.TakePackage;
        toolMan.downStairDelegate += lazyMan3.TakeFood;
            
        // 事件触发，执行任务
        toolMan.DownStair();
    }
}
```

<br>

## 7.2 event

- 上述`工具人下楼`问题的解决方案存在一些缺陷，例如

  1. 当==下楼事件==未触发时，我们依然可以通过调用==toolMan.downStairDelegate()==执行任务，与设计理念不符

  2. 用户可能通过使用`=`来替代`+=`和`-=`，从而破坏==任务清单==

  

- 为解决上述问题，我们可以使用`关键字event`来修饰`委托变量`，它对`委托变量`的限制如下

  1. 只能使用`+=`和`-=`
  2. 只能在类内调用指代的方法

  ```Java
  public event DownStairDelegate? downStairDelegate;
  ```