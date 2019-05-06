// Fix a few bugs / things I find annoying
function fixJetty(jetty) {
  [jetty.moveLeft, jetty.moveRight] = [jetty.moveRight, jetty.moveLeft];
  [jetty.lineUp,   jetty.lineDown]  = [jetty.lineDown,  jetty.lineUp];

  jetty.column = function(n) {
    this.seq("G", [n]);
  };

  jetty.scrollDown = function() {
    console.log(" ");
    return this;
  };

  return jetty;
}

module.exports = fixJetty;
