---
title: C#笔记(十四)：线程
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

`进程`是应用程序的`载体`，程序启动时会创建一个`进程`，而`进程`会启动多个`线程`。

<br>

# 1 Thread

`C#`中的`Thread类`可用于创建线程，本质上是通过`委托`实现的。创建线程的过程中，我们常常需要向子线程传递参数，目前主要有两种方法来实现，即`直接传参`和`自定义类传参`。

<br>

## 1.1 直接传参

`直接传参`适用于`无参无返回值`、`单个参数无返回值`两种类型的方法。使用`Thread`创建并启动线程的步骤如下

```Java
/*
 * Stage1.无参，无返回值
 */
public static void ThreadTest(){
    Console.WriteLine("ThreadTest started");

    Console.WriteLine("ThreadTest running");
    Thread.Sleep(3000);

    Console.WriteLine("ThreadTest completed");
}

Thread thread1 = new Thread(ThreadTest);
thread1.Start();


/* 
 * Stage2.单个参数，无返回值
 */

// object等价于System.Object
// 所有类型的基类,具体使用时强制类型转换
public static void DownloadFile(Object o){
    // 使用as强制类型转换，转换失败返回null
    // as不能给强转为结构体！
    string str = o as string;
    Console.WriteLine($"FileName:{str}");
}

// 在启动时填入参数
Thread thread2 = new Thread(DownLoadFile);
thread1.Start("JingkeImage");
```

当传递的参数较多时，可以将其整合为`结构体`，将结构体作为参数传递。

<br>

## 1.2 自定义类传参

`自定义类传参`的基本思想是，将`参数`和`方法`放在同一个`类`中，这样使用`类中的方法`创建的线程就能访问`类中的参数`了。举例如下

```Java
public class DownloadFile{
    string url;
    string storePath;
    
    public DownloadFile(string url, string storePath){
    	this.url = url;
        this.storePath = storePath;
    }
    
    public void Download(){
        Console.WriteLine($"Download file from {url}, file is stored in storePath.");
    }
}

// Step1.创建实例
DownloadFile downloadFile = new DownloadFile("https://www.kc114.com//ke.pdf", "D:\\");

// Step2.创建Thread实例
Thread thread = new Thread(downloadFile.Download);

// Step3.启动子线程
thread.Start();
```

<br>

## 1.3 ID获取

- **线程id**

  ```Java
  // Method1
  Environment.CurrentManagedThreadId
      
  // Method2
  Thread.CurrentThread.ManagedThreadId
  ```

  

- **进程id**

  ```Java
  Thread.GetCurrentProcessorId()
  ```


<br>


# 2 前台线程 & 后台线程

- `前台线程`：线程的一种，当==所有前台线程==结束之前程序不会停止运行。所有使用`Thread`创建的线程默认是`前台线程`！

- `后台线程`：会随着所有==前台线程==的结束而结束，而不管其自身是否结束。创建`后台线程`需要在`Thread类`中指定`参数IsBackground`。

```Java
// 前台线程
Thread thread = new Thread(ThreadTest){
    IsBackground = false	
};


// 后台线程
Thread thread = new Thread(ThreadTest){
    IsBackground = true
};
```

<br>

# 3 优先级

`C#`中的线程优先级从高到低分为`Highest`、`AboveNormal`、`Normal`、`BelowNormal`和`Lowest`，通过设置`Thread实例`中`Priority`的值可以更改线程的优先级，默认为`Normal`。线程优先级的设置方法如下

```Java
// Step1.创建实例
Thread thread = new Thread(ThreadTest);

// Step2.设置优先级
thread.Priority = ThreadPriority.Normal;

// Step3.启动线程
thread.Start();
```

<br>

# 4 线程状态

`C#`中线程的主要状态包括：`Unstarted`、`Running`、`WaitSleepJoin`

- `Unstarted`：线程被创建后，被CPU调用前的状态
- `Running`：线程被CPU调用
- `WaitSleepJoin`：使用了sleep方法后的线程



`Join`方法可以将`Thread`实例加入到当前线程，与`Start`方法的不同之处在于，`Start`方法会创建一个新的线程，与原线程并行运行互不影响；`Join`方法将线程直接和原线程合并，执行完子线程后才会执行原线程。

<br>

# 5 线程池

`创建线程`需要时间，当我们有大量线程要创建时，通过`Thread`创建线程消耗的时间较多。因此，使用`线程池`是一种比较好的方法。

<br>

## 5.1 适用条件

- 线程不需要持续运行，因为线程池创建的都是==后台线程==
- 线程工作量较小
- 线程只有单个参数，且为==object类型==

<br>

## 5.2 示例

```Java
public static void DownloadFile(object o) {
    Console.WriteLine($"[Running]{Environment.CurrentManagedThreadId}-" +
                      $"{Thread.GetCurrentProcessorId()}-" +
                      $"{Thread.CurrentThread.ManagedThreadId}");
    Thread.Sleep(100);
}



for (int i = 0; i < 10; i++) {
    // 加入线程池
    ThreadPool.QueueUserWorkItem(DownloadFile);
}
```

<br>

# 6 任务

## 6.1 创建任务

`创建任务`有两种方法：直接创建、通过任务工厂创建

```Java
// Method1.直接创建
Task task1 = new Task(TaskTest);
task1.Start();


// Method2.通过任务工厂创建
TaskFactory taskFactory = new TaskFactory();
Task task2 = taskFactory.StartNew(TaskTest);
```

<br>

## 6.2 连续任务

`连续任务`是指，两个任务的执行有先后顺序，一个任务执行完后另一个任务紧接着执行。创建连续任务可借助`ContinueWith方法`实现

```Java
static void First(){
    Console.WriteLine("I'm the first task.");
}

static void Second(){
    Console.WriteLine("I'm the second task.");
}

public static void Main(string[] args){
    // Step1.创建连续任务
    Task firstTask = new Task(First);
    Task secondTask = firstTask.ContinueWith(Second);
    
    // Step2.启动任务
    firstTask.Start();
}
```

<br>

# 7 锁

## 7.1 定义

`锁`可以用于解决`资源访问冲突`的问题，不同的线程要使用`同一把锁`，只有拥有`锁`的线程才能运行代码。

```Java
// Step1.创建一把锁
object _lock = new object();

// Step2.将可能冲突的资源锁住
lock(_lock){
    
}
```

<br>

## 7.2 死锁

`死锁`的产生原因是不同线程`锁的顺序`不同，避免`死锁`的方案就是一开始就确定`锁的顺序`。