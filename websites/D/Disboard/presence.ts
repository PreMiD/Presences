const presence = new Presence({
    clientId: "872937214093443093"
  }),

  browsingStamp = Math.floor(Date.now() / 1000);

  presence.on("UpdateData", async () => {
    const urlpath = window.location.pathname.split("/"),
    langs = [
      "de",
      "es",
      "fil",
      "fr",
      "it",
      "nl",
      "no",
      "da",
      "pl",
      "pt-pt",
      "sv",
      "tr",
      "ru",
      "cs",
      "ja",
      "zh-cn",
      "zh-tw",
      "ko",
      "hi"
    ],
    urlpNum = new RegExp(langs.join("|")).test(urlpath[1]) ? 2 : 1,
    presenceData: PresenceData = {
      largeImageKey: "disboardsmall"
    }
    
    if (window.location.hostname == "disboard.org") {
      if (!urlpath[urlpNum])
      presenceData.details = "Home";
      presenceData.startTimestamp = browsingStamp;
      {
        presenceData.state = document.querySelector("head > title")
                    .textContent.replace("Disboard", "")
      }

      if (urlpath[urlpNum].startsWith("dashboard")) {
        presenceData.details = "Dashboard";
      }

      else if (urlpath[urlpNum].startsWith("servers")) {
        presenceData.details = "Take a look at servers";
      }

      else if (urlpath[urlpNum].startsWith("server")) {
        presenceData.details = "Take a look at a server";
        const server = document.querySelector(".server-name").innerHTML
          presenceData.buttons = [
            {
            label: `View ${server}`,
            url: window.location.href
            }
          ];
      }

      else if (urlpath[urlpNum].startsWith("search")) {
        presenceData.details = "Searching";
      }
      
      else if (urlpath[urlpNum].startsWith("reviews")) {
        presenceData.details = "Look at reviews";
      }

      else if (urlpath[urlpNum].startsWith("report-server")) {
        presenceData.details = "Writing a report";
      }
    }
  
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  });