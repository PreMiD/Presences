var presence = new Presence({
  clientId: "674714012541386752",
});

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "logo",
  };

  let request =
    document.querySelector(
      "#modalrequestFormModal > div > div > div.modal-body.m-t-n-lg"
    ) !== null;
  let feedback =
    document.querySelector("#modalundefined > div > div > div.blurBG.b0") !==
    null;
  let djapply =
    document.querySelector("#modaldjAppButton > div > div") !== null;
  let newsreporterapply =
    document.querySelector(
      "#modalmediaAppButton > div > div > div.modal-body > form > div"
    ) !== null;
  let editingbio = document.querySelector("#accountBio") !== null;
  if (request) {
    presenceData.details = "Sending UpBeat";
    presenceData.state = "Request";
  } else if (feedback) {
    presenceData.details = "Sending UpBeat";
    presenceData.state = "Feedback";
  } else if (djapply) {
    presenceData.details = "Applying For";
    presenceData.state = "Radio Presenter";
  } else if (newsreporterapply) {
    presenceData.details = "Applying For";
    presenceData.state = "News Reporter";
  } else if (editingbio) {
    presenceData.details = "Editing";
    presenceData.state = "Profile Information";
  } else if (document.location.pathname.includes("/UpBeat")) {
    let songArtist = document.querySelector(
      "#stats > div > div.left.a > div.statbox.top.artist > div > span"
    ).innerHTML;
    let songName = document.querySelector(
      "#stats > div > div.left.a > div.statbox.bottom.song > div > span"
    ).innerHTML;
    presenceData.details = songArtist.replace("&amp;", "&");
    presenceData.state = songName.replace("&amp;", "&");
  } else if (document.location.pathname.includes("/News.Article")) {
    let article = document.querySelector(
      "#mainContent > div > div:nth-child(1) > div.glassBox.p-n > div.articleHeader > div > div.col-md-8.col-xs-12 > div.titleContainer > div"
    ).innerHTML;
    let author = document.querySelector(
      "#mainContent > div > div:nth-child(1) > div.glassBox.p-n > div.articleHeader > div > div.col-md-8.col-xs-12 > div.info > a"
    ).textContent;
    presenceData.details = "Article: " + article;
    presenceData.state = "Made By: " + author;
    presenceData.smallImageKey = "read";
    presenceData.smallImageText = "Reading Article";
  } else if (document.location.pathname.includes("/Account.Profile")) {
    let porfile = document.querySelector(
      "#mainContent > div > div.col-sm-12 > div.profileBanner > div.profileNameContainer > div > span"
    ).textContent;
    let profile = document.querySelector(
      "#mainContent > div > div.col-sm-12 > div.profileBanner > div.profileNameContainer > div > span"
    ).textContent;
    presenceData.details = "Viewing " + profile + " Profile";
  } else if (document.location.pathname.includes("/core")) {
    presenceData.details = "Viewing Page:";
    presenceData.state = document.title.slice(11);
  } else if (document.location.pathname.includes("/radio")) {
    presenceData.details = "Viewing Page:";
    presenceData.state = document.title.slice(11);
  } else if (document.location.pathname.includes("/news")) {
    presenceData.details = "Viewing Page:";
    presenceData.state = document.title.slice(11);
  } else {
    presenceData.details = "Viewing Page:";
    pageName = document.title.slice(9);
    presenceData.state = pageName;
  }

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});
