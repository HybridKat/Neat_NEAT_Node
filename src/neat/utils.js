const Utils = {
  // ********************************* SLEEP *******************************************/
  sleep: function(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  },

  // ********************************* RANDOM ******************************************/
  random: function(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  },

  pickRandom: function(arr) {
    return arr[Math.random() * arr.length | 0];
  },

  randomGaussian: function(mean = 0, deviat = 1) {
    var r, r1, r2;

    var temp = 1;
    while( temp >=1 ){
      r1 = this.random(-1,1);
      r2 = this.random(-1,1);
      temp = r1*r1 + r2*r2;
    }
    r = r1 * Math.sqrt(-2 * Math.log(temp) / temp);

    return r * deviat + mean;
  }
};

module.exports = Utils;
