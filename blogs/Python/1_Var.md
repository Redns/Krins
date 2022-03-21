---
title: Python笔记(一)：变量和数据类型
date: 2022-03-21
tags:
- Python
categories:
- Python笔记
---

# 1 字符串

## 1.1 定义

`python`中的字符串可以用 `单引号`或 `双引号`引起

```python
"Hello Python"
'Hello Python'
```

<br>

## 1.2 相关操作

`python`提供了一些函数用来处理字符串

```python
"""
Part1.字符串处理相关函数
"""
message = "hello world"
print("[1]" + message)  
print("[2]" + message.title())      # 单词首字母大写
print("[3]" + message.upper())      # 大写所有字母
print("[4]" + message.lower())      # 小写所有字母


"""
Part2.删除字符串中的空格
"""
print("space ".rstrip())    # 删除末尾的空格
print(" space".lstrip())    # 删除开头的空格
print(" space ".strip())    # 删除两端的空格


"""
Part3.类型转换
"""
age = 20
print("Your age is " + str(age))
```

- 特殊字符

```python
print("Languages:\n\tPython\n\tJava\n\tJavaScript")
```

<br>

# 2 浮点数

`Python`将任何带有小数点的数都称为 `浮点数`，浮点数相加的结果可能是不确定的，所有语言实际上都存在这样的问题

