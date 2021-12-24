---
title: ESP32入门笔记(四)：Socket通信
date: 2021-12-23
tags:
- esp32
- micropython
categories:
- ESP32笔记
---

- **通信流程**

![image-20211224222107947](https://s2.loli.net/2021/12/24/eQgm41COnKabisA.png)



- **相关函数**

```python
'''
Function: socket
Description: 构建usocket对象
Input:
	  @af  AF_INET(IPV4)、AF_INET6(IPV6)
	  @type  SCOK_STREAM(TCP)、SOCK_DGRAM(UDP)
	  @proto  IPPROTO_TCP(TCP协议)、IPPROTO_UDP(UDP协议)
	  @不输入任何参数时默认TCP连接
Output:
      @s  构造的usocket对象		
'''
s = usocket.socket(af = AF_INET, type = SCOK_STREAM, proto = IPPROTO_TCP)



'''
Function: connect
Description: 创建连接
Input: 
	  @address  要连接的地址，格式: (IP, 端口号)
Output:
      @r  True(已连接)、False(未连接)
'''
r = s.connect(address)



'''
Function: send
Description: 发送
Input:
      @data  要发送的数据，格式为字节
Output:
      @len  已发送的字节数
'''
len = s.send(data)



'''
Function: recv
Description: 接收数据
Input:
      @bufsize  单次最多接收的字节数
Output:
      @data  接收到的数据，格式为字节
'''
data = s.recv(bufsize)
```



- **示例代码**

```python
'''
Target: 连接地址为Server_address、端口号为Server_port的服务器
Author: Redns
Date: 2021/5/22 
'''
import network, usocket

wl = network.WLAN(network.STA_IF)
wl.active(True)

#服务器和ESP32应在同一个局域网下，否则无法通信
wl.connected('My_WiFiName','My_Password')

#在WIFI连接完毕前不能连接socket
while not wl.isconnected():
    pass

#创建usocket对象并连接
s = usocket.socket()
s.connect(('Server_address', Server_port))

#向服务器发送数据
s.send(str.encode('I am client!'))

#接收来自服务器的数据
data = s.recv(100)
print(bytes.decode(data))
```