const presence = new Presence({
    clientId: "721473663987220500"
});

const browseTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "osm",
        startTimestamp: browseTimestamp
    };

    const pathname = document.location.pathname;

    if(pathname == "/Register"){
        presenceData.details = "Browsing:";
        presenceData.state = "Register";
    }

    if(pathname == "/Login"){
        presenceData.details = "Browsing:";
        presenceData.state = "Login";
    }

    if(pathname == "/ChooseLeague"){
        presenceData.details = "Playing:";
        presenceData.state = "Choosing a league";
    }

    const teamPath = pathname.slice(11);

    if(pathname == "/ChooseTeam" + teamPath){
        const teamName = document.querySelector("#selected-league-name > h2 > span");
        if(!teamName) return;
        presenceData.details = "Choosing club in:";
        presenceData.state = teamName.textContent;
    }

    if(pathname == "/Lineup"){
        presenceData.details = "Viewing:";
        presenceData.state = "Lineup";
    }

    if(pathname == "/Tactics"){
        presenceData.details = "Viewing:";
        presenceData.state = "Tactics";
    }

    if(pathname == "/League/Friendlies"){
        presenceData.details = "Viewing:";
        presenceData.state = "League Friendlies";
    }

    if(pathname == "/Training"){
        presenceData.details = "Viewing:";
        presenceData.state = "Training";
    }

    if(pathname == "/Dashboard"){
        presenceData.details = "Viewing:";
        presenceData.state = "Home Page";
    }

    if(pathname == "/Sponsors"){
        presenceData.details = "Viewing:";
        presenceData.state = "Sponsors";
    }

    if(pathname == "/Stadium"){
        presenceData.details = "Viewing:";
        presenceData.state = "Stadium";
    }

    if(pathname == "/User/Profile/Edit"){
        presenceData.details = "Editing:";
        presenceData.state = "Profile";
    }

    if(pathname == "/User/Achievements"){
        presenceData.details = "Viewing:";
        presenceData.state = "Achievements";
    }

    if(pathname == "/Specialists"){
        presenceData.details = "Viewing:";
        presenceData.state = "Specialists";
    }

    if(pathname == "/Transferlist"){
        presenceData.details = "Viewing:";
        presenceData.state = "Transfer List";
    }

    if(pathname == "/Offers"){
        presenceData.details = "Viewing:";
        presenceData.state = "Offers";
    }

    if(pathname == "/Secret"){
        presenceData.details = "Viewing:";
        presenceData.state = "Secret Training";
    }

    if(pathname == "/Camp"){
        presenceData.details = "Viewing:";
        presenceData.state = "Training Camp";
    }

    if(pathname == "/League/Standings"){
        presenceData.details = "Viewing:";
        presenceData.state = "League Standings";
    }

    if(pathname == "/League/Standings"){
        presenceData.details = "Viewing:";
        presenceData.state = "League Standings";
    }

    if(pathname == "/League/Fixtures"){
        presenceData.details = "Viewing:";
        presenceData.state = "League Fixtures";
    }

    if(pathname == "/DataAnalist"){
        presenceData.details = "Viewing:";
        presenceData.state = "Data Analyst";
    }

    if(pathname == "/League/Calendar"){
        presenceData.details = "Viewing:";
        presenceData.state = "League Calendar";
    }

    const weeksPath = pathname.slice(14);

    if(pathname == "/League/Weeks/" + weeksPath){
        const matchday = document.querySelector("#round-container > div > div > div.col-xs-12.col-h-xs-12.font-lg.semi-bold.center > div > span:nth-child(2)");
        if(!matchday) return;
        presenceData.details = "Viewing:";
        presenceData.state = "Matchday " + matchday.textContent;
    }

    if(pathname == "/League/Cup"){
        presenceData.details = "Viewing:";
        presenceData.state = "League Cup";
    }

    if(pathname == "/Newsfeed"){
        presenceData.details = "Viewing:";
        presenceData.state = "Press Room";
    }

    if(pathname == "/Board"){
        presenceData.details = "Viewing:";
        presenceData.state = "Board";
    }

    if(pathname == "/BusinessClub"){
        presenceData.details = "Viewing:";
        presenceData.state = "Business Club";
    }

    if(pathname == "/Scout"){
        presenceData.details = "Viewing:";
        presenceData.state = "Scout";
    }

    if(pathname == "/Doctor"){
        presenceData.details = "Viewing:";
        presenceData.state = "Doctor";
    }

    if(pathname == "/Lawyer"){
        presenceData.details = "Viewing:";
        presenceData.state = "Lawyer";
    }

    if(pathname == "/Rankings"){
        presenceData.details = "Viewing:";
        presenceData.state = "Rankings";
    }

    if(pathname == "/LeagueTypes"){
        presenceData.details = "Viewing:";
        presenceData.state = "League Overview";
    }

    if(pathname == "/ActiveLeagues"){
        presenceData.details = "Viewing:";
        presenceData.state = "Active Leagues";
    }

    if(pathname == "/SimulationStatus"){
        presenceData.details = "Viewing:";
        presenceData.state = "Simulation Status";
    };

    if(pathname == "/Friends"){
        presenceData.details = "Viewing:";
        presenceData.state = "Friends";
    }

    const squadPath = pathname.slice(7);

    if(pathname == "/Squad/" + squadPath){
        const squadName = document.querySelector("#team-squad-panel > div > div > div:nth-child(2) > div > div > h2");
        presenceData.details = "Viewing squad:";
        presenceData.state = squadName.textContent;
    }

    if(pathname == "/Squad"){
        const squadName = document.querySelector("#team-squad-panel > div > div > div:nth-child(2) > div > div > h2");
        presenceData.details = "Viewing squad:";
        presenceData.state = squadName.textContent;
    }

    const userPath = pathname.slice(7);

    if(pathname == "/Users/" + userPath){
        const userName = document.querySelector("#user-profile-name-container > div:nth-child(2) > div");
        presenceData.details = "Viewing profile:";
        presenceData.state = userName.textContent;
    }

    if(pathname == "/User/Profile"){
        const userName = document.querySelector("#user-profile-name-container > div:nth-child(2) > div");
        presenceData.details = "Viewing profile:";
        presenceData.state = userName.textContent;
    }

    if(presenceData.details == null){
        presence.setTrayTitle();
        presence.setActivity();
    }else{
        presence.setActivity(presenceData);
    };
});