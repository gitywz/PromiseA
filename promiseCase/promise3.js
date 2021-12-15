let Promise1 = require('./promise/index')

// let promise2 = new Promise1((resolve, reject) => {
//   resolve('ok')
// }).then((data) => {
//   // return 200
//   return new Promise1((resolve, reject) => {
//     setTimeout(() => {
//       resolve(
//         new Promise1((resolve, reject) => {
//           setTimeout(() => {
//             resolve('OK')
//           }, 2000)
//         })
//       )
//     }, 1000)
//   })
// })

// promise2.then(
//   (data) => {
//     console.log(data)
//   },
//   (err) => {
//     console.log(err, 'err')
//   }
// )
let p = new Promise1((resolve, reject) => {
  resolve('OK')
})
  .then()
  .then()
  .then(
    (data) => {
      console.log(data)
    },
    (err) => {
      console.log('err', err)
    }
  )
