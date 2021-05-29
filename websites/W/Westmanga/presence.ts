const presence = new Presence({
    clientId: "848082293427273748"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

presence.on("UpdateData", async () => {
  switch (
    document.location.pathname.endsWith("/") &&
    document.location.pathname.length > 1
      ? document.location.pathname.slice(
          0,
          document.location.pathname.length - 1
        )
      : document.location.pathname
  ) {
    case "/":
      presenceData.details = "Viewing homepage";
      break;
    case "/project":
      presenceData.details = "Viewing project list";
      break;
    case "/manga":
      presenceData.details = "Viewing manga list";
      break;
    case "/bookmark":
      presenceData.details = "Viewing my bookmark";
      break;
    default: {
      if (document.location.search.startsWith("?s")) {
        const params = document.location.search.substring(1),
          { s } = JSON.parse(
            '{"' +
              decodeURI(params)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"') +
              '"}'
          );
        presenceData.details = "Searching for:";
        presenceData.state = s;
        presenceData.smallImageKey = "search";
      }
      if (document.location.pathname.startsWith("/manga")) {
        presenceData.details = "Viewing Manga";
        presenceData.state = document.querySelector("div.seriestucon > div.seriestuheader > h1").textContent;
        presenceData.buttons = [
          { label: "View Manga", url: document.location.href }
        ];
      }
      const mirrorStream = document.querySelector(".chapterbody");
      if (mirrorStream) {
        const manga = document.querySelector("div.headpost > h1").textContent.replace(/Bahasa Indonesia/gi, "");
        const onchapter = document.querySelector("#chapter > option:nth-child(2)").textContent;
        presenceData.details = "Reading  " + manga;
        presenceData.state = "On " + onchapter;
        presenceData.buttons = [
          { label: "Read Manga", url: document.location.href },
        ];
      }
      break;
    }
  }
  presence.setActivity(presenceData);
});
