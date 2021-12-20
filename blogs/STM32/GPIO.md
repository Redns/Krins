---
title: STM32入门笔记(二)：GPIO
date: 2021-12-11
tags:
 - stm32
 - hal库
categories:
 - STM32笔记
---

### 基础知识

##### 概述

- STM32芯片最多拥有`GPIOA ~ GPIOG`七组端口，每组端口最多拥有`Pin0 ~ Pin15`共16个引脚
- 每个I/O端口都可以自由编程，但I/O端口寄存器必须按`32位字`被访问
- 每个I/O端口都由`7个寄存器`来控制



##### 模式分类

STM32的IO口具有多种功能，在同一时刻每个I/O口只能有一种状态：

`推挽输出`：当作普通的IO口即可

`开漏输出`：本质上是OC门（接地/悬空），IIC通信中会用

`模拟输入`：板载ADC的输入

`上/下拉输入`：用来做按键检测之类的操作



### API

```c
/*
 * @Descript	GPIO电平输出
 * @param		GPIOx 		目标GPIO端口号，GPIOA ~ GPIOG
 * @param 		GPIO_Pin 	目标GPIO引脚
 * @param		PinState	目标引脚状态，GPIO_PIN_SET/GPIO_PIN_RESET
 * @return		void
*/
void HAL_GPIO_WritePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin, GPIO_PinState PinState);


/*
 * @Descript	GPIO电平输入
 * @param		GPIOx 		目标GPIO端口号，GPIOA ~ GPIOG
 * @param 		GPIO_Pin 	目标GPIO引脚
 * @return		GPIO引脚状态，GPIO_PIN_SET/GPIO_PIN_RESET
*/
GPIO_PinState HAL_GPIO_ReadPin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin);


/*
 * @Descript	GPIO电平翻转
 * @param 		GPIOx		目标GPIO端口号，GPIOA ~ GPIOG
 * @param		GPIO_Pin	目标GPIO引脚
 * @return		void
*/
void HAL_GPIO_TogglePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin);
```



### Demo

```c
//exercise1
while(1){
    HAL_GPIO_WritePin(GPIOB, GPIO_PIN_8, GPIO_PIN_SET);
    HAL_Delay(500);
    HAL_GPIO_WritePin(GPIOB, GPIO_PIN_8, GPIO_PIN_RESET);
    HAL_Delay(500);
    HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_8);
    HAL_Delay(500);
}

//exercise2
void keyScan(){
    if(HAL_GPIO_ReadPin(GPIOC, GPIO_PIN_5) == GPIO_PIN_RESET){
        HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_8);
        while(HAL_GPIO_ReadPin(GPIOC, GPIO_PIN_5) == GPIO_PIN_RESET);
    }
}
```