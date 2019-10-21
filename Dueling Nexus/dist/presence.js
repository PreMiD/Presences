let presence = new Presence({
    clientId: "618212337895079996" 
});

//added external deckbuilding js as per request
var sock = "https://rawcdn.githack.com/LimitlessSocks/DuelingNexusUserScripts/1c3c8afe55f1981de04c8baffcab2c674d20dad6/beta/RefinedSearch/RefinedSearch.user.js"

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/home") {
        if (document.getElementsByTagName("p")[1].innerHTML.includes("Welcome back")){
            text=document.getElementsByTagName("p")[1].innerHTML
        }   
        else {
            text = document.getElementsByTagName("p")[3].innerHTML
        }
        elapsed =  Math.floor(Date.now() / 1000)

        if(localStorage.getItem("name")==null){
            localStorage.setItem("name", text.split(",")[1])
        }
        let presenceData = {
            details: "Online as "+text.split(",")[1],
            state: "waiting in lobby",
            //largeImageKey: "banner",
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: "in game",
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/decks") {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Online as ${localStorage.getItem("name")}`,
            state: "Looking at decklists",
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: "in game",
            startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/editor")) {
        //script on off toggle
        if(localStorage.getItem("sock")=="yes"){
            if(document.getElementById("sockscript")==undefined){
              var node = document.createElement("script");
          node.id = "sockscript"
          node.src = sock
          node.type = "application/javascript"
          document.head.appendChild(node)
            }
            else{
            }
          }
        document.onkeyup = function(e){
            //shortcut key ctrl+y
            if (e.ctrlKey &&  e.which == 89){
              if(localStorage.getItem("sock")==null){
                localStorage.setItem("sock","yes")
                alert("sock script applied")
              }
              else{
                localStorage.removeItem("sock")
                alert("sock script removed")
                document.location.reload()
              }
          }  
      }
        elapsed =  Math.floor(Date.now() / 1000)
        d = document.getElementsByTagName("strong")[0].innerText
        let presenceData = {
            details: "Building Decks",
            state: "Editing: "+d,
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: "in game",
            startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/game")) {
        elapsed =  Math.floor(Date.now() / 1000)
        opponent = document.getElementById("game-opponent-name").innerText
        mylife = document.getElementById("game-life-player").innerText 
        opplife = document.getElementById("game-life-opponent").innerText 
        myname = document.getElementById("game-player-name").innerText
        
         
        if (myname=="Player" || myname=="Opponent"){
            myname = document.getElementById("game-room-player1-username").innerText
        }
        if (opponent=="Opponent" || opponent=="Player"){
            if(document.getElementById("game-room-player2-username").innerText == "---"){
                opponent ="waiting.."
            }
            else{
                opponent = document.getElementById("game-room-player2-username").innerText
            }
        }
        state = `Current lp: ${mylife}, Opponent LP: ${opplife}`
        status = `Game: ${myname}(me) vs ${opponent}`
        if ((parseInt(mylife) == 0) && (0==parseInt(opplife))) {
            state = "Game not started"
            status = `Game: ${myname} vs ${opponent}`
        }
       /* if(localStorage.getItem("name").replace(" ",'')==myname){
           var  status = `Dueling ${opponent}`
        }
        else {
          var   status = `Spectating: ${myname} vs ${opponent}`
        }
*/
        let presenceData = {
            details: status,
            state: state,
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: document.location.href,
            startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/hostgame")) {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Hosting Game `,
            state: `as ${localStorage.getItem("name")}`,
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: "in game",
            startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/gamelist")) {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Looking for Game",
            state: "at All game list",
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: "in game",
            startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/profile")) {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Editing Profile",
            state: "changing stuffs",
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: "in game",
            startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/duel")) {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Searching for Duels",
            state: "Choosing game mode",
            largeImageKey: "banner",
            largeImageText: "https://duelingnexus.com",
            smallImageKey: "logo",
            smallImageText: "in game",
            startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
    }
    
}));