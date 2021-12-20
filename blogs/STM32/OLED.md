---
title: STM32入门笔记(八)：OLED显示
date: 2021-12-17
tags:
- stm32
- hal库
categories:
- STM32笔记
---

### 基础知识

##### 驱动库文件

`XMF_OLED_STM32Cube.c`：驱动程序源文件

`XMF_OLED_STM32Cube.h`：驱动程序头文件

`XMF_OLED_Font.h`：字库数据文件

`XMF_OLED_BMP.h`：图片数据文件



##### 取字模软件

[PCtoLCD2002](https://www.xmf393.com)



##### 移植流程

1. 将驱动库文件拷贝到工程文件中，和`main.c`放在同一目录
2. 在 main.c 中引入头文件`XMF_OLED_STM32Cube.h`
3. 根据芯片型号，修改`XMF_OLED_STM32Cube.h`头文件中的芯片头文件
4. 根据硬件原理图修改`XMF_OLED_STM32Cube.h`中OLED的引脚定义
5. 查看`OLED_Init()`初始化函数的源码，根据电路接口和应用需要修改



### API

```c
//OLED初始化
void OLED_Init();

//OLED清屏
void OLED_Clear();

//显示英文字符串
void OLED_ShowString(uint8_t x, uint8_t y, uint8_t* pString);

/*
 * @brief			显示中文字符
 * @param 	 x		起始横坐标
 * @param	 y		起始纵坐标
 * @param	 number	序号，如0代表Hzk数组的第一个字符Hzk[0]
 */
void OLED_ShowCHinese(uint8_t x, uint8_t y, uint8_t number);


/*
 * @brief			显示图片，显示前需要初始化OLED、清屏
 * @param 	 x0		起始横坐标
 * @param	 y0		起始纵坐标
 * @param 	 x1		终止横坐标
 * @param	 y1		终止纵坐标
 * @param	 BMP	图片数组
 */
void OLED_DrawBMP(uint8_t x0, uint8_t y0,
                  uint8_t x1, uint8_t y1,
                  uint8_t BMP[]);
```



### Demo

1. 在 STM32Cube中初始化相关引脚

   ![image-20211220180028624](https://s2.loli.net/2021/12/20/3Hpa1MDEfIczsN5.png)

   不同 OLED 的定义略有区别，常见管脚为两种：

   - `D0`：SDA

     `D1`：SCL

     `RES`：接高电平

     `DC`：DC

     `CS`：CS

     

   - `SCL`

     `SDA`

     `RST`

     `D/C`

     

2. 拷贝相关文件到 mian.c 所在目录

   ![image-20211220180044315](https://s2.loli.net/2021/12/20/vArMGbdklWKtei5.png)



3. 修改`XMF_OLED_STM32Cube.h`中的引脚定义

   ![image-20211220180053024](https://s2.loli.net/2021/12/20/bp738DqHTyXr9RU.png)



4. 在`main.h`中查看所用芯片的库，并修改`XMF_OLED_STM32Cube.h`中对应的库

   ![image-20211220180133675](https://s2.loli.net/2021/12/20/mP4sUDHGxvOdYBr.png)

   ![image-20211220180140811](https://s2.loli.net/2021/12/20/guFYbNDkX9poVLJ.png)



5. 将4个驱动文件添加至工程

   ![image-20211220180149678](https://s2.loli.net/2021/12/20/MEa8NICdhjsGnrw.png)



6. 在`main.c`中引入头文件

   ![image-20211220180208072](https://s2.loli.net/2021/12/20/mL3cGIXhNuWP7ke.png)

   至此，移植工作基本完成



7. 我们要展示的图片、字型等文件存放在这两个头文件里

   ![image-20211220180222514](https://s2.loli.net/2021/12/20/VKYJBRSA8wtvn7f.png)



8. 中文字符、图片需要用专门的软件进行取模

   1. 打开软件

      ![image-20211220180234483](https://s2.loli.net/2021/12/20/gs56jq3voJXMZkn.png)

      

   2. 选择模式

      ![image-20211220180244397](https://s2.loli.net/2021/12/20/2wH7bsoUgX9LMCh.png)

      

   3. 设置 “选项”，选择`C51格式`

      ![image-20211220180253932](https://s2.loli.net/2021/12/20/RKA9NjdTYXVM4eU.png)

      

   4. 设置行前缀、行后缀（图片模式与字符模式不同）

      - 图形模式

        ![image-20211220180304495](https://s2.loli.net/2021/12/20/lCetbNIUFQ9Z3Hc.png)

        

      - 字符模式

        ![image-20211220180313177](https://s2.loli.net/2021/12/20/uMq6BUJdKhobrp1.png)

        

   5. 点击 “确定”

      

9. 点击左上角文件夹打开图片文件

   ![image-20211220180322457](https://s2.loli.net/2021/12/20/otDMGAKE4wbfCm9.png)

   

   11. 点击生成字模

       ![image-20211220180438954](https://s2.loli.net/2021/12/20/7fU6yqiguFYlkPO.png)

   

   12. 复制相关内容，将复制到的内容粘贴到对应位置

       ![image-20211220180449196](https://s2.loli.net/2021/12/20/1WzhryZe3dfgl6X.png)

       - 若为图片，粘贴到`XMF_OLED_BMP.h`中

         ![image-20211220180459822](https://s2.loli.net/2021/12/20/sMdmBCEQcZy2a1b.png)

       - 若为字符，粘贴到`XMF_OLED_Font.h`中

         ![image-20211220180508085](https://s2.loli.net/2021/12/20/mNEMv7QYPJW69aI.png)

       

   13. 撰写显示函数

       - 图片

         ```c
         extern uint8_t BMP1[];
         
         void OLED_display_pic(){
             OLED_Clear();
             OLED_DrawBMP(0, 0, 128, 8, BMP1);
         }
         ```

         

       - 字符

         ```c
         void OLED_display_info(){
             OLED_Clear();
             OLED_ShowString(0, 0, (uint8_t*)"xxxx");
             OLED_ShowCHinese(10, 3, 0);
             OLED_ShowCHinese(28, 3, 1);
             OLED_ShowCHinese(46, 3, 2);
             //...
         }
         ```    