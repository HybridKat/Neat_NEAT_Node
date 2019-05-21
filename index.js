var Jetty = require("jetty");
  const fixJetty = require("./src/configs/jettyPatch.js");
  global.jetty = fixJetty(new Jetty(process.stdout));

const BRAIN = require("./src/neat/brain");

var primeBrain = new BRAIN(4, 2);
primeBrain.sense([1,1,0.25,0.25]);
primeBrain.decide();

// jetty.nuke();
// jetty.moveTo([0,0]);
//
// jetty.underline().rgb(10, false);
//   jetty.text("COL1");
//   jetty.column(58);
//   jetty.text("COL2");
//   jetty.column(72);
//   jetty.text("COL3");
//   jetty.column(91);
//   jetty.text("COL4");
// jetty.reset().rgb(11, false);
//
// jetty.lineDown().text("Testing lolz");
