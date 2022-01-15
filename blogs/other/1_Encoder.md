﻿---
title: 增量式编码器详解
date: 2022-01-15
tags:
- 编码器
- stm32
categories:
- 硬件笔记
---

# 1 基本原理

## 1.1 结构

光电编码器由三个部分组成：`发光二极管`，`码盘`以及码盘背面的`光传感器`。结构示意图如下所示：

![在这里插入图片描述](https://raw.githubusercontent.com/Redns/Notebook/master/Image/20201209132141582.png?token=AQOTG4HOOR4ULOOXDVITRGLB4FWTG)

<br>

### 1.1.1 测速原理

码盘安装在旋转轴上，上面均匀地排列着透光和不透光的扇形区域。当码盘转动时，不透光的部分能够挡住光线，而透光区则允许光线透过，那么码盘背面的光传感器就会周期性地收到光信号，从而输出一列方波。根据单位时间内方波的周期数，就能粗略估计出运动的速度！

<br>

### 1.1.2 速度计算

我们知道，码盘转动一周时，光传感器输出的`脉冲个数`是一定的，通过检测一定时间内收到的脉冲个数，就可以知道在这段时间内码盘转动了多少圈，进而换算为速度。例如，一个码盘转动一周时会输出100个脉冲，在0.1s内我们收到了500个脉冲，这意味着0.1s内码盘转动了5周，即码盘的转速为50r/s。

<br>

### 1.1.3 运动方向

> 但是，还有一个问题。设想，如果编码器只输出一列方波（假设为A），我们该怎样判断码盘是正转还是反转？因为无论是正转还是反转，都会产生同样的方波，而它们对速度的贡献显然是相反的！接下来我们看一看这个问题该怎样解决：

上面我们已经说过，码盘上均匀地刻着透光和不透光的扇形区域，我们在这一圈扇形区域内再均匀地刻上一圈透光和不透光的扇形区域，不同的是，外圈和内圈的区域是`交错`的。也就是说，当外圈处于`不透光区域`时，内圈对应的一半为`透光区域`，一半为`不透光区域`；当外圈处于`透光区域`时，内圈对应的一半为`不透光区域`，一半为`透光区域`。于是，当码盘转动时编码器会输出两列`相位差为90°方波`，波形如下：

![在这里插入图片描述](https://raw.githubusercontent.com/Redns/Notebook/master/Image/20201209132240245.png?token=AQOTG4BKM5OG2O7YIOE5SODB4FXRE)

下面左图为`正转`时的波形，右图为`反转`时的波形

![](https://raw.githubusercontent.com/Redns/Notebook/master/Image/20201209132258975.png?token=AQOTG4BLB3KNGAAAOLZWC73B4FXTG)

- 当码盘正转时，在方波A的上升沿，方波B恒为低电平；当码盘反转时，在方波A的上升沿，方波B恒为高电平。通过判断A处于上升沿时，B的电平状态就可以方便地知道码盘旋转的方向。

- 不同型号的编码器，码盘旋转一周输出的`脉冲个数`是不同的，我使用的编码器码盘旋转一周输出的脉冲个数为 90，小车轮子的直径为75mm 。假如我们在时间T内统计到的有效脉冲数目为S（正转脉冲数+1，反转脉冲数-1），小车轮子的直径为D，圆周率为pi（约为3.14），那么小车的速度换算公式如下：

| $V = \frac{\pi SD}{90T}$ |
| :----------------------: |

<br>

例如，我们每隔1 s统计一次有效脉冲数目，某一次得到的有效脉冲数目为500，那么小车此时的速度为：

| $v = \frac{3.14 * 500 * 75 * 10^{-3}}{90 * 1}  ≈  1.31 m/s$ |
| :---------------------------------------------------------: |

<br>

### 1.1.4 实现思路

我们可以看出，问题的关键在于，如何统计一定时间内的脉冲数目？目前有两种思路：

1. 利用`中断`检测A的上升沿，触发中断时判断B的电平，来决定计数值加还是减；

2. 将定时器设置为`编码器模式`，直接读取计数值和方向。

<br>

# 2 代码实现

## 2.1 中断 + 电平检测

1. 打开`STM32CubeMX`，设置相关管脚，我这里使用的是`PC2`和`PC3`来接A、B相
   ![在这里插入图片描述](https://raw.githubusercontent.com/Redns/Notebook/master/Image/20201209173933217.png?token=AQOTG4FYPYW7SEIMWB4MIJDB4FZEI)

2. 为方便观察，打开`UART串口`，从串口读取采集到的数据
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209174013660.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NlZ2Fu,size_16,color_FFFFFF,t_70#pic_center)

<br>

3. 打开`定时器2`，定时器响应时通过UART串口把计数值打印出来，计时`200ms`
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209174043587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NlZ2Fu,size_16,color_FFFFFF,t_70#pic_center)

![](https://raw.githubusercontent.com/Redns/Notebook/master/Image/image-20220114205350416.png?token=AQOTG4ARIZW5SUXTKAIN663B4FZJS)



4. 导入`STM32Cube`工程

**定义相关变量**

```c
int COUNT = 0;             //用来计数
char str_buff[64];
char point[64];
float speed = 0;               //速度
int flag = 0;                  //flag=0时计数，flag=1时清零
```
<br>

**重写中断回调函数**

```c
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  if (GPIO_Pin == GPIO_PIN_2)
  {
    if (flag == 1)
      COUNT = 0;
    else
    {
      if (HAL_GPIO_ReadPin(GPIOC, GPIO_PIN_3) == 0)
        COUNT++;
      else
      {
        COUNT--;
      }
    }
  }
}
```

<br>

**定时器响应后通过UART串口发送数据**


```c
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
  if (htim->Instance == TIM2)
  {
    if (flag == 0)
    {
      speed = (float)COUNT * 3.14 * 0.14 / (90 * 0.2)*100/34; //cm/s
      sprintf(str_buff, "speed:%dcm/s\r\n",(int)speed);
      HAL_UART_Transmit_IT(&huart1, (uint8_t*)str_buff, sizeof(str_buff));
      flag = 1;
    }
    else
    {
      flag = 0;
    }
  }
}
```

<br>

**在主函数中打开定时器2**


```c
HAL_TIM_Base_Start_IT(&htim2);
```



5. 测试效果如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209174833829.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NlZ2Fu,size_16,color_FFFFFF,t_70#pic_center)

<br>

## 2.2 编码器模式

1. 选择`TIM4`，设置`Combined Channels`为`Encoder Mode`

![image-20220114205743026](https://raw.githubusercontent.com/Redns/Notebook/master/Image/image-20220114205743026.png?token=AQOTG4HSLXYANEMEGT5TY2LB4FZYC)

<br>

2. 配置编码模式

![image-20220114205901673](https://raw.githubusercontent.com/Redns/Notebook/master/Image/image-20220114205901673.png?token=AQOTG4AUZKSD5UEFJ5HX4YTB4FZ5A)

- `Prescaler`：分频系数

- `Counter Mode`：计数模式，设置为UP代表码盘正转时计数值增加，反转时计数值减小

- `Counter Period`：当编码器计数值等于该值时，计数值会清零，一般设置为65535

- `Encoder Mode`：计数模式，编码器计数有三种模式可选

  1. `T1`：只在上升沿计数，例如在一定时间内A产生了100个脉冲，那么编码器计数值为200（A、B产生脉冲数相等），由于分频系数的存在，实际调用函数得到的计数值为200 / ( Prescaler + 1 )

  2. `T2`：只在下降沿计数，计数值与T1相等( Prescaler相等的情况下）

  3. `TI and T2`：在上升沿、下降沿都计时，计数值为T1的两倍( Prescaler相等的情况下）

<br>

3. 导入`CubeMx`工程

```c
//定义相关变量
uint8_t GetData;     //编码器计数
uint8_t data[64];
uint8_t Direction;  //编码器方向
```


```c
//打开定时器模式
HAL_TIM_Encoder_Start(&htim4, TIM_CHANNEL_ALL);
```


```c
//读取相关值并通过OLED显示出来
while (1)
  {
    
    GetData = __HAL_TIM_GET_COUNTER(&htim4);
    Direction = __HAL_TIM_IS_TIM_COUNTING_DOWN(&htim4);  
    sprintf((char *)data, "fre:%4d dir:%d",GetData*2,Direction);
    
    OLED_Clear();
    OLED_ShowString(0,0,data);
    __HAL_TIM_SET_COUNTER(&htim4,0);
    HAL_Delay(500);
    /* USER CODE END WHILE */
​
    /* USER CODE BEGIN 3 */
  }
```

<br>

4. 实际效果

![image-20220114210332904](https://raw.githubusercontent.com/Redns/Notebook/master/Image/image-20220114210332904.png?token=AQOTG4EGKGRXHYD7KSBTIHLB4F2OU)