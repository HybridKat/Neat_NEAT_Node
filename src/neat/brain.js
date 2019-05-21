const Node = require("./node");
const Network = require("./network");
const brain = function(ins, outs) { this.init(ins, outs) };
brain.prototype = {
  neurons: [],
  nodes: [],
  inputs: [],
  outputs: [],

  lastNodeID: 0,
  nbLayers:   2,

  init: function(ins, outs) {
    for(i=0; i < ins; i++) {
      var n = new Node(this.lastNodeID, 0);
      this.nodes.push(n);
      this.inputs.push(n);
      this.lastNodeID++;
    }
    for(i=0; i < outs; i++) {
      var n = new Node(this.lastNodeID, this.nbLayers-1);
      this.nodes.push(n);
      this.outputs.push(n);
      this.lastNodeID++;
    }

    this.neurons = Network.generateNeurons( this.nodes, this.nbLayers );
  },

  // ************************************************ PROCESSING ***************************************************
    sense: function( inputVals ) {
      // Reset les nodes avant tout
        this.nodes.map( n => n.inputTotal = 0 );
        for( i=0; i<inputVals.length; i++ ) {
          this.nodes[i].output = inputVals[i];
        }

      // Neurone par neurone on process les informations
        console.log(this.nodes.map(n => n.output));
        this.neurons.map( n => {
          if( n.disabled ) return;
          n.to.input += n.from.getOutput() * n.weight;
        });
    },

    decide: function() {
      console.log(this.outputs.map(n => n.getOutput()));
    }

    // ************************************************* EVOLUTION ***************************************************
};

module.exports = brain;
