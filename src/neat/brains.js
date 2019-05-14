const Node = require("./nodes");
const brain = function(ins, outs) { this.init(ins, outs) };
brain.prototype = {
  neurons: [],
  nodes: [],
  inputs: [],
  outputs: [],

  lastNodeID: 0,

  init: function(ins, outs) {
    this.inputs = ins;
    this.outputs = outs;

    for(i=0; i<this.inputs; i++) {
      this.nodes.push(new Node(this.lastNodeID, 0));
      this.lastNodeID++;
    }
    for(i=0; i<this.outputs; i++) {
      this.nodes.push(new Node(this.lastNodeID));
      this.lastNodeID++;
    }

    console.log("Brain initialized!");
  }
};

module.exports = brain;
