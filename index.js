var Jetty = require("jetty");
  const fixJetty = require("./src/configs/jettyPatch.js");
  global.jetty = fixJetty(new Jetty(process.stdout));

const BRAIN = require("./src/neat/brain");
const Utils = require("./src/neat/utils");

const Configs = {
  nbPlayers: 25,
  keepXBest: 2,
  totalRandom: 1,

  lastPlayerId: 0
};


/************************ JEUX **********************************/
  var Players = [];
  for( var i=0; i<Configs.nbPlayers; i++ ) {
    Players.push({
      id: Configs.lastPlayerId++,
      gen: 1,
      fitness: 0,
      dead: false,
      decisions: [],
      brain: new BRAIN(3, 1)
    });
  }

  async function GameRound(r) {
    //await PressAnykey();
    await Utils.sleep(500);

    var allDead = true;
    Players.map(p => { if( !p.dead ) allDead = false; })

    if (allDead) {
      jetty.lineDown();
      jetty.text("---------- GAME OVER ---------------");

      QuitFuckRepeat();
      return;
    }

    var target = Math.round(Utils.random(1,10));
    var reward = Math.round(Utils.random(1,10));
    var roll   = Math.round(Utils.random(1,10));

    Players.map( p => {
      p.brain.sense([1, target, reward]);
      p.decisions = p.brain.decide();
    });


    Players.map( p => {
      if( p.dead ) return;

      if( p.decisions[0] >= 0.5 && roll >= target ) p.fitness = Math.floor( p.fitness / 2 );
      if( p.decisions[0] >= 0.5 && roll < target )  p.fitness += reward;

      if( r%10 == 0 && p.fitness < r/10 ) {
        p.dead = true; // On tue s'il lui reste pas assez pour passer au prochain round
        p.fitness += Math.floor(r/10); // Pour s'avoir rendu là
      }
    });

    jetty.nuke();
    jetty.moveTo([0,0]);

    jetty.rgb(10, false);
      jetty.text("ROUND : " + r);
      jetty.column(20);
      jetty.text("TARGET : " + target);
      jetty.column(40);
      jetty.text("REWARD : " + reward);
      jetty.column(60);
      jetty.text("ROLLED : " + roll);
      jetty.column(80);

      jetty.lineDown().lineDown().underline();

      jetty.text("PLAYER");
      jetty.column(30);
      jetty.text("STATUS");
      jetty.column(60);
      jetty.text("DECISION");
      jetty.column(90);
      jetty.text("FITNESS");
    jetty.reset().rgb(11, false);

    Players.map( p => {
      jetty.lineDown();

      jetty.text(p.id.toString());
      jetty.column(30);
      jetty.text(p.dead?"DEAD":"OK");
      jetty.column(60);
      if( p.dead ) {
        jetty.text("---");
      }else{
        jetty.text((p.decisions[0] >= 0.5)?"TAKE":"HIDE");
        jetty.text(" (" + p.decisions[0].toFixed(5).toString() + ")");
      }
      jetty.column(90);
      jetty.text(p.fitness.toString());
    });

    GameRound(r+1);
  }

  async function QuitFuckRepeat() {
    var oldPlayers = Players;
    Players = [];

    oldPlayers.sort( (a,b) => {
        if( a.fitness == b.fitness ) return 0;
        return ( a.fitness > b.fitness )?-1:1;
    });

    // Génère la prochaine vague avec les meilleurs de celle-ci
      for( var i=0; i<Configs.keepXBest; i++ ) {
        if( oldPlayers[i].fitness == 0 ) break; // Ça donne rien s'il est poche

        var tempPlayer = oldPlayers[i];
        tempPlayer.fitness = 0;
        tempPlayer.dead = false;

        Players.push(tempPlayer);
      }

    // Ajoutons des full random
      for( var i=0; i<Configs.totalRandom; i++ ) {
        Players.push({
          id: Configs.lastPlayerId++,
          gen: 1,
          fitness: 0,
          dead: false,
          decisions: [],
          brain: new BRAIN(3, 1)
        });
      }

    // Le reste c'est des enfants du meilleur
      for( var i=Players.length; i<Configs.nbPlayers; i++ ) {
        Players.push({
          id: Configs.lastPlayerId++,
          gen: oldPlayers[0].gen+1,
          fitness: 0,
          dead: false,
          decisions: [],
          brain: oldPlayers[0].brain.breed()
        });
      }

    await PressAnykey();
    GameRound(1);
  }
  function PressAnykey() {
    process.stdin.setRawMode = true;
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode = false;
      resolve()
    }))
  }

  console.log("Starting game");
  GameRound(1);
