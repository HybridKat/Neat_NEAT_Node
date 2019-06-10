const Clone = require('lodash/clonedeep');
const Utils = require("./utils");
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
        this.nodes.map( n => n.output = null );

      // Ensuite on pousse les output directement dans la node
        for( i=0; i<inputVals.length; i++ ) {
          this.nodes[i].output = inputVals[i];
        }

    },

    decide: function() {
      var results = [];

      this.outputs.map( n => {
        results.push( n.getOutput(this.neurons) );
      });

      return results;
    },

  // ************************************************* EVOLUTION ***************************************************
    breed: function() {
      var childBrain = Clone( this );

      childBrain.mutate();

      return childBrain;
    },

    mutate: function() {
      // Mutation sur le poids des neurones
        this.neurons.map( n => {
          if( Utils.random() < 0.8 )
            n.mutate();
        })

      // Mutation qui ajoute un neurone
        if( Utils.random() < 0.05 ) {
          Network.createRandomNeuron();
        }

      // Mutation qui ajoute une node
        if( Utils.random() < 0.01 ) {
          Network.splitNeuron(Utils.pickRandom(this.neurons), this);
        }
    }
};

module.exports = brain;
