const presence = new Presence({
    clientId: "865564674326003712"
  }),
  timer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "gfm_logo",
      startTimestamp: timer
    },
    { pathname, href } = location,
    url = new URL(href),
    searchParams = url.searchParams.get("q"),
    [, , fundraiserURL] = pathname.split("/")

  if (pathname === "/") {
    data.details = "Viewing homepage";
  } else if (pathname.includes(`/s`)) {
    if (searchParams) {
      data.details = "Searching for a fundraiser:";
      data.state = searchParams;
    } else {
        data.details = "Going to start a GoFundMe"
    }
  } else if (pathname.includes(`/f/${fundraiserURL}`)) {
      const fundraiserName = document.querySelector("#root > div > main > div.p-campaign > header > h1")
    
      data.details = "Viewing at a fundraiser:"
      data.state = fundraiserName.textContent
      data.buttons = [
          {
              label: "Visit fundraiser",
              url: href
          }
      ]
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
