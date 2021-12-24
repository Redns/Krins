---
title: FPGA入门笔记(一)：Intel FPGA开发流程
date: 2021-12-24
tags:
- fpga
- altera
- verilog
categories:
- FPGA笔记
---

### 1.创建文件夹

`doc`：设计相关文档存放目录

`img`：设计相关图片存放目录

`prj`：工程文件存放目录

`rtl`： verilog 可综合代码存放目录

`testbench`：测试文件存放目录

![image-20211224223423992](https://s2.loli.net/2021/12/24/mYIZifW1G7dANqk.png)



### 2.创建工程

1.  New Project Wizard -> Next

![image-20211224223433479](https://s2.loli.net/2021/12/24/FEB6RHXATQWKlxr.png)



2. 选择项目路径，填写工程名称，点击Next

![image-20211224223443793](https://s2.loli.net/2021/12/24/fN5OsEWyDYwoULn.png)



3. 选择Empty Project，点击Next

![image-20211224223452971](https://s2.loli.net/2021/12/24/qG5i6NwPxOBHI1M.png)



4. 点击Next

![image-20211224223502854](https://s2.loli.net/2021/12/24/gn1t4AfkjCFhoMq.png)



5. 选择自己的芯片型号，点击Next

![image-20211224223513138](https://s2.loli.net/2021/12/24/wBr4WZynO3tvJbV.png)



6. 设置仿真工具为ModelSim - Alter，仿真语言为Verilog HDL，点击Finish完成工程创建

![image-20211224223524889](https://s2.loli.net/2021/12/24/68VrdypkNBz4Rum.png)





### 3.添加设计文件

1. 点击 New 创建新文件

![image-20211224223534670](https://s2.loli.net/2021/12/24/IUFyrV31tlRoOnm.png)



2. 选择文件类型，点击 OK

![image-20211224223543458](https://s2.loli.net/2021/12/24/14bj9QfrXhczqRO.png)



3. 输入相关代码，保存在 rtl 文件夹下

![image-20211224223557682](https://s2.loli.net/2021/12/24/gcbMKFQ5vz6wZ1x.png)



4. 点击 Start Analysis & Synthesis 进行仿真和综合

![image-20211224223608761](https://s2.loli.net/2021/12/24/dOM27gZJBvTtjkC.png)



5. 点击 Tools -> Netlist Viewers -> RTL Viewer，查看硬件逻辑电路

![image-20211224223618405](https://s2.loli.net/2021/12/24/w9uvGpcFU6kEyOX.png)





### 4.功能仿真

1. 新建 .v 文件，并保存在工程对应的 testbench 文件夹下

![image-20211224223628368](https://s2.loli.net/2021/12/24/vdtA285VNxlkyh7.png)



2. 点击标题栏 Assignments -> Settings -> Simulation，检查信息是否与设置的一致

![image-20211224223640862](https://s2.loli.net/2021/12/24/YHItRchkwD8XTsO.png)



3. 选择 Compile test bench，点击右侧 Test Benches...

![image-20211224223650696](https://s2.loli.net/2021/12/24/2yNS1qXWwZtdDGx.png)



4. 点击 New

![image-20211224223700577](https://s2.loli.net/2021/12/24/87aDhsenPAyS1UY.png)



5. 选择已编辑好的 testbench 文件，点击 Add

![image-20211224223709141](https://s2.loli.net/2021/12/24/eHU4rm8FhoJA3zK.png)



6. 填写 Test bench name，需要与之前添加的 testbench 文件同名，点击 OK

![image-20211224223719054](https://s2.loli.net/2021/12/24/4UG1v3hbHslaQqD.png)



7. 点击 OK

![image-20211224223730654](https://s2.loli.net/2021/12/24/NPGUvEtWXKj13x5.png)



8. 点击 OK

![image-20211224223740299](https://s2.loli.net/2021/12/24/DMukQ6ctL47bHvK.png)



9. 点击 Tools -> RTL Simulation Tool -> RTL Simulation，进行功能仿真（理想情况）

![image-20211224223751549](https://s2.loli.net/2021/12/24/MuoeRJ4mpsy2gjH.png)



10. 查看仿真结果

![image-20211224223803033](https://s2.loli.net/2021/12/24/WmHDS2nZoVsluG7.png)



11. 若仿真失败，点击 View -> Transcript 查看错误原因



### 5.综合与布局布线

1. 点击主界面 Start Compilation

![image-20211224223817048](https://s2.loli.net/2021/12/24/Sz3HZtJ4nXAbI51.png)



2. 点击标题栏 Tools -> Run Simulation Tool -> Gate Leval Simulation，进行门电路仿真（非理想情况）

![image-20211224223829002](https://s2.loli.net/2021/12/24/COADSLyifeHqVK3.png)



3. 选择时序模型，点击 Run

![image-20211224223845455](https://s2.loli.net/2021/12/24/a8WCbw2PvgtLxye.png)



4. 查看仿真结果，发现与之前的功能型仿真结果不同

![image-20211224223854781](https://s2.loli.net/2021/12/24/TEs1abA2YKFRnHe.png)





### 6.分配引脚

1. 点击菜单栏 Pin Planner

![image-20211224223907613](https://s2.loli.net/2021/12/24/SanD8KltWe6ukwq.png)



2. 根据实际情况配置引脚

![image-20211224223918515](https://s2.loli.net/2021/12/24/pJm3tYz21oNcS5e.png)



3. 关闭引脚配置窗口，点击 Start Compilation





### 7.下载

##### 非固化下载

1. 点击菜单栏 Programmer

![image-20211224223931072](https://s2.loli.net/2021/12/24/qYb1xXh8iULnsEp.png)



2. 点击 Hardware Setup...

![image-20211224223943141](https://s2.loli.net/2021/12/24/gPyjBG8Niktbelh.png)



3. 选择 USB - Blaster

![image-20211224223955880](https://s2.loli.net/2021/12/24/iVXswq1xepABlR3.png)



4. 点击左侧 Auto Detect，选择 EP4CE10

![image-20211224224013163](https://s2.loli.net/2021/12/24/wp4A75M9fcxPNWh.png)



5. 点击 Add File...

![image-20210502112127272](Image/image-20210502112127272.png)



6. 选择工程目录下 output_files 文件夹下的 .sof 文件

![image-20211224224021452](https://s2.loli.net/2021/12/24/cdasIBHyFAgOhUp.png)



7. 点击 Start，等待下载结束

![image-20211224224031277](https://s2.loli.net/2021/12/24/i3Qoj8DKIJPfnYu.png)

![image-20211224224040434](https://s2.loli.net/2021/12/24/USfhdJNL4XbxA73.png)





##### 固化下载

1. 点击标题栏 File -> Convert Programming File

![image-20211224224054355](https://s2.loli.net/2021/12/24/l37WdRJHbj2eICo.png)



2. 设置如下选项

![image-20211224224104898](https://s2.loli.net/2021/12/24/QVWlUePvSD95acY.png)



3. 点击 Flash Loader，并在右侧点击 Add Device...

![image-20211224224115780](https://s2.loli.net/2021/12/24/eiSs8Vp6DkmONjx.png)



4. 选择相应设备，点击 OK

![image-20211224224127861](https://s2.loli.net/2021/12/24/zqJN3iOfXvHg5Zb.png)



5. 点击 SOF Data，并在右侧点击 Add File...

![image-20211224224347247](https://s2.loli.net/2021/12/24/OITrGsgMuQJXmAz.png)



6. 选择之前生成的 .sof 文件，点击 Generate

![image-20211224224400426](https://s2.loli.net/2021/12/24/eywh7XJYSclfiWt.png)



7. 重复上述 “ 非固化下载 ” 步骤，将下载文件由 .sof 替换为 .jic 即可

![image-20211224224409721](https://s2.loli.net/2021/12/24/y6oz7EvemtIZM4B.png)



8. 重新上电即可查看效果

   

### 8.基于vs code开发

1. 在`testbench`文件中添加代码

   ```verilog
   initial begin
       //指定vcd文件的名字为wave.vcd
       //仿真信息将记录到build文件夹下的wave.vcd文件中
   	$dumpfile("./build/wave.vcd");  
       
       //xxx_tb: testbench模块名称
       $dumpvars(0, xxx_tb);  
   	
       //...
   end
   ```

   

2. 创建文件夹`build`

   ```apl
   mkdir build
   ```



3. 编译模块

   ```apl
   iverilog -o ./build/output_file_name.out ./testbench/testbench_module_name.v ./rtl/src_module_name.v
   ```

   

4. 根据`.out`文件生成`vvp`波形

   ```apl
   vvp -n ./build/output_file_name.out
   ```



5. 使用`gtkwave`工具查看仿真波形

   ```apl
   gtkwave ./build/wave.vcd
   ```




6. 或直接使用`python`脚本

   ```python
   import os
   
   # 编译文件
   print("[1/3] Compile the module...")
   src_file = input("Source:")
   tst_file = input("Testbench:")
   out_file = input("Out:")
   os.system("iverilog -o ./build/" + out_file + ".out " + "./testbench/" + tst_file + ".v " +  "./rtl/" + src_file + ".v")
   
   # 生成vvd波形
   print("[2/3] Generate vvd wave...")
   os.system("vvp -n ./build/" + out_file + ".out")
   
   # 查看波形
   print("[3/3] Show wave...")
   wave = input("WaveName:")
   os.system("gtkwave ./build/" + wave + ".vcd")
   ```

   ```apl
   python.exe complie.py
   ```