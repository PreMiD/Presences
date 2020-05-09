const presence = new Presence({
    clientId: "653644508507930645"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo-dbl"
    };
    const browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.startTimestamp = browsingStamp;
    if (window.location.pathname.endsWith("bots")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "All bots";
    }
    else if (window.location.pathname.endsWith("contact")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Contact";
    }
    else if (window.location.pathname.endsWith("api-docs")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "API Docs.";
    }
    else if (window.location.pathname.startsWith("/bots/")) {
        presenceData.details = "Viewing a bot:";
        presenceData.state = document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong")
            ? document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong").textContent
            : "Viewing their bot(s)";
    }
    else if (window.location.pathname.includes("/my-bots/add")) {
        presenceData.state = "Adding a new bot";
    }
    else if (window.location.pathname.endsWith("partners")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Partners";
    }
    else if (window.location.pathname.startsWith("/tags/")) {
        presenceData.details = "Viewing a tag:";
        presenceData.state = document.querySelector("#header > h1").textContent;
    }
    else if (window.location.pathname.includes("/users/")) {
        presenceData.details = "Viewing a user:";
        presenceData.state =
            document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong").textContent +
                document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > span").textContent;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDakM7U0FBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0tBQ2hDO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUNsQztTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6QyxpSEFBaUgsQ0FDbEg7WUFDQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsaUhBQWlILENBQ2xILENBQUMsV0FBVztZQUNmLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztLQUM1QjtTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzVELFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7S0FDekM7U0FBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDO0tBQ3pFO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsS0FBSztZQUNoQixRQUFRLENBQUMsYUFBYSxDQUNwQixpSEFBaUgsQ0FDbEgsQ0FBQyxXQUFXO2dCQUNiLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLCtHQUErRyxDQUNoSCxDQUFDLFdBQVcsQ0FBQztLQUNqQjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=