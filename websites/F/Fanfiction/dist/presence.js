const presence = new Presence({
    clientId: "630790482804473857"
});
var tags = [
    "/anime/",
    "/book/",
    "/cartoon/",
    "/comic/",
    "/game/",
    "/misc/",
    "/movie/",
    "/play/",
    "tv"
];
var anime;
var crossover = [];
for (let i = 0; i < tags.length; i++) {
    crossover.push(["/crossovers" + tags[i]]);
}
const elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "banner"
    };
    presenceData.startTimestamp = elapsed;
    if (document.location.pathname == "/") {
        presenceData.details = "Browing fanfics";
        presenceData.state = "at Homepage";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "browsing";
    }
    else if (tags.includes(document.location.pathname)) {
        presenceData.details = "Exploring Fanfics";
        presenceData.state = `Catagory: ${document.location.pathname.replace("/", " ")} `;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = document.location.href;
    }
    else if (document.location.pathname.startsWith("/s/")) {
        var current = document.location.pathname
            .replace("/s/", "")
            .split("/")
            .join("")
            .replace(/\d+/, "")
            .replace("crossovers", "")
            .split("-")
            .join(" ");
        presenceData.details = "Reading Fanfiction..";
        presenceData.state = `title: ${current} `;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = document.location.href;
        presence.setActivity(presenceData);
    }
    else if (crossover.includes(document.location.pathname)) {
        presenceData.details = "Exploring Fanfics";
        presenceData.state = `Catagory: ${document.location.pathname
            .replace("crossovers", "")
            .replace("/", " ")} (Crossover) `;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = document.location.href;
    }
    else if (/\d/.test(document.location.pathname)) {
        anime = document.location.pathname
            .split("/")
            .join("")
            .replace(/\d+/, "")
            .replace("crossovers", "");
        presenceData.details = "Exploring Fanfics";
        presenceData.state = `Looking for ${anime} `;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = document.location.href;
    }
    else if (/\d/.test(document.location.pathname)) {
        anime = document.location.pathname
            .split("/")
            .join("")
            .replace(/\d+/, "")
            .replace("crossovers", "");
        presenceData.details = "Exploring Fanfics";
        presenceData.state = `Looking for ${anime} `;
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = document.location.href;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBSSxHQUFHO0lBQ1QsU0FBUztJQUNULFFBQVE7SUFDUixXQUFXO0lBQ1gsU0FBUztJQUNULFFBQVE7SUFDUixRQUFRO0lBQ1IsU0FBUztJQUNULFFBQVE7SUFDUixJQUFJO0NBQ0wsQ0FBQztBQUNGLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMzQztBQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTlDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsUUFBUTtLQUN4QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7SUFFdEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxZQUFZ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