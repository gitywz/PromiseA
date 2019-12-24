class Promise {
    constructor(excutorCB) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer)
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result
                this.fulfilledAry.forEach(item => {
                    item(this.value)
                })
            },0)
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer)
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason
                this.rejectedAry.forEach(item => {
                    item(this.value)
                })
            })
        };
        try {
            excutorCB(resolveFn, rejectFn)
        } catch (err) {
            rejectFn(err)
        }
    }
    then(fulfilledCB, rejectedCB) {
        typeof fulfilledCB !== "function" ? fulfilledCB = result => result : null;
        typeof rejectedCB !== "function" ? rejectedCB = reason => {
                throw new Error(reason)
            } : null;
        return new Promise((resolve,reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCB(this.value);
                    x instanceof Promise ? x.then(resolve,reject) : resolve(x);
                }catch (err) {
                    reject(err)
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCB(this.value);
                    x instanceof Promise ? x.then(resolve,reject) : resolve(x);
                }catch (err) {
                    reject(err)
                }
            });
        })
    }
    catch(rejectedCB) {
        return this.then(null, rejectedCB)
    }
    static all(promiseAry = []) {
        return new Promise((resolve, reject) => {
            let index = 0; // 记录成功个数
            let result = []; // 记录成功结果
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then((val) => {
                    index++;
                    result[i] = val; // 索引需要和数组对应，保证结果顺序和数组顺序一致
                    if (index === promiseAry.length) {
                        resolve(result)
                    }
                },reject);
            }
        })
    }
}

module.exports = Promise