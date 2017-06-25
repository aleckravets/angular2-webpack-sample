// interface Promise<T> {
// 	finally(cb): Promise<T>;
// }
//
// Promise.prototype.finally = function(cb) {
// 	const res = () => this;
// 	const fin = () => Promise.resolve(cb()).then(res);
// 	return this.then(fin, fin);
// };

export class Deferred {
    promise: Promise<any>;
    private resolveCallback;
    private rejectCallback;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolveCallback = resolve;
            this.rejectCallback = reject;
        });
    }

    resolve(result?: any) {
        this.resolveCallback(result);
    }

    reject(error?: any) {
        this.rejectCallback(error);
    }
}