![image-20220109200340269](https://s2.loli.net/2022/01/09/24Cpk5bdNBoQwiz.png)

<br>


# 3 列表

## 3.1 简介

`列表`由一系列按特定顺序排列的元素组成，可以将 `任何东西`加入到列表中，其中的元素之间可以没有任何关系。在 `Python`中，用 `方括号([])`来表示列表，并用 `逗号(,)`来分割其中的元素，示例如下:

```python
bicycles = ['yadi', 'Yamaha', 'aodi']
```

<br>

## 3.2 基本操作

### 增

- `append`

```python
# 在列表listName尾部插入元素newMember
listName.append(newMember)
```

- `insert`

```python
"""
在列表listName中插入元素
@index: 新元素的索引
@newMember: 待插入的新元素
"""
listName.insert(index, newMember)
```

<br>

### 删

- `del`

```python
# 删除listName中index索引出的值
del listName[index]
```

- `pop`

```python
"""
弹出列表中的元素
@index: 待弹出元素的索引，索引为空时默认为-1
@return: 弹出的元素
"""
listName.pop(index)
```

- `remove`

```python
"""
移除对应值member的元素，若列表中有多个相同值则只移除第一个
@membeer: 元素值
"""
listName.remove(member)
```

<br>

### 查

- `index`

`列表`是有序集合，可以通过 `索引`访问元素，`Python`中列表的索引从 `0`开始。也可以使用 `负数索引`，最后一个元素的索引为 `-1`，倒数第二个为 `-1`，以此类推……

```python
bicycles = ['yadi', 'Yamaha', 'aodi']

>>print(bicycles[0])
>>yadi
>>print(bicycles[-1])
>>aodi
```

- `len`

```python
"""
获取列表的长度
@listName: 待查询的列表
@return: 列表长度
"""
len(listName)
```

- `for`

```python
for listMember in listName:
    print(listMember)
```

<br>

### 排序

- `sort`

```python
# 按照字母的顺序排列元素
listName.sort()

# 按照与字母相反的顺序排列元素
listName.sort(reversr=True)
```

- `sorted`

```python
"""
显示以字母顺序排列的列表，但不改变列表中元素的顺序
@listName: 待显示的列表
@return: 排序好的列表
"""
sorted(listName)
```

-  `reverse`

```python
# 按照与索引相反的顺序排列元素
listName.reverse()
```

<br>

## 3.3 数值列表

### 3.3.1 创建

```python
"""
以一定步进生成 start ~ end-1 的序列
@start: 起始位置
@end: 终止位置(不包括)
@step: 步进
"""
range(start, end, step=1)
```

<br>

### 3.3.2 统计计算

```python
min(listName)
max(listName)
sum(listName)
```

<br>

## 3.4 列表解析

`列表解析`将 `for循环`和 `创建新元素`的代码合并成一行，并自动附加新元素

```python
squares = []
for value in range(1, 11):
    squares.append(value**2)

# 等效

squares = [value**2 for value in range(1,11)]
```

<br>

## 3.5 切片

```python
"""
获取listName中指定部分
@start: 起始索引
@end: 终止索引
@return: 获取的部分列表
"""
listName[start=0:end=-1]
```

<br>

# 4 元组

## 4.1 定义

`Python`将不能修改的值称为不可变的，而 `不可变的列表`被称为元组，用 `圆括号()`定义

```python
numbers = (0,1,2,3)
```

<br>

## 4.2 相关操作

元组定义后就不能再更改其中的值，但元组变量可以重新赋值

```python
numbers = (0,1,2,3)

# error
numbers[0] = 1

# right
numbers = (1,1,2,3)
```

<br>

# 5 字典

## 5.1 定义

在 `Python`中，字典是一系列 `键—值对`，每个键都与一个值相关联，与键相关联的值可以是数字、字符串、列表乃至字典。键值之间用 `:`隔开，键值对之间用 `,`隔开，示例如下：

```python
users = {
    'Name':'Alien',
    'Age':19,
    'Like':'cSharp'
}
```

<br>

## 5.2 相关操作

### 5.2.1 访问

对字典的访问可以使用字典名和键名

```python
>> users['Age']
>> 19
```

<br>

### 5.2.2 增加

字典是一种动态结构，可随时在其中添加键—值对

```python
users['height'] = 180
```

<br>

### 5.2.3 删除

对于字典中不再需要的信息，可使用 `del`语句将相应的键—值对彻底删除

```python
del users['Age']
```

<br>

### 5.2.4 更改

要修改字典中的值，可依次指定字典名、用方括号括起的键以及与该键相关联的新值

```python
users['Age'] = 18
```

<br>

### 5.2.5 遍历

**普通遍历**

即便遍历字典时，键—值对的返回顺序也与存储顺序不同。Python不关心键—值对的存储顺序，而只跟踪键和值之间的关联关系。常用的遍历方法如下

|      方法      |      备注      |
| :------------: | :------------: |
| users.items()  | 获取键值对列表 |
|  users.keys()  |   获取键列表   |
| users.values() |   获取值列表   |

常用的遍历程序结构如下

```python
for key, value in users.items():
    print("[Key]" + key)
    print("[Val]" + value)

for key in users.keys():
    print("[Key]" + key)
    print("[Val]" + users[key])
```

<br>

**顺序遍历**

使用 `items()`和 `keys()`获取的列表的顺序是不可预测的，要以特定的顺序返回元素，可以使用 `sorted()`方法对返回的 `键`进行排序

```python
for key in sorted(users,keys()):
    print("[Key]" + key)
    print("[Val]" + users[key])
```

<br>

**非重复遍历**

使用 `values()`方法遍历获取的列表可能包含重复的值，为剔除重复选项，可使用 `set()`方法将其列表转换为 `集和`

```python
for val in set(users.values()):
    print("[Val]" + val)
```

<br>

## 5.3 嵌套

字典和列表可以相互嵌套，即 `列表`的元素可以是 `字典`，`字典`的值可以是 `列表`，`字典`的值可以是 `字典`举例如下

```python
"""
Part1.列表中嵌套字典，字典的值是列表
"""
user_1 = {'id':1, 'food':'pizza', 'age':30, 'toppings':['orange', 'juice']}   
user_2 = {'id':2, 'food':'rice', 'age':59, 'toppings':['rice', 'water']}  
user_3 = {'id':3, 'food':'sup', 'age':87, 'toppings':['tomato', 'potato']}
users = [user_1, user_2, user_3]

for user in users:
    print("*********************************")
    print("[ID]" + str(user['id']))
    print("[Food]" + str(user['food']))
    print("[Age]" + str(user['age']))

    print("#### Toppings ####")
    for topping in user['toppings']:
        print(topping)
    print("*********************************")


"""
Part2.字典的值是字典
"""
girls = {
    'Yawei':{
        'stage':'High1',
        'birth':2001,
        'feeling':2
    },

    'Yuanke':{
        'stage':'High2',
        'birth':2000,
        'feeling':1
    },

    'Gejun':{
        'stage':'Big3',
        'birth':2000,
        'feeling':2
    },

    'Chang':{
        'stage':'Big1',
        'birth':2000,
        'feeling':2
    }
}  

print("*********** GIRLS1 **********")
for girl in girls.keys():
    print("##############")
    print("[Name]" + girl)
    print("[Stage]" + girls[girl]['stage'])
    print("[Birth]" + str(girls[girl]['birth']))
    print("[Feeling]" + str(girls[girl]['feeling']))
```

<br>

# 6 强制类型转换

在实际应用中，我们常常需要进行数据类型的转换

| 源类型 | 目的类型 |   方法   |
| :----: | :------: | :------: |
| string |   int    | int(str) |
|  int   |  string  |  str(n)  |