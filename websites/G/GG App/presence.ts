const presence = new Presence({
    clientId: "928868301105426463"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lg",
      startTimestamp: browsingTimestamp
    },
    path = document.location.pathname,
    [timestamps, cover, buttons] = await Promise.all([
      presence.getSetting<boolean>("timestamps"),
      presence.getSetting<boolean>("cover"),
      presence.getSetting<boolean>("buttons")
    ]);
  // Apparently "/games" is a user page so .pathname can't be used to detect a game but instead the header
  if (
    document.querySelector<HTMLHeadingElement>(
      "#root > div > div.css-1dbjc4n > div > div.w-full.xl\\:max-w-max.mx-auto.-mt-64.sm\\:-mt-48.px-4 > div.flex.flex-col.md\\:flex-row.pt-8 > div.w-full.md\\:w-3\\/4.md\\:pl-4.lg\\:pl-8 > div:nth-child(1) > h1"
    ) &&
    path.startsWith("/games")
  ) {
    presenceData.details = "Viewing Game:";
    presenceData.state = document.querySelector<HTMLHeadingElement>(
      "#root > div > div.css-1dbjc4n > div > div.w-full.xl\\:max-w-max.mx-auto.-mt-64.sm\\:-mt-48.px-4 > div.flex.flex-col.md\\:flex-row.pt-8 > div.w-full.md\\:w-3\\/4.md\\:pl-4.lg\\:pl-8 > div:nth-child(1) > h1"
    ).textContent;
    if (cover) {
      presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
        "#root > div > div.css-1dbjc4n > div > div.w-full.xl\\:max-w-max.mx-auto.-mt-64.sm\\:-mt-48.px-4 > div.flex.flex-col.md\\:flex-row.pt-8 > div.css-1dbjc4n > img"
      ).src;
      presenceData.smallImageKey = "lg";
    }
    presenceData.buttons = [{ label: "View Game", url: document.URL }];
  } else if (
    document.querySelector<HTMLHeadingElement>(
      "#root > div > div.css-1dbjc4n > div > div:nth-child(3) > div.w-full > div > div.flex.flex-col.md\\:mx-4.xl\\:mx-8.self-center.md\\:self-start > div:nth-child(2) > h2"
    ) ||
    document.querySelector<HTMLAnchorElement>(
      "#root > div > div.css-1dbjc4n > div > div.w-full.xl\\:max-w-max.mx-auto.pt-8 > div > div.flex.flex-column.p-3 > div > div.flex.flex-column.md\\:flex-row.items-start.md\\:items-center > p.text-white.md\\:mt-2 > a"
    )
  ) {
    const username = document.querySelector<HTMLAnchorElement>(
        "#root > div > div.css-1dbjc4n > div > div.w-full.xl\\:max-w-max.mx-auto.pt-8 > div > div.flex.flex-column.p-3 > div > div.flex.flex-column.md\\:flex-row.items-start.md\\:items-center > p.text-white.md\\:mt-2 > a"
      ),
      listname = document.querySelector<HTMLSpanElement>(
        "#root > div > div.css-1dbjc4n > div > div.w-full.xl\\:max-w-max.mx-auto.pt-8 > div > div.flex.flex-column.p-3 > div > div.flex.flex-column.md\\:flex-row.items-start.md\\:items-center > p:nth-child(1) > span"
      ),
      profilePicture = document.querySelector<HTMLImageElement>(
        "#root > div > div.css-1dbjc4n > div > div:nth-child(3) > div.w-full > div > div.self-center.md\\:self-start.flex-shrink-0.mb-4.md\\:mb-0 > a > img"
      );
    if (username)
      presenceData.details = `Viewing ${username.textContent}'s profile`;
    else presenceData.details = `Viewing ${document.title.split(/-(.+)/)[1]}`;
    presenceData.buttons = [{ label: "View Profile", url: document.URL }];
    if (listname) {
      presenceData.state = listname.textContent;
      presenceData.buttons = [{ label: "View List", url: document.URL }];
    }
    if (cover) {
      if (profilePicture) {
        presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
          "#root > div > div.css-1dbjc4n > div > div:nth-child(3) > div.w-full > div > div.self-center.md\\:self-start.flex-shrink-0.mb-4.md\\:mb-0 > a > img"
        ).src;
        presenceData.smallImageKey = "lg";
      }
    }
  } else if (path.includes("/games/")) {
    if (path.endsWith("/reviews")) {
      presenceData.details = "Reading reviews of:";
      presenceData.state = document
        .querySelector<HTMLDivElement>(
          "#root > div > div.css-1dbjc4n > div > div.flex-1.w-full.xl\\:max-w-max.mx-auto.px-4.xl\\:px-0.pt-8.md\\:pt-16.-mt-40.sm\\:-mt-40 > div > div.css-1dbjc4n > div.css-901oao"
        )
        .textContent.slice(11);
    } else if (path.includes("edit")) {
      presenceData.details = "Editing game:";
      presenceData.state = document.querySelector<HTMLAnchorElement>(
        "#root > div > div.css-1dbjc4n > div > div.flex.flex-col.w-full.xl\\:max-w-max.mx-auto.mt-8.px-4.sm\\:px-0 > h1 > a"
      ).textContent;
      presenceData.smallImageKey = "write";
    } else if (path.endsWith("/lists")) {
      presenceData.details = "Browsing lists containing:";
      presenceData.state = document
        .querySelector<HTMLHeadingElement>(
          "#root > div > div.css-1dbjc4n > div > div.flex-1.w-full.xl\\:max-w-max.mb-16.mx-auto.px-4.xl\\:px-0.pt-8.md\\:pt-16.-mt-40.sm\\:-mt-40 > div > h1"
        )
        .textContent.slice(17);
    }
  } else if (path.includes("/reviews/")) {
    presenceData.details = `Reading ${
      document.querySelector<HTMLHeadingElement>(
        "#root > div > div.css-1dbjc4n > div > div.flex.flex-col.flex-1.w-full.z-10.px-2.sm\\:px-4 > div > div.flex.flex-row.pt-2.relative > div.flex-1.lg\\:w-4\\/5 > div:nth-child(1) > div.hidden.sm\\:flex.flex-row.justify-between.mb-2.md\\:mb-4 > a > h2"
      ).textContent
    }'s review`;
    presenceData.state = `of ${
      document.querySelector(
        "#root > div > div.css-1dbjc4n > div > div.flex.flex-col.flex-1.w-full.z-10.px-2.sm\\:px-4 > div > div.flex.flex-row.pt-2.relative > div.flex-1.lg\\:w-4\\/5 > div:nth-child(1) > a > h1"
      ).textContent
    }`;
    if (cover) {
      presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
        "#root > div > div.css-1dbjc4n > div > div.flex.flex-col.flex-1.w-full.z-10.px-2.sm\\:px-4 > div > div.flex.sm\\:hidden.flex-row.justify-between.mb-2.md\\:mb-4 > a > img"
      ).src;
      presenceData.smallImageKey = "lg";
    }
    presenceData.buttons = [{ label: "Read Review", url: document.URL }];
  } else if (path.startsWith("/home")) presenceData.details = "At Home page";
  else if (path.startsWith("/search/")) {
    presenceData.details = "Searching for:";
    presenceData.state = document.querySelector<HTMLSpanElement>(
      "#root > div > div.css-1dbjc4n > div > div.w-full.xl\\:max-w-max.mx-auto > div > div:nth-child(1) > p > span.text-2xl.font-bold.pl-2"
    ).textContent;
    presenceData.smallImageKey = "search";
  } else if (path.endsWith("/lists")) {
    presenceData.details = `Viewing ${document.title.match(/(.*) -/)[1]}`;
    if (cover) {
      presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
        "#root > div > div.css-1dbjc4n > div > div.flex-1.w-full.xl\\:max-w-max.mx-auto.px-2.sm\\:px-4.-mt-sm.md\\:-mt-48.pt-24.md\\:pt-8 > div.w-full > div > div.self-center.md\\:self-start.flex-shrink-0.mb-4.md\\:mb-0 > a > img"
      ).src;
      presenceData.smallImageKey = "lg";
    }
    presenceData.buttons = [{ label: "View Lists", url: document.URL }];
  } else if (path.includes("/lists/")) {
    presenceData.details = "Viewing List:";
    presenceData.state = document.querySelector<HTMLHeadingElement>(
      "#root > div > div.css-1dbjc4n > div > div.flex.flex-col.flex-1.w-full.z-10.px-2.sm\\:px-4 > div > div:nth-child(1) > div.flex.flex-col.flex-grow > div.flex.flex-col > h1"
    ).textContent;
    presenceData.buttons = [{ label: "View List", url: document.URL }];
  }
  if (!buttons) delete presenceData.buttons;
  if (!timestamps) delete presenceData.startTimestamp;
  presence.setActivity(presenceData);
});
