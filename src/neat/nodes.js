const node = function(id) { this.init(id) };
node.prototype = {
  nodeID: null,
  links: [],

  inputTotal: 0,
  output: 0,

  init: function(id) {
    this.nodeID = id;
    console.log("Node #" + this.nodeID + " initialized!");
  }
};

module.exports = node;
