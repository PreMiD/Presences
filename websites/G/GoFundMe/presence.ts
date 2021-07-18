const presence = new Presence({
    clientId: "865564674326003712"
  }),
  timer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "gofundme",
      startTimestamp: timer
    },
    { pathname, href } = location,
    url = new URL(href),
    searchParams = url.searchParams.get("q"),
    [, , fundraiserURL] = pathname.split("/");

  if (pathname === "/") 
    data.details = "Viewing homepage";
   else if (pathname.startsWith(`/s`)) {
      data.details = "Searching for a fundraiser:";
      data.state = searchParams;
  } else if (pathname.includes(`/f/${fundraiserURL}`)) {
    const fundraiserName = document.querySelector(
      "#root > div > main > div.p-campaign > header > h1"
    );

    data.details = "Viewing fundraiser:";
    data.state = fundraiserName.textContent;
    data.buttons = [
      {
        label: "Visit fundraiser",
        url: href
      }
    ];
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
