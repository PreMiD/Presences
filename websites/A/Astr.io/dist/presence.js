const presence = new Presence({
    clientId: "683626678492332069"
});
let tag, nickname;
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "astriologo",
        smallImageKey: "transparent"
    };
    if (window.location.pathname === "/") {
        const size = document.getElementById("stats-hud").innerHTML.split("|")
            .length;
        const hstats = document.getElementById("stats-hud").innerHTML.split(" | ");
        const mass = document
            .getElementById("stats-hud")
            .innerHTML.split("|")[0]
            .replace("Score: ", "");
        const modepr = document.getElementsByClassName("is-active")[2].id;
        const mode = modepr.charAt(0).toUpperCase() + modepr.substring(1);
        const region = document
            .getElementsByClassName("is-active")[1]
            .id.replace("europe", "EU")
            .replace("america", "NA")
            .replace("asia", "AS");
        if (document.getElementById("nick").value === "") {
            nickname = "Unnamed";
        }
        else {
            nickname = document.getElementById("nick").value;
        }
        if (document.getElementById("tag").value === "") {
            tag = "";
        }
        else {
            tag = `[${document.getElementById("tag").value}]`;
        }
        if (size === 2) {
            presenceData.details = `${region} - Main Menu`;
            presenceData.state = "Gamemode: " + mode;
            presenceData.smallImageText = document
                .getElementById("stats-hud")
                .innerHTML.replace("|", "•");
        }
        else if (size === 3) {
            presenceData.details = `${region} ${mode} • Mass:  ${mass}`;
            presenceData.state = `Nickname: ${tag} ${nickname}`;
            presenceData.smallImageText = document
                .getElementById("stats-hud")
                .innerHTML.replace(hstats[0] + " |", "")
                .replace("|", "•");
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksR0FBRyxFQUFFLFFBQVEsQ0FBQztBQUNsQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDN0IsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxZQUFZO1FBQzNCLGFBQWEsRUFBRSxhQUFhO0tBQzdCLENBQUM7SUFFRixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ25FLE1BQU0sQ0FBQztRQUNWLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRSxNQUFNLElBQUksR0FBRyxRQUFRO2FBQ2xCLGNBQWMsQ0FBQyxXQUFXLENBQUM7YUFDM0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkIsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2xFLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLE1BQU0sR0FBRyxRQUFRO2FBQ3BCLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7YUFDMUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7YUFDeEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6QixJQUFLLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFzQixDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDdEUsUUFBUSxHQUFHLFNBQVMsQ0FBQztTQUN0QjthQUFNO1lBQ0wsUUFBUSxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFzQixDQUFDLEtBQUssQ0FBQztTQUN4RTtRQUVELElBQUssUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQXNCLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNyRSxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ1Y7YUFBTTtZQUNMLEdBQUcsR0FBRyxJQUFLLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFzQixDQUFDLEtBQUssR0FBRyxDQUFDO1NBQ3pFO1FBRUQsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxHQUFHLE1BQU0sY0FBYyxDQUFDO1lBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLFFBQVE7aUJBQ25DLGNBQWMsQ0FBQyxXQUFXLENBQUM7aUJBQzNCLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxNQUFNLElBQUksSUFBSSxhQUFhLElBQUksRUFBRSxDQUFDO1lBQzVELFlBQVksQ0FBQyxLQUFLLEdBQUcsYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFFcEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxRQUFRO2lCQUNuQyxjQUFjLENBQUMsV0FBVyxDQUFDO2lCQUMzQixTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO2lCQUN2QyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9