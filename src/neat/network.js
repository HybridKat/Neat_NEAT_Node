const Clone = require('lodash/clonedeep');
const Utils = require("./utils");
const Neuron = require("./neuron");
const Node = require("./node");

const Network = {
  generateNeurons: function( nodes, nbLayers ) {
    var neurons = [];

    // Classe les neurones par layer
      var nodesByLayer = Array.from(Array(nbLayers), () => new Array());
      nodes.map(n => nodesByLayer[n.layer].push(n));

    // Créer les connexions
      for( i=0; i<nbLayers-1; i++ ) {
        nodesByLayer[i].map(
          from => nodesByLayer[i+1].map(
            to => neurons.push(this.createNeuron( from, to ))
          )
        )
      }

    return neurons;
  },

  createNeuron: function( from, to, weight = false ) {
    var neuronID = from.nodeID + "_" + to.nodeID;
    var neuron = null;

    if( weight === false ) weight = Utils.random(-1);

    neuron = new Neuron(from, to, weight, neuronID);

    return neuron;
  },

  createRandomNeuron: function() {

  },

  splitNeuron: function(neuron, brain) {
    var from   = neuron.from;
    var to     = neuron.to;
    var weight = neuron.weight;
    var id     = neuron.neuronID;

    // Nouveau layer nécessaire?
      if( to.layer - from.layer == 1 ) {
        brain.nodes.map( n => {
          if( n.layer > from.layer ) n.layer++;
        });
        brain.nbLayers++;
      }

    // Créé une nouvelle node
      var node = new Node(brain.lastNodeID, from.layer + 1);
      brain.lastNodeID++;
      brain.nodes.push(node);

    // Faire les deux nouveaux neurones
      brain.neurons.push(this.createNeuron(from, node, neuron.weight));
      brain.neurons.push(this.createNeuron(node, to, 1));

    // Finalement on détruit le neuron original
      brain.neurons = brain.neurons.filter( n => n.neuronID != id );
  }
};

module.exports = Network;
