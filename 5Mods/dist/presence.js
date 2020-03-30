var presence = new Presence({
    clientId: "651412198727352331"
});
let categories = {
    tools: "Tools",
    vehicles: "Vehicles",
    paintjobs: "Paint Jobs",
    weapons: "Weapons",
    scripts: "Scripts",
    player: "Player",
    maps: "Maps",
    misc: "Misc"
};
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lg"
    };
    if (document.location.pathname == "/") {
        presenceData.details = "Viewing the front page...";
    }
    else if (categories[document.location.pathname.split("/")[1]]) {
        if (document.getElementsByClassName("btn-download")[0]) {
            presenceData.details = "Viewing a Mod...";
            let name = document.getElementsByClassName("clearfix")[1].children[0]
                .textContent;
            if (name.length > 60)
                name = name.slice(0, 57) + "...";
            presenceData.state =
                name +
                    " (" +
                    categories[document.location.pathname.split("/")[1]] +
                    ")";
        }
        else {
            presenceData.details = "Browsing a category...";
            presenceData.state = categories[document.location.pathname.split("/")[1]];
        }
    }
    else if (document.location.pathname == "/login") {
        presenceData.details = "Logging in...";
    }
    else if (document.location.pathname == "/register") {
        presenceData.details = "Registering...";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFXO0lBQ3hCLEtBQUssRUFBRSxPQUFPO0lBQ2QsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLFlBQVk7SUFDdkIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsTUFBTTtDQUNaLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7S0FDbkQ7U0FBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNoRSxJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1lBQzFDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUNuRSxXQUFXLENBQUM7WUFDZCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRTtnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3ZELFlBQVksQ0FBQyxLQUFLO2dCQUNqQixJQUFJO29CQUNKLElBQUk7b0JBQ0osVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsR0FBRyxDQUFDO1NBQ0w7YUFBTTtZQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7WUFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUU7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxXQUFXLEVBQUU7UUFDckQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUN4QztJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMifQ==