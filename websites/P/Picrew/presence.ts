const presence: Presence = new Presence({
  clientId: "886406987137576981",
  injectOnComplete: true
});

presence.on("UpdateData", () => {
  const { pathname } = window.location,
    data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: Math.round(new Date().getTime() / 1000)
    };

  let details: string, state: string;

  switch (pathname) {
    case "/":
      details = "on the homepage";
      break;
    case "/search":
      details = "searching";
      break;
    case "/discovery":
      details = "browsing the discovery page";
      break;
    default:
      if (pathname.includes("/image_maker/")) {
        const picrewId = pathname.match(/\/image_maker\/([0-9]{0,8})/)[1];
        const picrewTitle = `ID: ${picrewId} - ${document.title.substr(
          0,
          document.title.lastIndexOf("｜")
        )}`;

        if (pathname.includes("/complete")) {
          details = "viewing their creation";
          state = picrewTitle;
        } else {
          details = "creating a masterpiece";
          state = picrewTitle;
        }
      } else {
        details = "on Picrew";
      }
  }

  data.state = state;
  data.details = details;

  presence.setActivity(data);
});
