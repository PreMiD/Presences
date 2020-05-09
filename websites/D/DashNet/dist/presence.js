let presence = new Presence({});
const browsingStamp = Math.floor(Date.now() / 1000);
var latestID;
presence.clearActivity();
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "dashnet"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/cookieclicker/")) {
        presence.clientId = "676126246928777250";
    }
    else {
        presence.clientId = "676120967159742465";
    }
    if (presence.clientId != latestID) {
        presence.clearActivity();
        latestID = presence.clientId;
    }
    if (document.location.pathname.includes("/cookieclicker/")) {
        var cookies = document
            .querySelector("#cookies")
            .textContent.replace(document.querySelector("#cookies div").textContent, "");
        if (cookies.includes(" cookies")) {
            presenceData.details = cookies;
        }
        else {
            presenceData.details = cookies.replace("cookies", " cookies");
        }
        presenceData.state = document
            .querySelector("#cookies div")
            .textContent.replace("per second :", "Per second:");
        presenceData.smallImageKey = "legacyy";
        presenceData.smallImageText =
            "Legacy level: " + document.querySelector("#ascendNumber").textContent;
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Browsing DashNet's";
        presenceData.state = "video games and other fun things";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/legacy/")) {
        presenceData.details = "Playing Legacy";
    }
    else if (document.location.pathname.includes("/igm/")) {
        presenceData.details = "Making an idle game";
    }
    else if (document.location.pathname.includes("/randomgen/")) {
        presenceData.details = "Using randomgen";
    }
    else if (document.location.pathname.includes("/nested/")) {
        presenceData.details = "Playing Nested";
    }
    else if (document.location.pathname.includes("/murdergames/")) {
        presenceData.details = "Playing Murder Games";
    }
    else if (document.location.pathname.includes("/gamegen/")) {
        presenceData.details = "Using gamegen";
    }
    else if (document.location.pathname.includes("/lsystem/")) {
        presenceData.details = "Playing Tutrle Toy";
    }
    else if (document.location.pathname.includes("/taskmaster/")) {
        presenceData.details = "Using TaskMaster";
    }
    else if (document.location.pathname.includes("/cookies2cash/")) {
        presenceData.details = "Using Cookies2Cash";
    }
    else if (document.location.pathname.includes("/musicgen/")) {
        presenceData.details = "Using musicgen";
    }
    else if (document.location.pathname.includes("/dungeongenerator/")) {
        presenceData.details = "Using dungeongenerator";
    }
    else if (document.location.pathname.includes("/dreamlog/")) {
        presenceData.details = "Playing Dreamlog";
    }
    else if (document.location.pathname.includes("/PretendEverything/")) {
        presenceData.details = "Playing PretendEverything";
    }
    else if (document.location.pathname.includes("/teaparty/")) {
        presenceData.details = "Having a tea party";
    }
    else if (document.location.pathname.includes("/mailtopia/")) {
        presenceData.details = "Playing mailtopia";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNwRCxJQUFJLFFBQVEsQ0FBQztBQUNiLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUV6QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDN0IsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQzFELFFBQVEsQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLENBQUM7S0FDMUM7U0FBTTtRQUNMLFFBQVEsQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLENBQUM7S0FDMUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztLQUM5QjtJQUVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDMUQsSUFBSSxPQUFPLEdBQUcsUUFBUTthQUNuQixhQUFhLENBQUMsVUFBVSxDQUFDO2FBQ3pCLFdBQVcsQ0FBQyxPQUFPLENBQ2xCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxFQUNsRCxFQUFFLENBQ0gsQ0FBQztRQUNKLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoQyxZQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUNoQzthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMvRDtRQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUTthQUMxQixhQUFhLENBQUMsY0FBYyxDQUFDO2FBQzdCLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxjQUFjO1lBQ3pCLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO0tBQzFFO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztRQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLGtDQUFrQyxDQUFDO1FBQ3hELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUN6QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUM3RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO0tBQzFDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUN6QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQy9ELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzNELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7S0FDN0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5RCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO0tBQzNDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNoRSxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzdDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUN6QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDcEUsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztLQUNqRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7S0FDM0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQ3JFLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7S0FDcEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM1RCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzdDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDN0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztLQUM1QztJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=