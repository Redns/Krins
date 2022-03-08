(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{563:function(t,s,a){"use strict";a.r(s);var n=a(12),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"基础知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础知识"}},[t._v("#")]),t._v(" 基础知识")]),t._v(" "),a("h5",{attrs:{id:"工作框图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作框图"}},[t._v("#")]),t._v(" 工作框图")]),t._v(" "),a("p",[t._v("DAC 主要由三部分组成：触发方式、控制逻辑、数模转换器")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/W32ywoP6ZHDzgxq.png",alt:"image-20211220175303194"}})]),t._v(" "),a("h5",{attrs:{id:"触发方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#触发方式"}},[t._v("#")]),t._v(" 触发方式")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("概念：指DAC转换可以由某外部事件触发（定时器计数器、外部中断线）")])]),t._v(" "),a("li",[a("p",[t._v("触发方式选择")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/95K7wUe2u6PCNkm.png",alt:"image-20211220175345990"}})])]),t._v(" "),a("li",[a("p",[t._v("如果选择中断源触发，每次触发源触发后，存放在"),a("code",[t._v("寄存器DAC_DHRx")]),t._v("中的数据会被传送到"),a("code",[t._v("寄存器DAC_DORx")]),t._v("中。在3个APB1时钟周期后，"),a("code",[t._v("寄存器DAC_DORx")]),t._v("更新为新值；")]),t._v(" "),a("p",[t._v("如果选择软件触发，一旦SWTRIG位置 1，转换即开始。在数据从"),a("code",[t._v("DAC_DHRx寄存器")]),t._v("传送到"),a("code",[t._v("DAC_DORx寄存器")]),t._v("后，"),a("code",[t._v("SWTRIG位")]),t._v("由硬件自动清0")])])]),t._v(" "),a("h5",{attrs:{id:"控制逻辑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#控制逻辑"}},[t._v("#")]),t._v(" 控制逻辑")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("概念：此部分决定了DAC的波形控制，输出方式，DMA传输……")])]),t._v(" "),a("li",[a("p",[t._v("DHRx ==> DORx")]),t._v(" "),a("ul",[a("li",[t._v("如果没有选择硬件触发（TENx=0），在一个APB1周期后传入DORx")]),t._v(" "),a("li",[t._v("如果选择硬件触发（TENx=1），则在3个APB1周期后传入DORx")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/yHe8zUQ2an7WPRO.png",alt:"image-20211220175356006"}})])]),t._v(" "),a("li",[a("p",[t._v("一旦数据从"),a("code",[t._v("DAC_DHRx寄存器")]),t._v("装入"),a("code",[t._v("DAC_DORx寄存器")]),t._v("，在经过时间"),a("code",[t._v("Tsetting")]),t._v("（大约3us） 后输出有效，这段时间的长短依"),a("code",[t._v("电源电压")]),t._v("和"),a("code",[t._v("负载")]),t._v("的不同有所变化")])])]),t._v(" "),a("h3",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//开启DAC输出")]),t._v("\nHAL_StatusTypeDef "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DAC_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Channel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     \n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//关闭DAC输出")]),t._v("\nHAL_StatusTypeDef "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_Stop")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DAC_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Channel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//开启DAC的DMA输出，需要函数中断开启")]),t._v("\nHAL_StatusTypeDef "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_Start_DMA")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DAC_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Channel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" pData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Alignment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//关闭DAC的DMA输出")]),t._v("\nHAL_StatusTypeDef "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_Stop_DMA")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DAC_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Channel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//设置DAC输出值")]),t._v("\nHAL_StatusTypeDef "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_SetValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DAC_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Channel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Alignment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//获取DAC输出值")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_GetValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DAC_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),t._v(" Channel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br")])]),a("h3",{attrs:{id:"demo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),a("h5",{attrs:{id:"通用-dac"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#通用-dac"}},[t._v("#")]),t._v(" 通用 DAC")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("使用 STM32Cube 设置相关管脚为 DAC 输出管脚，触发源选择 Software trigger")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/J2SP5XnIpiNmgDd.png",alt:"image-20211220175408682"}})]),t._v(" "),a("p",[a("code",[t._v("OU1 & OUT2")]),t._v("：两个输出通道")]),t._v(" "),a("p",[a("code",[t._v("External Trigger")]),t._v("：外部中断触发")]),t._v(" "),a("p",[a("code",[t._v("Trigger")]),t._v("：触发方式选择")]),t._v(" "),a("p",[a("code",[t._v("Output Buffer")]),t._v("：使能 DAC 输出缓存。DAC集成了2个输出缓存，可以用来减少输出阻抗，无需外部运放即可直接驱动外部负载。\t\t\t\t\t\t\t\t 每个 DAC通道输出缓存可以通过设置DAC_CR寄存器的BOFFx位来使能或者关闭。")])]),t._v(" "),a("li",[a("p",[t._v("在主函数中设置 DAC 输出，并打开 DAC")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//使能DAC的1通道，输出数据为12位右对齐，DAC输出为2048")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//DAC_voltage = VREF * value / (2^12 - 1)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_SetValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DAC_CHANNEL_1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DAC_ALIGN_12B_R"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2048")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//开启DAC")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("DAC_CHANNEL_1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])])])]),t._v(" "),a("h5",{attrs:{id:"三角波生成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三角波生成"}},[t._v("#")]),t._v(" 三角波生成")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("打开 STM32Cube 配置相关通道，触发源选择 Timer")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/SZRfPvAbxMTyNGw.png",alt:"image-20211220175423295"}})]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("Wave generation mode")]),t._v("：波形生成模式")]),t._v(" "),a("ol",[a("li",[a("p",[a("code",[t._v("Trigger wave generation")]),t._v("：三角波")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("noise wave generation")]),t._v("：噪声波形")])])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("Maximum Triangle Amplitude")]),t._v("：最大三角波幅度（0 ~ 4095 ==> 0 ~ 3.3V）")])])])]),t._v(" "),a("li",[a("p",[t._v("打开 Timers，使能上一步选择的 Timer")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/r8ow9uIKztGiJmE.png",alt:"image-20211220175435718"}})]),t._v(" "),a("p",[t._v("三角波频率 = 定时器频率 / (2 * Maximum Triangle Amplitude)")])]),t._v(" "),a("li",[a("p",[t._v("在main函数中添加以下两行代码，即可输出三角波")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//打开定时器")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_Base_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//DAC会以0x100作为基电压生成三角波")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_SetValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DAC_CHANNEL_1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DAC_ALIGN_12B_R"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//打开DAC")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DAC_CHANNEL_2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])])])]),t._v(" "),a("h5",{attrs:{id:"timer-dma-dac"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#timer-dma-dac"}},[t._v("#")]),t._v(" Timer + DMA + DAC")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("通过 STM32Cube 设置 DAC")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/PtjW79VarBbmHR8.png",alt:"image-20211220175446538"}})])]),t._v(" "),a("li",[a("p",[t._v("点击 DMA Settings，设置 DMA")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/q57PTM6vbsYcRC2.png",alt:"image-20211220175454474"}})])]),t._v(" "),a("li",[a("p",[t._v("将要生成的波形的电压值存放在数组中")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/2yFfK1wo9YezUPI.png",alt:"image-20211220175510202"}})])]),t._v(" "),a("li",[a("p",[t._v("在 main 函数中写入如下代码")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//打开定时器")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_Base_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//以DMA方式设置DAC")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_DAC_Start_DMA")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("hdac"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DAC_CHANNEL_1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uint32_t")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("sin_8bit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DAC_ALIGN_8B_R"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);