var presence = new Presence({
    clientId: "651412198727352331"
});
let categories = {
    "tools": "Tools",
    "vehicles": "Vehicles",
    "paintjobs": "Paint Jobs",
    "weapons": "Weapons",
    "scripts": "Scripts",
    "player": "Player",
    "maps": "Maps",
    "misc": "Misc"
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
            let name = document.getElementsByClassName("clearfix")[1].children[0].textContent;
            if (name.length > 60)
                name = name.slice(0, 57) + "...";
            presenceData.state = name + " (" + categories[document.location.pathname.split("/")[1]] + ")";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFXO0lBQ3hCLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLFVBQVUsRUFBRSxVQUFVO0lBQ3RCLFdBQVcsRUFBRSxZQUFZO0lBQ3pCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsTUFBTSxFQUFFLE1BQU07Q0FDZCxDQUFBO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxJQUFJO0tBQ25CLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0tBQ25EO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEUsSUFBSSxRQUFRLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUMxQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUNsRixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRTtnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQ3RELFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQzlGO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1lBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFFO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztLQUN2QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO1FBQ3JELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7S0FDdkM7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDIn0=