/**
 * 利用setTimeout将callbacks的处理放到事件循环的最后
 * then方法返回this用以完成链式调用
 */
function Promise(fn) {
  var callbacks = [];

  this.then = (onFulfilled) => {
    callbacks.push(onFulfilled);
    return this;
  }

  function resolve(value) {
    setTimeout(() => {
      callbacks.forEach(callback => {
        callback(value);
      });
    }, 0);
  }

  fn(resolve);
}