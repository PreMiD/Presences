const presence = new Presence({
    clientId: "813781191308083239"
  }),
  time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const { title } = document,
    setting = {
      privacy: await presence.getSetting("privacy"),
      buttons: await presence.getSetting("buttons"),
      podcastLogo: await presence.getSetting("podcastLogo")
    },
    pathname = window.location.pathname,
    path = pathname.split("/"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: time
    };

  if (window.location.hostname === "www.nytimes.com") {
    if (setting.buttons && !setting.privacy) {
      presenceData.buttons = [
        {
          label: "View Page",
          url: window.location.href
        }
      ];
    }

    if (window.location.href === "https://www.nytimes.com/")
      presenceData.details = "Viewing Home Page";
    else if (pathname.includes("/interactive/")) {
      presenceData.details = "Viewing an Interactive:";
      if (!setting.privacy)
        presenceData.state = title.replace(" - The New York Times", "");
    } else if (
      pathname.includes("/section/") ||
      pathname.includes("/spotlight/podcasts")
    ) {
      presenceData.details = "Viewing a Section Page:";
      if (!setting.privacy)
        presenceData.state = title.replace(" - The New York Times", "");
    } else if (pathname.includes("/destination/")) {
      presenceData.details = "Viewing a Destination Page:";
      if (!setting.privacy)
        presenceData.state = title.replace(" - The New York Times", "");
    } else if (pathname.includes("/reviews/")) {
      presenceData.details = "Viewing a Review Page:";
      if (!setting.privacy)
        presenceData.state = title.replace(" - The New York Times", "");
    } else if (pathname.includes("/column/")) {
      presenceData.details = "Viewing a Column Page:";
      if (!setting.privacy)
        presenceData.state = title.replace(" - The New York Times", "");
    } else if (pathname.includes("/search")) {
      presenceData.details = setting.privacy ? "Searching" : "Searching for:";
      if (!setting.privacy)
        presenceData.state = new URLSearchParams(window.location.search).get(
          "query"
        );

      if (setting.buttons && !setting.privacy) {
        presenceData.buttons = [
          {
            label: "Show Search Results",
            url: window.location.href
          }
        ];
      }
    } else if (pathname.includes("/video/")) {
      presenceData.details = "Viewing a Video Section:";
      presenceData.state = title.replace(" - The New York Times", "");
    } else if (hasDatePath(path) && pathname.includes("/podcasts/")) {
      const audioPlayer = document.querySelector("audio"),
        podcast = document.querySelector("span.css-1f76qa2 span"),
        podcastLogo = document.querySelector<HTMLImageElement>(
          "span.css-1f76qa2 img"
        );

      presenceData.details = setting.privacy
        ? "Listening to a Podcast"
        : "Listening to a Podcast:";
      if (podcast && !setting.privacy)
        presenceData.state = `${podcast.textContent}: ${title.replace(
          " - The New York Times",
          ""
        )}`;

      if (audioPlayer && !isNaN(audioPlayer.duration)) {
        const timestamps = presence.getTimestampsfromMedia(audioPlayer);

        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        if (audioPlayer.paused) {
          delete presenceData.endTimestamp;
          presenceData.startTimestamp = time;
        }
      }

      if (setting.buttons && !setting.privacy) {
        presenceData.buttons = [
          {
            label: "Listen to Podcast",
            url: window.location.href
          }
        ];
      }

      if (setting.podcastLogo && !setting.privacy && podcastLogo)
        presenceData.largeImageKey = await getShortURL(podcastLogo.src);
    } else if (path[1] === "by" && path[2]) {
      const author =
        document.querySelector("h1.css-1uxfi68.e16wpn5v0")?.textContent ??
        "Unknown";

      presenceData.details = "Viewing an Author Page:";
      presenceData.state = author;

      if (document.querySelector("div.css-cnx41t img")) {
        presenceData.smallImageKey = await getShortURL(
          document.querySelector<HTMLImageElement>("div.css-cnx41t img").src
        );
        presenceData.smallImageText = author;
      }
    } else if (hasDatePath(path) && path[4]) {
      presenceData.details = setting.privacy
        ? "Reading an Article"
        : "Reading an Article:";
      if (!setting.privacy)
        presenceData.state =
          document.querySelector('h1[data-testid="headline"]')?.textContent ??
          title.replace(" - The New York Times", "");

      if (setting.buttons && !setting.privacy) {
        presenceData.buttons = [
          {
            label: "Read Article",
            url: window.location.href
          }
        ];
      }

      if (
        document.querySelector(
          'span span.css-bwjyn0.live-blog-header-live-label[data-active="true"]'
        )
      ) {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = "Live";
      }
    }
  } else if (window.location.hostname === "myaccount.nytimes.com") {
    presenceData.details = "Managing Account";

    if (!setting.privacy) {
      if (path[2] === "subscription")
        presenceData.state = "Subscription Overview";
      else if (path[2] === "billing") presenceData.state = "Billing History";
      else if (path[2] === "settings")
        presenceData.state = "Emails and Settings";
      else if (path[2] === "change-email") presenceData.state = "Change Email";
      else if (path[2] === "forgot-password")
        presenceData.state = "Reset Password";
      else if (path[1] === "get-started" && path[2] === "manage-billing")
        presenceData.state = "Payment details";
    }
  }

  if (!presenceData.state) delete presenceData.state;

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
  if (!url || url.length < 256) return url;
  if (shortenedURLs[url]) return shortenedURLs[url];
  try {
    const pdURL = await (
      await fetch(`https://pd.premid.app/create/${url}`)
    ).text();
    shortenedURLs[url] = pdURL;
    return pdURL;
  } catch (err) {
    presence.error(err);
    return url;
  }
}

function hasDatePath(path: Array<string>) {
  if (path[1] === "live")
    return (
      /[0-9]{4}$/g.test(path[2]) &&
      /[0-9]{2}|[0-9]{1}$/g.test(path[3]) &&
      /[0-9]{2}|[0-9]{1}$/g.test(path[4])
    );
  else
    return (
      /[0-9]{4}$/g.test(path[1]) &&
      /[0-9]{2}|[0-9]{1}$/g.test(path[2]) &&
      /[0-9]{2}|[0-9]{1}$/g.test(path[3])
    );
}
