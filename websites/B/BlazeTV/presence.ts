const presence = new Presence({
  clientId: "821047964340453377"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  let path = [],
    video: HTMLVideoElement,
    timestamps = [],
    showTitle = [],
    showTitleText = "",
    showWaitingText = "",
    productTitle = "",
    productPrice = "",
    collectionType = "",
    live = Boolean(document.querySelector(".live"));

  path = document.location.pathname.split("/");

  switch (path[1]) {
    case "":
      presenceData.details = "Viewing Homepage";
      presenceData.startTimestamp = new Date().getTime() / 1000;
      break;

    case "pages":
      if (path[4] === "shows") presenceData.details = "Viewing Shows";
      if (path[4] === "live") presenceData.details = "Viewing Streams";
      if (path[2] === "about") presenceData.details = "About";
      if (path[2] === "faq") {
        presenceData.details = "FAQ";
        presenceData.smallImageKey = "question";
      }

      presenceData.startTimestamp = new Date().getTime() / 1000;
      break;

    case "watch":
      showTitle = document
        .querySelector(
          "#fullscreen-container > div > ur-player > div.urpl-header > div"
        )
        .textContent.split("|");

      video = document.querySelector("#main-vjs-player_html5_api");
      timestamps = presence.getTimestampsfromMedia(video);

      presenceData.details = showTitle[0];

      presenceData.state = showTitle[1] || "BlazeTV";

      presenceData.startTimestamp = video.paused ? null : timestamps[0];
      presenceData.endTimestamp = video.paused ? null : timestamps[1];
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused ? "Paused" : "Playing";

      if (live) {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = "Live";

        presenceData.startTimestamp = null;
        presenceData.endTimestamp = null;

        if (path[4].includes("-louder-with-crowder"))
          presenceData.state = presenceData.state ?? "Louder With Crowder";
        else if (path[5].includes("-the-steve-deace-show"))
          presenceData.state = presenceData.state ?? "The Steve Deace Show";
      }

      break;

    case "not-live":
      showTitleText = document
        .querySelector(
          "#main-view > div > ui-view > div > div > div.ur-container.ng-scope > h2"
        )
        .textContent.split("|")[0];

      showWaitingText = document.querySelector(
        "#main-view > div > ui-view > div > div > div.ur-container.ng-scope > h1.title.theme-color.ng-binding"
      ).textContent;

      presenceData.details = showTitleText;
      presenceData.state = showWaitingText;

      presenceData.smallImageKey = "premiere-live";
      presenceData.smallImageText = "Waiting";
      if (
        Boolean(
          document.querySelector(
            "#main-view > div > ui-view > div > div > div.ur-container.ng-scope > h1:nth-child(2)"
          )
        )
      ) {
        presenceData.smallImageKey = "premiere";
        presenceData.smallImageText = "Finished";
        presenceData.state = "Event has ended";
      }
      break;

    case "collections":
      collectionType = document.querySelector(
        "#shopify-section-collection-template > div > header > div.page-width > div > h1 > span"
      ).textContent;
      presenceData.details = collectionType;

      presenceData.startTimestamp = new Date().getTime() / 1000;
      break;

    case "products":
      productTitle = document.querySelector(
        "#ProductSection-product-template > div > div:nth-child(2) > div.product-single__meta > h1"
      ).textContent;

      productPrice = document.querySelector(
        "#ProductSection-product-template > div > div:nth-child(2) > div.product-single__meta > div > dl > div.price__regular > dd > span"
      ).textContent;
      presenceData.details = productTitle;
      presenceData.state = productPrice;
      break;

    default:
      presenceData.details = "Viewing BlazeTV";
      break;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
