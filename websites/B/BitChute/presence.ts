const presence = new Presence({
    clientId: "875631338663870485"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "bitchute_logo",
      startTimestamp: browsingStamp
    },
    { pathname } = location,
    [privacy, buttons, time] = await Promise.all(
      ["privacy", "buttons", "time"].map(async (setting) => {
        const s: boolean = await presence.getSetting(setting);
        return s;
      })
    );

  if (privacy) presenceData.details = "Using BitChute";
  else if (pathname === "/") {
    const tab = document.querySelector<HTMLLIElement>(
      "ul.nav.nav-tabs.nav-tabs-list > li.active"
    );
    presenceData.details = "At HomePage";
    if (tab) presenceData.state = `Viewing ${tab.textContent} Videos`;
  } else if (pathname.startsWith("/video")) {
    const title = document.querySelector<HTMLHeadingElement>("h1#video-title"),
      channelName = document.querySelector<HTMLAnchorElement>(
        ".details > .name > a"
      ),
      video = document.querySelector<HTMLVideoElement>("video#player");
    if (title) presenceData.details = `Watching ${title.textContent}`;
    if (channelName) {
      presenceData.state = `By ${channelName.textContent}`;
      if (buttons) {
        presenceData.buttons = [
          {
            label: "Watch Video",
            url: location.href
          },
          {
            label: "View Channel",
            url: channelName.href
          }
        ];
      }
    }
    if (time && video && !video.paused) {
      [, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
      presenceData.smallImageText = presenceData.smallImageKey = "play";
    }
  } else if (pathname.startsWith("/channel")) {
    const name = document.querySelector<HTMLAnchorElement>(
      ".details > .name > a"
    );
    presenceData.details = "Viewing Channel";
    if (name) {
      presenceData.state = name.textContent;
      if (buttons)
        presenceData.buttons = [{ label: "View Channel", url: location.href }];
    } else presenceData.details = "Viewing All Channels";
  } else if (pathname.startsWith("/category")) {
    const name = document.querySelector<HTMLHeadingElement>("h1.page-title");
    if (name) {
      presenceData.details = `Viewing Category: ${name.textContent}`;
      const tab = document.querySelector<HTMLLIElement>(
        "ul.nav.nav-tabs.nav-tabs-list > li.active"
      );
      if (tab) presenceData.state = `Looking at ${tab.textContent} videos`;
    }
  } else if (pathname === "/accounts/register")
    presenceData.details = "Registering Account";
  else if (pathname === "/accounts/login") presenceData.details = "Logging In";
  else if (pathname === "/profile/") presenceData.details = "Viewing Profile";
  else if (pathname === "/settings/") presenceData.details = "Viewing Settings";
  else if (pathname === "/notifications/")
    presenceData.details = "Viewing Notifications";
  else if (pathname.startsWith("/playlist/")) {
    const playlistName =
      document.querySelector<HTMLHeadingElement>("h1#playlist-title");
    presenceData.details = "Viewing Playlist";
    if (playlistName) presenceData.state = playlistName.textContent;
  } else if (pathname.includes("monetization"))
    presenceData.details = "Looking at Monetization options";
  else if (pathname === "/help-us-grow/")
    presenceData.details = "At funding page";
  else if (pathname.startsWith("/search")) {
    const { search } = location;
    presenceData.details = `Searching for ${search.substring(
      7,
      search.indexOf("&") !== -1 ? search.indexOf("&") : search.length
    )}`;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
