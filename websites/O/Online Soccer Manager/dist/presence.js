const presence = new Presence({
    clientId: "721473663987220500"
});
const browseTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "osm",
        startTimestamp: browseTimestamp
    };
    const pathname = document.location.pathname;
    const teamPath = pathname.slice(11);
    const weeksPath = pathname.slice(14);
    const squadPath = pathname.slice(7);
    const userPath = pathname.slice(7);
    switch (pathname) {
        case "/Register":
            presenceData.details = "Browsing:";
            presenceData.state = "Register";
            break;
        case "/Login":
            presenceData.details = "Browsing:";
            presenceData.state = "Login";
            break;
        case "/ChooseLeague":
            presenceData.details = "Playing:";
            presenceData.state = "Choosing a league";
            break;
        case "/ChooseTeam" + teamPath:
            const teamName = document.querySelector("#selected-league-name > h2 > span");
            if (!teamName)
                return;
            presenceData.details = "Choosing club in:";
            presenceData.state = teamName.textContent;
            break;
        case "/Lineup":
            presenceData.details = "Viewing:";
            presenceData.state = "Lineup";
            break;
        case "/Tactics":
            presenceData.details = "Viewing:";
            presenceData.state = "Tactics";
            break;
        case "/League/Friendlies":
            presenceData.details = "Viewing:";
            presenceData.state = "League Friendlies";
            break;
        case "/Training":
            presenceData.details = "Viewing:";
            presenceData.state = "Training";
            break;
        case "/Dashboard":
            presenceData.details = "Viewing:";
            presenceData.state = "Home Page";
            break;
        case "/Sponsors":
            presenceData.details = "Viewing:";
            presenceData.state = "Sponsors";
            break;
        case "/Stadium":
            presenceData.details = "Viewing:";
            presenceData.state = "Stadium";
            break;
        case "/User/Profile/Edit":
            presenceData.details = "Editing:";
            presenceData.state = "Profile";
            break;
        case "/User/Achievements":
            presenceData.details = "Viewing:";
            presenceData.state = "Achievements";
            break;
        case "/Specialists":
            presenceData.details = "Viewing:";
            presenceData.state = "Specialists";
            break;
        case "/Transferlist":
            presenceData.details = "Viewing:";
            presenceData.state = "Transfer List";
            break;
        case "/Offers":
            presenceData.details = "Viewing:";
            presenceData.state = "Offers";
            break;
        case "/Secret":
            presenceData.details = "Viewing:";
            presenceData.state = "Secret Training";
            break;
        case "/Camp":
            presenceData.details = "Viewing:";
            presenceData.state = "Training Camp";
            break;
        case "/League/Standings":
            presenceData.details = "Viewing:";
            presenceData.state = "League Standings";
            break;
        case "/League/Fixtures":
            presenceData.details = "Viewing:";
            presenceData.state = "League Fixtures";
            break;
        case "/DataAnalist":
            presenceData.details = "Viewing:";
            presenceData.state = "Data Analyst";
            break;
        case "/League/Calendar":
            presenceData.details = "Viewing:";
            presenceData.state = "League Calendar";
            break;
        case "/League/Weeks/" + weeksPath:
            const matchday = document.querySelector("#round-container > div > div > div.col-xs-12.col-h-xs-12.font-lg.semi-bold.center > div > span:nth-child(2)");
            if (!matchday)
                return;
            presenceData.details = "Viewing:";
            presenceData.state = "Matchday " + matchday.textContent;
            break;
        case "/League/Cup":
            presenceData.details = "Viewing:";
            presenceData.state = "League Cup";
            break;
        case "/Newsfeed":
            presenceData.details = "Viewing:";
            presenceData.state = "Press Room";
            break;
        case "/Board":
            presenceData.details = "Viewing:";
            presenceData.state = "Board";
            break;
        case "BusinessClub":
            presenceData.details = "Viewing:";
            presenceData.state = "Business Club";
            break;
        case "/Scout":
            presenceData.details = "Viewing:";
            presenceData.state = "Scout";
            break;
        case "/Doctor":
            presenceData.details = "Viewing:";
            presenceData.state = "Doctor";
            break;
        case "/Lawyer":
            presenceData.details = "Viewing:";
            presenceData.state = "Lawyer";
            break;
        case "/Rankings":
            presenceData.details = "Viewing:";
            presenceData.state = "Rankings";
            break;
        case "/LeagueTypes":
            presenceData.details = "Viewing:";
            presenceData.state = "League Overview";
            break;
        case "/ActiveLeagues":
            presenceData.details = "Viewing:";
            presenceData.state = "Active Leagues";
            break;
        case "/SimulationStatus":
            presenceData.details = "Viewing:";
            presenceData.state = "Simulation Status";
            break;
        case "/Friends":
            presenceData.details = "Viewing:";
            presenceData.state = "Friends";
            break;
        case "/Squad/" + squadPath:
            const squadName = document.querySelector("#team-squad-panel > div > div > div:nth-child(2) > div > div > h2");
            presenceData.details = "Viewing squad:";
            presenceData.state = squadName.textContent;
            break;
        case "/Squad":
            const selfSquadName = document.querySelector("#team-squad-panel > div > div > div:nth-child(2) > div > div > h2");
            presenceData.details = "Viewing squad:";
            presenceData.state = selfSquadName.textContent;
            break;
        case "/Users/" + userPath:
            const userName = document.querySelector("#user-profile-name-container > div:nth-child(2) > div");
            presenceData.details = "Viewing profile:";
            presenceData.state = userName.textContent;
            break;
        case "/User/Profile":
            const SelfuserName = document.querySelector("#user-profile-name-container > div:nth-child(2) > div");
            presenceData.details = "Viewing profile:";
            presenceData.state = SelfuserName.textContent;
            break;
        default:
            presenceData.details = "Viewing:";
            presenceData.state = "";
            break;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUVILE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXRELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMzQixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLEtBQUs7UUFDcEIsY0FBYyxFQUFFLGVBQWU7S0FDbEMsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRzVDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkMsUUFBTyxRQUFRLEVBQUM7UUFDWixLQUFLLFdBQVc7WUFDWixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUNoQyxNQUFNO1FBRVYsS0FBSyxRQUFRO1lBQ1QsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDN0IsTUFBTTtRQUVWLEtBQUssZUFBZTtZQUNoQixZQUFZLENBQUMsT0FB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