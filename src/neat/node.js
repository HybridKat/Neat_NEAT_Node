const node = function(id, layer) { this.init(id, layer) };
node.prototype = {
  nodeID: null,
  layer: 0,

  inputTotal: 0,
  output: null,

  init: function(id, layer) {
    this.nodeID = id;
    this.layer  = layer;
  },

  getOutput: function( neurons ) {
    if( this.output == null ) this.process(neurons);

    return this.output;
  },
  process: function( neurons ) {
    if( this.layer == 0 ) return;
    this.inputTotal = 0;

    neurons.map( n => {
      if( n.to.nodeID == this.nodeID )
        this.inputTotal += n.from.getOutput( neurons ) * n.weight;
    });

    this.output = this.sigmoid( this.inputTotal );
  },

  sigmoid: function(x) {
    return 1.0 / ( 1.0 + Math.pow(Math.E, -4.9 * x) );
  }
};

module.exports = node;
