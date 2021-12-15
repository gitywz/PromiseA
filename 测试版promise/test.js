let Promise = require('./index')
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(100)
    }, 50)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200)
    }, 10)
})

let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(300)
    }, 80)
})

Promise.all([p1, p2, p3]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})