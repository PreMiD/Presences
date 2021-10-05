const presence = new Presence({
  clientId: "754771926857285782"
});

interface GameState {
  page: string;
  day: number;
  type: string;
  state: number;
}

// This will be how the site talks to the extension.
// JSON data will be written to the output.value
const output = document.createElement("textarea");
output.id = "PreMiD_Salem_Out";
output.style.display = "none";
document.body.append(output);

// Overwrites console.log to get data from Town of Salem
// This is because the game information is not global and everything is rendered on a canvas.
// However, it seems that every event is logged to the console.
const s = document.createElement("script");
s.innerHTML = `(()=>{
  const mainObject = {
    page: "Login",
    day: 1,
    type: "Classic",
    state: 1 // 1 = day, 0 = night, 2 = vote, 3 = end
  };

  /**
   * decodeHex - Converts a string of hex values to utf8
   *
   * @param  {string} hex The hex string
   * @returns {string} The utf8 string
   */
  function decodeHex(hex){
    const input = hex.split(" ");
    let out = "";
    for(let i = 0;i<input.length;i++){
      const encoded = input[i].replace(/0x/g,"").replace(/[0-9a-f]{2}/gi,"%$&");
      try{
        out += decodeURIComponent(encoded);
      }catch(err){
        out += "§"+input[i]+"§";
      }
    }
    return out;
  }

  const output = document.getElementById("PreMiD_Salem_Out");
  output.value = JSON.stringify(mainObject);
  // messages that can be ignored by this program
  const ignoreRegex = /(Submitting chat)|(SocketSend\\.)|(Message received)|(> Potion ID)|(Number of)|(Adding game type)|(Clearing any)|(Initializing)|(Entering)|(Unloading)|(Preloading)|(Login Scene)|\\[ApplicationController]|\\[UnityCache]|\\[Subsystems]|\\[CachedXMLHttpRequest]/gm,
    oldLog = console.log;

  console.log = function(...args){
    try{
      if(args[0].search(ignoreRegex) !== -1){
        // return;
      }else if(args[0].search(/^Switched to /gm) === 0){
        const page = args[0].split(" \\n")[0].split("Switched to ")[1];
        mainObject.page = page;
        if(page === "BigHome Scene"){
          mainObject.day = 1;
          mainObject.state = 1;
          mainObject.type = "Classic";
        }
        output.value = JSON.stringify(mainObject);
      }else if(args[0].search(/^Creating lobby:/gm) === 0){
        const type = args[0].split(" |")[0].split(": ")[1];
        mainObject.type = type;
        output.value = JSON.stringify(mainObject);
      }else if(args[0].search(/\\[Network]/gm) !== -1 && args[0].search(/Bytes:/gm) !== -1){
        const hex = args[0].split("Bytes: ")[1].split("</color>")[0],
          out = decodeHex(hex);
        // console.warn("Network Log: " + out);
        if(out.includes("§")){
          const code = out.match(/§.*?§/g)[0];
          switch (code.toLowerCase()) {
            case "§0x91§":{ // night start
              mainObject.state = 0;
              break;
            }
            case "§0x92§":{ // day start
              mainObject.state = 1;
              mainObject.day++;
              break;
            }
            case "§0x93§":{ // voting end
              mainObject.state = 1;
              break;
            }
            case "§0x9b§":{ // voting starts
              mainObject.state = 2;
              break;
            }
            case "§0xc2§":{ // end game
              mainObject.state = 3;
              break;
            }
          }
          output.value = JSON.stringify(mainObject);
        }
      }else if(args[0].search(/Entered HandleStartRanked/gm) === 0){
        mainObject.type = "Ranked";
        output.value = JSON.stringify(mainObject);
      }else if(args[0].search(/Entered HandleOnLeaveRankedQueue/gm) === 0){
        mainObject.type = "Classic";
        output.value = JSON.stringify(mainObject);
      }
    }catch(err){
      // console.error(err);
    }

    // Log original message
    oldLog(...args);
  };
})();`;
document.body.append(s);

