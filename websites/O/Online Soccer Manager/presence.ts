const presence = new Presence({
    clientId: "721473663987220500"
  }),
  browseTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "osm",
      startTimestamp: browseTimestamp
    },
    { pathname } = document.location,
    // Custom paths
    teamPath = pathname.slice(11),
    weeksPath = pathname.slice(14),
    squadPath = pathname.slice(7),
    userPath = pathname.slice(7);

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

    case `/ChooseTeam${teamPath}`: {
      const teamName = document.querySelector(
        "#selected-league-name > h2 > span"
      );
      if (!teamName) return;
      presenceData.details = "Choosing club in:";
      presenceData.state = teamName.textContent;
      break;
    }

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
      presenceData.state = "Team Dashboard";
      break;

    case "/Sponsors":
      presenceData.details = "Viewing:";
      presenceData.state = "Sponsors";
      break;

    case "/Stadium":
      presenceData.details = "Viewing:";
      presenceData.state = "Stadium";
      break;

    case "/Career":
      presenceData.details = "Viewing:";
      presenceData.state = "Career";
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

    case `/League/Weeks/${weeksPath}`: {
      const matchday = document.querySelector(
        "#round-container > div > div > div.col-xs-12.col-h-xs-12.font-lg.semi-bold.center > div > span:nth-child(2)"
      );
      if (!matchday) return;
      presenceData.details = "Viewing:";
      presenceData.state = `Matchday ${matchday.textContent}`;
      break;
    }

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

    case `/Squad/${squadPath}`: {
      const squadName = document.querySelector(
        "#team-squad-panel > div > div > div:nth-child(2) > div > div > h2"
      );
      presenceData.details = "Viewing squad:";
      presenceData.state = squadName.textContent;
      break;
    }

    case "/Squad": {
      const selfSquadName = document.querySelector(
        "#team-squad-panel > div > div > div:nth-child(2) > div > div > h2"
      );
      presenceData.details = "Viewing squad:";
      presenceData.state = selfSquadName.textContent;
      break;
    }

    case `/Users/${userPath}`: {
      const userName = document.querySelector(
        "#user-profile-name-container > div:nth-child(2) > div"
      );
      presenceData.details = "Viewing profile:";
      presenceData.state = userName.textContent;
      break;
    }

    case "/User/Profile": {
      const SelfuserName = document.querySelector(
        "#user-profile-name-container > div:nth-child(2) > div"
      );
      presenceData.details = "Viewing profile:";
      presenceData.state = SelfuserName.textContent;
      break;
    }

    default:
      presenceData.details = "Viewing:";
      presenceData.state = "Not Found";
      break;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
