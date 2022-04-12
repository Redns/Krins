---
title: 控制器
date: 2022-03-25 21:02:00
tags:
- ASP.NET Core
- CSharp
- WebApi
- http
categories:
- WebApi开发
---

# 简介

在前后端分离的应用中，前端拿到的实际上是一个 `网络地址 (如: http://url.com)`，前端与后端的交互完全是通过 `HTTP` 通信实现的。对于前端来说要执行的操作可能非常多，但网络地址只有一个，怎样才能让后端正确执行相应操作呢？我们设想以下几种方案

1. 在 `HTTP` 报文中指定操作，后端解析报文后执行
2. 在链接后衔接不同的字符来区分操作 (即路由)

实际上，现代前后端开发是上面两种方案的结合。我们通过如下例子说明

```http
# 后端提供的网址
http://test.com

# 处理登录相关操作
# 包含登录、获取用户信息、……
http://test.com/api/auth

# 登录
POST http://test.com/api/auth

# 获取用户信息
GET http://test.com/api/auth

# 处理图片相关操作
http://test.com/api/auth
```



