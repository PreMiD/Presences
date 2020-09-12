var presence = new Presence({
  clientId: "610102236374368267"
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

var live, prevLive: boolean, author: string, title: string;

presence.on("UpdateData", async () => {
  var player = document.querySelector(".PlayerControls__PlayerContainer-vo7mt3-4");

  if (player) {
    var paused =
      document.querySelector(
        ".PlayButton__PlayerControl-rvh8d9-1"
      ) === null;

    var on_air = document.querySelector(".LiveStreamPage__LiveStreamPageHeader-hwzri8-1");

    if (on_air) {
      live = true;
      if (prevLive !== live) {
        prevLive = live;
      }
    } else {
      live = false;
    }

    if (!live) {
      title = document.querySelector(".shared__ShowDetails-gqlx6k-1 > a:nth-child(1)").textContent;
      author = document.querySelector("p.Typography__BodyExtraSmall-sc-1swbs0s-16:nth-child(2) > a:nth-child(1)").textContent;
    } else {
      title = document.querySelector(".Typography__Headline1Small-sc-1swbs0s-8").textContent;
      author = "Mixcloud Live";
    }

    var data: PresenceData = {
      details: title,
      state: author,
      largeImageKey: "mixcloud",
      smallImageKey: paused ? "pause" : "play",
      smallImageText: paused ? (await strings).pause : (await strings).play,
    };

    if (live) {
      data.smallImageKey = "live";
      data.smallImageText = (await strings).live;
    }

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }
    
    presence.setActivity(
      {
        details: data.details,
        state: data.state,
        largeImageKey: "mixcloud"
      },
      true
    );
   } else if (title !== null && author !== null) {
     presence.setActivity(data, !paused);
   };
});