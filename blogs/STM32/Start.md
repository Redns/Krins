---
title: STM32入门笔记(一)：开发环境搭建
date: 2021-12-10
tags:
 - stm32
 - hal库
categories:
 - STM32笔记
---

## 1.VS Code

1. cube中工程目录设置如下

   ![image-20211202213510626](https://s2.loli.net/2021/12/19/VkpbHesMGu7RCwT.png)

   

2. `Toolchain`选择`Makefile`

   ![image-20211202213430800](https://s2.loli.net/2021/12/19/jnliLJN1OIEsdeH.png)

   

3. 使用`vs code`打开工程文件夹，按下快捷键`Ctrl+Shift+P`打开操作面板，选择`C/C++:编辑配置(JSON)`

   ![image-20211202213702711](https://s2.loli.net/2021/12/19/mhnkQPtzj1BOs26.png)

   

4. 根据`Makefile`设置`c_cpp_properites.json`中的`includePath`

   ![image-20211202214033035](https://s2.loli.net/2021/12/19/VEga5qyuUQ9RCsh.png)

   

5. 同理设置`defines`

   ![image-20211202214227098](https://s2.loli.net/2021/12/19/u9UHyOZY6R2lBfn.png)

   

6. 在当前文件夹下打开终端，输入`make`编译工程，编译的文件将存放在`build`文件夹下

   ![image-20211202214500152](https://s2.loli.net/2021/12/19/8Rd1cqTFfSkmUQO.png)

   ![image-20211202214537861](https://s2.loli.net/2021/12/19/8EWIKkDsHMYUBmd.png)

   

7. 打开`J-Flash Lite`

   ![image-20211202214645684](https://s2.loli.net/2021/12/19/YmIHtjEKUbO2k4T.png)

   

8. 设置相关参数后即可烧录程序

   ![image-20211202214823086](https://s2.loli.net/2021/12/19/kfVAibhdtBnX3Zz.png)

## 2.CLion

1. 创建Cube工程

   ![image-20211205002726645](https://s2.loli.net/2021/12/19/wgi37Thl9ez6DCj.png)

   

2. 选择`STM32CubeIDE`

   ![image-20211205002801987](https://s2.loli.net/2021/12/19/OD1Ut6Nz9j4dp5L.png)

   

3. 代码生成设置如下

   ![image-20211205002828606](https://s2.loli.net/2021/12/19/QuWBSVUaCey3kY7.png)

   

4. 编写代码

   ![image-20211205002957005](https://s2.loli.net/2021/12/19/a2mTsrcS8354K9F.png)

   

5. 相应的`.cfg`文件在`D:\OpenOCD\share\openocd\scripts\board`

   ![image-20211205003052938](https://s2.loli.net/2021/12/19/OuXKzeIkiGUVLg6.png)



6. 可通过`Edit`编辑相关配置

   ![image-20211205003145234](https://s2.loli.net/2021/12/19/IoKYnxv3Fs8TCJq.png)

   ![image-20211205003159451](https://s2.loli.net/2021/12/19/Jz8Y5IcPbgDp9Qm.png)