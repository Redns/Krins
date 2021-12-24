---
title: ESP32入门笔记(三)：连接WIFI
date: 2021-12-22
tags:
- esp32
- micropython
categories:
- ESP32笔记
---

- **基本流程**

![image-20211224221715134](https://s2.loli.net/2021/12/24/BAejEhJzdmlHiou.png)



- **相关函数**

```python
'''
Function: WLAN
Description: 创建WLAN对象
Input: 
      @interface_id 可取network.AP_IF(热点)、network.STA_IF(客户端) 
Output:
      @wlan 构建的WLAN对象
'''
wlan = network.WLAN(interface_id)



'''
Function: active
Description: 激活WLAN接口
Input: 
      @is_active True(激活)、False(不激活)
Output:
	  @none
'''
wlan.active(is_active)



'''
Function: isconnected
Description: 判断是否连接上WIFI
Input:
      @none
Output:
      @r True(已连接)、Flase(未连接)
'''
r = wlan.isconnected()



'''
Function: connected
Description: 连接指定WIFI
Input:
      @ssid WIFI名称
      @password WIFI密码
Output:
	  @r True(已连接)、False(未连接)
'''
r = wlan.connected(ssid,password)



'''
Function: disconnect
Description: 断开WIFI连接
Input:
	  @none
Output:
	  @r True()、False()
'''
r = wlan.disconnect()
```



- **示例代码**

```python
'''
Target: 连接名称为My_WiFiName、密码为My_Password的WIFI
Author: Redns
Data: 2021/5/22 14:52
'''
import network

wl = network.WLAN(network.STA_IF)
wl.active(True)
wl.connected('My_WiFiName','My_Password')
print(wl.isconnected)
```