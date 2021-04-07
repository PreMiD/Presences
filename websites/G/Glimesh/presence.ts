const presence = new Presence({
    clientId: "825888886285795329"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let elapsedTime: number = null;

presence.on("UpdateData", async () => {
  let locationHref = document.location.href, 
      locationHost = document.location.host, 
      locationPath = document.location.pathname;


  const presenceData: PresenceData = {
    largeImageKey: "glimesh_logo",
  }
  
  if (locationHost == "glimesh.tv") {
    // On Main Glimesh Website... Global Presence incase new directory we don't yet support.
    
    presenceData.details = "Browsing...";
    if (locationPath == "/") {
      // Home Page

      presenceData.details = "Viewing Home Page";
    } else if (locationPath.match("/streams/")) {
      // Streams

      let category = document.title.replace(' - Glimesh', "");
      presenceData.details = "Viewing Category";
      presenceData.state = category;
    } else if (locationPath == "/users" || locationPath == "/users/") {
      // User List

      presenceData.details = "Viewing All Users";
    } else if (locationPath.match("users/settings")) {
      // Settings

      presenceData.details = "Viewing Settings"
    } else if (locationPath.match("/blog")) {
      // Glimesh Blogs

      presenceData.details = "Viewing Blogs"
      if (locationPath != "/blog" && locationPath != "/blog/") {
        let blogPost = document.title.replace(" - Glimesh", "");
        
        presenceData.details = "Reading" + (!await presence.getSetting("show_details") ? " a " : " ") + "Blog";
        if (await presence.getSetting("show_details")) {
          presenceData.state = blogPost;
        }

        if (await presence.getSetting("show_buttons")) {
          presenceData.buttons = [
            {
              label: "View Blog Post",
              url: locationHref
            }
          ]
        }
      }
    } else if (locationPath.match("/about")) { 
      // Main About Page

      presenceData.details = "Reading about Glimesh";
      if (locationPath.match("streaming")) {
        // Reading about Streaming...

        presenceData.details = "Reading About";
        presenceData.state = "Streaming"
      } else if (locationPath.match("team")) {
        // Viewing the Team...

        presenceData.details = "Viewing the Team";
      } else if (locationPath.match("mission")) {
        // Reading the Mission...
        
        presenceData.details = "Reading the Mission";
      } else if (locationPath.match("credits")) {
        // Reading the Credits...

        presenceData.details = "Reading the Credits"
      } else if (locationPath.match("dmca")) {
        // Reading About DMCA Policy...

        presenceData.details = "Reading About";
        presenceData.state = "DMCA Policy";
      } else if (locationPath.match("faq")) {
        // Reading FAQ...

        presenceData.details = "Reading";
        presenceData.state = "Frequently asked Questions";
      } else if (locationPath.match("terms")) {
        // Reading the TOS...

        presenceData.details = "Reading the";
        presenceData.state = "Terms of Service";
      } else if (locationPath.match("condut")) {
        // Reading the Rules of Conduct...

        presenceData.details = "Reading the";
        presenceData.state = "Rules of Conduct";
      } else if (locationPath.match("privacy")) {
        // Reading the Privacy Policy

        presenceData.details = "Reading the";
        presenceData.state = "Privacy Policy";
      } else if (locationPath.match("open-data")) {
        // Viewing Open Data
        presenceData.details = "Viewing Open Data";
        
        // Platform User Growth
        presenceData.state = "Platform User Growth";
        if (locationPath.match("subscriptions")) {
          // Recurring Subscriptions

          presenceData.state = "Recurring Subscriptions";
        } else if (locationPath.match("streams")) {
          // Live Streams

          presenceData.state = "Live Streams";
        }
      }
    } else if (locationPath.match("/profile")) {
      // User Profiles

      let username = document.title.replace("'s Profile - Glimesh", "");

      presenceData.details = "Viewing" + (!await presence.getSetting("show_details") ? " a " : " ") + "Profile";
      if (await presence.getSetting("show_details")) {
        presenceData.state = username;
      }
      if (await presence.getSetting("show_buttons") && await presence.getSetting("show_details")) {
        presenceData.buttons = [
          {
            label: "View Profile",
            url: locationHref
          }
        ]
      }
    } else if (document.getElementById("video-column") != null) {
      // User Channel

      let username = document.querySelector("h3");
      let title = document.title.replace(" - Glimesh", "");

      presenceData.details = await presence.getSetting("show_details") ? title : "Watching a Stream";
      if (await presence.getSetting("show_details")) {
        presenceData.state = username.textContent;
      }

      const video = document.querySelector("video");

      if (await presence.getSetting("show_buttons") && await presence.getSetting("show_details")) {
        const profileURL: HTMLAnchorElement = document.querySelector("#video-column > div > div.card-footer.p-1.d-none.d-sm-block > div > div.col-8.d-inline-flex.align-items-center > a");
        presenceData.buttons = [
          {
            label: "View Profile",
            url: profileURL.href
          }
        ]
      }

      // Double Checks if Video Element Exists & Makes sure the user is live.
      if (video != null && !isNaN(video.duration)) {
        // If they're live, ADD A BUTTON!
        
        // If Show Buttons & Show Details is true then show the buttons. (if either are false don't.)
        if (await presence.getSetting("show_buttons") && await presence.getSetting("show_details")) {
          presenceData.buttons.unshift({
            label: "Watch Stream",
            url: locationHref
          })
        }

        // If Video is Playing (!, not, paused) set to Live/Watching Status. Else, set to Paused Status.
        if (!video.paused) {
          if (elapsedTime == null) {
            elapsedTime = Math.floor(Date.now() / 1000);
          }

          presenceData.smallImageKey = "playing";
          presenceData.smallImageText = "Live!";

          if (await presence.getSetting("show_timestamps")) {
            presenceData.startTimestamp = elapsedTime;
          }
        } else {
          presenceData.smallImageKey = "paused";
          presenceData.smallImageText = "Paused";

          if (await presence.getSetting("show_timestamps")) {
            presenceData.startTimestamp = 0;
          }
        }
      }
    }
  } else if (locationHost == "glim.shop") {
    // Merch

    presenceData.details = "Viewing Merch Store";
  } else if (locationHost == "support.glimesh.tv") {
    // Support

    presenceData.details = "Viewing Support";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});