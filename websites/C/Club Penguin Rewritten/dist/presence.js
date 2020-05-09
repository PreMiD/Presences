const presence = new Presence({
    clientId: "679008701063102512"
});
const elapsed = Math.floor(Date.now() / 1000);
const actualCode = `
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
const statuslabel = document.createElement("p");
statuslabel.setAttribute("id", "statuslabel");
(document.head || document.documentElement).appendChild(statuslabel);
const currentPartyLabel = document.createElement("p");
currentPartyLabel.setAttribute("id", "currentParty");
(document.head || document.documentElement).appendChild(currentPartyLabel);
const script = document.createElement("script");
script.setAttribute("id", "injectedscript-bart");
script.textContent = actualCode;
(document.head || document.documentElement).appendChild(script);
presence.on("UpdateData", async () => {
    const currentParty = document.querySelector("#currentParty").textContent;
    const status = document.querySelector("#statuslabel").textContent;
    const presenceData = {
        largeImageKey: "cprlogo"
    };
    presenceData.startTimestamp = elapsed;
    if (document.URL.includes("/#/") == false) {
        presenceData.largeImageKey = "idlepuffle";
        presenceData.details = "Viewing Homepage";
    }
    else if (document.URL.includes("/#/")) {
        if (status == "") {
            if (document.URL.includes("/#/login")) {
                presenceData.details = "Logging In";
                presenceData.state = "Choosing Penguin";
            }
            else if (document.URL.includes("/#/redeem")) {
                presenceData.largeImageKey = "redeemred";
                presenceData.details = "Redeeming a Code";
            }
        }
        else if (status == "serverSelect") {
            if (document.URL.includes("/#/login")) {
                presenceData.details = "Logging In";
                presenceData.state = "Selecting Server";
            }
            else if (document.URL.includes("/#/redeem")) {
                presenceData.largeImageKey = "redeemred";
                presenceData.details = "Redeeming a Code";
            }
        }
        else if (status == "queued") {
            presenceData.details = "Logging In";
            presenceData.state = "Waiting in Queue";
        }
        else if (status == "100") {
            presenceData.details = "Online";
            presenceData.state = "Town";
        }
        else if (status == "110") {
            presenceData.details = "Online";
            presenceData.state = "Coffee Shop";
        }
        else if (status == "111") {
            presenceData.details = "Online";
            presenceData.state = "Book Room";
        }
        else if (status == "120") {
            presenceData.details = "Online";
            presenceData.state = "Night Club";
        }
        else if (status == "121") {
            presenceData.details = "Online";
            presenceData.state = "Dance Lounge";
        }
        else if (status == "122") {
            presenceData.details = "Online";
            presenceData.state = "Recycling Plant";
        }
        else if (status == "130") {
            presenceData.details = "Online";
            presenceData.state = "Gift Shop";
        }
        else if (status == "200") {
            presenceData.details = "Online";
            presenceData.state = "Ski Village";
        }
        else if (status == "212") {
            presenceData.details = "Online";
            presenceData.state = "Everyday Phoning Facility";
        }
        else if (status == "213") {
            presenceData.details = "Online";
            presenceData.state = "Recon Room";
        }
        else if (status == "220") {
            presenceData.details = "Online";
            presenceData.state = "Ski Lodge";
        }
        else if (status == "221") {
            presenceData.details = "Online";
            presenceData.state = "Lodge Attic";
        }
        else if (status == "230") {
            presenceData.details = "Online";
            presenceData.state = "Ski Hill";
        }
        else if (status == "300") {
            presenceData.details = "Online";
            presenceData.state = "Plaza";
        }
        else if (status == "310") {
            presenceData.details = "Online";
            presenceData.state = "Pet Shop";
        }
        else if (status == "320" || status == "951") {
            presenceData.details = "Online";
            presenceData.state = "Dojo";
        }
        else if (status == "321") {
            presenceData.details = "Online";
            presenceData.state = "Dojo Courtyard";
        }
        else if (status == "322") {
            presenceData.details = "Online";
            presenceData.state = "Ninja Hideout";
        }
        else if (status == "323") {
            presenceData.details = "Online";
            presenceData.state = "EPF Command Room";
        }
        else if (status == "330") {
            presenceData.details = "Online";
            presenceData.state = "Pizza Parlor";
        }
        else if (status == "340") {
            presenceData.details = "Online";
            presenceData.state = "Stage";
        }
        else if (status == "400") {
            presenceData.details = "Online";
            presenceData.state = "Beach";
        }
        else if (status == "410") {
            presenceData.details = "Online";
            presenceData.state = "Lighthouse";
        }
        else if (status == "411") {
            presenceData.details = "Online";
            presenceData.state = "Beacon";
        }
        else if (status == "420") {
            presenceData.details = "Online";
            presenceData.state = "Migrator";
        }
        else if (status == "421") {
            presenceData.details = "Online";
            presenceData.state = "Ship Hold";
        }
        else if (status == "422") {
            presenceData.details = "Online";
            presenceData.state = "Captain's Quarters";
        }
        else if (status == "423") {
            presenceData.details = "Online";
            presenceData.state = "Crow's Nest";
        }
        else if (status == "800") {
            presenceData.details = "Online";
            presenceData.state = "Dock";
        }
        else if (status == "801") {
            presenceData.details = "Online";
            presenceData.state = "Snow Forts";
        }
        else if (status == "802") {
            presenceData.details = "Online";
            presenceData.state = "Stadium";
        }
        else if (status == "803") {
            presenceData.details = "Online";
            presenceData.state = "HQ";
        }
        else if (status == "804") {
            presenceData.details = "Online";
            presenceData.state = "Boiler Room";
        }
        else if (status == "805") {
            presenceData.details = "Online";
            presenceData.state = "Iceberg";
        }
        else if (status == "806") {
            presenceData.details = "Online";
            presenceData.state = "Underground Pool";
        }
        else if (status == "807") {
            presenceData.details = "Online";
            presenceData.state = "Mine Shack";
        }
        else if (status == "808") {
            presenceData.details = "Online";
            presenceData.state = "Mine";
        }
        else if (status == "809") {
            presenceData.details = "Online";
            presenceData.state = "Forest";
        }
        else if (status == "810") {
            presenceData.details = "Online";
            presenceData.state = "Cove";
        }
        else if (status == "811") {
            presenceData.details = "Online";
            presenceData.state = "Box Dimension";
        }
        else if (status == "812" || status == "953") {
            presenceData.details = "Online";
            presenceData.state = "Fire Dojo";
        }
        else if (status == "813") {
            presenceData.details = "Online";
            presenceData.state = "Cave Mine";
        }
        else if (status == "814") {
            presenceData.details = "Online";
            presenceData.state = "Hidden Lake";
        }
        else if (status == "815") {
            presenceData.details = "Online";
            presenceData.state = "Underwater Room";
        }
        else if (status == "816") {
            presenceData.details = "Online";
            presenceData.state = "Water Dojo";
        }
        else if (status == "817") {
            presenceData.details = "Online";
            presenceData.state = "Hidden Dojo Room";
        }
        else if (status == "818") {
            presenceData.details = "Online";
            presenceData.state = "Dojo Pathway";
        }
        else if (status == "819") {
            presenceData.details = "Online";
            presenceData.state = "Serene Springs";
        }
        else if (status == "900") {
            presenceData.details = "Online";
            presenceData.state = " Astro Barrier";
        }
        else if (status == "901") {
            presenceData.details = "Online";
            presenceData.state = " Bean Counters";
        }
        else if (status == "902") {
            presenceData.details = "Online";
            presenceData.state = "Puffle Roundup";
        }
        else if (status == "903") {
            presenceData.details = "Online";
            presenceData.state = " Hydro-Hopper";
        }
        else if (status == "904") {
            presenceData.details = "Online";
            presenceData.state = "Ice Fishing";
        }
        else if (status == "905") {
            presenceData.details = "Online";
            presenceData.state = " Cart Surfer";
        }
        else if (status == "906") {
            presenceData.details = "Online";
            presenceData.state = " Jet Pack Adventure";
        }
        else if (status == "907") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 1";
        }
        else if (status == "908") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 2";
        }
        else if (status == "909") {
            presenceData.details = "Online";
            presenceData.state = " Thin Ice";
        }
        else if (status == "910") {
            presenceData.details = "Online";
            presenceData.state = " Pizzatron 3000";
        }
        else if (status == "911") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 3";
        }
        else if (status == "912") {
            presenceData.details = "Online";
            presenceData.state = " Catchin' Waves";
        }
        else if (status == "913") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 4";
        }
        else if (status == "914") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 5";
        }
        else if (status == "915") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 6";
        }
        else if (status == "916") {
            presenceData.details = "Online";
            presenceData.state = " Aqua Grabber";
        }
        else if (status == "917" || status == "918" || status == "919") {
            presenceData.details = "Online";
            presenceData.state = "Paint By Letters";
        }
        else if (status == "920") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 7";
        }
        else if (status == "921") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 8";
        }
        else if (status == "922") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 9";
        }
        else if (status == "923") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 10";
        }
        else if (status == "926") {
            presenceData.details = "Online";
            presenceData.state = " DJ3K";
        }
        else if (status == "927") {
            presenceData.details = "Online";
            presenceData.state = "PSA Mission 11";
        }
        else if (status == "949") {
            presenceData.details = "Online";
            presenceData.state = "Puffle Rescue";
        }
        else if (status == "950") {
            presenceData.details = "Online";
            presenceData.state = " System Defender";
        }
        else if (status == "952") {
            presenceData.details = "Online";
            presenceData.state = "Dance Contest";
        }
        else if (status == "955") {
            presenceData.details = "Online";
            presenceData.state = "Puffle Launch";
        }
        else if (status == "997") {
            presenceData.details = "Online";
            presenceData.state = " Card-Jitsu Fire";
        }
        else if (status == "998") {
            presenceData.details = "Online";
            presenceData.state = " Card-Jitsu";
        }
        else if (status == "999") {
            presenceData.details = "Online";
            presenceData.state = "Sled Racing";
        }
        else if (status == "pufflescape") {
            presenceData.details = "Online";
            presenceData.state = " Pufflescape";
        }
        else if (status == "941") {
            presenceData.details = "Online";
            presenceData.state = " Puffle Soaker";
        }
        else if (status == "942") {
            presenceData.details = "Online";
            presenceData.state = " Balloon Pop";
        }
        else if (status == "943") {
            presenceData.details = "Online";
            presenceData.state = " Ring the Bell";
        }
        else if (status == "944") {
            presenceData.details = "Online";
            presenceData.state = " Feed-a-Puffle";
        }
        else if (status == "945") {
            presenceData.details = "Online";
            presenceData.state = " Memory Card game";
        }
        else if (status == "946") {
            presenceData.details = "Online";
            presenceData.state = " Puffle Paddle";
        }
        else if (status == "947") {
            presenceData.details = "Online";
            presenceData.state = " Puffle Shuffle";
        }
        else if (status == "948") {
            presenceData.details = "Online";
            presenceData.state = " Spin to Win";
        }
        else if (status.length > 3 && !isNaN(parseInt(status))) {
            presenceData.details = "Online";
            presenceData.state = "In an Igloo";
        }
        else if (status.length < 4 && !isNaN(parseInt(status))) {
            let room = "In a Party Room";
            if (status == "854") {
                if (currentParty == "penguinawards") {
                    room = "Limo";
                }
            }
            else if (status == "899") {
                if (currentParty == "penguinawards") {
                    room = "Backstage";
                }
            }
            presenceData.details = "Online";
            presenceData.state = room;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzlDLE1BQU0sVUFBVSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaURsQixDQUFDO0FBQ0YsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRCxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztBQUM5QyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRSxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEQsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNyRCxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUNqRCxNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztBQUNoQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxD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