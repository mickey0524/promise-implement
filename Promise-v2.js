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