// promise 基本上不用关心浏览器的兼容性
//自己手写promise

// Promise 是一个类， 可以new Promise 创造一个实例
// promise 有三个状态， 1.默认状态叫等待状态 pending 2.resolve 表示成功态，fulfilled 3.reject 表示失败 rejected

// 成功有成功的原因，失败有失败的原因， 除了调用resolve和reject 能改变状态外，还可以使用throw error 抛出异常也回执行到失败的逻辑
let Promise = require('../promise/index')
// console.log(Promise)
let promise = new Promise((resolve, reject) => {
  // throw new Error('err 111111')
  setTimeout(() => {
    resolve('ok')
    reject('err')
  }, 1000)
})

promise.then(
  // then 提供两个参数 1.成功的回调， 2.失败的回调
  (value) => {
    console.log(value, 'success')
  },
  (reason) => {
    console.log(reason, 'fail')
  }
)
