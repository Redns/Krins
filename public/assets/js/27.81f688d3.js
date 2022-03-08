(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{568:function(t,s,a){"use strict";a.r(s);var n=a(12),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"基础知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础知识"}},[t._v("#")]),t._v(" 基础知识")]),t._v(" "),a("h5",{attrs:{id:"信号线分类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#信号线分类"}},[t._v("#")]),t._v(" 信号线分类")]),t._v(" "),a("ul",[a("li",[t._v("SDO：主设备数据输出，从设备数据输入，对应 MOSI")]),t._v(" "),a("li",[t._v("SDI：主设备数据输入，从设备数据输出，对应 MISO")]),t._v(" "),a("li",[t._v("SCLK：时钟信号，由主设备产生")]),t._v(" "),a("li",[t._v("CS：从设备使能信号，由主设备控制")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/JALvgiu7Usx5OcD.png",alt:"image-20211220180644596"}})]),t._v(" "),a("h5",{attrs:{id:"时序图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#时序图"}},[t._v("#")]),t._v(" 时序图")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/h7xMvAsZmOVbuDS.png",alt:"image-20211220180655977"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/kpQhVmxLqw3tWCi.png",alt:"image-20211220180705518"}})]),t._v(" "),a("ul",[a("li",[a("p",[t._v("当 CPOL = 0 时，空闲时 SCK 时钟为低电平；当 CPOL = 1 时，空闲时 SCK 时钟为高电平；可以看出本例程所示时序图空闲时 SCK 为低电平，故 CPOL = 0")])]),t._v(" "),a("li",[a("p",[t._v("当 CPHA = 0 时，在 SCK 的奇数边沿采样；当 CPHA = 1 时，在 SCK 的偶数边沿采样；可以看出本例程所示时序图在偶数边沿采样，故 CPHA = 1")])])]),t._v(" "),a("h3",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//SPI发送/接收")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_SPI_TransmitReceive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("hspi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("pTxData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("pRxData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Timeout"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//SPI接收")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_SPI_Receive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("hspi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("pData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Timeout"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//SPI发送")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_SPI_Transmit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("hspi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("pData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Timeout"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("h3",{attrs:{id:"demo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("根据实际情况初始化 SPI")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/Xkfgit8VqoTYZnz.png",alt:"image-20211220180715090"}})])]),t._v(" "),a("li",[a("p",[t._v("使用 API 中的函数")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);