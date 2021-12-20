function* read() {
  // 表示他是一个generator函数，可以将函数切成若干个部分
  const a = yield 1
  const b = yield 2
  const c = yield 3
} // generator 返回的结果是iterator ， 能被不停调用next来进行迭代

// console.dir(read().next())
let it = read()
console.log([...it])

console.log(Array.from({ 0: 1, 1: 2, 2: 3, length: 3 }))
// Symbol 可以进行元编程，可以改写js本身的功能
console.log([
  ...{
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function* () {
      yield 14, yield 25, yield 36
    }
  }
])
