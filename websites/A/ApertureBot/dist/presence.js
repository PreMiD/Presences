const presence = new Presence({ clientId: "653156362548805652" });
const pages = {
    "/docs": "Documention",
    "/login": "Login Page"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname;
    const head = document.querySelector("#page-wrapper > div > div > div > div > div.panel-heading");
    const presenceData = {
        largeImageKey: "ap-logo_new",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (pages[page] || pages[page.slice(0, -1)]) {
        presenceData.details = pages[page] || pages[page.slice(0, -1)];
    }
    else if (head && head.textContent == "Configuration Editor") {
        presenceData.details = "Configuration Page";
    }
    else if (head && head.textContent == "Infractions") {
        presenceData.details = "Infraction List";
    }
    else if (head && head.textContent == "Guild Weekly Message Throughput") {
        presenceData.details = "Guild Stats";
    }
    else if (head && head.textContent == " Guild Banner") {
        presenceData.details = "Guild Info Page";
    }
    else {
        presenceData.details = "Read to Documentation";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDbEUsTUFBTSxLQUFLLEdBQUc7SUFDWixPQUFPLEVBQUUsYUFBYTtJQUN0QixRQUFRLEVBQUUsWUFBWTtDQUN2QixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDeEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsMkRBQTJELENBQzVELENBQUM7SUFFRixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLGFBQWE7UUFDNUIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztLQUM5QyxDQUFDO0lBRUYsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hFO1NBQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxzQkFBc0IsRUFBRTtRQUM3RCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzdDO1NBQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxhQUFhLEVBQUU7UUFDcEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztLQUMxQztTQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksaUNBQWlDLEVBQUU7UUFDeEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDdEM7U0FBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLGVBQWUsRUFBRTtRQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO0tBQzFDO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO0tBQ2hEO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==