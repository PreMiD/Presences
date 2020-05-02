var presence = new Presence({
    clientId: "679008701063102512",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
var actualCode = `
console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}
console.stdwarn = console.warn.bind(console);
console.warn = function() {
  console.logs.push(Array.from(arguments));
  console.stdwarn.apply(console, arguments);
}
console.stdlog("Code injected by PreMiD!")
let repeatTimer = setInterval(function() {
  if (typeof console.logs == "object") {
    var filteredLogs = console.logs.filter(function(logEntry) {
      return logEntry[0] == "onJoinRoom" || logEntry[0] == "AS3-BootLoader:" || logEntry[0] == "AS3-GameLoader:" || (logEntry[0] == "received shell error" && logEntry[1].includes("No world with the id of")) || logEntry[0] == "_global[net]" || (typeof logEntry[0]=="string" && logEntry[0].includes("clientManager	: new party"));
    });
    var lastLog = filteredLogs.slice(-1).pop();
    if (typeof lastLog !== "undefined") {
      if (typeof lastLog[0] !== "undefined") {
       if (lastLog[0] == "received shell error") {
          if (typeof lastLog[1] !== "undefined") {
            if (lastLog[1].includes("No world with the id of")) {
              statuslabel.textContent = "serverSelect";
            }
          }
        }
        else if (lastLog[0] == "onJoinRoom") {
          statuslabel.textContent = lastLog[1];
        }
        else if (lastLog[0] == "AS3-BootLoader:" && lastLog[1].includes("game")) {
          statuslabel.textContent = lastLog[1].split("game ")[1].replace(" is meant to be high fps, not changing", "").replace(" is over, reset fps", "");
        }
        else if (lastLog[0] == "AS3-GameLoader:") {
          if (lastLog[1].includes("isStampEarned")) {
            statuslabel.textContent = "pufflescape";
          }
        }
        else if (lastLog[0] == "_global[net]") {
          statuslabel.textContent = "queued";
        }
        else if (lastLog[0].includes("clientManager	: new party")) {
          currentParty.textContent = lastLog[0].split("[")[1].split("]")[0];
        }
      }
    }
  }
},50);
`;
var statuslabel = document.createElement('p');
statuslabel.setAttribute("id", "statuslabel");
(document.head||document.documentElement).appendChild(statuslabel);
var currentPartyLabel = document.createElement('p');
currentPartyLabel.setAttribute("id", "currentParty");
(document.head||document.documentElement).appendChild(currentPartyLabel);
var script = document.createElement('script');
script.setAttribute("id", "injectedscript-bart");
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
presence.on("UpdateData", async () => {
  let currentParty = document.querySelector("#currentParty").textContent;
  let status = document.querySelector("#statuslabel").textContent;
  if (document.URL.includes("/#/")==false) {
    let data = {
      largeImageKey: "idlepuffle",
      details: "Viewing Homepage",
      startTimestamp: elapsed
    };
    presence.setActivity(data);
  }
  else if (document.URL.includes("/#/")) {
    if (status=="") {
      if (document.URL.includes("/#/login")) {
        let data = {
          largeImageKey: "cprlogo",
          details: "Logging In",
          state: "Choosing Penguin",
          startTimestamp: elapsed
        };
        presence.setActivity(data);
      }
      else if (document.URL.includes("/#/redeem")) {
        let data = {
          largeImageKey: "redeemred",
          details: "Redeeming a Code",
          startTimestamp: elapsed
        };
        presence.setActivity(data);
      }
    }
    else if (status=="serverSelect") {
      if (document.URL.includes("/#/login")) {
        let data = {
          largeImageKey: "cprlogo",
          details: "Logging In",
          state: "Selecting Server",
          startTimestamp: elapsed
        };
        presence.setActivity(data);
      }
      else if (document.URL.includes("/#/redeem")) {
        let data = {
          largeImageKey: "redeemred",
          details: "Redeeming a Code",
          startTimestamp: elapsed
        };
        presence.setActivity(data);
      }
    }
    else if (status=="queued") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Logging In",
        state: "Waiting in Queue",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="100") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Town",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="110") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Coffee Shop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="111") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Book Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="120") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Night Club",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="121") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Dance Lounge",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="122") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Recycling Plant",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="130") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Gift Shop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="200") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Ski Village",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="212") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Everyday Phoning Facility",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="213") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Recon Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="220") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Ski Lodge",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="221") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Lodge Attic",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="230") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Ski Hill",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="300") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Plaza",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="310") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Pet Shop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="320"||status=="951") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Dojo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="321") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Dojo Courtyard",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="322") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Ninja Hideout",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="323") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "EPF Command Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="330") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Pizza Parlor",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="340") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Stage",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="400") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Beach",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="410") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Lighthouse",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="411") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Beacon",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="420") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Migrator",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="421") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Ship Hold",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="422") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Captain's Quarters",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="423") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Crow's Nest",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="800") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Dock",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="801") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Snow Forts",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="802") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Stadium",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="803") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "HQ",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="804") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Boiler Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="805") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Iceberg",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="806") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Underground Pool",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="807") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Mine Shack",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="808") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Mine",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="809") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Forest",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="810") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Cove",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="811") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Box Dimension",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="812"||status=="953") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Fire Dojo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="813") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Cave Mine",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="814") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Hidden Lake",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="815") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Underwater Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="816") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Water Dojo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="817") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Hidden Dojo Room",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="818") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Dojo Pathway",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="819") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Serene Springs",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    //Games
    else if (status=="900") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Astro Barrier",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="901") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Bean Counters",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="902") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Puffle Roundup",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="903") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Hydro-Hopper",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="904") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Ice Fishing",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="905") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Cart Surfer",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="906") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Jet Pack Adventure",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="907") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 1",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="908") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 2",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="909") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Thin Ice",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="910") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Pizzatron 3000",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="911") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 3",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="912") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Catchin' Waves",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="913") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 4",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="914") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 5",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="915") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 6",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="916") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Aqua Grabber",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="917"||status=="918"||status=="919") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Paint By Letters",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="920") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 7",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="921") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 8",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="922") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 9",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="923") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 10",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="926") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " DJ3K",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="927") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "PSA Mission 11",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="949") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Puffle Rescue",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="950") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " System Defender",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="952") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Dance Contest",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="955") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Puffle Launch",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="997") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Card-Jitsu Fire",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="998") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Card-Jitsu",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="999") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "Sled Racing",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="pufflescape") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Pufflescape",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="941") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Puffle Soaker",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="942") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Balloon Pop",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="943") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Ring the Bell",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="944") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Feed-a-Puffle",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="945") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Memory Card game",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="946") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Puffle Paddle",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="947") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Puffle Shuffle",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status=="948") {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: " Spin to Win",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status.length>3&&!isNaN(status)) {
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: "In an Igloo",
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
    else if (status.length<4&&!isNaN(status)) {
      let room = "In a Party Room";
      // Party room IDs are 851-873 and 899.
      if (status=="854") {
        if (currentParty=="penguinawards") {room = "Limo";}
      }
      else if (status=="899") {
        if (currentParty=="penguinawards") {room = "Backstage";}
      }
      let data = {
        largeImageKey: "cprlogo",
        details: "Online",
        state: room,
        startTimestamp: elapsed
      };
      presence.setActivity(data);
    }
  }
});