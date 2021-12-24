---
title: ESP32入门笔记(一)：开发环境搭建
date: 2021-12-20
tags:
- esp32
- micropython
categories:
- ESP32笔记
---

### 烧录Micropython固件

1. 前往[官网](https://micropython.org/download/esp32/)下载Micropython固件

   - v4.x支持BLE和PPP，不支持LAN；v3.x支持BLE、PPP、LAN

   - `GENERIC` 版本可以在任何ESP32上运行，`GENERIC-SPIRAM` 只能在含有4M外置pSRAM的ESP32上运行

   - 根据实际情况下载对应的bin文件

     

2. 前往[官网](https://thonny.org/)下载Thonny，以下是Thonny相关特性

   - 对Micropython的支持度很好，易于上手
   - 支持语法高亮和代码补全，易于下载、调试
   - 支持 `REPL` 和 `shell`

   

3. 打开Thonny，用数据线连接ESP32和电脑

![image-20211220181747471](https://s2.loli.net/2021/12/20/ZckSXpDbTajwUNt.png)



4. 点击工具 ——> 设置

![image-20211220181758795](https://s2.loli.net/2021/12/20/6Rsi3G5J49wpMNy.png)



5. 点击解释器 ——> 选择解释器和ESP32对应的串口 ——> Install or update firmware

![image-20211220181809465](https://s2.loli.net/2021/12/20/RwqUAr3tXWGfCom.png)



6. 选择对应的端口和之前下载的Micropython固件，按如图所示配置 ——> 点击安装，等待安装完成即可

![image-20211220181820661](https://s2.loli.net/2021/12/20/L9ShPRaNWGc35v1.png)