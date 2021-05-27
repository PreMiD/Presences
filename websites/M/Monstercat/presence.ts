const presence = new Presence({
    clientId: "632013978608074764"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement,
  title: HTMLElement | string,
  search: HTMLInputElement,
  playing: boolean,
  paused: boolean,
  progress: string | number,
  lastState: string | number;

lastState = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "monstercat"
  };

  if (document.location.hostname === "www.monstercat.com") {
    //Catches the progress bar
    progress = document
      .querySelector<HTMLElement>(".progress")
      .style.cssText.replace("width: ", "")
      .replace("%;", ""); //Replace everything so only "x.xxxx" is left (x standing for numbers)

    if (lastState === progress && progress !== "0" && progress !== "100") {
      //If the player doesnt equal to 0 or 100 but does equal to the latest request make paused true
      playing = true;
      paused = true;
    } else if (progress === "0" || progress === "100") {
      //If the player equals to 0 or 100 so that site information can be displayed because there is nothing playing
      playing = false;
      paused = true;
    } else {
      //Sets the last progress to the latest progress and playing true and paused false
      lastState = progress;
      playing = true;
      paused = false;
    }

    progress = Number(progress); //make progress from string to numbers
    progress = Math.round(progress); //Remove everything after "."

    if (playing && !paused) {
      title = document.querySelector<HTMLElement>(
        "body > header > div.container.player > div.flex.controls.push-right.playing > a > span"
      );
      presenceData.details = title.innerText;
      presenceData.state = `${progress}% progressed`;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";
    } else if (playing && paused) {
      title = document.querySelector<HTMLElement>(
        "body > header > div.container.player > div.flex.controls.push-right.playing > a > span"
      );
      presenceData.details = title.innerText;
      presenceData.state = `${progress}% progressed`;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Paused";
    } else {
      //If there is no song playing display site information
      presenceData.startTimestamp = browsingStamp;
      if (document.location.pathname.includes("/release/")) {
        title = document.querySelector<HTMLElement>(
          "body > section > div:nth-child(1) > div.container.flex > div > h1"
        );
        user = document.querySelector(
          "body > section > div:nth-child(1) > div.container.flex > div > h3"
        );
        presenceData.details = "Viewing release:";
        presenceData.state = `${title.innerText} by ${user.innerText}`;
      } else if (document.location.pathname.includes("/artist/")) {
        user = document.querySelector(
          "body > section > div.top-banner > div.container.flex > div > div > h1"
        );
        presenceData.details = "Viewing artist:";
        presenceData.state = user.innerText;
      } else if (document.location.pathname.includes("/music"))
        presenceData.details = "Browsing music releases...";
      else if (document.location.pathname.includes("/browse"))
        presenceData.details = "Browsing...";
      else if (document.location.pathname.includes("/catalog"))
        presenceData.details = "Viewing catalog";
      else if (document.location.pathname.includes("/artists"))
        presenceData.details = "Viewing artists";
      else if (document.location.pathname.includes("/playlist/")) {
        title = document.querySelector<HTMLElement>(
          "body > section > div > h1"
        );
        presenceData.details = "Viewing playlist:";
        presenceData.state = title.innerText;
      } else if (document.location.pathname.includes("/playlists"))
        presenceData.details = "Viewing their playlists";
      else if (document.location.pathname.includes("/events"))
        presenceData.details = "Viewing events";
      else if (document.location.pathname.includes("/event/")) {
        title = document.querySelector<HTMLElement>(
          "body > section > div.event-page-header > div > div.container.container--event-header.flex > div > a.silent.no-hover > h1"
        );
        presenceData.details = "Reading about event:";
        if (title.innerText.length > 128)
          presenceData.state = `${title.innerText.substring(0, 125)}...`;
        else presenceData.state = title.innerText;

        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/publishing"))
        presenceData.details = "Viewing publishing";
      else if (document.location.pathname.includes("/cotw"))
        presenceData.details = "Viewing radio";
      else if (document.location.pathname.includes("/gold"))
        presenceData.details = "Viewing Monstercat Gold";
      else if (document.location.pathname.includes("/account"))
        presenceData.details = "Viewing their account";
      else if (document.location.pathname.includes("/blog/")) {
        if (document.location.pathname.includes("/tags/")) {
          title = document
            .querySelector<HTMLElement>("head > title")
            .innerText.replace(" Posts - Monstercat", "");
          presenceData.details = "Blog - Viewing tag:";
          presenceData.state = title;
        } else {
          presenceData.details = "Reading article:";
          title = document.querySelector<HTMLElement>(
            "body > section > div.panel.panel--article > header > h1"
          );
          if (title.innerText.length > 128)
            presenceData.state = `${title.innerText.substring(0, 125)}...`;
          else presenceData.state = title.innerText;

          presenceData.smallImageKey = "reading";
        }
      } else if (document.location.pathname.includes("/blog"))
        presenceData.details = "Viewing blog posts";
      else if (document.location.pathname.includes("/search")) {
        search = document.querySelector(
          "body > header > div.container.player > div.col-xs-hidden.col-md-visible.global-search > form > input[type=text]"
        );
        presenceData.details = "Searching for:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else if (document.location.pathname === "/")
        presenceData.details = "Viewing homepage";
    }
  } else if (document.location.hostname === "shop.monstercat.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/products/")) {
      presenceData.details = "Shop - Viewing product:";
      title = document.querySelector<HTMLElement>(
        "#product-description > div:nth-child(1) > h1"
      );
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/collections/")) {
      presenceData.details = "Shop - Viewing collection:";
      title = document.querySelector<HTMLElement>(
        "#collection-description > h1"
      );
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/cart"))
      presenceData.details = "Shop - Viewing cart";
    else if (document.location.pathname === "/")
      presenceData.details = "Viewing store front";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
