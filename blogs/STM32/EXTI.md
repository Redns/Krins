---
title: STM32入门笔记(三)：EXTI
date: 2021-12-12
tags:
 - stm32
 - hal库
categories:
 -  STM32笔记
---

### 基础知识

##### 概述

- ARM Cortex M3内核支持`256`个中断，包括`16个内核中断`和`240个外设中断`，拥有256个中断优先级别
- STM32的中断通道可能会由`多个中断源共用`，因此在`中断服务函数入口`处需要判断中断源
- STM32中有两个中断优先级概念，`抢占优先级`和`响应优先级`，每个中断都应指定这两个优先级



##### 外部中断

- 16个外部中断源`EXTI0 ~ EXTI15`，对应`7个中断向量`，即`7个中断服务函数`
  - EXTI0、EXTI1、EXTI2、EXTI3、EXTI4：专用
  - EXTI5 ~ EXTI9：共用
  - EXTI10 ~ EXTI15：共用

- 触发条件
  - 上升沿触发
  - 下降沿触发
  - 双边沿触发



##### __weak

- STM32中的关键字，可用于修饰变量或函数
- 当一个函数前面加上`__weak`这样的修饰符以后，允许用户在其它文件中定义一个和`__weak`修饰过的一模一样的函数，最终当编译器编译的时候，会选择用户定义的函数，如果用户没有重新实现这个函数，则编译器就会去执行带`__weak`修饰的函数
- [详细内容](https://www.21ic.com/article/883535.html)



### API

```c
/*
 * @Descript	中断回调函数
 * @param		GPIO_Pin		引起中断的引脚	
 * @return		void
*/
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin);
```



### Demo

1. 在STM32Cube中设置相关管脚

   ![image-20210906220149199](https://s2.loli.net/2021/12/19/2hjUXRgKJM9BiSc.png)



2. 选择触发方式、上/下拉

   ![image-20211219231644434](https://s2.loli.net/2021/12/19/2mCUWR9lTuyvbHX.png)



3. 点击NVIC使能中断

   ![image-20211219231709285](https://s2.loli.net/2021/12/19/r7bDZltLAp1yEXf.png)



4. 在`main函数`中复写`HAL_GPIO_EXTI_Callback`函数

   ```c
   //main.c
   void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin){
       switch(GPIO_Pin){
           case GPIO_PIN_x:
               //what you want to do
               break;
           //...    
       } 
   }
   ```