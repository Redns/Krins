---
title: STM32入门笔记(五)：UART
date: 2021-12-14
tags:
- stm32
- hal库
categories:
- STM32笔记
---

# UART

### 基础知识

##### 定义

`异步串行通信`：通信双方在没有同步时钟的前提下，将一个字符（包括特定的附加位）按位进行传输的通信方式

`波特率`：每秒钟传输的二进制位数



##### 电平转换

`TTL <——> RS232`：MAX3232、SP3232

`TTL <——> USB`：CH340、CP2012



##### printf重定向

```c
//main.c
#include <stdio.h>
#include <stdarg.h>
#include <string.h>
uint8_t u_buf[256];//串口数据发送变量
#define printf(...)  HAL_UART_Transmit((UART_HandleTypeDef *)&huart1, (uint8_t *)u_buf,\
		                                sprintf((char*)u_buf,__VA_ARGS__), 0xFFFF);
```



### API

```c
/*
 * @Descript	阻塞式发送函数
 * @param		huart			句柄，用于选择串口
 * @param		pData			数据内容
 * @param		Size			数据长度（字节）
 * @param 		Timeout			超时时间设置
 * @return		成功返回HAL_OK
*/
HAL_Status HAL_UART_Transmit(UART_HandleTypeDef* huart,
                             uint8_t* pData,
                             uint16_t Size,
                             uint32_t Timeout);


/*
 * @Descript	非阻塞式发送函数
 * @param		huart			句柄，用于选择串口
 * @param		pData			数据内容
 * @param		Size			数据长度（字节）
 * @return		成功返回HAL_OK
*/
HAL_Status HAL_UART_Transmit_IT(UART_HandleTypeDef* huart,
                             uint8_t* pData,
                             uint16_t Size);


/*
 * @Descript	非阻塞式发送回调函数
 * @param		huart			句柄，用于选择串口
 * @return		void
*/
void HAL_UART_TxCpltCallback(UART_HandleTypeDef* huart);


/*
 * @Descript	阻塞式接收函数
 * @param		huart			句柄，用于选择串口
 * @param		pData			数据内容
 * @param		Size			数据长度（字节）
 * @param 		Timeout			超时时间设置
 * @return		成功返回HAL_OK
*/
HAL_StatusTypeDef HAL_UART_Receive(UART_HandleTypeDef* huart,
                                   uint8_t* pData,
                                   uint16_t Size,
                                   uint32_t Timeout);


/*
 * @Descript	非阻塞式接收函数
 * @param		huart			句柄，用于选择串口
 * @param		pData			数据内容
 * @param		Size			数据长度（字节）
 * @return		成功返回HAL_OK
*/
HAL_StatusTypeDef HAL_UART_Receive_IT(UART_HandleTypeDef* huart,
                                   uint8_t* pData,
                                   uint16_t Size);


/*
 * @Descript	非阻塞式接收回调函数
 * @param		huart			句柄，用于选择串口
 * @return		void
*/
void HAL_UART_RxCpltCallback(UART_HandleTypeDef* huart);
```



### Demo

1. 点击左侧的Connectivity，选择串口

   ![image-20211220171601531](https://s2.loli.net/2021/12/20/GONpew8qWPBK64u.png)



2. 选择模式

   ![image-20210907001929966](![](https://s2.loli.net/2021/12/20/GONpew8qWPBK64u.png)

   `Asynchronous`：异步

   `Synchronous`：同步



3. 点击 NVIC Settings，使能串口

   ![image-20211220171614456](https://s2.loli.net/2021/12/20/LZxYN6k2nJrIP4O.png)



4. 点击 Parameter Settings，设置相应参数

   ![image-20211220171624418](https://s2.loli.net/2021/12/20/w36F4sxdHJROb9r.png)



5. 在主函数中重写函数

   ```c
   void HAL_UART_RxCpltCallback(UART_HandleTypeDef* huart){
       switch(huart->Instance == USARTx){
           case USART1:
               //what you want to do
               break;
           //...    
       }
   }
   ```



6. 一个接受（或发送）语句只能接受（或发送）一次

   ```c
   while(1){
       HAL_UART_Receive_IT(&huartx, pData, Size);
   }
   ```