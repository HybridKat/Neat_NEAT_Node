const Neuron = require("./neuron");
const Network = {
  neuronHistory: [],

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

  createNeuron: function( from, to ) {
    var neuronID = from.nodeID + "_" + to.nodeID;
    var neuron = null;

    if( this.neuronHistory[neuronID] ) {
      neuron = this.neuronHistory[neuronID].clone();
      neuron.weight = 1;
    }else{
      neuron = this.neuronHistory[neuronID] = new Neuron(from, to, 1, neuronID);
    }

    return neuron;
  }
};

module.exports = Network;
