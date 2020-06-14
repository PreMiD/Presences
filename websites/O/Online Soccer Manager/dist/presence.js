var presence = new Presence({
    clientId: "721473663987220500"
});
let browseTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    var presenceData = {
        largeImageKey: "osm",
        startTimestamp: browseTimestamp
    };
    let pathname = document.location.pathname;
    if (pathname == "/Register") {
        presenceData.details = "Browsing:";
        presenceData.state = "Register";
    }
    if (pathname == "/Login") {
        presenceData.details = "Browsing:";
        presenceData.state = "Login";
    }
    if (pathname == "/ChooseLeague") {
        presenceData.details = "Playing:";
        presenceData.state = "Choosing a league";
    }
    let teamPath = pathname.slice(11);
    if (pathname == "/ChooseTeam" + teamPath) {
        let teamName = document.querySelector("#selected-league-name > h2 > span");
        if (!teamName)
            return;
        presenceData.details = "Choosing club in:";
        presenceData.state = teamName.textContent;
    }
    if (pathname == "/Lineup") {
        presenceData.details = "Viewing:";
        presenceData.state = "Lineup";
    }
    if (pathname == "/Tactics") {
        presenceData.details = "Viewing:";
        presenceData.state = "Tactics";
    }
    if (pathname == "/League/Friendlies") {
        presenceData.details = "Viewing:";
        presenceData.state = "League Friendlies";
    }
    if (pathname == "/Training") {
        presenceData.details = "Viewing:";
        presenceData.state = "Training";
    }
    if (pathname == "/Dashboard") {
        presenceData.details = "Viewing:";
        presenceData.state = "Home Page";
    }
    if (pathname == "/Sponsors") {
        presenceData.details = "Viewing:";
        presenceData.state = "Sponsors";
    }
    if (pathname == "/Stadium") {
        presenceData.details = "Viewing:";
        presenceData.state = "Stadium";
    }
    if (pathname == "/User/Profile/Edit") {
        presenceData.details = "Editing:";
        presenceData.state = "Profile";
    }
    if (pathname == "/User/Achievements") {
        presenceData.details = "Viewing:";
        presenceData.state = "Achievements";
    }
    if (pathname == "/Specialists") {
        presenceData.details = "Viewing:";
        presenceData.state = "Specialists";
    }
    if (pathname == "/Transferlist") {
        presenceData.details = "Viewing:";
        presenceData.state = "Transfer List";
    }
    if (pathname == "/Offers") {
        presenceData.details = "Viewing:";
        presenceData.state = "Offers";
    }
    if (pathname == "/Secret") {
        presenceData.details = "Viewing:";
        presenceData.state = "Secret Training";
    }
    if (pathname == "/Camp") {
        presenceData.details = "Viewing:";
        presenceData.state = "Training Camp";
    }
    if (pathname == "/League/Standings") {
        presenceData.details = "Viewing:";
        presenceData.state = "League Standings";
    }
    if (pathname == "/League/Standings") {
        presenceData.details = "Viewing:";
        presenceData.state = "League Standings";
    }
    if (pathname == "/League/Fixtures") {
        presenceData.details = "Viewing:";
        presenceData.state = "League Fixtures";
    }
    if (pathname == "/DataAnalist") {
        presenceData.details = "Viewing:";
        presenceData.state = "Data Analyst";
    }
    if (pathname == "/League/Calendar") {
        presenceData.details = "Viewing:";
        presenceData.state = "League Calendar";
    }
    let weeksPath = pathname.slice(14);
    if (pathname == "/League/Weeks/" + weeksPath) {
        let matchday = document.querySelector("#round-container > div > div > div.col-xs-12.col-h-xs-12.font-lg.semi-bold.center > div > span:nth-child(2)");
        if (!matchday)
            return;
        presenceData.details = "Viewing:";
        presenceData.state = "Matchday " + matchday.textContent;
    }
    if (pathname == "/League/Cup") {
        presenceData.details = "Viewing:";
        presenceData.state = "League Cup";
    }
    if (pathname == "/Newsfeed") {
        presenceData.details = "Viewing:";
        presenceData.state = "Press Room";
    }
    if (pathname == "/Board") {
        presenceData.details = "Viewing:";
        presenceData.state = "Board";
    }
    if (pathname == "/BusinessClub") {
        presenceData.details = "Viewing:";
        presenceData.state = "Business Club";
    }
    if (pathname == "/Scout") {
        presenceData.details = "Viewing:";
        presenceData.state = "Scout";
    }
    if (pathname == "/Doctor") {
        presenceData.details = "Viewing:";
        presenceData.state = "Doctor";
    }
    if (pathname == "/Lawyer") {
        presenceData.details = "Viewing:";
        presenceData.state = "Lawyer";
    }
    if (pathname == "/Rankings") {
        presenceData.details = "Viewing:";
        presenceData.state = "Rankings";
    }
    if (pathname == "/LeagueTypes") {
        presenceData.details = "Viewing:";
        presenceData.state = "League Overview";
    }
    if (pathname == "/ActiveLeagues") {
        presenceData.details = "Viewing:";
        presenceData.state = "Active Leagues";
    }
    if (pathname == "/SimulationStatus") {
        presenceData.details = "Viewing:";
        presenceData.state = "Simulation Status";
    }
    if (pathname == "/Friends") {
        presenceData.details = "Viewing:";
        presenceData.state = "Friends";
    }
    let squadPath = pathname.slice(7);
    if (pathname == "/Squad/" + squadPath) {
        let squadName = document.querySelector("#team-squad-panel > div > div > div:nth-child(2) > div > div > h2");
        presenceData.details = "Viewing squad:";
        presenceData.state = squadName.textContent;
    }
    if (pathname == "/Squad") {
        let squadName = document.querySelector("#team-squad-panel > div > div > div:nth-child(2) > div > div > h2");
        presenceData.details = "Viewing squad:";
        presenceData.state = squadName.textContent;
    }
    let userPath = pathname.slice(7);
    if (pathname == "/Users/" + userPath) {
        let userName = document.querySelector("#user-profile-name-container > div:nth-child(2) > div");
        presenceData.details = "Viewing profile:";
        presenceData.state = userName.textContent;
    }
    if (pathname == "/User/Profile") {
        let userName = document.querySelector("#user-profile-name-container > div:nth-child(2) > div");
        presenceData.details = "Viewing profile:";
        presenceData.state = userName.textContent;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUVILElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMzQixJQUFJLFlBQVksR0FBaUI7UUFDN0IsYUFBYSxFQUFFLEtBQUs7UUFDcEIsY0FBYyxFQUFFLGVBQWU7S0FDbEMsQ0FBQztJQUVGLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRTFDLElBQUcsUUFBUSxJQUFJLFdBQVcsRUFBQztRQUN2QixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQTtRQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQTtLQUNsQztJQUVELElBQUcsUUFBUSxJQUFJLFFBQVEsRUFBQztRQUNwQixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQTtRQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtLQUMvQjtJQUVELElBQUcsUUFBUSxJQUFJLGVBQWUsRUFBQztRQUMzQixZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQTtRQUNqQyxZQUFZLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFBO0tBQzNDO0lBRUQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVsQyxJQUFHLFFBQVEsSUFBSSxhQUFhLEdBQUcsUUFBUSxFQUFDO1FBQ3BDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENB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