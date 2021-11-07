const presence = new Presence({
    clientId: "906730773590208522"
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
      presenceData.details = "Viewing Home";
      break;
    default: {
      if (document.location.search.startsWith("search?q")) {
        const params = document.location.search.substring(1),
          { s } = JSON.parse(
            `{"${decodeURI(params)
              .replace(/=/g, '":"')}"}`
          );
        presenceData.details = "Searching for:";
        presenceData.state = s;
        presenceData.smallImageKey = "search";
      }
			if (document.location.search.startsWith("search/label/")) {
        const params = document.location.search.substring(1),
          { s } = JSON.parse(
            `{"${decodeURI(params)
              .replace(/&/g, '","')
              .replace(/=/g, '":"')}"}`
          );
        presenceData.details = "Searching for label:";
        presenceData.state = s;
        presenceData.smallImageKey = "search";
      }
			if (document.location.pathname.startsWith("/p")) {
				presenceData.details = "Viewing Page";
        presenceData.state = document
          .querySelector(".blog-post > h1")
        presenceData.buttons = [
          { label: "View Page", url: document.location.href }
        ];
			}
      if (document.location.pathname.startsWith("/20")) {
        presenceData.details = "Viewing Post";
        presenceData.state = document
          .querySelector(".blog-post > h1")
        presenceData.buttons = [
          { label: "View Post", url: document.location.href }
        ];
      }
      break;
    }
  }
  presence.setActivity(presenceData);
});
