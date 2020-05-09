var presence = new Presence({
    clientId: "680498892651233310"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
  });

var browsingStamp = 0; //Last started activity

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1);
  var presenceData = {
    details: "My Nintendo",
    largeImageKey: "logo_big"
  };

  if (path.length > 0) {
    //Subpages
    switch (path[0]) {
      //Reward Categories
      case "reward_categories":
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browsing;

        presenceData.details = document.getElementsByClassName(
          "PageHeader_title"
        )[0].innerText;

        if (path.length > 1)
          presenceData.state = document.getElementsByClassName(
            "PageSubHeader_title"
          )[0].innerText;
        break;
      //Rewards
      case "rewards":
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).reading;

        if (!path.includes("media")) {
          presenceData.details = document.getElementsByClassName(
            "PageHeader_title"
          )[0].innerText;

          if (path.length > 1)
            presenceData.state = document.getElementsByClassName(
              "RewardHeader_title"
            )[0].innerText;
        }
        break;
      //Missions
      case "missions":
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browsing;

        presenceData.details = document.getElementsByClassName(
          "PageHeader_title"
        )[0].innerText;
        break;
      //Points
      case "point":
        if (path.length > 1) {
          switch (path[1]) {
            //Wallet
            case "wallet":
              presenceData.details = document.getElementsByClassName(
                "PageHeader_title"
              )[0].innerText;
              presenceData.state = document.getElementsByClassName(
                "PageSubHeader_title"
              )[0].innerText;
              break;
            //Unknown
            default:
              presence.setTrayTitle();
              presence.setActivity();
              return;
          }
        } else {
          presence.setTrayTitle();
          presence.setActivity();
          return;
        }
        break;
      //News
      case "news":
        presenceData.details = document.getElementsByClassName(
          "PageHeader_title"
        )[0].innerText;

        if (path.length > 1) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).reading;

          presenceData.state = document.getElementsByClassName(
            "NewsDetail_title"
          )[0].innerText;
        } else {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browsing;

          presenceData.state = document.getElementsByClassName(
            "PageSubHeader_title"
          )[0].innerText;
        }
        break;
      //Redeem Point Codes
      case "serial_number":
        presenceData.details = document.getElementsByClassName(
          "PageHeader_title"
        )[0].innerText;
        break;
      //Getting Started
      case "getting_started":
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).reading;

        presenceData.details = document.getElementsByClassName(
          "PageHeader_title"
        )[0].innerText;
        break;
      //About Points
      case "about_point":
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).reading;

        presenceData.details = document.getElementsByClassName(
          "PageHeader_title"
        )[0].innerText;
        break;
      //About Gold Points
      case "about_gold_point":
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).reading;

        presenceData.details = document.getElementsByClassName(
          "PageHeader_title"
        )[0].innerText;
        break;
      //Unknown
      default:
        presence.setTrayTitle();
        presence.setActivity();
        return;
    }
  } else {
    //Homepage
    presence.setTrayTitle();
    presence.setActivity();
    return;
  }

  presence.setActivity(presenceData);
});
