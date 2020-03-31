let presence = new Presence({
    clientId: "650569876993343529"
});
var item, profile, title;
var browsingStamp = Math.floor(Date.now() / 1000);
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function PMD_success(message) {
    console.log("%cPreMiD%cSUCCESS%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
}
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "logo-512"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname.includes("v3rmillion.net")) {
        if (document.location.pathname.includes("index.php") ||
            document.location.pathname == "/") {
            profile = document.querySelector("#panel strong");
            presenceData.details = "Viewing Homepage";
            presenceData.state = "Logged in as " + profile.innerText;
            presenceData.smallImageKey = "twemoji-house-1024x";
        }
        else if (document.location.pathname.includes("showthread.php")) {
            title = document.querySelector(".thread_title");
            presenceData.details = "Browsing Thread:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "twemoji-paper-1024x";
            let textarea = document.querySelector("form #message");
            if (textarea != null && textarea == document.activeElement) {
                presenceData.details = "Replying to Thread:";
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "twemoji-memo-1024x";
            }
        }
        else if (document.location.pathname.includes("forumdisplay.php")) {
            title = document.querySelector(".navigation .active");
            presenceData.details = "Viewing Forum:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }
        else if (document.location.pathname.includes("newreply.php")) {
            title = document.querySelector("form .smalltext > strong");
            presenceData.details = "Replying to Thread:";
            presenceData.state = title.innerText.substring(title.innerText.indexOf("thread: ") + 8);
            presenceData.smallImageKey = "twemoji-pencil-1024x";
        }
        else if (document.location.pathname.includes("member.php")) {
            profile = document.querySelector(".profile_header strong span");
            presenceData.details = "Viewing Profile:";
            presenceData.state = profile.innerText;
            presenceData.smallImageKey = "twemoji-spy-1024x";
        }
        else if (document.location.pathname == "/siterules.php") {
            presenceData.details = "Viewing Rules";
            delete presenceData.state;
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }
        else if (document.location.pathname == "/usercp.php") {
            profile = document.querySelector("#panel strong");
            presenceData.details = "User Control Panel";
            presenceData.state = "Logged in as " + profile.innerText;
            presenceData.smallImageKey = "twemoji-cog-1024x";
        }
        else if (document.location.pathname.includes("search.php")) {
            profile = document.querySelector("#panel strong");
            presenceData.details = "Searching site";
            presenceData.state = "Logged in as " + profile.innerText;
        }
        else if (document.location.pathname.includes("pages.php")) {
            let page = document.URL.substring(document.URL.indexOf(".php") + 10);
            presenceData.details = "Reading page:";
            presenceData.state = page.charAt(0).toUpperCase() + page.substring(1);
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }
    }
    if (presenceData.details == null) {
        PMD_error("Unable to determine location.");
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksSUFBUyxFQUFFLE9BQVksRUFBRSxLQUFVLENBQUM7QUFDeEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxZQUFZLEdBQUcsbURBQW1ELENBQUM7QUFHdkUsU0FBUyxRQUFRLENBQUMsT0FBTztJQUN2QixPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFtQixHQUFHLE9BQU8sRUFDN0IsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsb0JBQW9CLEdBQUcsT0FBTyxFQUM5QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU87SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxzQkFBc0IsR0FBRyxPQUFPLEVBQ2hDLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWTtRQUNWLGtFQUFrRSxFQUNwRSxlQUFlLENBQ2hCLENBQUM7QUFDSixDQUFDO0FBR0QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxVQUFVO0tBQzFCLENBQUM7SUFDRixZQUFZLENBQUMsY0FBYyxHQUFHLGFB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