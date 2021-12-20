---
title: STM32入门笔记(四)：TIM
date: 2021-12-13
tags:
 - stm32
 - hal库
categories:
 - STM32笔记
---

### 基础知识

##### SysTick

- 集成在Cortex M3内核中的定时器，不属于芯片厂商的外设
- 主要为RTOS提供时钟节拍



##### 定时器分类

`基本定时器`：TIM6、TIM7

`通用定时器`：TIM2、TIM3、TIM4、TIM5

`高级定时器`：TIM1、TIM8



##### ⭐通用定时器

- 通过`可编程预分频器(Prescaler)`驱动的16位自动重装`主计数器(Counter Period)`构成，可对内部时钟（或触发源）、外部时钟（或触发源）进行计数
- 定时器的基本原理为：时钟信号送入 Prescaler 中 (0 ~ 65535)，Prescaler 溢出后会向 Counter Period 发出一个脉冲信号
- tim_time = (Prescaler + 1) * (Counter Period + 1) / tim_frq



##### 计数模式

![image-20211220164747221](https://s2.loli.net/2021/12/20/majrkpbNZ2RSgVH.png)



### API

```c
/*
 * @Descript	定时器服务函数
 * @param		htim			相关定时器指针	
 * @return		void
*/
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef* htim);


/*
 * @Descript	定时器启动函数
 * @param		htimx			相关定时器指针	
 * @return		void
*/
void HAL_TIM_Base_Start_IT(&htimx);


/*
 * @Descript	PWM启动函数
 * @param		htimx			相关定时器指针	
 * @param		TIM_CHANNEL_x	相关PWM通道
 * @return		void
*/
void HAL_TIM_PWM_Start(&htimx, TIM_CHANNEL_x);


/*
 * @Descript	PWM占空比更改
 * @param		htimx			相关定时器指针	
 * @param		TIM_CHANNEL_x	相关PWM通道
 * @param		Pulse			Duty_cycle = Pulse / Counter Period 
 * @return		void
*/
void __HAL_TIM_SET_COMPARE(&htimx, TIM_CHANNEL_x, Pulse);


/*
 * @Descript	PWM频率更改
 * @param		htimx			相关定时器指针	
 * @param		Counter_Period	PWM_fre = TIM_frq / ( Prescaler + 1 ) / ( Counter Period + 1 )
 * @return		void
*/
void __HAL_TIM_SET_AUTORELOAD(&htimx, Counter_Period);


HAL_TIM_Encoder_Start(&htimx, TIM_CHANNEL_ALL);
count = __HAL_TIM_GET_COUNTER(&htimx);
direction = __HAL_TIM_IS_TIM_COUNTING_DOWN(&htimx);
__HAL_TIM_SET_COUNTER(&htimx, 0);
```



### Demo

##### 普通定时器

1. 通过STM32Cube配置时钟树，确定定时器的频率（如果使用内部时钟触发的话）

   ![image-20211220164759847](https://s2.loli.net/2021/12/20/HmGcsr795vVl3j6.png)

   

2. 在左侧的Timer中选择对应的定时器

   ![image-20211220164806501](https://s2.loli.net/2021/12/20/UbkINC621uLtgoS.png)



3. 选择时钟源Internal Clock，并在下方的 Parameter Settings 中设置参数Prescaler、Counter Mode、Count Period

   ![image-20211220164825023](https://s2.loli.net/2021/12/20/jLeu7grDXdKqEhU.png)

   ![image-20210906222940548](Image/image-20210906222940548.png)

4. 在NVIC Settings中使能定时器

   ![image-20211220164833854](https://s2.loli.net/2021/12/20/IYVCDHO2N38MUQK.png)



5. 在main中重写函数

   ```c
   void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef* htim){
       switch(htim->Instance){
           case TIMx:
               //what you want to do
               break;
           //...    
       }
   }
   ```



6. 在初始化定时器后打开定时器使能，否则定时器无法运行！！！！！

   ```c
   HAL_TIM_Base_Start_IT(&htimxx);
   ```



7. 若要修改定时器相关参数，可直接修改代码，先进入定时器初始化函数

   ![image-20211220164845014](https://s2.loli.net/2021/12/20/51taNPdALUKqcER.png)

   ![image-20211220164856540](https://s2.loli.net/2021/12/20/ChJve2wTQUPaFVg.png)



##### 输出比较

##### PWM生成

1. 利用 STM32Cube 设置引脚为 PWM输出

   ![image-20211220164908033](https://s2.loli.net/2021/12/20/thg2dy9ZpW3sKTN.png)



2. 配置相关的通道为PWM Generation 

   ![image-20211220164919947](https://s2.loli.net/2021/12/20/32qakirG5m7KL9t.png)



3. 设置频率和占空比（同一个定时器不同通道的PWM频率只能相等）

   ![image-20211220165019220](https://s2.loli.net/2021/12/20/H48XxbE6Zah59SL.png)

   - PWM_fre = TIM_frq / ( Prescaler + 1 ) / ( Counter Period + 1 )
   - Duty_cycle = Pulse / Counter Period



4. 将 Count Mode 设置为UP（向上计数）

   ![image-20211220165028476](https://s2.loli.net/2021/12/20/g93kwhnSlMCqcBs.png)



5. 设置通道极性，High 代表 Pulse 对应的时间段为高电平

   ![image-20211220165038159](https://s2.loli.net/2021/12/20/mlqB1wuKjJDo2F6.png)



6. 点击 NVIC Settings 使能定时器

   ![image-20211220165048859](https://s2.loli.net/2021/12/20/AzafX12vUwG9CZQ.png)



7. 打开对应PWM通道

   ```c
   HAL_TIM_PWM_Start(&htimx, TIM_CHANNEL_x);
   ```



##### 编码器模式

1. 选择要使用的定时器，设置为Encoder模式，此时默认channel 1和channel 2为输入

   ![image-20211220165100336](https://s2.loli.net/2021/12/20/MIuAch2Kk1FomaV.png)

   ![image-20211220165109190](https://s2.loli.net/2021/12/20/hfTeDYRkno8NiWj.png)



2. 设置相关参数

   ![image-20211220165119742](https://s2.loli.net/2021/12/20/AOWMfBNQsxDozGJ.png)

   

   `Prescaler`：分频系数，例如A的频率为f，如果采用上升沿和下降沿同时计数，那么在1s内编码器计数为4*f / ( Prescaler + 1 )

   `Count Mode`：计数模式，UP为向上计数（正转时COUNT++）

   `Counter Period`：达到该设定值后编码器计数值会溢出为0，一般设为65535（最大），防止溢出

   `Encoder Mode`：编码器模式

   - T1：上升沿计数
   - T2：下降沿计数
   - T1 and T2：上升沿、下降沿同时计数

   

   3. 点击 NVIC Settings 使能定时器

      ![image-20211220165130811](https://s2.loli.net/2021/12/20/cnM7ghS9FZdHiLp.png)

   

   4. 在主函数中打开定时器模式

      ```c
      HAL_TIM_Encoder_Start(&htimx, TIM_CHANNEL_ALL);
      ```

   

   5. 调用相关函数获得计数值和方向

      ```c
      count = __HAL_TIM_GET_COUNTER(&htimx);
      direction = __HAL_TIM_IS_TIM_COUNTING_DOWN(&htimx);
      ```

   

   6. 在打印完COUNT后记得清除COUNT

      ```c
      __HAL_TIM_SET_COUNTER(&htimx, 0);
      ```