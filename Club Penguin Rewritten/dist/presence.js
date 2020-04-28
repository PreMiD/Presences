var presence = new Presence({
  clientId: "679008701063102512"
});
var elapsed = Math.floor(Date.now() / 1000);
var actualCode = `
statuslabel.className = "statuslabel";
console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}
console.log("Code injected by PreMiD!")
let repeatTimer = setInterval(function() {
  if (typeof console.logs == "object") {
    var filteredLogs = console.logs.filter(function(logEntry) {
      return logEntry[0] == "onJoinRoom" || logEntry[0] == "AS3-BootLoader:" || logEntry[0] == "AS3-GameLoader:";
    });
    var lastLog = filteredLogs.slice(-1).pop();
    if (typeof lastLog !== "undefined") {
      if (typeof lastLog[0] !== "undefined") {
        if (lastLog[0] == "onJoinRoom") {
          statuslabel.textContent = lastLog[1];
        }
        else if (lastLog[0] == "AS3-BootLoader:" && lastLog[1].includes("game")) {
          statuslabel.textContent = lastLog[1].split("game ")[1].replace(" is meant to be high fps, not changing", "").replace(" is over, reset fps", "");
        }
        else if (lastLog[0] == "AS3-GameLoader:") {
          if (lastLog[1].includes("isStampEarned")) {
            statuslabel.textContent = "pufflescape"
          }
        }
      }
    }
  }
},1000);
`;
var statuslabel = document.createElement("p");
statuslabel.setAttribute("id", "statuslabel");
(document.head || document.documentElement).appendChild(statuslabel);
var script = document.createElement("script");
script.setAttribute("id", "injectedscript-bart");
script.textContent = actualCode;
(document.head || document.documentElement).appendChild(script);
presence.on("UpdateData", async () => {
  var status = document.querySelector(".statuslabel").textContent;
  if (document.URL.includes("/#/") == false) {
    let data = {
      largeImageKey: "idlepuffle",
      details: "Viewing Homepage",
      startTimestamp: elapsed
    };
    presence.setActivity(data);
  } else if (document.URL.includes("/#/redeem")) {
    let data = {
      largeImageKey: "redeemred",
      details: "Redeeming a Code",
      startTimestamp: elapsed
    };
    presence.setActivity(data);
  } else if (document.URL.includes("/#/login")) {
    if (status == "") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Logging In",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "100") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Town",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "110") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Coffee Shop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "111") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Book Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "120") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Night Club",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "121") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Dance Lounge",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "122") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Recycling Plant",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "130") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Gift Shop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "200") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Ski Village",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "212") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Everyday Phoning Facility",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "213") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Recon Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "220") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Ski Lodge",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "221") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Lodge Attic",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "230") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Ski Hill",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "300") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Plaza",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "310") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Pet Shop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "320") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Dojo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "321") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Dojo Courtyard",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "322") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Ninja Hideout",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "323") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "EPF Command Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "330") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Pizza Parlor",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "340") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Stage",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "400") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Beach",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "410") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Lighthouse",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "411") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Beacon",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "420") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Migrator",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "421") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Ship Hold",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "422") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Captain's Quarters",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "423") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Crow's Nest",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "800") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Dock",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "801") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Snow Forts",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "802") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Stadium",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "803") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "HQ",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "804") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Boiler Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "805") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Iceberg",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "806") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Underground Pool",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "807") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Mine Shack",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "808") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Mine",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "809") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Forest",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "810") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Cove",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "811") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Box Dimension",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "812") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Fire Dojo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "813") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Cave Mine",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "814") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Hidden Lake",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "815") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Underwater Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "816") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Water Dojo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "817") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Hidden Dojo Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "818") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Dojo Pathway",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "819") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Serene Springs",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    //Games
    else if (status == "900") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Astro Barrier",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "901") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Bean Counters",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "902") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Rounding up Puffles",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "903") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Hydro-Hopper",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "904") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Ice Fishing",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "905") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Cart Surfer",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "906") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Jet Pack Adventure",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "907") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 1",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "908") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 2",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "909") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Thin Ice",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "910") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Pizzatron 3000",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "911") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 3",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "912") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Catchin' Waves",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "913") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 4",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "914") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 5",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "915") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 6",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "916") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Aqua Grabber",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "917" || status == "918" || status == "919") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Painting By Letters",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "920") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 7",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "921") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 8",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "922") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 9",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "923") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 10",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "926") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing DJ3K",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "927") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Mission 11",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "949") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Rescuing Puffles",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "950") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing System Defender",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "952") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "In a Dance Contest",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "995") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Launching Puffles",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "997") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Card-Jitsu Fire",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "998") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Card-Jitsu",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "999") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Sled Racing",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "pufflescape") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Pufflescape",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "941") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Puffle Soaker",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "942") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Balloon Pop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "943") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Ring the Bell",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "944") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Feed-a-Puffle",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "945") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Memory Card game",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "946") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Puffle Paddle",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "947") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Puffle Shuffle",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status == "948") {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "Playing Spin to Win",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status.length > 3 && !isNaN(status)) {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "In an Igloo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    } else if (status.length < 4 && !isNaN(status)) {
      let data = {
        largeImageKey: "cprlogo",
        details: "In-Game",
        state: "In a Party Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
  }
});
