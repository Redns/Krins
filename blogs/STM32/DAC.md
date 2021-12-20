---
title: STM32入门笔记(七)：DAC
date: 2021-12-16
tags:
- stm32
- hal库
categories:
- STM32笔记
---

### 基础知识

##### 工作框图

DAC 主要由三部分组成：触发方式、控制逻辑、数模转换器

![image-20211220175303194](https://s2.loli.net/2021/12/20/W32ywoP6ZHDzgxq.png)



##### 触发方式

- 概念：指DAC转换可以由某外部事件触发（定时器计数器、外部中断线）

- 触发方式选择

  ![image-20211220175345990](https://s2.loli.net/2021/12/20/95K7wUe2u6PCNkm.png)

  

- 如果选择中断源触发，每次触发源触发后，存放在`寄存器DAC_DHRx`中的数据会被传送到`寄存器DAC_DORx`中。在3个APB1时钟周期后，`寄存器DAC_DORx`更新为新值；

  如果选择软件触发，一旦SWTRIG位置 1，转换即开始。在数据从`DAC_DHRx寄存器`传送到`DAC_DORx寄存器`后，`SWTRIG位`由硬件自动清0



##### 控制逻辑

- 概念：此部分决定了DAC的波形控制，输出方式，DMA传输……

- DHRx ==> DORx

  - 如果没有选择硬件触发（TENx=0），在一个APB1周期后传入DORx
  - 如果选择硬件触发（TENx=1），则在3个APB1周期后传入DORx

  ![image-20211220175356006](https://s2.loli.net/2021/12/20/yHe8zUQ2an7WPRO.png)

- 一旦数据从`DAC_DHRx寄存器`装入`DAC_DORx寄存器`，在经过时间`Tsetting`（大约3us） 后输出有效，这段时间的长短依`电源电压`和`负载`的不同有所变化

  

### API

```c
//开启DAC输出
HAL_StatusTypeDef HAL_DAC_Start(DAC_HandleTypeDef* hdac, uint32_t Channel);     


//关闭DAC输出
HAL_StatusTypeDef HAL_DAC_Stop(DAC_HandleTypeDef* hdac, uint32_t Channel);  


//开启DAC的DMA输出，需要函数中断开启
HAL_StatusTypeDef HAL_DAC_Start_DMA(DAC_HandleTypeDef* hdac, uint32_t Channel, uint32_t* pData, uint32_t Length, uint32_t Alignment); 


//关闭DAC的DMA输出
HAL_StatusTypeDef HAL_DAC_Stop_DMA(DAC_HandleTypeDef* hdac, uint32_t Channel); 


//设置DAC输出值
HAL_StatusTypeDef HAL_DAC_SetValue(DAC_HandleTypeDef* hdac, uint32_t Channel, uint32_t Alignment, uint32_t Data);  


//获取DAC输出值
uint32_t HAL_DAC_GetValue(DAC_HandleTypeDef* hdac, uint32_t Channel);  
```



### Demo

##### 通用 DAC

1. 使用 STM32Cube 设置相关管脚为 DAC 输出管脚，触发源选择 Software trigger

   ![image-20211220175408682](https://s2.loli.net/2021/12/20/J2SP5XnIpiNmgDd.png)

   `OU1 & OUT2`：两个输出通道

   `External Trigger`：外部中断触发

   `Trigger`：触发方式选择

   `Output Buffer`：使能 DAC 输出缓存。DAC集成了2个输出缓存，可以用来减少输出阻抗，无需外部运放即可直接驱动外部负载。								 每个 DAC通道输出缓存可以通过设置DAC_CR寄存器的BOFFx位来使能或者关闭。



2. 在主函数中设置 DAC 输出，并打开 DAC

   ```c
   //使能DAC的1通道，输出数据为12位右对齐，DAC输出为2048
   //DAC_voltage = VREF * value / (2^12 - 1)
   HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, 2048);
   
   //开启DAC
   HAL_DAC_Start(&hdac,DAC_CHANNEL_1);
   ```

   

##### 三角波生成

1. 打开 STM32Cube 配置相关通道，触发源选择 Timer

   ![image-20211220175423295](https://s2.loli.net/2021/12/20/SZRfPvAbxMTyNGw.png)

   - `Wave generation mode`：波形生成模式

     1. `Trigger wave generation`：三角波

     2. `noise wave generation`：噪声波形

   - `Maximum Triangle Amplitude`：最大三角波幅度（0 ~ 4095 ==> 0 ~ 3.3V）

     

2. 打开 Timers，使能上一步选择的 Timer

   ![image-20211220175435718](https://s2.loli.net/2021/12/20/r8ow9uIKztGiJmE.png)

   三角波频率 = 定时器频率 / (2 * Maximum Triangle Amplitude)



3. 在main函数中添加以下两行代码，即可输出三角波

   ```c
   //打开定时器
   HAL_TIM_Base_Start(&htimx);
   
   //DAC会以0x100作为基电压生成三角波
   HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, 0x100);
   
   //打开DAC
   HAL_DAC_Start(&hdac, DAC_CHANNEL_2);
   ```



##### Timer + DMA + DAC

1. 通过 STM32Cube 设置 DAC

   ![image-20211220175446538](https://s2.loli.net/2021/12/20/PtjW79VarBbmHR8.png)



2. 点击 DMA Settings，设置 DMA

   ![image-20211220175454474](https://s2.loli.net/2021/12/20/q57PTM6vbsYcRC2.png)



3. 将要生成的波形的电压值存放在数组中

   ![image-20211220175510202](https://s2.loli.net/2021/12/20/2yFfK1wo9YezUPI.png)



4. 在 main 函数中写入如下代码

   ```c
   //打开定时器
   HAL_TIM_Base_Start(&htimx);
   
   //以DMA方式设置DAC
   HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_1, (uint32_t*)sin_8bit, 256, DAC_ALIGN_8B_R);
   ```