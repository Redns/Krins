---
title: STM32入门笔记(十)：IIC
date: 2021-12-19
tags:
- stm32
- hal库
categories:
- STM32笔记
---

### 基础知识

##### 概述

- 半双工，任意时刻只能单向通信
- 支持多主控，谁控制 SCL 谁就是主机
- SCL 和 SDA 均需要上拉电压，阻值 3.3K ~ 10K



##### 信号线分类

- SDA：双向数据线
- SCL：串行时钟线

![image-20211220180838578](https://s2.loli.net/2021/12/20/hLc89IlrkyUvXMH.png)



##### 时序图

- 写数据

  ![image-20211220180848345](https://s2.loli.net/2021/12/20/v5quR1YcDmMgh3Q.png)

  - 从设备地址位：7位或10位，常用7位

  - 方向位

    - 0：写数据
    - 1：读数据

    

- 读数据

  



##### 数据有效性

- IIC信号在数据传输过程中，当 SCL 为高电平时，数据线 SDA 必须保持稳定状态，不允许有电平跳变
- SCL = 1 时，数据线 SDA 的任何电平变换会看做是总线的起始信号或者停止信号



##### 应答信号

主机SCL拉高，读取从机SDA的电平，为低电平表示产生应答

- 应答信号为低电平时，规定为有效应答位（ACK），表示接收器已经成功地接收了该字节
- 应答信号为高电平时，规定为非应答位（NACK），一般表示接收器接收该字节没有成功

![image-20211220180857992](https://s2.loli.net/2021/12/20/kQVt8UwquoOK1Ts.png)



![image-20211220181149962](https://s2.loli.net/2021/12/20/fKO3QaCZRLqMnel.png)




##### 伪代码

```c
/*初始化*/
void IIC_init(){
	SCL=1; 			//首先把时钟线拉高
    delay_us(4);	//延时函数
    SDA=1; 			//在SCL为高的情况下把SDA拉高
    delay_us(4); 	//延时函数
}


/*开始通信*/
//1.先拉高SDA，再拉高SCL，空闲状态
//2.拉低SDA
void IIC_Start(){
    SDA=1; 			//确保SDA线为高电平
    delay_us(5);
    SCL=1;  			//确保SCL高电平
    delay_us(5);
    SDA=0; 			//在SCL为高时拉低SDA线，即为起始信号
    delay_us(5);  
}


/*结束通信*/
//1.先拉低SDA，再拉低SCL
//2.拉高SCL
//3.拉高SDA
//4.停止接收数据
void IIC_Stop(void){
	IIC_SCL=0;
	IIC_SDA=0;    //STOP:当SCL高时，数据由低变高
 	delay_us(4);
	IIC_SCL=1; 
	IIC_SDA=1;    //发送I2C总线结束信号
	delay_us(4);							   	
}


/*ACK*/
//1.先拉低SCL，再拉低SDA
//2.拉高SCL
//3.拉低SCL
void I2C_Ack(void){
   IIC_SCL=0;  
   IIC_SDA=0;   
   delay_us(2);
   IIC_SCL=1;
   delay_us(5);
   IIC_SCL=0;
}


/*NACK*/
//1.先拉低SCL，再拉高SDA
//2.拉高SCL
//3.拉低SCL
void I2C_NAck(void){
   IIC_SCL=0;   
   IIC_SDA=1;  
   delay_us(2);
   IIC_SCL=1;
   delay_us(5);
   IIC_SCL=0;
}


/*发送一个字节*/
//在SCL为高电平期间，发送数据
//发送8次数据，数据为1, SDA被拉高；数据为0，SDA被拉低。
void IIC_Send_Byte(u8 txd){                        
    u8 t;   
    SDA_OUT();         
    IIC_SCL=0;//拉低时钟开始数据传输
    for(t = 0; t < 8; t++){              
        //获取数据的最高位
        if((txd&0x80)>>7)
            IIC_SDA=1;
        else
            IIC_SDA=0;
        
        //准备传送下一位
        txd<<=1;       
        delay_us(2);   
        IIC_SCL=1;
        delay_us(2); 
        IIC_SCL=0;    
        delay_us(2);
    }     
}       



/*读1个字节*/   
u8 IIC_Read_Byte(unsigned char ack){
	unsigned char i, receive=0;
    
    //SDA设置为输入
	SDA_IN();        
    for(i = 0;i < 8; i++ ){
        IIC_SCL=0; 
        delay_us(2);
		IIC_SCL=1;
        receive<<=1;
        if(READ_SDA)receive++;   
		delay_us(1); 
    }		
    
    if (!ack)
        IIC_NAck();        //发送nACK
    else
        IIC_Ack();         //发送ACK   
    return receive;
}
```





### API

```c
/*
 * Descript				IIC写函数
 * @param 	hi2c		句柄，用于选择I2C设备
 * @param	DevAddress	从设备的地址
 * @param	pData		写入的数据
 * @param	Size		写入的字节数
 * @param	Timeout		最大传输时间
 */
HAL_I2C_Master_Transmit(I2C_HandleTypeDef *hi2c, 
                         uint16_t DevAddress, 
                         uint8_t *pData, 
                         uint16_t Size, 
                         uint32_t Timeout);


/*
 * Descript				IIC读函数
 * @param 	hi2c		句柄，用于选择I2C设备
 * @param	DevAddress	从设备的地址
 * @param	pData		读取的数据
 * @param	Size		读取的字节数
 * @param	Timeout		最大读取时间
 */
HAL_I2C_Master_Receive(I2C_HandleTypeDef *hi2c, 
                         uint16_t DevAddress, 
                         uint8_t *pData, 
                         uint16_t Size, 
                         uint32_t Timeout);


/*
 * Descript				IIC写寄存器数据函数
 * @param	hi2c		句柄，用于选择I2C设备
 * @param	DevAddress	从机设备地址
 * @param	MemAddress	从机寄存器地址
 * @param	MemAddSize	从机寄存器字节长度，I2C_MEMADD_SIZE_8BIT / I2C_MEMADD_SIZE_16BIT
 * @param   pData		发送的数据的起始地址
 * @param	Size		输数据的大小
 * @param	Timeout		操作超时时间 
 */
HAL_I2C_Mem_Write(I2C_HandleTypeDef *hi2c, 
                  uint16_t DevAddress, 
                  uint16_t MemAddress, 
                  uint16_t MemAddSize, 
                  uint8_t *pData, 
                  uint16_t Size, 
                  uint32_t Timeout);


/*
 * Descript				IIC读寄存器数据函数
 * @param	hi2c		句柄，用于选择I2C设备
 * @param	DevAddress	从机设备地址
 * @param	MemAddress	从机寄存器地址
 * @param	MemAddSize	从机寄存器字节长度，I2C_MEMADD_SIZE_8BIT / I2C_MEMADD_SIZE_16BIT
 * @param   pData		数据存储的起始地址
 * @param	Size		输数据的大小
 * @param	Timeout		操作超时时间 
 */
HAL_I2C_Mem_Read(I2C_HandleTypeDef *hi2c, 
                 uint16_t DevAddress, 
                 uint16_t MemAddress, 
                 uint16_t MemAddSize, 
                 uint8_t *pData, 
                 uint16_t Size, 
                 uint32_t Timeout);
```



### Demo

1. 通过 STM32Cube 配置 IIC

   ![image-20211220180919327](https://s2.loli.net/2021/12/20/dLVGlByNKWnpJrt.png)

   - Master Features
     - I2C Speed Mode：快速模式/标准模式
     - I2C Clock Speed：选择传输速率，默认为 100Khz
   - Slave Features
     - Clock No Stretch Mode：时钟拓展模式，大多数设备不支持
     - Primary Address Length selection：从设备地址长度，大部分为7位
     - Dual Address Acknowledged：双地址确认
     - Primary slave address：从设备初始地址



2. 参考 API