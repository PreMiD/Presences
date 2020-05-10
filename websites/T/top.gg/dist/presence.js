const presence = new Presence({
    clientId: "629380028576301093"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "dblregular"
    };
    presenceData.details = "Viewing Page:";
    if (window.location.pathname.startsWith("/moderation")) {
        presenceData.details = "Viewing DBL Staff section:";
        presenceData.largeImageKey = "dblstaff";
        if (window.location.pathname == "/moderation") {
            const personalquota = document.getElementsByClassName("quotaindiv")[0]
                .textContent;
            const botamount = personalquota.substring(personalquota.indexOf("reviewed") + 9, personalquota.indexOf("/"));
            presenceData.state = "Reviewed " + botamount + " bots this week";
        }
        else if (window.location.pathname == "/moderation/approve") {
            presenceData.state = "Verification Queue";
        }
        else if (window.location.pathname == "/moderation/certify") {
            presenceData.state = "Certification Queue";
        }
        else if (window.location.pathname == "/moderation/reports") {
            presenceData.state = "Reports Queue";
        }
        else if (window.location.pathname.startsWith("/moderation/decline")) {
            presenceData.state = document.querySelector("#botlistitle").textContent;
        }
    }
    else if (window.location.pathname.startsWith("/bot/")) {
        if (window.location.pathname.endsWith("/edit")) {
            presenceData.details = "Editing a Discord bot:";
            presenceData.state = document
                .querySelector("#botlistitle")
                .textContent.substring(8);
        }
        else if (window.location.pathname.endsWith("/vote")) {
            presenceData.details = "Voting for a Discord bot:";
            presenceData.state = document
                .querySelector("#totalContent > div > p")
                .textContent.trim();
        }
        else if (window.location.pathname.endsWith("/report")) {
            presenceData.state = "Discord Bot List";
        }
        else if (window.location.pathname.endsWith("/new")) {
            presenceData.state = "Add a bot";
        }
        else if (document.querySelector("#approvalwait")) {
            presenceData.details =
                "Viewing a Discord bot: " +
                    document
                        .querySelector("#bot-info > p.is-flex > span")
                        .textContent.trim();
            presenceData.largeImageKey = "dblstaff";
            presenceData.state = "Bot isn't approved yet";
        }
        else {
            presenceData.details = "Viewing a Discord bot:";
            presenceData.state = document
                .querySelector("#bot-info > p.is-flex > span")
                .textContent.trim();
        }
    }
    else if (window.location.pathname.startsWith("/list/")) {
        presenceData.details = "Viewing a list of Discord bots:";
        presenceData.state = document
            .querySelector("#botlistitle")
            .textContent.split("-")[0]
            .trim();
    }
    else if (window.location.pathname.startsWith("/tag/")) {
        presenceData.details = "Viewing Discord bots with tag:";
        presenceData.state = document
            .querySelector("#botlistitle")
            .textContent.split("-")[0]
            .trim();
    }
    else if (window.location.pathname.startsWith("/user/") ||
        window.location.pathname == "/me") {
        presenceData.details = "Viewing a profile:";
        presenceData.state = document.querySelector("#banner > div.nametag > div").textContent;
    }
    else if (window.location.pathname.startsWith("/api/")) {
        presenceData.state = "Discord Bot List API Documentation";
    }
    else if (window.location.pathname.startsWith("/servers")) {
        presenceData.largeImageKey = "dslregular";
        if (window.location.pathname.startsWith("/servers/list/") ||
            window.location.pathname.startsWith("/servers/tag/")) {
            presenceData.details = "Viewing:";
            presenceData.state = document.querySelector("#botlistitle").textContent;
        }
        else if (document.querySelector("#bot-info > p.is-flex.nameAndVoteThing > span")) {
            presenceData.details = "Viewing a Discord Server:";
            presenceData.state = document
                .querySelector("#bot-info > p.is-flex.nameAndVoteThing > span")
                .textContent.trim();
        }
        else if (window.location.pathname.endsWith("/edit")) {
            presenceData.details = "Editing a Discord Server:";
            presenceData.state = document
                .querySelector("#botlistitle")
                .textContent.substring(8);
        }
        else if (window.location.pathname.startsWith("/servers/new")) {
            presenceData.details = "Adding a new Discord server...";
        }
        else if (window.location.pathname.startsWith("/servers/me")) {
            presenceData.state = "My servers";
        }
        else {
            presenceData.state = "Discord Servers";
        }
    }
    else if (document.querySelector("#botlistitle")) {
        presenceData.state = document.querySelector("#botlistitle").textContent;
    }
    else {
        presenceData.details = "Viewing something...";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsWUFBWTtLQUM1QixDQUFDO0lBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7SUFHdkMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDdEQsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztRQUNwRCxZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztRQUV4QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtZQUM3QyxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuRSxXQUFXLENBQUM7WUFDZixNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUN2QyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFDckMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDM0IsQ0FBQztZQUNGLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxHQUFHLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztTQUNsRTthQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCLEVBQUU7WUFDNUQsWUFBWSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztTQUMzQzthQUFNLElBQUksTUFBTSxDQUFDLFFB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