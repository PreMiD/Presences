const presence = new Presence({
  clientId: "655044555632148518"
});

const browsingStamp = Math.floor(Date.now() / 1000);
let user;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
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
        ).textContent;
      }
      presenceData.state = "bakıyor: " + user;
    } else if (document.location.pathname.includes("/d/")) {
      presenceData.details = "Bir konuyu okuyor:";
      const title = document.querySelector(
        "#content > div > div.DiscussionPage-discussion > header > div > ul > li.item-title > h2"
      ).textContent;
      presenceData.state = title;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/settings")) {
      presenceData.details = "Ayarlarda düzenleme";
      presenceData.state = "yapıyor";
    } else if (document.location.pathname.includes("/tags")) {
      presenceData.details = "Etiketlere bakıyor";
    } else if (document.location.pathname.includes("/t/")) {
      presenceData.details = "Bir etikete göz atıyor:";
      const name = document.querySelector(
        "#content > div > header > div > div > h2"
      ).textContent;
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
