const presence = new Presence({
		clientId: "1081479845940314114",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	  const presenceData: PresenceData = {
			largeImageKey: "large",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = window.location;

    switch (true) {
      case pathname === "/search": {
        presenceData.smallImageKey = "searching";
        presenceData.smallImageText = "Searching...";
        if (search) {
          presenceData.details = "Searching for:";
          presenceData.state = document
            .querySelector<HTMLHeadElement>(
              "#__docusaurus > div.main-wrapper > div > h1"
            )
            .textContent.split("Search results for ")[1];
        } else presenceData.details = "Searching for something...";
        break;
      }

      default: {
        presenceData.details = "Reading a wiki page";
        presenceData.state = document.title.split("|")[0];
        presenceData.buttons = [
          {
            label: "Read Page",
            url: location.href,
          },
        ];

        break;
      }
    }

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
