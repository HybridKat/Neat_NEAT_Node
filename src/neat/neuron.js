const Utils = require("./utils");

const neuron = function(from, to, weight, id) { this.init(from, to, weight, id) };
neuron.prototype = {
  neuronID: null,

  from: null,
  to: null,
  weight: 0,

  init: function(from, to, weight, id) {
    this.neuronID = id;

    this.from     = from;
    this.to       = to;
    this.weight   = weight;

    return this;
  },

  mutate: function() {
    if (Utils.random() < 0.1) {
      this.weight = Utils.random(-1);
    } else {
      this.weight += (Utils.randomGaussian() / 50);

      if (this.weight > 1) {
        this.weight = 1;
      }
      if (this.weight < -1) {
        this.weight = -1;

      }
    }
  }
};

module.exports = neuron;
