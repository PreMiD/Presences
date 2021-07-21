const PREMID_DEBUG_LOGGING = true;

const presence = new Presence({
  clientId: "676560908578717702"
});

function getNumberWithOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

presence.on("UpdateData", () => {
  try {
    //log("UpdateData called")
    const loggedIn = !!document.querySelector(".dropdown--account span");
    const username = loggedIn
      ? document.querySelector(".dropdown--account span").textContent
      : "Racing as a guest";
    const presenceData: PresenceData = {
      largeImageKey: "nt",
      smallImageKey: loggedIn ? "user" : "guest",
      smallImageText: username
    };
    const path = location.pathname;
    try {
      if (path == "/") {
        presenceData.details = "On the Homepage";
      } else if (path.startsWith("/login") || path.startsWith("/signup")) {
        presenceData.details = "Logging in";
      } else if (document.querySelector(".modal--mysterybox.is-active")) {
        presenceData.details = "Opening Mystery Box";
      } else if (path.startsWith("/garage")) {
        presenceData.details = "Hanging in the Garage";
      } else if (path.startsWith("/team/create")) {
        presenceData.details = "Creating a team";
      } else if (path.startsWith("/team/")) {
        presenceData.details = "Looking at Team Info";
        presenceData.state =
          document.querySelector(".card-teamTag").parentElement.innerText;
      } else if (path.startsWith("/team")) {
        presenceData.details = "Looking at Teams";
      } else if (path.startsWith("/achievements")) {
        presenceData.details = "Browsing Achievements";
        var pName = document.querySelector(
          ".has-btn--vertical .btn.is-active"
        ).textContent;
        presenceData.state =
          pName +
          " (" +
          (pName == "Summary"
            ? document.querySelector(".prog-points").textContent
            : document.querySelector(".twb").textContent
          ).replace(/ /g, "") +
          ")";
      } else if (path.startsWith("/dealership")) {
        presenceData.details = "Browsing the Dealership";
      } else if (path.startsWith("/friends")) {
        presenceData.details = "Viewing Friends Page";
      } else if (path.startsWith("/leaderboards")) {
        presenceData.details = "Checking the Leaderboard";
      } else if (path.startsWith("/news")) {
        presenceData.details = "Browsing the News";
        var header = document.querySelector(".news-header");
        if (header && path.startsWith("/news/read")) {
          presenceData.state = header.textContent;
        }
      } else if (path.startsWith("/profile")) {
        presenceData.details = "Updating Racer Profile";
      } else if (path.startsWith("/support")) {
        presenceData.details = "Checking the Support Page";
      } else if (path.startsWith("/racer")) {
        presenceData.details = "Viewing Racer Profiles";
        presenceData.state =
          document.querySelector(".profile-username").textContent;
      } else if (path.startsWith("/stats") || path.startsWith("/racelog")) {
        presenceData.details = "Viewing Stats";
      } else if (path.startsWith("/race")) {
        presenceData.details = "Racing";
        var pos = parseInt(
          document.querySelector(".dash-pos .tsxxl").textContent
        );
        var wpm = document
          .querySelector(".list--xs > li:nth-child(1) > div:nth-child(1) ")
          .textContent.split("\n")
          .reverse()
          .join("")
          .toLowerCase();
        var acc =
          document.querySelector(
            ".list--xs > li:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
          ).textContent + "acc";
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
              .querySelector(
                ".gridTable-row.is-self > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
              )
              .textContent.replace(/ /g, "")
              .replace(/\n/g, " ");
        }
      } else {
        if (PREMID_DEBUG_LOGGING) {
          presenceData.details = path;
        }
      }
    } catch (e) {
      console.log(e);
    }

    if (presenceData.details == null) {
      console.log("no presence!");
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      //log(presenceData)
      presence.setActivity(presenceData);
    }
  } catch (e) {
    console.log(e);
  }
});
