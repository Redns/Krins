---
title: STM32开发环境搭建
date: 2021-12-19
tags:
 - STM32
 - HAL库
categories:
 -  STM32笔记
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