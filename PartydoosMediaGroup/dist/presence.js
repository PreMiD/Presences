var presence = new Presence({
    clientId: "671918505267822594"
});
var strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
var oldUrl, elapsed;
var data = {
    details: undefined,
    state: undefined,
    largeImageKey: "pmg",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: undefined,
    endTimestamp: undefined
};
presence.on("UpdateData", async () => {
    const static = {
        "": {
            details: "Browsing"
        },
        "/privacy.html": {
            details: "Viewing",
            state: "Privacy and Terms of Service"
        }
    };
    const host = location.host;
    const path = location.pathname.replace(/\/$/, "");
    if (oldUrl !== host) {
        oldUrl = host;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    if (path in static) {
        data = { ...data, ...static[path] };
    }
    if (data.details !== undefined) {
        if (data.details.match("(Viewing|Browsing)")) {
            data.smallImageKey = "reading";
            data.smallImageText = (await strings).browsing;
        }
        presence.setActivity(data);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        return element.textContent;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxJQUFJLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFFcEIsSUFBSSxJQUFJLEdBQWlCO0lBQ3hCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLGFBQWEsRUFBRSxTQUFTO0lBQ3hCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLFlBQVksRUFBRSxTQUFTO0NBQ3ZCLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLE1BQU0sR0FBRztRQUNkLEVBQUUsRUFBRTtZQUNILE9BQU8sRUFBRSxVQUFVO1NBQ25CO1FBQ0QsZUFBZSxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSw4QkFBOEI7U0FDckM7S0FDRCxDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUMzQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFbEQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDeEM7SUFFRCxJQUFJLE9BQU8sRUFBRTtRQUNaLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0tBQzlCO0lBRUQsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1FBQ25CLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDcEM7SUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDL0M7UUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO1NBQU07UUFDTixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3hCO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUN2QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWpELElBQUksT0FBTyxFQUFFO1FBQ1osT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDO0tBQzNCO0FBQ0YsQ0FBQyxDQUFDIn0=