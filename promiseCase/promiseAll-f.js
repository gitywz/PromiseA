const fs = require('fs').promises
let Promise = require('../promise/index')
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 将数组中的promise依次执行
    let result = []
    let index = 0
    function process(v, k) {
      result[k] = v
      if (++index === promises.length) {
        // 解决多个异步并发问题，只能靠计数器
        resolve(result)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let p = promises[i]
      if (p && typeof p.then == 'function') {
        p.then((data) => {
          process(data, i)
        }, reject) //如果有一个promise失败，那就执行最后的失败逻辑
      } else {
        process(p, i)
      }
    }
  })
}

// promise.all 表示全部成功才成功， 一个失败则失败
Promise.all([fs.readFile('./a.txt', 'utf-8'), fs.readFile('./b.txt', 'utf-8'), 1111]).then(
  (res) => {
    console.log(res)
  }
)
Promise.prototype.finally = function (cb) {
  return this.then(
    (y) => {
      return Promise.resolve(cb()).then(() => y)
    },
    (r) => {
      // cb 执行一旦报错，就直接跳过后续的then逻辑，直接将错误向下传递
      return Promise.resolve(cb()).then(() => {
        throw r
      })
    }
  )
}
// 无论成功失败都会执行的方法
Promise.resolve('ok')
  .finally(() => {
    // 如果返回一个promise那么会有等待结果
    console.log('无论成功失败都执行')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('resolve 1002521')
      }, 1000)
    })
  })
  .then((res) => {
    console.log('成功', res)
  })
  .catch((err) => {
    console.log('失败', err)
  })
