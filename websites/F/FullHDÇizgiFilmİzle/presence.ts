const presence = new Presence({
    clientId: "825305379894067240"
  });
  presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "f6"
      },
      page = window.location.pathname,
      browsingStamp = Math.floor(Date.now() / 1000);
  
    presenceData.startTimestamp = browsingStamp;
    if (page.startsWith("/index.php")) {
      presenceData.details = "Ana Sayfaya bakıyor:";
      presenceData.state = document.querySelector(
        "body > div:nth-child(6) > div > h3"
      ).textContent;
    } else if (page.startsWith("/series.php")) {
      presenceData.details = "Dizileri görüntülüyor:";
      presenceData.state = "Diziler";
    } else if (page.startsWith("/films.php")) {
        presenceData.details = "Fimleri görüntülüyor:";
        presenceData.state = "Fimler";
    } else if (page.startsWith("/blogs.php")) {
      presenceData.details = "Blogları görüntülüyor:";
      presenceData.state = document.querySelector(
        "body > div.post.post-single > div.post-thumbnail > center > h1"
      ).textContent;
    } else if (page.startsWith("/videoadd.php")) {
      presenceData.details = "Video ekliyor";
      presenceData.state = "Video ekle";
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
    }
  });
  