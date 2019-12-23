let Promise = require('./index')
new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random()<0.5 ? resolve(100) : reject(-100)
    }, 1000)
}).then(result => {
    console.log(result)
}, reason => {
    console.log(reason)
});
console.log(3)