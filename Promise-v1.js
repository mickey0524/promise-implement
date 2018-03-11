function Promise(fn) {
  var value = null,
    callbacks = [];
  
  this.then = (onFulfilled) => {
    callbacks.push(onFulfilled);
  }

  function resolve(value) {
    callbacks.forEach(callback => {
      callback(value);
    });
  }

  fn(resolve);
}