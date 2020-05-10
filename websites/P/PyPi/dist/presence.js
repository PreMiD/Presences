const presence = new Presence({
    clientId: "685491676155871281"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "pypi"
    }, Path = document.location.pathname;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    if (Path == "/") {
        const total = document.querySelector("#content > div.horizontal-section.horizontal-section--grey.horizontal-section--thin.horizontal-section--statistics > div > p:nth-child(1)").textContent;
        presenceData.details = `Viewing the home-page :`;
        presenceData.state = `${total}`;
    }
    else if (Path.startsWith("/help")) {
        const total = document.querySelector("#content > div:nth-child(1) > div")
            .children.length;
        presenceData.details = `Viewing the help-page :`;
        presenceData.state = `${total} total topics`;
    }
    else if (Path.startsWith("/account/login")) {
        presenceData.details = `Logging into their account `;
    }
    else if (Path.startsWith("/account/register")) {
        presenceData.details = `Registering a new account `;
    }
    else if (Path.startsWith("/search")) {
        const query = document.querySelector("#search").value;
        const totalResults = document.querySelector("#content > div > div > div.left-layout__main > form > div.split-layout.split-layout--table.split-layout--wrap-on-tablet > div:nth-child(1) > p > strong").textContent;
        presenceData.details = `Searching for ${query} :`;
        presenceData.state = `${totalResults} total results`;
    }
    else if (Path.startsWith("/project")) {
        const name = document.querySelector("#content > div.banner > div > div.package-header__left > h1").textContent;
        const author = document.querySelector("#content > div:nth-child(3) > div > div > div.vertical-tabs__tabs > div:nth-child(5) > span > a > span.sidebar-section__user-gravatar-text").textContent;
        presenceData.details = `Viewing a package :`;
        presenceData.state = `${name} BY ${author}`;
    }
    else if (Path.startsWith("/security")) {
        presenceData.details = `Reporting a security flaw `;
    }
    else if (Path.startsWith("/policy/terms-of-use/")) {
        presenceData.details = `Viewing the terms of use `;
    }
    else {
        presenceData.details = `Browsing the site `;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07S0FDdEIsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDZixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQywySUFBMkksQ0FDNUksQ0FBQyxXQUFXLENBQUM7UUFDZCxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1FBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQztLQUNqQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNuQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFDO2FBQ3RFLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbkIsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsS0FBSyxlQUFlLENBQUM7S0FDOUM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLDZCQUE2QixDQUFDO0tBQ3REO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztLQUNyRDtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNyQyxNQUFNLEtBQUssR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBc0IsQ0FBQyxLQUFLLENBQUM7UUFDNUUsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMseUpBQXlKLENBQzFKLENBQUMsV0FBVyxDQUFDO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsS0FBSyxJQUFJLENBQUM7UUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFlBQVksZ0JBQWdCLENBQUM7S0FDdEQ7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsNkRBQTZELENBQzlELENBQUMsV0FBVyxDQUFDO1FBQ2QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbkMsNElBQTRJLENBQzdJLENBQUMsV0FBVyxDQUFDO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxPQUFPLE1BQU0sRUFBRSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7S0FDckQ7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsRUFBRTtRQUNuRCxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0tBQ3BEO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9