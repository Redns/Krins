---
title: C#笔记(八)：异常处理
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 异常类

`C#`中的异常类直接或间接派生于`System.Exception类`，包括常用的`System.ApplicationException`和`System.SystemException`。

- `System.ApplicationException`：由应用程序生成的异常，我们自己写的异常往往派生于此

- `System.SystemException`：所有预定义的系统异常的基类，常见的预定义的系统异常如下

<br>

# 2 异常处理框架

`C#`的异常处理机制与`Java`一致，都以`try-catch-finally`为框架

```Java
try{
    
}
catch(except e1){
    
}
catch(except e2){
    
}
finally{
    
}
```