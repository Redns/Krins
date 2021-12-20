---
title: STM32入门笔记(六)：ADC
date: 2021-12-15
tags:
- stm32
- hal库
categories:
- STM32笔记
---

### 基础知识

##### ADC分类

- 逐次逼近型
- 双积分型
- Sigma-Delta型



##### 技术指标

`量程`：指ADC所能输入模拟信号的类型和电压范围，即参考电压

`转换位数`：量化过程中的量化位数 n

`分辨率`：ADC 能够分辨的模拟信号最小变化量，分辨率 = 量程 / 2^n

`转换时间`：ADC完成一次完整的A/D转换所需要的时间，包括采样、保持、量化、编码的全过程



##### 板载ADC

- 12位逐次逼近型，可测量`内、外信号源`
- 各个通道的 A/D 转换可以`单次、连续、扫描或间断模式`执行
- ADC的模拟输入通道分为`规则组`和`注入组`两种
- A/D转换结果有两种存储方式：`左对齐`和`右对齐`



### API

```c
/*
 * @Descript			阻塞式ADC开启函数
 * @param		hadc	句柄，用于选择ADC
 * @return				成功返回HAL_OK
*/
HAL_StatusTypeDef 	HAL_ADC_Start(ADC_HandleTypeDef* hadc);


/*
 * @Descript			非阻塞式ADC开启函数
 * @param		hadc	句柄，用于选择ADC
 * @return				成功返回HAL_OK
*/
HAL_StatusTypeDef 	HAL_ADC_Start_IT(ADC_HandleTypeDef* hadc);


/*
 * @Descript				阻塞式ADC转换函数
 * @param		hadc		句柄，用于选择ADC
 * @param		Timeout		超时时间
 * @return					成功返回HAL_OK
*/
HAL_StatusTypeDef 	HAL_ADC_PollForConversion(ADC_HandleTypeDef* hadc, uint32_t Timeout);


/*
 * @Descript			ADC采样值读取函数
 * @param		hadc	句柄，用于选择ADC
 * @return				采样值
*/
uint32_t 			HAL_ADC_GetValue(ADC_HandleTypeDef* hadc);


/*
 * @Descript			非阻塞式ADC回调函数
 * @param		hadc	句柄，用于选择ADC
 * @return		void
*/
void 				HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc);
```



### Demo

1. 在 STM32Cube 中设置相关管脚

   ![image-20211220174916682](https://s2.loli.net/2021/12/20/69uXIMsYkxhPbR5.png)



2. 选择左侧 Analog，进行配置

   ![image-20211220175016885](https://s2.loli.net/2021/12/20/OFiusWPZhgTLxw8.png)

   ![image-20210907180927488](Image/image-20210907180927488.png)

   

   `Disable`：失能

   `Differential`：差分输入

   `Single-ended`：单端输入



3. 在 Parameter Settings 中设置具体参数

   ![image-20211220175028532](https://s2.loli.net/2021/12/20/63COwQUk5lcSRbV.png)

   

   `Data Alignment`：数据对齐方式



4. 在NVIC Settings中使能ADC

   ![image-20211220175037832](https://s2.loli.net/2021/12/20/ItAac8EZMQ6oxlw.png)



5. 配置时钟树时注意 ADC 时钟

   ![image-20211220175048958](https://s2.loli.net/2021/12/20/1WJKGosZahp7UVk.png)



6. 阻塞式 ADC

   ```c
   void ADCx_Get_Value(){
       //打开对应的ADC
       HAL_ADC_Start(&huartx);
       
       //判断ADC转换是否完成
       if(HAL_ADC_PollForConversion(&hadcx, 10) == HAL_OK){
           //读取采样值
           ADC_value = HAL_ADC_GetValue(&hadcx);
           
           //将采样值转换为电压 (voltage = value * 分辨率)
           ADC_voltage = ADC_value * 3300 / (2^12); 
       }
   }
   ```



7. 非阻塞式

   ```c
   //打开ADC
   HAL_ADC_Start_IT(&huartx);
   
   //复写回调函数
   void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc){
       switch(hadc->Instance){
           case ADCx:
               ADC_value = HAL_ADC_GetValue(&hadcx);
               ADC_voltage = ADC_value * 3300 / (2^12);
               break;
           //...    
       }
   }
   ```