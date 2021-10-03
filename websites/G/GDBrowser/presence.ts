const presence = new Presence({
  clientId: "635876670146084880"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "coin"
    },
    q = new URLSearchParams(window.location.search);

  if (window.location.href.includes("gdbrowser.com")) {
    // Levels
    if (
      (window.location.pathname.toLowerCase() !== "/" &&
        window.location.pathname.toLowerCase() === "/daily") ||
      window.location.pathname.toLowerCase() === "/weekly"
    ) {
      const downloads = document.getElementsByClassName(
          "inline smaller spaced"
        )[0].innerHTML,
        likes = document.getElementsByClassName("inline smaller spaced")[1]
          .innerHTML,
        orbs = document.getElementsByClassName("orbs")[1].innerHTML;
      presenceData.state = `🔽 ${downloads} | 👍 ${likes} | 🔵 ${orbs}`;
      presenceData.details = `${
        document.getElementsByTagName("h1")[0].innerText
      } ${document.getElementById("authorLink").innerText}`;
      presenceData.smallImageKey = `diff_${document
        .getElementById("difficultytext")
        .innerHTML.toLowerCase()
        .replace("<br>", "_")}`;
      presenceData.smallImageText = `${document
        .getElementById("difficultytext")
        .innerHTML.replace("<br>", " ")}`;
    }

    // Homepage
    if (window.location.pathname.toLowerCase() === "/") {
      if (document.getElementById("credits").style.display === "block") {
        presenceData.details = "Viewing the credits";
        presenceData.state = "❤";
      } else presenceData.details = "Viewing the homepage";
    }

    // other stuff
    if (window.location.pathname.toLowerCase() === "/iconkit")
      presenceData.details = "In the iconkit";

    if (window.location.pathname.toLowerCase().includes("/search")) {
      if (window.location.pathname.toLowerCase() === "/search")
        presenceData.details = "Searching for levels";
      else {
        presenceData.details = "Searching for levels";

        // Map Packs
        if (parseInt(q.get("mappack")) === 1)
          presenceData.state = "Viewing a map pack";

        // Quick Search (Now with 100% more switch)
        switch (q.get("type")) {
          case "recent":
            presenceData.state = "🕒 Viewing recent levels";
            break;
          case "mostdownloaded":
            presenceData.state = "🔽 Viewing top downloaded levels";
            break;
          case "mostliked":
            presenceData.state = "👍 Viewing top liked levels";
            break;
          case "trending":
            presenceData.state = "📈 Viewing trending levels";
            break;
          case "magic":
            presenceData.state = "✨ Viewing magic levels";
            break;
          case "awarded":
            presenceData.state = "⭐ Viewing awarded levels";
            break;
          case "featured":
            presenceData.state = "⭐ Viewing featured levels";
            break;
          case "followed":
            presenceData.state = "💙 Viewing followed levels";
            break;
          default:
            switch (q.get("diff")) {
              case "1":
                presenceData.state = "😄 Viewing Easy levels";
                break;
              case "2":
                presenceData.state = "😃 Viewing Normal levels";
                break;
              case "3":
                presenceData.state = "😅 Viewing Hard levels";
                break;
              case "4":
                presenceData.state = "😐 Viewing Harder levels";
                break;
              case "5":
                presenceData.state = "🙁 Viewing Insane levels";
                break;
              case "-1":
                presenceData.state = "😶 Viewing Unrated levels";
                break;
              case "-2":
                switch (q.get("demonFilter")) {
                  case "1":
                    presenceData.state = "😠 Viewing Easy Demons";
                    break;
                  case "2":
                    presenceData.state = "😡 Viewing Medium Demons";
                    break;
                  case "3":
                    presenceData.state = "🤬 Viewing Hard Demons";
                    break;
                  case "4":
                    presenceData.state = "😈 Viewing Insane Demons";
                    break;
                  case "5":
                    presenceData.state = "👿 Viewing Extreme Demons";
                    break;
                }
                break;
              default:
                presenceData.state = `Searching for ${
                  document.getElementById("header").innerHTML
                }`;
                break;
            }
        }

        // Diffs (Also with 101% more switch statement)
      }
    }

    if (window.location.pathname.toLowerCase().includes("/mappacks"))
      presenceData.details = "Viewing the Map Packs";

    if (window.location.pathname.toLowerCase().includes("/gauntlets"))
      presenceData.details = "Viewing the Gauntlets";

    if (window.location.pathname.toLowerCase().includes("/leaderboards"))
      presenceData.details = "Viewing the leaderboards";

    if (window.location.pathname.toLowerCase() === "/messages")
      presenceData.details = "Checking messages";

    if (window.location.pathname.toLowerCase().includes("/profile")) {
      presenceData.details = `Looking at ${
        window.location.href.split("/")[4]
      }'s profile`;
    }

    presence.setActivity(presenceData);
  }
});
