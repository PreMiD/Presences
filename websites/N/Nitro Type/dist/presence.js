const PREMID_DEBUG_LOGGING = true;
const presence = new Presence({
    clientId: "676560908578717702"
});
function getNumberWithOrdinal(n) {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
presence.on("UpdateData", () => {
    try {
        const loggedIn = !!document.querySelector(".dropdown--account span");
        const username = loggedIn
            ? document.querySelector(".dropdown--account span").textContent
            : "Racing as a guest";
        const presenceData = {
            largeImageKey: "nt",
            smallImageKey: loggedIn ? "user" : "guest",
            smallImageText: username
        };
        const path = location.pathname;
        try {
            if (path == "/") {
                presenceData.details = "On the Homepage";
            }
            else if (path.startsWith("/login") || path.startsWith("/signup")) {
                presenceData.details = "Logging in";
            }
            else if (document.querySelector(".modal--mysterybox.is-active")) {
                presenceData.details = "Opening Mystery Box";
            }
            else if (path.startsWith("/garage")) {
                presenceData.details = "Hanging in the Garage";
            }
            else if (path.startsWith("/team/create")) {
                presenceData.details = "Creating a team";
            }
            else if (path.startsWith("/team/")) {
                presenceData.details = "Looking at Team Info";
                presenceData.state = document.querySelector(".card-teamTag").parentElement.innerText;
            }
            else if (path.startsWith("/team")) {
                presenceData.details = "Looking at Teams";
            }
            else if (path.startsWith("/achievements")) {
                presenceData.details = "Browsing Achievements";
                var pName = document.querySelector(".has-btn--vertical .btn.is-active")
                    .textContent;
                presenceData.state =
                    pName +
                        " (" +
                        (pName == "Summary"
                            ? document.querySelector(".prog-points").textContent
                            : document.querySelector(".twb").textContent).replace(/ /g, "") +
                        ")";
            }
            else if (path.startsWith("/dealership")) {
                presenceData.details = "Browsing the Dealership";
            }
            else if (path.startsWith("/friends")) {
                presenceData.details = "Viewing Friends Page";
            }
            else if (path.startsWith("/leaderboards")) {
                presenceData.details = "Checking the Leaderboard";
            }
            else if (path.startsWith("/news")) {
                presenceData.details = "Browsing the News";
                var header = document.querySelector(".news-header");
                if (header && path.startsWith("/news/read")) {
                    presenceData.state = header.textContent;
                }
            }
            else if (path.startsWith("/profile")) {
                presenceData.details = "Updating Racer Profile";
            }
            else if (path.startsWith("/support")) {
                presenceData.details = "Checking the Support Page";
            }
            else if (path.startsWith("/racer")) {
                presenceData.details = "Viewing Racer Profiles";
                presenceData.state = document.querySelector(".profile-username").textContent;
            }
            else if (path.startsWith("/stats") || path.startsWith("/racelog")) {
                presenceData.details = "Viewing Stats";
            }
            else if (path.startsWith("/race")) {
                presenceData.details = "Racing";
                var pos = parseInt(document.querySelector(".dash-pos .tsxxl").textContent);
                var wpm = document
                    .querySelector(".list--xs > li:nth-child(1) > div:nth-child(1) ")
                    .textContent.split("\n")
                    .reverse()
                    .join("")
                    .toLowerCase();
                var acc = document.querySelector(".list--xs > li:nth-child(2) > div:nth-child(1) > div:nth-child(2)").textContent + "acc";
                presenceData.state = getNumberWithOrdinal(pos) + " " + wpm + " " + acc;
                if (document.querySelector(".raceLight-status")) {
                    presenceData.state = "Waiting for the race to start.";
                }
                if (document.querySelector(".race-results")) {
                    presenceData.state =
                        "Finished in " +
                            document.querySelector("div.raceResults-title").textContent +
                            " " +
                            document
                                .querySelector(".gridTable-row.is-self > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)")
                                .textContent.replace(/ /g, "")
                                .replace(/\n/g, " ");
                }
            }
            else {
                if (PREMID_DEBUG_LOGGING) {
                    presenceData.details = path;
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        if (presenceData.details == null) {
            console.log("no presence!");
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
    }
    catch (e) {
        console.log(e);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUVsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsb0JBQW9CLENBQUMsQ0FBUztJQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUNoQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLElBQUk7UUFFRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sUUFBUSxHQUFHLFFBQVE7WUFDdkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQyxXQUFXO1lBQy9ELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztRQUN4QixNQUFNLFlBQVksR0FBaUI7WUFDakMsYUFBYSxFQUFFLElBQUk7WUFDbkIsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQzFDLGNBQWMsRUFBRSxRQUFRO1NBQ3pCLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQy9C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