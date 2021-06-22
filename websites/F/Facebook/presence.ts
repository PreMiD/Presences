const presence = new Presence({
    clientId: "631803867708915732"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement | string,
  title: HTMLElement,
  typing: HTMLElement,
  replace: string[],
  search: HTMLInputElement,
  video: HTMLVideoElement,
  videoDuration: number,
  videoCurrentTime: number,
  videoPaused: boolean,
  timestamps: number[];

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "facebook"
  };

  if (document.location.pathname.includes("/messages/")) {
    if (document.location.pathname.includes("/videocall/")) {
      presenceData.largeImageKey = "messenger";
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector<HTMLElement>(
        "#u_0_0 > div.r30xiam5.m0q0jmkx.alrytcbg.hp5uecnq.g2121wdl > div > div:nth-child(5) > div > div > div > div > div.prklkq8o.t7elcel3.sd0tyowg.ocjcko58.p3f4w9ai.f5zavhip.foed1vyy > div > div > div.ocjcko58.foed1vyy > div > p"
      );
      if (user === null || !user?.innerText) {
        //presenceData.details = "In a video call or";
        user = "user not found.";
        presenceData.details = "In videocall with someone";
        presenceData.smallImageKey = "videocall";
      } else {
        //presenceData.details = "In call with:";
        user = (user as HTMLElement).innerText;
        presenceData.details = "In call with someone";
        presenceData.smallImageKey = "call";
      }
      //presenceData.state = user;
      presenceData.state = "(Hidden until presence settings.)"; // Add setting for this when presence settings are a thing!!
    } else if (document.location.pathname.includes("/t/")) {
      presenceData.largeImageKey = "messenger";
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector<HTMLElement>("._3oh-");
      typing = document.querySelector(
        "body > div > div > div > div:nth-child(2) > span > div._20bp > div._4_j4 > div._4rv3._7og6 > div > div._7kpk > div > div > div:nth-child(1) > div > div > div > div > div > div > span > span"
      );
      if (typing === null) {
        presenceData.details = "Reading messages from:";
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.details = "Writing to:";
        presenceData.smallImageKey = "writing";
      }
      //presenceData.state = user.innerText;
      presenceData.state = "(Hidden until presence settings.)"; // Add setting for this when presence settings are a thing!!
    } else if (document.location.pathname.includes("/new")) {
      presenceData.largeImageKey = "messenger";
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Composing a new message";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/about")) {
      presenceData.largeImageKey = "messenger";
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the about page";
    }
  } else if (
    document.querySelector("#seo_h1_tag > a > span") !== null ||
    document.querySelector("#fb-timeline-cover-name > a") !== null
  ) {
    //Profile page finder (It is their username)
    user = document.querySelector<HTMLElement>("#seo_h1_tag > a > span");
    if (user === null)
      user = document.querySelector<HTMLElement>("#fb-timeline-cover-name > a");

    video = document.querySelector(
      "body > div > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div > div > div > div > div > video"
    );
    if (document.querySelector("#fbPhotoSnowliftAuthorName > a") !== null) {
      title = document.querySelector("#fbPhotoSnowliftAuthorName > a");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing photo by user:";
      presenceData.state = user.innerText;
    } else if (video !== null) {
      title = document.querySelector(
        "body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > span > span"
      );
      if (title === null) {
        title = document.querySelector(
          "body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div > span > span"
        );
      }
      videoCurrentTime = video.currentTime;
      videoDuration = video.duration;
      videoPaused = video.paused;
      timestamps = presence.getTimestamps(
        Math.floor(videoCurrentTime),
        Math.floor(videoDuration)
      );
      presenceData.smallImageKey = videoPaused ? "pause" : "play";
      presenceData.smallImageText = videoPaused
        ? (await strings).pause
        : (await strings).play;
      [, presenceData.endTimestamp] = timestamps;
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;
      presenceData.state = user.innerText;
      if (videoPaused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (document.location.pathname.includes("/videos")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing video's by user:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/friends")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing friends of user:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/shop")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing shop by user:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/posts")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing posts by user:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/photos")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing photos by user:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/community")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing community of:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/about")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading about user:";
      presenceData.state = user.innerText;
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing user:";
      presenceData.state = user.innerText;
    }
  } else if (document.location.pathname.includes("/videos/")) {
    video = document.querySelector(
      "body > div > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div > div > div > video"
    );
    user = document.querySelector<HTMLLIElement>(
      "body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(2) > span > a"
    );
    if (user === null) {
      user = document.querySelector<HTMLElement>(
        "body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > span > a"
      );
    }
    if (user === null) {
      user = document.querySelector<HTMLElement>(
        "body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > h5 > span > span > span > a"
      );
    }
    if (user === null) {
      user = document.querySelector<HTMLElement>(
        "body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > h5 > span > span > span > a"
      );
    }
    if (user === null)
      user = document.querySelector<HTMLElement>(".profileLink");

    title = document.querySelector(
      "body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > span > span"
    );
    if (title === null) {
      title = document.querySelector(
        "body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div > span > span"
      );
    }
    if (title === null) {
      title = document.querySelector(
        "body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div"
      );
    }
    if (title === null) {
      title = document.querySelector(
        "body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div > div > div > div"
      );
    }
    if (title === null)
      title = document.querySelector("#u_2_d > div._1rgv > div._1rgw");

    if (title === null) title = document.querySelector("._1rgw");

    if (video === null) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = "live";
      if (title.innerText.length > 128)
        presenceData.details = `${title.innerText.substring(0, 125)}...`;
      else presenceData.details = title.innerText;

      presenceData.state = (user as HTMLElement).innerText;
    } else {
      videoCurrentTime = video.currentTime;
      videoDuration = video.duration;
      videoPaused = video.paused;
      timestamps = presence.getTimestamps(
        Math.floor(videoCurrentTime),
        Math.floor(videoDuration)
      );
      presenceData.smallImageKey = videoPaused ? "pause" : "play";
      presenceData.smallImageText = videoPaused
        ? (await strings).pause
        : (await strings).play;
      [, presenceData.endTimestamp] = timestamps;
      if (title.innerText.length > 128)
        presenceData.details = `${title.innerText.substring(0, 125)}...`;
      else presenceData.details = title.innerText;

      presenceData.state = (user as HTMLElement).innerText;
      if (videoPaused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (document.location.pathname.includes("/watch/")) {
    search = document.querySelector(".inputtext");
    video = document.querySelector(
      "body > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div > video"
    );
    if (video !== null) {
      user = document.querySelector<HTMLElement>(
        "#content > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > a"
      );
      title = document.querySelector<HTMLElement>(
        "#content > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div"
      );
      videoCurrentTime = video.currentTime;
      videoDuration = video.duration;
      videoPaused = video.paused;
      timestamps = presence.getTimestamps(
        Math.floor(videoCurrentTime),
        Math.floor(videoDuration)
      );
      presenceData.smallImageKey = videoPaused ? "pause" : "play";
      presenceData.smallImageText = videoPaused
        ? (await strings).pause
        : (await strings).play;
      [, presenceData.endTimestamp] = timestamps;
      if (title.innerText.length > 128)
        presenceData.details = `${title.innerText.substring(0, 125)}...`;
      else presenceData.details = title.innerText;

      presenceData.state = (user as HTMLLIElement).innerText;
      if (videoPaused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
        delete presenceData.smallImageKey;
        delete presenceData.smallImageText;
        presenceData.details = "Browsing through";
        presenceData.state = "Facebook Watch";
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (search.value !== null && search.value.length >= 2) {
      presenceData.smallImageKey = "search";
      presenceData.details = "Watch - Searching for:";
      presenceData.state = search.value;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/latest")) {
      presenceData.details = "Watch - Viewing:";
      presenceData.state = "Recently added";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/saved")) {
      presenceData.details = "Watch - Viewing:";
      presenceData.state = "Saved videos";
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = "Browsing through";
      presenceData.state = "Facebook Watch";
      presenceData.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.includes("/marketplace/")) {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#content > div > div > div:nth-child(2) > div > div > div:nth-child(4) > div > div > span > span > label > input"
      );
      presenceData.smallImageKey = "search";
      if (search.value.length >= 2) {
        presenceData.details = "Marketplace - Searching for:";
        presenceData.state = search.value;
      } else {
        presenceData.details = "Marketplace - Going to";
        presenceData.state = "search something up";
      }
    } else if (document.location.pathname.includes("/item/")) {
      presenceData.details = "Marketplace - Viewing item:";
      title = document.querySelector("#marketplace-modal-dialog-title > span");
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/groups/"))
      presenceData.details = "Marketplace - Viewing groups";
    else if (document.location.pathname.includes("/stores/"))
      presenceData.details = "Marketplace - Viewing stores";
    else if (document.location.pathname.includes("/buying/"))
      presenceData.details = "Marketplace - Viewing buying";
    else if (document.location.pathname.includes("/selling/"))
      presenceData.details = "Marketplace - Viewing selling";
    else if (document.location.pathname.includes("/saved/"))
      presenceData.details = "Marketplace - Viewing saved";
    else presenceData.details = "Marketplace - Browsing...";
  } else if (document.location.pathname.includes("/groups/")) {
    presenceData.startTimestamp = browsingStamp;
    replace = document.location.pathname.split("/");
    if (replace[2] !== undefined && replace[2] !== "") {
      title = document.querySelector("#seo_h1_tag > a");
      presenceData.details = "Groups - Viewing:";
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;
    } else presenceData.details = "Groups - Browsing...";
  } else if (document.location.pathname.includes("/groups_browse/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Groups - Browsing category:";
    title = document.querySelector(
      "#content > div > div > div:nth-child(3) > div > div:nth-child(3) > span"
    );
    if (title.innerText.length > 128)
      presenceData.state = `${title.innerText.substring(0, 125)}...`;
    else presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/pages/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Pages - Browsing...";
  } else if (document.location.pathname.includes("/oculus/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "oculus - Browsing...";
  } else if (document.location.pathname.includes("/events/")) {
    presenceData.startTimestamp = browsingStamp;
    replace = document.location.pathname.split("/");
    if (replace[2] !== undefined && replace[2] !== "") {
      title = document.querySelector("#seo_h1_tag");
      presenceData.details = "Events - Viewing:";
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/calendar/"))
      presenceData.details = "Events - Viewing calendar";
    else if (document.location.pathname.includes("/birthdays/"))
      presenceData.details = "Events - Viewing birthdays";
    else if (document.location.pathname.includes("/discovery/"))
      presenceData.details = "Events - Viewing discovery";
    else if (document.location.pathname.includes("/hosting/"))
      presenceData.details = "Events - Viewing hosting";
    else presenceData.details = "Events - Browsing...";
  } else if (document.location.pathname.includes("/fundraisers/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Fundraisers - Browsing...";
  } else if (document.location.pathname.includes("/donate/")) {
    presenceData.startTimestamp = browsingStamp;
    title = document.querySelector(
      "#info_section > div.clearfix > div > div > div:nth-child(2) > div > h1"
    );
    presenceData.details = "Fundraisers - Viewing:";
    if (title.innerText.length > 128)
      presenceData.state = `${title.innerText.substring(0, 125)}...`;
    else presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/games/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Games - Browsing...";
  } else if (document.location.pathname.includes("/gaming/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Gaming - Browsing...";
  } else if (document.location.pathname.includes("/salegroups/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "SaleGroups - Browsing...";
  } else if (document.location.pathname.includes("/jobs/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Jobs - Browsing...";
  } else if (document.location.pathname.includes("/ads/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Ads - Browsing...";
  } else if (document.location.pathname.includes("/weather/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing todays weather";
  } else if (document.location.pathname.includes("/saved/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Saved - Browsing...";
  } else if (document.location.pathname.includes("/offers/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Offers - Browsing...";
  } else if (document.location.pathname.includes("/recommendations/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Recommendations - Browsing...";
  } else if (document.location.pathname.includes("/crisisresponse/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "CrisisResponse - Browsing...";
  } else if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
