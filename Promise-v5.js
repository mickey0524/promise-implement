/**
 * 前面4个版本的Promise只考虑了resolve，这个版本考虑reject
 */
function Promise(fn) {
  var state = 'pending',
    value = null,
    callbacks = [];

  this.then = (onFulfilled, onRejected) => {
    return new Promise((resolve, reject) => {
      handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve, resolve,
        reject, reject
      });
    });
  }

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback);
      return;
    }
    var cb = state === 'resolved' ? callback.onFulfilled : callback.onRejected,
      ret;
    if (cb == null) {
      cb = cb === 'resolved' ? callback.resolve : callback.reject;
      cb(value);
      return;
    }
    ret = cb(value);
    callback.resolve(ret);
  }
  
  function resolve(newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (typeof then === 'function') {
        then.call(newValue, resolve, reject);
        return;
      }
    }
    state = 'resolved';
    value = newValue;
    execute();
  }

  function reject(error) {
    state = 'rejected';
    value = error;
    execute();
  }

  function execute() {
    setTimeout(() => {
      callbacks.forEach(callback => {
        handle(callback);
      })
    }, 0);
  }

  fn(resolve, reject);
}