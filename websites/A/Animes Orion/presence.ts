const presence = new Presence({
    clientId: "864775563218911232"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  },
    { pathname, search } = document.location,
    fav =
      document.querySelector<HTMLDivElement>(".favFixed").style.display ===
      "block";

  if (fav) presenceData.details = "Looking at favorites";
  else if (pathname === "/") {
    presenceData.details = search
      ? `Searching for ${search.substring(3)}`
      : "Browsing Homepage";
  } else if (pathname === "/animes-legendados/") {
    presenceData.details = "Looking for subs";
    if (search) presenceData.state = `Searching for ${search.substring(1).split("=").join(" ")}`;
  } else if (pathname === "/animes-dublados/") {
    presenceData.details = "Looking for dubs";
    if (search) presenceData.state = `Searching for ${search.substring(1).split("=").join(" ")}`;
  } else if (pathname === "/desenhos") {
    presenceData.details = "Looking for cartoons";
    if (search) presenceData.state = `Searching for ${search.substring(8)}`;
  } else if (pathname === "/calendario")
    presenceData.details = "Looking at schedule";
  else if (pathname.startsWith("/genero/")) {
    const title = document.querySelector<HTMLHeadingElement>(
      ".tituloPrincipal > h1"
    );
    if (title) presenceData.details = title.innerText;
  } else {
    const anime = !!document.querySelector(".tvl"),
      title = document.querySelector<HTMLHeadingElement>(
        ".tituloPrincipal > h1"
      );
    if (anime) {
      if (title) {
        const name = title.innerText.substring(
            9,
            title.innerText.indexOf("Episódio")
          ),
          episode = title.innerText.substring(
            title.innerText.indexOf("Episódio")
          );
        if (name) presenceData.details = `Watching ${name}`;
        if (episode) presenceData.state = episode;
      }
    } else {
      presenceData.details = "Checking Synopsis";
      if (title) presenceData.state = title.innerText;
      presenceData.buttons = [
        {
          label: "Check Synopsis",
          url: document.location.href
        }
      ];
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
