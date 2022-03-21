---
title: C#笔记(九)：类
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 方法

`C#`中的方法与`Java`中的大体一致，除了`引用传递参数`和`输出传递参数`

<br>

## 引用传递参数

类似于`C语言`中的指针，传递的参数不是实参的拷贝而是实参的引用，引用传递参数使用`ref`关键字定义

```Java
// 定义
public void swap(ref int x, ref int y){
    int temp = x;
    x = y;
    y = temp;
}

// 使用
int a = 1, b = 2;
swap(ref a, ref b);
```

<br>

## 输出传递参数

传递的参数不用于输入，而用于`输出`，使用`out`关键字定义

```Java
// 定义
public void getValue(out int x, out int y){
    x = 1;
    y = 2;
}

// 使用
int a, b;
getValue(out a, out b);
```

<br>

## get 和 set

在`Java`中获取实例的相关属性通常是使用`get()`和`set()`方法来实现，在保护属性不暴露的同时可以增加检查，非常方便。`C#`为我们提供了相应的语法糖支持，让我们可以更简单地实现这些功能

```Java
public class Cloud{
    private string _name;
    public string name{
        get{
            return _name;
        }
        
        set{
            // 在此执行检查等操作
            _name = value;
        }
    }
}
```



通过上述操作，我们就能通过访问`Cloud`实例中的`name`来间接访问`_name`，相应的操作如下

```Java
Cloud cloud = new Cloud();
cloud.name = "jing";
```



注意！以下操作是错误的！当你试图给`name`赋值时，程序会陷入`set{}`的死循环！

```Java
public class Cloud{
    public string name{
        get{
            return name;
        }
        
        set{
            // 在此执行检查等操作
            name = value;
        }
    }
}
```

<br>

# 2 继承

## 2.1 格式

`父类Cloud`

```Java
public class Cloud {
        protected string name;
        protected string birth;
        protected int stage;

    	// 父类构造方法
        public Cloud(string name, string birth, int stage) {
            this.name = name;
            this.birth = birth;
            this.stage = stage;
        }
    
    	// 父类方法打印信息
    	public virtual void(){
            Console.WriteLine($"[Name]{name}\n[Birth]{birth}\n[Stage]stage");
        }
    }
```



`子类RealCloud`

```Java
public class RealCloud : Cloud{
    private int weight;
    
    // 子类构造方法
    public RealCloud(string name, string birth, int stage) : base(name, birth, stage) {
    }
    
    // 子类方法打印信息
    public override void(){
        Console.WriteLine($"[Name]{name}\n[Birth]{birth}\n[Stage]stage\n[Weight]{weight}");
    }
}
```

- 一个类只能继承`一或零个`父类
- 子类继承父类的格式为`class 子类名:父类名`，如`class RealCloud : Cloud`
- 子类继承父类后`必须实现父类的构造方法`，使用`base()`方法来初始化父类属性

<br>

## 2.2 重写父类方法

`父类Cloud`

```Java
public class Cloud {
        protected string name;
        protected string birth;
        protected int stage;
    
    	// 父类方法打印信息
    	public virtual void(){
            Console.WriteLine($"[Name]{name}\n[Birth]{birth}\n[Stage]stage");
        }
    }
```



`子类RealCloud`

```Java
public class RealCloud : Cloud{
    private int weight;
    
    // 子类方法打印信息
    public override void(){
        Console.WriteLine($"[Name]{name}\n[Birth]{birth}\n[Stage]stage\n[Weight]{weight}");
    }
}
```

- 使用`protected`关键字可以让`子类`访问`父类`中的元素
- 使用`virtual`和`override`关键字可以允许子类`重写`父类中的方法

<br>

# 3 泛型

泛型允许我们为多种类型的变量创建同样的代码，可为`类`、`方法`等使用泛型

```Java
public class MyGenericArray<T> {
    private T[] array;
    public MyGenericArray(int size) {
        array = new T[size + 1];
    }

    public T getArray(int index) {
         return array[index];
    }

    public void setArray(int index, T value) {
         array[index] = value;
    }
}


MyGenericArray<int> arrayInt = new MyGenericArray<int>(10);
for (int i = 0; i < 10; i++) {
    arrayInt.setArray(i, i*10);
}

Console.Write("[arrayInt]");
for (int i = 0; i < 10; i++) {
    Console.Write("{0} ", arrayInt.getArray(i));
}
Console.Write("\n");
                 
MyGenericArray<char> arrayChar = new MyGenericArray<char>(10);
for (int i = 0; i < 10; i++) {
    arrayChar.setArray(i, (char)(i + 97));
}

Console.Write("[arrayChar]");
for (int i = 0; i < 10; i++) {
    Console.Write("{0} ", arrayChar.getArray(i));
}
```

<br>

# 4 多态

多态是同一个行为具有多个不同表现形式或形态的能力。多态性可以是静态的或动态的。在·中，函数的响应是在编译时发生的。在`动态多态性`中，函数的响应是在运行时发生的。

<br>

## 4.1 函数重载

同一范围内对相同名称的函数有不同的定义

```Java
class Test{
    public void print(int n){
        Console.WriteLine($"[Int]{n}");
    }
    
    public void print(float f){
        Console.WriteLine($"[Float]{f}")
    }
}
```

<br>

## 4.2 运算符重载

`C#`允许用户自定义运算符，通过关键字`operator`后跟`运算符`来实现的。与其他函数一样，重载运算符有返回类型和参数列表。重定义类`Box`的`加法`方法如下

```Java
class Box{
    public static Box operator+(Box box1, Box box2){
        Box box = new Box();
        // xxx
        return box;
    } 
}
```



并非所有运算符均能重载，下面是`C#`中运算符的`重载能力`

![image-20220114120908497](https://s2.loli.net/2022/01/14/jrnN8mzIaHfGPk3.png)

<br>

## 4.3 抽象类和虚方法

- `父类`中的方法使用`virtual`修饰，具体的子类使用`override`修饰

- `父类`是抽象类，`子类`实现具体的方法

<br>

# 5 NameSpace

- 命名空间以关键字`namespace`开始，后跟命名空间的名称

  ```Java
  namespace Shape{
      
  }
  ```

  

- `命名空间`可包含多个类，不同的`命名空间`中的类可以重名

  ```Java
  namespace namespace_1{
      class Test{
          
      }
  }
  
  namespace namespace_2{
      class Test{
          
      }
  }
  ```



- 调用命名空间中的`类`时，使用`using`关键字导入`命名空间`可简化程序设计

  ```Java
  // 1.不使用using关键字
  namespace_1.Test test = new namespace_1.Test();
  
  // 2.使用using关键字
  using namespace_1;
  Test test = new Test();
  ```



- 命名空间与`文件`的名称不需要相同

  ```Java
  // A.cs
  namespace B{
      
  }
  ```

<br>

# 6 Interface

`Interface`即接口，只声明函数而不能实现。`class`和`struct`能继承任意个`Interface`，继承的格式与继承`父类`一致，当继承多个`父类或接口`时，不同的`父类或接口`使用`逗号(,)`分割

```Java
public interface Movement{
    void greet()
}

public class RealCloud : Cloud, Movement{
    public void greet(){
        Console.WriteLine($"Hello, {name}");
    }
}
```