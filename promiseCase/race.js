//race 方法 调用的任何一个成功或失败 就采用他的结果

const fs = require('fs').promises // 如果将不是promise的异步api 转换成promise

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      if (promise && typeof promise.then === 'function') {
        promise.then(resolve, reject)
      } else {
        resolve(promise)
      }
    }
  })
}

Promise.race([fs.readFile('./a.txt', 'utf-8'), fs.readFile('./b.txt', 'utf-8')]).then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)

// function promisify(fn) {
//   // 高阶函数
//   return function (...args) {
//     return new Promise((resolve, reject) => {
//       // node 所有api第一个参数都是error
//       fn(...args, function (err, data) {
//         if (err) return reject(err)
//         resolve(data)
//       })
//     })
//   }
// }

// function promisifyAll(obj) {
//   // 重新对象方法
//   for (let key in obj) {
//     if (typeof obj[key] == 'function') {
//       obj[key] = promisify(obj[key])
//     }
//   }
//   return obj
// }

// let newFs = promisifyAll(fs)
// newFs.readFile('./a.txt', 'utf8').then((res) => {
//   console.log(res)
// })
// let read = promisify(fs.readFile)
// read('./a.txt', 'utf-8').then((res) => {
//   console.log(res)
// })

// 中断promise链式调用

Promise.resolve('1')
  .then((res) => {
    console.log(res)
    return new Promise(() => {}) // 返回一个promise，会采用他的状态，如果不成功也不失败，就不会向下执行了
  })
  .then((res) => {
    console.log(res)
  })
//1. 不采用原有结果，promise 破坏链式调用，可以采用返回一个pending 的 promise
