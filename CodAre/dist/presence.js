var presence = new Presence({
    clientId: "655044555632148518",
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
  });
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "logo",
  };
  if (document.location.hostname == "codare.org") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/u/")) {
      presenceData.details = "Bir kullanıcının profiline";
      if (
        document.querySelector(
          "#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > a > span"
        )
      ) {
        user = document.querySelector(
          "#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > a > span"
        ).innerHTML;
      } else if (
        document.querySelector(
          "#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > span"
        )
      ) {
        user = document.querySelector(
          "#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > span"
        ).innerText;
      }
      presenceData.state = "bakıyor: " + user;
    } else if (document.location.pathname.includes("/d/")) {
      presenceData.details = "Bir konuyu okuyor:";
      title = document.querySelector(
        "#content > div > div.DiscussionPage-discussion > header > div > ul > li.item-title > h2"
      ).innerText;
      presenceData.state = title;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/settings")) {
      presenceData.details = "Ayarlarda düzenleme";
      presenceData.state = "yapıyor";
    } else if (document.location.pathname.includes("/tags")) {
      presenceData.details = "Etiketlere bakıyor";
    } else if (document.location.pathname.includes("/t/")) {
      presenceData.details = "Bir etikete göz atıyor:";
      name = document.querySelector("#content > div > header > div > div > h2")
        .innerText;
      presenceData.state = name;
    } else if (document.location.pathname.includes("/following")) {
      presenceData.details = "Takip edilen etiketlere";
      presenceData.state = "bakıyor";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
