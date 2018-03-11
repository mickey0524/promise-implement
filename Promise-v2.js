function Promise(fn) {
  var value = null,
    callbacks = [];

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