const brain = function() { this.init() };
brain.prototype = {
  neurons: [],
  nodes: [],
  inputs: [],
  outputs: [],

  init: function() {
    console.log("Brain initialized!");
  }
};

module.exports = brain;
