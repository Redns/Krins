---
title: STM32入门笔记(九)：SPI
date: 2021-12-18
tags:
- stm32
- hal库
categories:
- STM32笔记
---

### 基础知识

##### 信号线分类

- SDO：主设备数据输出，从设备数据输入，对应 MOSI
- SDI：主设备数据输入，从设备数据输出，对应 MISO
- SCLK：时钟信号，由主设备产生
- CS：从设备使能信号，由主设备控制

![image-20211220180644596](https://s2.loli.net/2021/12/20/JALvgiu7Usx5OcD.png)



##### 时序图

![image-20211220180655977](https://s2.loli.net/2021/12/20/h7xMvAsZmOVbuDS.png)



![image-20211220180705518](https://s2.loli.net/2021/12/20/kpQhVmxLqw3tWCi.png)

- 当 CPOL = 0 时，空闲时 SCK 时钟为低电平；当 CPOL = 1 时，空闲时 SCK 时钟为高电平；可以看出本例程所示时序图空闲时 SCK 为低电平，故 CPOL = 0

- 当 CPHA = 0 时，在 SCK 的奇数边沿采样；当 CPHA = 1 时，在 SCK 的偶数边沿采样；可以看出本例程所示时序图在偶数边沿采样，故 CPHA = 1

  

### API

```c
//SPI发送/接收
HAL_SPI_TransmitReceive(*hspi, *pTxData, *pRxData, Size, Timeout);

//SPI接收
HAL_SPI_Receive(*hspi, *pData, Size, Timeout);

//SPI发送
HAL_SPI_Transmit(*hspi, *pData, Size, Timeout);
```



### Demo

1. 根据实际情况初始化 SPI

   ![image-20211220180715090](https://s2.loli.net/2021/12/20/Xkfgit8VqoTYZnz.png)



2. 使用 API 中的函数