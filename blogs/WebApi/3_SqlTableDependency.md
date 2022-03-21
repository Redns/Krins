---
title: SqlTableDependency
date: 2022-03-21
tags:
- ASP.NET Core
- CSharp
- WebApi
- 数据库
categories:
- WebApi开发
---

## SqlTableDependency

### 1 简介

在很多场景下，我们需要将数据库中的部分数据显示出来，但不及时的显示可能会引发很多问题。例如，在某个用户不刷新浏览器界面的情况下，他将无法看到数据库的最新数据，而频繁的刷新不仅增加了服务器的负担，还降低了用户的使用体验。因此，我们有如下需求：

- 数据库数据更新时，自动将数据更新至页面而不需要手动刷新
- 用户在页面修改数据后，自动提交至数据库

当前 `Ajax` 实现了上述功能，其实际上是通过 `定时查询` 的方式实现的，即每隔一段时间查询 `数据库` 数据然后更新界面。在 `C#` 中，`SqlTableDependency` 亦可实现上述功能，下面将介绍其如何使用。

![uqh12or6fd](https://img1.imgtp.com/2022/03/14/R7cuIWaq.png)

从框图中不难看出，`SqlTableDependency` 实际上在 `数据库` 和 `Web Server` 之间建立了一条连接，当任何一方发生变动时，其都会向另一方发出 `通知`，进而使得两者同步。



### 2 相关代码

1. 创建 `Service` 类，用于创建 `SqlTableDependency` 并执行相关操作

   ```c#
   using Microsoft.EntityFrameworkCore;
   using TableDependency.SqlClient;
   using TableDependency.SqlClient.Base.Enums;
   using TableDependency.SqlClient.Base.EventArgs;
   
   namespace KC114.WebServer.Data.Access
   {
       /// <summary>
       /// 当数据库数据更新时，将调用该类型的委托
       /// </summary>
       public delegate void EntityChangedDelegate<T>(object sender, EntityChangedEventArgs<T> e);
   
       
       /// <summary>
       /// 当数据库数据更新时，将向回调函数传递该参数
       /// </summary>
       public class EntityChangedEventArgs<T> : EventArgs
       {
           public ChangeType ChangeType { get; set; } 		// 操作类型，Delete、Update、...
           public T OldValue { get; set; }					// 数据库实体旧值
           public T NewValue { get; set; }					// 数据库实体新的值
   
           public EntityChangedEventArgs(T newValue, T oldValue, ChangeType changeType)
           {
               OldValue = oldValue;
               NewValue = newValue;
               ChangeType = changeType;
           }
       }
   
   
       /// <summary>
       /// 该接口实际上是为了DI注入，若不想使用注入可直接让TableChangeBroadcastService实现IDisposable
       /// </summary>
       public interface ITableChangedBroadcastService<T> : IDisposable
       {
           event EntityChangedDelegate<T> OnEntityChanged;
           List<T> GetCurrentValues();
       }
   
   
       /// <summary>
       /// 1.该类将创建SqlTableDependency实例并绑定相关操作
       /// 2.SqlTableDependency要求实例必须为引用类型，所以泛型类型T需要加以限制
       /// 3.GetCurrentValues方法实际上是为了在初始化界面时，获取数据库中的数据，该方法可用Adapter/DbContext实现
       /// </summary>
       public class TableChangedBroadcastService<T> : ITableChangedBroadcastService<T> where T : class, new()
       {
           private string _connStr;                                    // 数据库连接字符串
           private string _tableName;                                  // 表名
           private SqlTableDependency<T> _notifyer;    
   
           public event EntityChangedDelegate<T> OnEntityChanged;      // 数据表刷新处理事件
   
   
           /// <summary>
           /// 初始化数据库依赖项
           /// </summary>
           /// <param name="connStr">数据库连接字符串</param>
           /// <param name="tableName">数据表名</param>
           public TableChangedBroadcastService(string connStr, string tableName)
           {
               _connStr = connStr;
               _tableName = tableName;
   
               // 初始化依赖对象
               _notifyer = new SqlTableDependency<T>(_connStr, _tableName);
               _notifyer.OnChanged += TableChanged;
               _notifyer.Start();
           }
           
   
           /// <summary>
           /// 数据表内容刷新触发事件
           /// </summary>
           /// <param name="sender"></param>
           /// <param name="e"></param>
           private void TableChanged(object sender, RecordChangedEventArgs<T> e)
           {
               OnEntityChanged(this, new EntityChangedEventArgs<T>(e.Entity, e.EntityOldValues, e.ChangeType));
           }
   
   
           /// <summary>
           /// 释放服务资源
           /// </summary>
           public void Dispose()
           {
               _notifyer.Stop();
               _notifyer.Dispose();
               GC.SuppressFinalize(this);
           }
   
   
           /// <summary>
           /// 获取数据表中的所有数据
           /// </summary>
           /// <returns></returns>
           public List<T> GetCurrentValues()
           {
               using var context = new OurDbContext();
               List<T> values = new();
               try
               {
                   if ((context != null) && (context.GetType().GetProperty(_tableName).GetValue(context, null) is DbSet<T> table))
                   {
                       values = table.ToList();
                   }
               }
               catch (Exception)
               {
   
               }
               return values;
           }
       }
   }
   ```

   

2. 若要使用 `DI注入`，请注册服务

   ```c#
   string connStr = "";
   string tableName = "";
   builder.Services.AddScoped<ITableChangedBroadcastService<YourEntity>(_ => new TableChangedBroadcastService<YourEntity>(connStr, tableName));
   ```



3. 在代码中引用该服务，这里以 `Blazor Server Side` 为例，实体类型为 `ComponentEntity`

   ```c#
   // 若不使用DI注入，不需要引用ITableChangeBroadcastService，直接创建TableChangeBroadcastService实例
   @inject ITableChangedBroadcastService<ComponentEntity> ComponentService
   @implements IDisposable
       
   /// <summary>
   /// 页面初始化函数
   /// </summary>
   /// <returns></returns>
   protected override async Task OnInitializedAsync()
   {
       // 绑定更新事件
       ComponentService.OnEntityChanged += ComponentChanged;
       
       // _componentsAll用户存储数据库中的所有componentEntity实体
       _componentsAll = ComponentService.GetCurrentValues();
   }
   
   
   /// <summary>
   /// 页面刷新函数
   /// </summary>
   /// <param name="sender"></param>
   /// <param name="args"></param>
   private async void ComponentChanged(object sender, EntityChangedEventArgs<ComponentEntity> args)
   {
       // 查找本地中是否存在操作的实体，实际上这是在隐性地判断数据库操作类型（增、删、查、改），同时也可更新本地的数据
       // 判断数据库操作类型也可直接读取args中的ChangeType字段，其取值类型为TableDependency.SqlClient.Base.Enums.ChangeType
       var newComponent = _componentsAll.FirstOrDefault(x => x.Id == args.NewValue.Id);
       
       // 若在本地查找到了参数中的NewValue实体，则不可能是“增加”操作
       // 实际测试中，当操作为“删除”时，理论上NewValue为null，OldValue为新的实体，但发现NewValue为待删除的实体，而OldValue为null
       // 因此，直接使用ChangeType判断数据库操作，若为Delete操作，则直接移除NewValue
       if(newComponent != null)
       {
           if(args.ChangeType == TableDependency.SqlClient.Base.Enums.ChangeType.Delete)
           {
               _componentsAll.Remove(newComponent);
           }
           else
           {
               _componentsAll.Remove(newComponent);
               _componentsAll.Add(args.NewValue);
           }
       }
       else
       {
           _componentsAll.Add(args.NewValue);
       }
   
       // 修改本地数据后，需调用StateHasChabged方法强制刷新界面
       await InvokeAsync(() => StateHasChanged());
   }
   ```



### 3 数据库修改

要正常运行 `SqlTableDependency` ，我们还需要修改数据库用户权限，若不修改则可能出现以下错误

```c#
// 【错误类型】无法获取数据
sql server Could not obtain information about Windows NT group/user,error code 0x534
    
// 【解决方法】
alter database [<dbname>] set enable_broker with rollback immediate;
```

```c#
// 【错误类型】缺少权限
TableDependency.SqlClient.Exceptions.UserWithNoPermissionException:“User without permissions.
    
// 【解决方法】
// 更改用户数据库权限，目前笔者也不清楚SqlTableDependency究竟需要哪些权限，因此全部打开
```

下面将演示具体怎样修改：

1. 选中要操作的数据库，右键 - 属性

   ![image-20220314212657739](https://img1.imgtp.com/2022/03/14/sz4SMJLg.png)



2. 选中权限，设置 `用户或角色` 为连接字符串中的 `用户`，并打开所有权限

   ![image-20220314212936941](https://img1.imgtp.com/2022/03/14/0jcosBoT.png)



3. 选中安全性 - 登录名 - 要操作的数据库，右键属性

   ![image-20220314213113303](https://img1.imgtp.com/2022/03/14/4PqzSttS.png)



4. 设置服务器角色

   ![image-20220314213135518](https://img1.imgtp.com/2022/03/14/PT3bbB2P.png)



5. 选中用户映射，修改相关设置（不要勾选 db_owner，否则可能无法在 SMSS 中直接修改数据表）

   ![image-20220314213217945](https://img1.imgtp.com/2022/03/14/FlY0fvHm.png)



6. 选中安全对象，勾选所有权限

   ![image-20220314213345569](https://img1.imgtp.com/2022/03/14/7EfT9Oep.png)



7. 尝试在 `SMSS` 上直接修改数据库表，若无法修改请返回步骤1，选中文件，确保所有者为 `sa`

   ![image-20220314213558040](https://img1.imgtp.com/2022/03/14/OURERRsW.png)