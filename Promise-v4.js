/**
 * then 方法返回一个 new 出来的Promise用来作为桥接Promise
 * 这样实现了串形链式调用
 * 关键就是给then里面return 的 promise 注册一个 桥接 promise 的 resolve 函数
 */
function Promise(fn) {
  var state = 'pending',
    value = null,
    callbacks = [];

  this.then = function(onFulfilled) {
    return new Promise(resolve => {
      handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve,
      });
    });
  }

  function handle(callback) {
    if (state === 'pending') {
      callback.push(callback);
      return;
    }
    if (!callback.onFulfilled) {
      callback.resolve(value);
      return;
    }
    var ret = callback.onFulfilled(value);
    callback.resolve(ret);
  }

  function resolve(newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (typeof then === 'function') {
        then.call(newValue, resolve);
        return;
      }
    }
    state = 'resolved';
    value = newValue;
    setTimeout(() => {
      callbacks.forEach(callback => {
        handle(callback);
      });
    }, 0);
  }

  fn(resolve);
}