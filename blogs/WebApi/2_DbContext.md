---
title: 数据库上下文
date: 2022-03-08
tags:
- ASP.NET Core
- CSharp
- WebApi
- 数据库
categories:
- WebApi开发
---

## 简介

[DbContext](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext?view=efcore-6.0) 可用于简化程序与数据库的交互，可通过`Nuget`搜索`[Microsoft.EntityFrameworkCore]`下载使用。`DbContext`相当于数据库实例，`DbSet`相当于数据库中的表。实际应用中，用户应继承`DbContext类`实现自己的子类，在子类中为每个数据实体添加`DbSet`属性。若这些属性的`Setter`权限为`public`，那么当`DbContext`实例被创建时，这些属性均会被初始化。



## 环境搭建

使用前需要使用 `Nuget` 安装如下包

![image-20220325205205858](http://imagebed.krins.cloud/api/image/1648247213378.jpg)



## 创建数据库上下文

1. 在工程目录下创建`Model`文件夹，用于存放数据实体和数据库上下文

2. 选中`Model`文件夹，右键添加 ----> 类（建议类名以`DbContext`结尾）

   ![image-20220305002112066](https://xg3.jiashumao.net/2022/03/05/wWIr5HYg.png)



3. 添加构造函数，根据实际情况添加`DbSet`属性

   ![image-20220305002306473](https://xg3.jiashumao.net/2022/03/05/SCe2v9IZ.png)

​		以上图为例，该上下文包含一个`DbSet<User>`类型的属性且属性名为`Users`，则 EF 框架将默认在数据库中查找 `Users` 表。



4. 重写`OnConfiguring`方法，连接数据库（以SQL Server为例）

   ```c#
   // TrustServerCertificate属性为True表示让SQL Server信任HTTPS连接
   string connectStr = "Data Source=[server_instance];Initial Catalog=[database_name];User ID=[username];Pwd=[password];TrustServerCertificate=true";
   protected override void OnConfiguring(DbContextOptionsBuilder opt)
   {
       opt.UseSqlServer(connectStr);
   }
   ```

   

5. 在`Program.cs`文件中注册`DbContext`服务

   ```c#
   /// <summary>
   /// 向容器中注入服务
   /// </summary>
   builder.Services.AddDbContext<OurDbContext>();
   ```
   




## 操作数据库

在上一步中我们知道了如何使用`DbContext`连接数据库，下面介绍如何对数据库中的表进行增、删、查、改操作。由于一个数据库中通常包含若干个表，每个表对应着一个数据实体，每个实体的操作往往是不同的。因此，我建议在`DbContext`子类的命名空间中，分别为每个实体创建类，以用于数据库操作。

```c#
namespace Model
{
	public class OurDbContext : DbContext
    {
        // ...
    
        // 映射数据库中的表
        public DbSet<UserEntity>? Users { get; set; }               // 用户表
        public DbSet<AccessEntity>? Accesses { get; set; }          // 出入登记表
    }


    /// <summary>
    /// 用户表相关操作
    /// </summary>
    public class SQLUserData
    {
    }
    
    
    /// <summary>
    /// 出入登记表相关操作
    /// </summary>
    public class SQLAccessData
    {
    }
}
```



### 初始化

想要操作数据库中的表，需要分两步完成：

1. 获取数据库实例
2. 获取数据库中表的实例

下面以`Users`表为例，演示如何获取数据库中表的实例

```c#
/// <summary>
/// 用户表相关操作
/// </summary>
public class SQLUserData
{
    // OutDbContext为之前创建的数据库上下文
    private OurDbContext? _context { get; set; }
    public SQLUserData(OurDbContext context)
    {
        _context = context;
    } 
}


public class Test
{
	public void InitSQLUserData()
    {
        // 使用using后，系统会在合适的时机释放连接资源
    	using var context = new OurDbContext();   
        SQLUserData sqlUserData = new SQLUserData(context);
        
        // 增、删、查、改
        // ...
    }    
}
```



### 增删查改

下面以`Users`表为例，演示如何执行增删查改操作

```c#
/// <summary>
/// 用户表相关操作
/// </summary>
public class SQLUserData
{
    // OutDbContext为之前创建的数据库上下文
    private OurDbContext? _context { get; set; }
    public SQLUserData(OurDbContext context)
    {
        _context = context;
    } 
    
    /// <summary>
    /// 添加用户
    /// </summary>
    /// <param name="user"></param>
    public void Add(UserEntity user)
    {
        // 添加完成后务必要保存
        _context?.Add(user);
        _context?.SaveChanges();
    }


    /// <summary>
    /// 获取用户列表
    /// </summary>
    /// <returns></returns>
    public IEnumerable<UserEntity>? Get()
    {
        return _context?.Users?.ToList();
    }


    /// <summary>
    /// 根据ID获取用户
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public UserEntity? Get(string id)
    {
        return _context?.Users?.FirstOrDefault(u => u.Id == id);
    }
}
```



## 注意

### 并行执行

`Entity Framework Core `对于同一个`DbContext实例`不支持并行执行，例如

- 异步查询的并行调用
- 不同线程对`DbContext实例`的明确并行调用

可通过下列方法避免问题

- 执行`async`调用时，立即使用`await`
- 每次操作均使用不同的`DbContext实例`



### 主键

我们知道，数据库表对应着一个 `实体`，`EF框架` 要求实体必须设置 `主键`。默认情况下，`EF框架` 将实体中名为 `Id` 的变量作为主键，若实体中不包含名为 `Id` 的属性或想要设置其它属性为 `主键`，则需要使用特性 `Key` 指定。

```Java
using System.ComponentModel.DataAnnotations;

private string _pwd;
[Key]
public string Pwd
{
    get { return _pwd; }
    set { _pwd = value; }
}
```

