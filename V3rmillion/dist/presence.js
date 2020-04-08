const presence = new Presence({
    clientId: "650569876993343529"
});
var profile, title;
var browsingStamp = Math.floor(Date.now() / 1000);
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
presence.on("UpdateData", async () => {
    const presenceData = {
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
            const textarea = document.querySelector("form #message");
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
            const page = document.URL.substring(document.URL.indexOf(".php") + 10);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBWSxFQUFFLEtBQVUsQ0FBQztBQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNsRCxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsb0JBQW9CLEdBQUcsT0FBTyxFQUM5QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUdELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDO0lBQ0YsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUV6RCxJQUNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDaEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUNqQztZQUNBLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFl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