var presence = new Presence({
    clientId: "631122124630654979"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "logo"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
        presenceData.details = "Browing Homepage";
        presenceData.state = "at Homepage";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "browsing";
    }
    else if ([
        "/flavors",
        "/recipes",
        "/users",
        "/contests",
        "/vendors",
        "/top100"
    ].includes(document.location.pathname)) {
        var dstate;
        if (document.location.search != "") {
            var urlParams = new URLSearchParams(document.location.search);
            dstate = `searching for ${urlParams.get("name_like")}`;
        }
        else {
            dstate = "browsing list";
        }
        presenceData.details = `Browing ${document.location.pathname.replace("/", "")} `;
        presenceData.state = dstate;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "browsing";
    }
    else if ([
        "/getting_started",
        "/help/how_to_mix",
        "/go_pro",
        "/help/report_recipe"
    ].includes(document.location.pathname)) {
        presenceData.details = `Browing help `;
        presenceData.state = `on ${document.location.pathname
            .replace("/help", "")
            .split("_")
            .join(" ")
            .replace("/", "")}`;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "browsing";
    }
    else if (document.location.pathname.startsWith("/flavors/")) {
        presenceData.details = `Browing Flavors `;
        presenceData.state = `flavor: ${document.location.pathname
            .replace(/\d/, "")
            .replace(/\d/, "")
            .split("_")
            .join(" ")
            .replace("/flavors/", "")
            .split("-")
            .join(" ")
            .replace("/", "")}`;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "browsing";
    }
    else if (document.location.pathname.startsWith("/recipes/")) {
        var data = document.location.hash
            .replace(/\d/, "")
            .replace("#", "")
            .split("_by_");
        presenceData.details = `Recipe : ${data[0].split("_").join(" ")} `;
        presenceData.state = `Creator: ${data[1].split("_").join(" ")}`;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "browsing";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztLQUMxQztTQUFNLElBQ0w7UUFDRSxVQUFVO1FBQ1YsVUFBVTtRQUNWLFFBQVE7UUFDUixXQUFXO1FBQ1gsVUFBVTtRQUNWLFNBQVM7S0FDVixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUN0QztRQUNBLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5RCxNQUFNLEdBQUcsaUJBQWlCLFNBQVMsQ0FBQyxH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