let elapsed = Math.round(Date.now() / 1000),
  oldState: GameState = {
    page: "Login",
    day: 1,
    type: "Classic",
    state: 1
  };

presence.on("UpdateData", () => {
  let data = {} as PresenceData;

  if (window.location.pathname !== "/TownOfSalem/") {
    data = {
      details: "Browsing BlankMediaGames",
      state: document.title,
      startTimestamp: elapsed,
      largeImageKey: "regular"
    };
  } else {
    try {
      const e = document.getElementById(
          "PreMiD_Salem_Out"
        ) as HTMLTextAreaElement,
        info = JSON.parse(e.value);
      if (oldState.page !== info.page) elapsed = Math.round(Date.now() / 1000);

      let key = "regular";
      if (info.type.search(/Coven/g) !== -1) key = "coven";

      let gameType;
      switch (info.type) {
        case "ClassicTownTraitor": {
          gameType = "Town Traitor";
          break;
        }
        case "RankedPractice": {
          gameType = "Ranked Practice";
          break;
        }
        case "AllAny": {
          gameType = "All Any";
          break;
        }
        case "RapidMode": {
          gameType = "Rapid Mode";
          break;
        }
        case "DraculasPalace": {
          gameType = "Dracula's Palace";
          break;
        }
        case "CovenCustom": {
          gameType = "Coven Custom";
          break;
        }
        case "CovenLovers": {
          gameType = "Lovers";
          break;
        }
        case "CovenAllAny": {
          gameType = "Coven All Any";
          break;
        }
        case "CovenMafia": {
          gameType = "Mafia Returns";
          break;
        }
        case "CovenRankedPractice": {
          gameType = "Coven Ranked Practice";
          break;
        }
        case "CovenClassic": {
          gameType = "Coven Classic";
          break;
        }
        default: {
          gameType = info.type;
          break;
        }
      }
      switch (info.page) {
        case "Login": {
          data = {
            details: "Logging in",
            largeImageKey: "regular",
            smallImageKey: "idle",
            startTimestamp: elapsed
          };
          break;
        }
        case "BigHome Scene": {
          if (info.type === "Ranked") {
            data = {
              details: "In a Ranked match",
              state: "Waiting in queue",
              largeImageKey: "regular",
              smallImageKey: "idle",
              startTimestamp: elapsed
            };
          } else {
            data = {
              details: "Browsing Home Screen",
              largeImageKey: "regular",
              smallImageKey: "idle",
              startTimestamp: elapsed
            };
          }
          break;
        }
        case "BigLobby Scene": {
          Object.assign(data, {
            details: `In a ${gameType} match`,
            state: "Waiting in lobby",
            elapsed,
            largeImageKey: key,
            smallImageKey: "idle"
          });
          break;
        }
        case "BigPreGame Scene": {
          Object.assign(data, {
            details: `In a ${gameType} match`,
            largeImageKey: key,
            startTimestamp: elapsed
          });
          switch (info.state) {
            case 0: {
              data.state = `Night ${info.day}`;
              data.smallImageKey = "night";
              break;
            }
            case 1: {
              data.state = `Day ${info.day}`;
              data.smallImageKey = "day";
              break;
            }
            case 2: {
              data.state = `Day ${info.day} | Judgement`;
              data.smallImageKey = "voting";
              break;
            }
            case 3: {
              data.state = `Day ${info.day} | Game End`;
              data.smallImageKey = "idle";
              break;
            }
          }
          break;
        }
        case "BigEndGame Scene": {
          Object.assign(data, {
            details: "Browsing End-Game Screen",
            largeImageKey: key,
            smallImageKey: "idle",
            startTimestamp: elapsed
          });
          break;
        }
        default: {
          throw new Error("");
          break;
        }
      }
      oldState = info;
    } catch (e) {
      Object.assign(data, {
        details: "Logging in.",
        largeImageKey: "regular",
        smallImageKey: "idle",
        startTimestamp: elapsed
      });
    }
  }

  presence.setActivity(data);
});
