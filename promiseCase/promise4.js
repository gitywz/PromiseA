let Promise = require('./promise/index')

Promise.resolve('hello').then((res) => {
  console.log(res)
})

Promise.reject('err').then((err) => {
  console.log(err)
})
