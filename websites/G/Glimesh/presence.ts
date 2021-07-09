const presence = new Presence({
  clientId: "825888886285795329"
});
let elapsedTime: number = null;

presence.on("UpdateData", async () => {
  const locationHref = document.location.href,
    locationHost = document.location.host,
    locationPath = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "glimesh_logo"
    };

  if (locationHost == "glimesh.tv") {
    presenceData.details = "Browsing...";
    if (locationPath == "/") {
      presenceData.details = "Viewing Home Page";
    } else if (locationPath.match("/streams/")) {
      const category = document.title.replace(" - Glimesh", "");
      presenceData.details = "Viewing Category";
      presenceData.state = category;
    } else if (locationPath == "/users" || locationPath == "/users/") {
      presenceData.details = "Viewing All Users";
    } else if (locationPath.match("users/settings")) {
      presenceData.details = "Viewing Settings";
    } else if (locationPath.match("/about")) {
      presenceData.details = "Reading about Glimesh";
      if (locationPath.match("alpha")) {
        presenceData.details = "Reading About";
        presenceData.state = "Alpha Features";
      } else if (locationPath.match("streaming")) {
        presenceData.details = "Reading About";
        presenceData.state = "Streaming";
      } else if (locationPath.match("team")) {
        presenceData.details = "Viewing the Team";
      } else if (locationPath.match("mission")) {
        presenceData.details = "Reading the Mission";
      } else if (locationPath.match("credits")) {
        presenceData.details = "Reading the Credits";
      } else if (locationPath.match("dmca")) {
        presenceData.details = "Reading About";
        presenceData.state = "DMCA Policy";
      } else if (locationPath.match("faq")) {
        presenceData.details = "Reading";
        presenceData.state = "Frequently asked Questions";
      } else if (locationPath.match("terms")) {
        presenceData.details = "Reading the";
        presenceData.state = "Terms of Service";
      } else if (locationPath.match("condut")) {
        presenceData.details = "Reading the";
        presenceData.state = "Rules of Conduct";
      } else if (locationPath.match("privacy")) {
        presenceData.details = "Reading the";
        presenceData.state = "Privacy Policy";
      } else if (locationPath.match("open-data")) {
        presenceData.details = "Viewing Open Data";
        presenceData.state = "Platform User Growth";

        if (locationPath.match("subscriptions")) {
          presenceData.state = "Recurring Subscriptions";
        } else if (locationPath.match("streams")) {
          presenceData.state = "Live Streams";
        }
      }
    } else if (locationPath.match("/profile")) {
      const username = document.title.replace("'s Profile - Glimesh", "");
      presenceData.details =
        "Viewing" +
        (!(await presence.getSetting("show_details")) ? " a " : " ") +
        "Profile";

      if (await presence.getSetting("show_details")) {
        presenceData.state = username;
      }

      if (
        (await presence.getSetting("show_buttons")) &&
        (await presence.getSetting("show_details"))
      ) {
        presenceData.buttons = [
          {
            label: "View Profile",
            url: locationHref
          }
        ];
      }
    } else if (document.getElementById("video-column") != null) {
      const username = document.querySelector("h3"),
        title = document.title.replace(" - Glimesh", "");

      presenceData.details = (await presence.getSetting("show_details"))
        ? title
        : "Watching a Stream";
      if (await presence.getSetting("show_details")) {
        presenceData.state = username.textContent;
      }

      const video = document.querySelector("video");

      if (
        (await presence.getSetting("show_buttons")) &&
        (await presence.getSetting("show_details"))
      ) {
        const profileURL: HTMLAnchorElement = document.querySelector(
          "#video-column > div > div.card-footer.p-1.d-none.d-sm-block > div > div.col-8.d-inline-flex.align-items-center > a"
        );
        presenceData.buttons = [
          {
            label: "View Profile",
            url: profileURL.href
          }
        ];
      }

      if (video != null && !isNaN(video.duration)) {
        if (
          (await presence.getSetting("show_buttons")) &&
          (await presence.getSetting("show_details"))
        ) {
          presenceData.buttons.unshift({
            label: "Watch Stream",
            url: locationHref
          });
        }

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
    presenceData.details = "Viewing Merch Store";
  } else if (locationHost == "support.glimesh.tv") {
    presenceData.details = "Viewing Support";
  } else if (locationHost == "blog.glimesh.tv") {
    presenceData.details = "Viewing Blogs";

    if (locationPath.match("/posts")) {
      const blogPost = document.querySelector(
        "body > div > div > div > h1 > a"
      ).textContent;

      presenceData.details =
        "Reading" +
        (!(await presence.getSetting("show_details")) ? " a " : " ") +
        "Blog";
      if (await presence.getSetting("show_details"))
        presenceData.state = blogPost;

      if (
        (await presence.getSetting("show_buttons")) &&
        (await presence.getSetting("show_details"))
      ) {
        presenceData.buttons = [
          {
            label: "View Blog Post",
            url: locationHref
          }
        ];
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
