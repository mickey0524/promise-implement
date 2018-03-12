/**
 * 增加state，用于处理在Promise resolve 之后通过then注册的回调函数
 */
function Promise(fn) {
  var state = pending,
    value = null,
    callbacks = [];
  
  this.then = (onFulfilled) => {
    if (state === 'pending') {
      callbacks.push(onFulfilled);
      return this;
    }
    onFulfilled(value);
    return this;
  }

  function resolve(newValue) {
    state = 'resolved';
    value = newValue;
    setTimeout(() => {
      callbacks.forEach(callback => {
        callback(newValue);
      });
    }, 0);
  }

  fn(resolve);
}