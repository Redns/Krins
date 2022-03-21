---
title: C#笔记(十六)：网络编程
date: 2022-03-21
tags:
- cSharp
- dotnet
categories:
- cSharp笔记
---

# 1 TCP

## 1.1 建立连接

### **服务器**

```Java
// Step1.创建套接字
Socket tcpServer = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

// Step2.绑定ip地址和端口号
IPAddress ipAddress = new IPAddress(new byte[] {127, 0, 0, 1});
IPEndPoint ipEndPoint = new IPEndPoint(ipAddress, 8888);

// Step3.绑定套接字
tcpServer.Bind(ipEndPoint);

// Step4.监听端口
tcpServer.Listen(10);
Socket client = tcpServer.Accept();
```

<br>

### **客户端**

```Java
// Step1.创建套接字
Socket client = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

// Step2.绑定ip地址和端口号
IPAddress ipAddress = new IPAddress(new byte[] {127, 0, 0, 1});
IPEndPoint ipEndPoint = new IPEndPoint(ipAddress, 8888);

// Step3.连接服务器
client.Connect(ipEndPoint);
```

<br>

## 1.2 交换数据

`服务器`和`客户端`收发数据的方式是一样的。

<br>

### **发送数据**

`Tcp`传输的数据均为`字节形式`，因此常常需要和`字符串`进行格式转换。

```Java
string message = "Hello, tcp!"
    
// Step1.将字符串以UTF8格式编码，并转换为字节形式
byte[] packet = Encoding.UTF8.GetBytes(message)
    
// Step2.发送数据
client.Send(packet);
```

<br>

### **接收数据**

```Java
byte[] packet = new byte[1024];

// Step1.接收数据
int len = client.receive(packet);

// Step2.将字节转换为字符串，并编码为UTF8
string message = Encoding.UTF8.GetString(packet, 0, len);
```

<br>

# 2 UDP

## 2.1 建立连接

### **服务器**

```Java
// Step1.创建套接字
Socket udpServer = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

// Step2.绑定ip和端口号
IPAddress ipAddress = new IPAddress(new byte[]{127, 0, 0, 1});
IPEndPoint ipEndPoint = new IPEndPoint(ipAddress, 8888);
udpServer.Bind(ipEndPoint);
```

<br>

### **客户端**

```Java
// Step1.创建套接字
Socket udpClient = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
```

<br>

## 2.2 交换数据

### **发送数据**

```Java
// Step1.指定接收方的ip和端口号
IPAddress ipAddress = new IPAddress(new byte[] {127, 0, 0, 1});
IPEndPoint ipEndPoint = new IPEndPoint(ipAddress, 8888);
EndPoint endPoint = (EndPoint) ipEndPoint;

// Step3.发送数据
udpClient.SendTo(Encoding.UTF8.GetBytes("Hello"), endPoint);
```

<br>

### **接收数据**

```Java
// Step1.设置发送方ip和端口号
// IPAddress.Any表示接收任意ip发来的数据
// 0表示不限制端口号
IPEndPoint ipEndPoint = new IPEndPoint(IPAddress.Any, 0);
EndPoint endPoint = (EndPoint)ipEndPoint;

byte[] packet = new byte[1024];
int len = udpServer.ReceiveFrom(packet, ref endPoint);

Console.WriteLine(Encoding.UTF8.GetString(packet,0,len));
```