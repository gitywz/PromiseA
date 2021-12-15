const fs = require('fs')
let Promise = require('./promise/index')
function readFile(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
//1. then方法中，成功的回调或者失败的回调返回的是一个promise ， 那么会采用返回的promise状态，走外层下一次then中的成功或失败，同时将promise 处理后的结果向下传递
// 2. then 方法中 成功回调或失败回调，返回是一个普通值（不是普通值）这里会将返回的结果传递到下一次的then成功中去
readFile('./a.txt', 'utf8')
  .then(
    (data) => {
      throw new Error('报错')
    },
    (err) => {
      return 200
    }
  )
  .then(
    (data) => {
      console.log(data)
    },
    (err) => {
      console.log('err2', err)
    }
  )

// readFile('./a.txt', 'utf8')
//   .then((data) => {
//     return readFile(data + 1, 'utf8')
//   })
//   .then(
//     (data) => {
//       console.log(data)
//     },
//     (err) => {
//       console.log(err, 'err')
//     }
//   )
// 如果返回是是一个失败的promise、报错了、才会走下一个then的失败，否则全部走成功
