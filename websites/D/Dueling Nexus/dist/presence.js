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
        let state;
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