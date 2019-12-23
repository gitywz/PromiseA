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
        excutorCB(resolveFn, rejectFn);
    }
    then(fulfilledCB, rejectedCB) {
        this.fulfilledAry.push(fulfilledCB);
        this.rejectedAry.push(rejectedCB);
    }
}

module.exports = Promise