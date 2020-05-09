const presence = new Presence({
    clientId: "618212337895079996"
});
const elapsed = Math.floor(Date.now() / 1000);
let text;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "banner",
        startTimestamp: elapsed
    };
    if (document.location.pathname == "/home") {
        if (document.getElementsByTagName("p")[1].innerHTML.includes("Welcome back")) {
            text = document.getElementsByTagName("p")[1].innerHTML;
        }
        else {
            text = document.getElementsByTagName("p")[3].innerHTML;
        }
        if (localStorage.getItem("name") == null) {
            localStorage.setItem("name", text.split(",")[1]);
        }
        presenceData.details = "Online as " + text.split(",")[1];
        presenceData.state = "waiting in lobby";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "in game";
    }
    else if (document.location.pathname == "/decks") {
        (presenceData.details = `Online as ${localStorage.getItem("name")}`),
            (presenceData.state = "Looking at decklists");
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "in game";
    }
    else if (document.location.pathname.includes("/editor")) {
        const d = document.getElementsByTagName("strong")[0].textContent;
        presenceData.details = "Building Decks";
        presenceData.state = "Editing: " + d;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "in game";
    }
    else if (document.location.pathname.includes("/game")) {
        let opponent = document.getElementById("game-opponent-name").textContent;
        const mylife = document.getElementById("game-life-player").textContent;
        const opplife = document.getElementById("game-life-opponent").textContent;
        let myname = document.getElementById("game-player-name").textContent;
        let state, status;
        if (myname == "Player" || myname == "Opponent") {
            myname = document.getElementById("game-room-player1-username")
                .textContent;
        }
        if (opponent == "Opponent" || opponent == "Player") {
            if (document.getElementById("game-room-player2-username").textContent ==
                "---") {
                opponent = "waiting..";
            }
            else {
                opponent = document.getElementById("game-room-player2-username")
                    .textContent;
            }
        }
        state = `Current lp: ${mylife}, Opponent LP: ${opplife}`;
        status = `Game: ${myname}(me) vs ${opponent}`;
        if (parseInt(mylife) == 0 && 0 == parseInt(opplife)) {
            state = "Game not started";
            status = `Game: ${myname} vs ${opponent}`;
        }
        presenceData.details = status;
        presenceData.state = state;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = document.location.href;
    }
    else if (document.location.pathname.includes("/hostgame")) {
        presenceData.details = `Hosting Game `;
        presenceData.state = `as ${localStorage.getItem("name")}`;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "in game";
    }
    else if (document.location.pathname.includes("/gamelist")) {
        presenceData.details = "Looking for Game";
        presenceData.state = "at All game list";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "in game";
    }
    else if (document.location.pathname.includes("/profile")) {
        presenceData.details = "Editing Profile";
        presenceData.state = "changing stuffs";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "in game";
    }
    else if (document.location.pathname.includes("/duel")) {
        presenceData.details = "Searching for Duels";
        presenceData.state = "Choosing game mode";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "in game";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzlDLElBQUksSUFBSSxDQUFDO0FBRVQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxRQUFRO1FBQ3ZCLGNBQWMsRUFBRSxPQUFPO0tBQ3hCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLE9BQU8sRUFBRTtRQUN6QyxJQUNFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUN4RTtZQUNBLElBQUksR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3hEO2FBQU07WUFDTCxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUN4RDtRQUVELElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDeEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxZ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