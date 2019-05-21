const neuron = function(from, to, weight, id) { this.init(from, to, weight, id) };
neuron.prototype = {
  neuronID: null,

  from: null,
  to: null,
  weight: 0,
  disabled: false,

  init: function(from, to, weight, id) {
    this.neuronID = id;

    this.from     = from;
    this.to       = to;
    this.weight   = weight;

    return this;
  }
};

module.exports = neuron;
