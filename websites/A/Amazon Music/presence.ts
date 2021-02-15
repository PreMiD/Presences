const presence = new Presence({
    clientId: "808756700022702120"
  });

let fullscreen: boolean, player = false;

presence.on("UpdateData", async () => {
  player =
        document
          .querySelector(
            "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
          ) != undefined
      ? true
      : false;

  if (player == true) {
    const exitFSButton = document.querySelector(
      "div._2kGtEHAlQ5t5sY3jvz-wwl > div._1Wgs9MKFGuL58IFgKSM811 > div._2HXusrWftEtKAYukKt5IuO > music-button"
    );
    exitFSButton != null ? (fullscreen = true) : (fullscreen = false);
    if (fullscreen == true) {
      const title = document.querySelector("a.music-headline-2").textContent,
        artist = document
          .querySelector("a.music-primary-text")
          .textContent.split(" - ")[0],

        data: PresenceData = {
          details: title,
          state: artist,
          largeImageKey: "logo"
        };

      if (title !== null && artist !== null) {
        presence.setActivity(data);
      }
    } else if (fullscreen == false) {
      const title = document
          .querySelector(
            "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
          )
          .shadowRoot.querySelector(
            "div.item.parent-undefined > div.center > music-link.hydrated > a"
          ).textContent,
        artist = document
          .querySelector(
            "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
          )
          .shadowRoot.querySelector(
            "div.item.parent-undefined > div.center > span"
          )
          .textContent.split("-")[0],
        data: PresenceData = {
          details: title,
          state: artist,
          largeImageKey: "logo"
        };

        if (title !== null && artist !== null) {
          presence.setActivity(data);
        }
    }
  } else {
    const data: PresenceData = {
      details: "Browsing...",
      largeImageKey: "logo"
    };
    presence.setActivity(data);
  }
});
