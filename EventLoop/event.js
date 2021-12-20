// 浏览器的时间环
// 进程、“线程”
// 进程： 是计算机分配任务的，和 调度的任务的最小单位，浏览器是一个多进程模型，每个页卡都是一个独立的进程（稳定）
// 后端代码都是采用多进程

// 线程：常见的线程有哪些，（JS 是单线程的？ 主线程是单线程的）
//       GUI渲染，页面渲染，绘图， 3D动画
//  JS 渲染引擎： 执行js代码， 当js执行时，渲染线程会挂起， -> 渲染时不能执行JS

// 事件触发线程：EventLoop
// webApi: 也会创造线程 事件，定时器。ajax 都是创造一个线程
// webworker
// ....

// 宏任务,
// 执行脚本 script / setTimeout / setInterval  / 事件 / ajax    node: / I/O

//微任务
// promise / mutationObserver / node:  nextTick / process.nextTick
// requestAnimationFrame((大约)16.6毫秒会渲染一次页面，也有可能不渲染) 渲染之前执行
// requestIDleCallback  空闲事件执行
