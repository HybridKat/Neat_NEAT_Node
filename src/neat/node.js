const node = function(id, layer) { this.init(id, layer) };
node.prototype = {
  nodeID: null,
  layer: 0,
  links: [],

  inputTotal: 0,
  output: null,

  init: function(id, layer) {
    this.nodeID = id;
    this.layer  = layer;
  },

  getOutput: function() {
    if( this.output == null ) this.process();

    return this.output;
  },
  process: function() {
    if( this.layer == 0 ) return;

    this.output = this.sigmoid( this.inputTotal );
  },

  sigmoid: function(x) {
    return 1.0 / ( 1.0 + Math.pow(Math.E, -4.9 * x) );
  }
};

module.exports = node;
