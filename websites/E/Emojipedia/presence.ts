const presence = new Presence({
  clientId: "691867169251655758"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (
    document.URL === "https://emojipedia.org/" ||
    document.URL === "https://emojipedia.org"
  ) {
    presenceData.details = "Staring at the main page";
  } else if (document.location.href.includes("https://blog.emojipedia.org")) {
    if (
      document.URL === "https://blog.emojipedia.org/" ||
      document.URL === "https://blog.emojipedia.org"
    ) {
      presenceData.details = "Skimming through the blog homepage";
    } else {
      presenceData.details = "Reading a blog post...";
      presenceData.state =
        document.getElementsByClassName("post-full-title")[0].textContent;
    }
  } else if (document.location.href.includes("/search")) {
    presenceData.details = "Searching for...";
    if (document.location.href.includes("/search/?q=")) {
      presenceData.state = (
        document.getElementById("id_q") as HTMLInputElement
      ).value;
    } else {
      presenceData.state = "Nothing.. you alright there?";
    }
  } else {
    const categoryURLs = [
      "https://emojipedia.org/people",
      "https://emojipedia.org/nature",
      "https://emojipedia.org/food-drink",
      "https://emojipedia.org/activity",
      "https://emojipedia.org/travel-places",
      "https://emojipedia.org/symbols",
      "https://emojipedia.org/flags"
    ];

    const eventURLs = [
      "https://emojipedia.org/australia-day",
      "https://emojipedia.org/bastille-day",
      "https://emojipedia.org/birthday",
      "https://emojipedia.org/black-friday",
      "https://emojipedia.org/canada-day",
      "https://emojipedia.org/carnaval",
      "https://emojipedia.org/chinese-new-year",
      "https://emojipedia.org/christmas",
      "https://emojipedia.org/cinco-de-mayo",
      "https://emojipedia.org/coronavirus",
      "https://emojipedia.org/diwali",
      "https://emojipedia.org/dragon-boat-festival",
      "https://emojipedia.org/easter",
      "https://emojipedia.org/emoji-movie",
      "https://emojipedia.org/fall-autumn",
      "https://emojipedia.org/fathers-day",
      "https://emojipedia.org/festivus",
      "https://emojipedia.org/graduation",
      "https://emojipedia.org/guy-fawkes",
      "https://emojipedia.org/halloween",
      "https://emojipedia.org/hanukkah",
      "https://emojipedia.org/hearts",
      "https://emojipedia.org/holi",
      "https://emojipedia.org/independence-day",
      "https://emojipedia.org/mothers-day",
      "https://emojipedia.org/new-years-eve",
      "https://emojipedia.org/olypmics",
      "https://emojipedia.org/pride",
      "https://emojipedia.org/queens-birthday",
      "https://emojipedia.org/ramadan",
      "https://emojipedia.org/spring",
      "https://emojipedia.org/st-patricks-day",
      "https://emojipedia.org/spring",
      "https://emojipedia.org/summer",
      "https://emojipedia.org/super-bowl",
      "https://emojipedia.org/thanksgiving",
      "https://emojipedia.org/valentines-day",
      "https://emojipedia.org/wedding-marriage",
      "https://emojipedia.org/winter",
      "https://emojipedia.org/winter-olympics",
      "https://emojipedia.org/world-cup",
      "https://emojipedia.org/world-emoji-day"
    ];

    let bypass = false;
    let isCategory = false;
    let isEvent = false;

    for (let n = 0; n < categoryURLs.length; n++) {
      if (document.URL.includes(categoryURLs[n]))
        (isCategory = true), (bypass = true);
    }

    if (bypass !== true) {
      for (let n = 0; n < eventURLs.length; n++) {
        if (document.URL.includes(eventURLs[n]))
          (isEvent = true), (bypass = true);
      }
    }

    if (isCategory === true) {
      presenceData.details = "Viewing a category...";
      presenceData.state = document.getElementsByTagName("h1")[0].innerText;
    } else if (isEvent === true) {
      presenceData.details = "Viewing an event...";
      presenceData.state = document.getElementsByTagName("h1")[0].innerText;
    } else {
      if (document.getElementsByTagName("h1").length >= 1) {
        const emojiRegex =
          /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

        if (
          emojiRegex.test(document.getElementsByTagName("h1")[0].innerText) ===
          true
        ) {
          presenceData.details = "Viewing an emoji...";
          presenceData.state = document.getElementsByTagName("h1")[0].innerText;
        } else {
          presenceData.details = "Viewing a page...";
          presenceData.state = document.getElementsByTagName("h1")[0].innerText;
        }
      }
    }
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
