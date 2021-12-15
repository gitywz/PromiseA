const PENDING = 'PENDING' // 默认等待状态
const FULFILLED = 'FULFILLED' // 成功状态
const REJECTED = 'REJECTED' // 失败状态

function resolvePromise(x, promise2, resolve, reject) {
  // 还需要考虑 x 可能是别的promise 希望自己的promise和别的promise一起来混用
  if (x === promise2) {
    return reject(new TypeError('循环引用'))
  }
  if (x === null) {
    return resolve(null)
  }
  // 继续判断x 是不是一个promise promise需要有then方法（啥时候是函数的？别人写的promise 就有可能是函数）
  if ((typeof x === 'object' && typeof x !== null) || typeof x == 'function') {
    // 才有可能是一个promise, 继续判断x是否有then方法
    let called = false
    try {
      let then = x.then
      if (typeof then == 'function') {
        // x.then 这种方式会再次取一次属性，触发get方法
        // then.call(x) 这个不会
        then.call(
          x,
          (y) => {
            // y 有可能还是一个promise，所有还要再进行解析流程
            // 不停解析成功的返回值，知道这是一个普通值
            if (called) return
            called = true
            resolvePromise(y, promise2, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // 如果x 是一个普通值 则直接调用resolve即可
    resolve(x)
  }

  // 如果x 是一个promise那么应该采用这个promise的状态，决定调用resolve还是reject
}

class Promise {
  constructor(executor) {
    //executor 会默认被执行 同步执行
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 用户调用resolve和reject 可以将对应的结果暴露在promise实例上
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (value instanceof Promise) {
        // 这个方法不属于规范，只是为了和原生的promise的表现形式一样
        return value.then(resolve, reject) // === resolvePromise
      }
      if (this.status === PENDING) {
        // 防止状态重复改变
        this.value = value
        this.status = FULFILLED
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        // 防止状态重复改变
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject) // 默认new Promise 中的函数会执行
    } catch (e) {
      // 如果错误执行出错，将错误传递到reject中 => 执行失败的逻辑
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (v) => v
    onRejected =
      typeof onRejected == 'function'
        ? onRejected
        : (e) => {
            throw e
          }
    // 每次调用then方法，都必须重新返回一个新的promise
    // x 是上一个then成功或失败的返回值，x 决定 promise2走成功还是失败
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          // 定时器是为了能拿到promise2
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        // 发布订阅模式
        this.onResolvedCallbacks.push(() => {
          // 可以实现其他逻辑
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          // 可以实现其他逻辑
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  catch(errFn) {
    return this.then(null, errFn)
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(error) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}

Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
