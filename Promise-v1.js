function Promise(fn) {
  var callbacks = [];
  
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