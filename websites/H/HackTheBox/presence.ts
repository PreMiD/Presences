const presence = new Presence({
    clientId: "834093191485063258"
}),
    presenceData: PresenceData = {
      largeImageKey: "icon"
},
  customData = false;

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    presenceData.startTimestamp = browsingStamp;

const getElement = (query: string): string | undefined => {
    return document.querySelector(query) ? document.querySelector(query).textContent: undefined;
};

function capLet(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Yes I know the code is bad. I apologise in advance for your eyes

if(document.location.pathname.startsWith("/home/users/profile/")) {
    const user = getElement(".header-title h3").split(' ').join('');
    presenceData.details = `Viewing ${user}'s Profile`;
} else if(document.location.pathname.startsWith("/home/machines/profile/")) {
    const title = getElement(".header-title h3");
    presenceData.details = `Viewing Machine Name: ${title}`;
} else if(document.location.pathname.startsWith("/home/challenges/")) {
    const URL = window.location.href.substr(window.location.href.lastIndexOf('/') + 1).split('?')[0];
        if (URL === "submit") {
            presenceData.details = `Submitting a Challenge`;
        } else {
    presenceData.details = `Viewing ${capLet(URL)} Challenges`;
    }
} else if(document.location.pathname.startsWith("/home/endgame/view/")) {
    const endgame = getElement(".header-title h3");
    presenceData.details = `Viewing Endgame Name: ${endgame}`;
} else if(document.location.pathname.startsWith("/home/tracks/")) {
    const tracks = getElement(".trackMainInfo h3");
    presenceData.details = `Viewing Tracks Name: ${tracks}`;
} else if(document.location.pathname.startsWith("/home/careers/company/")) {
    const company = getElement(".header-title h3").replace('Business Profile: ','');
    presenceData.details = `Viewing Fortress Name: ${company}`;
} else if(document.location.pathname.startsWith("/home/labs/pro/view/")) {
    const labs = getElement(".header-title h3");
    presenceData.details = `Viewing Pro Labs Name: ${labs}`;
} else if(document.location.pathname.startsWith("/home/machines/release")) {
    const arena = getElement(".col-md-6 a");
    presenceData.details = `Viewing Arena Release Machine: ${arena}`;
} else if(document.location.pathname.startsWith("/home/universities/profile")) { 
    const university = getElement(".header-title h3");
    presenceData.details = `Viewing University: ${university}`;
} else if(document.location.pathname.startsWith("/home/country/rankings")) {  
    const country = getElement(".header-title h3");
    presenceData.details = `Viewing ${country}`;
} else if(document.location.pathname.startsWith("/home/labs/pro/rankings/")) { 
    const labRankings = getElement(".header-title h3");
    presenceData.details = `Viewing ${labRankings}`;
} else if(document.location.pathname.startsWith("/profile/")) { 
    const profile = getElement(".col-sm-12 h1");
    presenceData.details = `Viewing ${profile}'s Public Profile`;
}  else if(document.location.pathname.startsWith("/home/careers/")) {
    presenceData.details = "Picking a Career";

} else {
  switch(document.location.pathname) {

    case "/":
        presenceData.details = "Logging In";
        break;
        
    case "/home":
        presenceData.details = "Viewing Home Page";
        break;
      
    case "/home/machines":
      presenceData.details = "Trying to find a machine";
      break;
    
    case "/home/tracks":
        presenceData.details = "Viewing Tracks";
        break;

    case "/home/machines/unreleased":
        presenceData.details = "Viewing Unreleased Machines";
        break;
    
    case "/home/challenges/submissions":
        presenceData.details = "Viewing Challenge Submissions";
        break;

    case "/home/htb/access":
        presenceData.details = "Getting their OpenVPN config";
        break;

    case "/home/machines/owned":
        presenceData.details = "Viewing their Owned Machines";
        break;

    case "/home/start":
        presenceData.details = "Viewing Starting Point";
        break;

    case "/home/machines/submissions":
        presenceData.details = "Viewing Submitted machines";
        break;

    case "/home/hof":
        presenceData.details = "Viewing The Hall of Fame";
        break;

    case "/home/teams/rankings":
        presenceData.details = "Viewing Team Rankings";
        break;

    case "/home/universities/rankings":
        presenceData.details = "Viewing University Rankings";
        break;

    case "/home/vip/rankings":
        presenceData.details = "Viewing VIP Rankings";
        break;

    case "/home/machines/submit":
        presenceData.details = "Submitting a Machine";
        break;

    case "/home/challenges/submit":
        presenceData.details = "Submitting a Challenge";
        break;

    case "/home/rules":
        presenceData.details = "Viewing Rules";
        break;

    case "/home/support":
        presenceData.details = "Viewing Support";
        break;

    case "/home/changelog":
        presenceData.details = "Viewing Changelog";
        break;

    case "/home/badges/list":
        presenceData.details = "Viewing Badges";
        break;

    case "/home/ideas":
        presenceData.details = "Viewing Feature Requests";
        break;

    case "/home/announcements":
        presenceData.details = "Viewing Announcements";
        break;

    case "/home/universities/list":
        presenceData.details = "Viewing all Universities";
        break;

    case "/home/universities/apply":
        presenceData.details = "Doing a University Application";
        break;

    case "/home/messages":
        presenceData.details = "Viewing their Messages";
        break;

    case "/home/shoutbox" && "/home/teams/shoutbox":
        presenceData.details = "Viewing Shoutbox";
        break;

    case "/home/settings":
        presenceData.details = "Viewing Their Settings";
        break;

    case "/home/vault/personal":
        presenceData.details = "Viewing Their Personal Vault";
        break;

    case "/home/pwnbox":
        presenceData.details = "Viewing Pwnbox";
        break;

    default:
        presenceData.details = "Looking Around";
  }
}

if (!customData) {
    presence.setActivity(presenceData);
  }
});