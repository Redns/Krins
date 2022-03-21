---
title: 数据库操作(Adapter) 
date: 2022-03-21
tags:
- ASP.NET Core
- CSharp
- WebApi
- 数据库
categories:
- WebApi开发
---

## Adapter

### 1 连接/断开数据库

```c#
SqlConnection conn;
SqlCommand comm;
SqlDataAdapter adapter;

// 连接语句
string connStr = "Data Source=(local);Database={databaseName};User ID={userName};Password={password}";


/// <summary>
/// 连接mySql数据库
/// </summary>
/// <returns>连接成功返回true，失败返回false</returns>
private bool DBConnection()
{
    string connStr = Program.settings.data.connectStr;
    if(conn == null)
    {
        conn = new SqlConnection(connStr);
    }
    try
    {
        conn.Open();
        return true;
    }
    catch(Exception)
    {
        return false;
    }
}


/// <summary>
/// 释放与连接数据库相关的资源
/// </summary>
private void Dispose()
{
    if(adapter != null)
    {
        adapter.Dispose();
        adapter = null;
    }

    if(comm != null)
    {
         comm.Dispose();
         comm = null;
    }

    if(conn != null)
    {
         conn.Close();
         conn.Dispose();
         conn = null;
    }
}
```

<br>



### 2 基本操作

#### 增

**SQL向表中添加成员的命令为**

```sql
# 向表tableName中添加成员
INSERT INTO {tableName} VALUES('{paramName1}','{paramName2}')
```

- 成员类型为字符串时必须加单引号，否则不加
- VALUES中必须包含所有列，且按照表中的顺序排列
- 若要设置列为`NULL`则直接填`NULL`，不填为`空`而不是`NULL`



**`C#`代码如下**

```c#
// Step1.连接数据库
DBConnection();

// Step2.设置SQL命令
string sql = $"INSERT INTO testTable VALUES('Hello',NULL,1)";

// Step3.绑定SQL命令
comm = new SqlCommand(sql, conn);

// Step4.执行SQL命令(comm.ExecuteNonQuery()返回-1代表执行失败)
comm.ExecuteNonQuery();

// Step5.释放连接
Dispose();
```

<br>

#### 删

**SQL删除成员的命令如下**

```sql
# 删除tableName表中, 列paramName中值为'paramValue'的行
DELETE from tableName WHERE {paramName}='{paramValue}'
```

- `tableName`：数据库中表的名称
- `paramName`：列的名称
- `paramValue`：值



**`C#`代码如下**

```c#
// Step1.连接数据库
DBConnection();

// Step2.设置SQL命令
string sqldel = $"DELETE from emails WHERE time='{time}'";

// Step3.绑定SQL命令
comm = new SqlCommand(sqldel, conn);

// Step4.执行SQL命令
comm.ExecuteNonQuery();

// Step5.释放连接
Dispose();
```

<br>

#### 查

**SQL查找成员的命令如下**

```sql
# 在表tableName中查找符合条件的成员
select * from tableName where paramName={parmaValue}
```



**`C#`代码如下**

```c#
// Step1.连接数据库
DBConnection();

// Step2.设置SQL命令
string sql = "select * from emails where category='componentApply'";

// Step3.添加相应参数
adapter = new SqlDataAdapter(sql, conn);

// Step4.将数据存储在DataTable中
DataTable table = new DataTable();
int count = adapter.Fill(table);

// Step5.遍历DataRow
if (count > 0)
{
    foreach (DataRow row in table.Rows)
    {
        // emails为List数组，成员为Email对象
        emails.Add(new Email()
        {
            sender = row.Field<string>("sender"),			// 列的类型为string，名称为sender
        });
    }
}

// Step6.释放连接
Dispose();
```

<br>

#### 改

**SQL修改成员的命令如下**

```sql
# 修改表tableName中，列param2Name的值为param2Value的成员的，param1Name列的值为param1Value
UPDATE tableName SET param1Name='{param1Value}' WHERE param2Name='{param2Value}'
```



**`C#`代码如下**

```c#
// Step1.连接数据库
DBConnection();

// Step2.设置SQL命令
string sqldel = $"UPDATE components SET amount={component.amount},category='{component.category}',manufacturer='{component.manufacturer}',access={component.access},needApply={component.needApply},location='{component.location}',remark='{component.remark}',tag='{component.tag}',url='{component.url}',cover='{component.cover}' WHERE name='{component.name}'";

// Step3.绑定SQL命令
comm = new SqlCommand(sqldel, conn);

// Step4.执行SQL命令
comm.ExecuteNonQuery();

// Step5.释放连接
Dispose();
```