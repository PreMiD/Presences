const presence = new Presence({
    clientId: "853327058054545438"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "anitube_logo_",
      startTimestamp: browsingStamp
    },
    searchContainer: HTMLDivElement =
      document.querySelector(".searchContainer"),
    search: HTMLInputElement = document.querySelector(
      ".searchContainer > form > input"
    ),
    searchQuery: string = search !== null ? search.value : null,
    { pathname } = document.location;

  if (searchContainer.style.display === "block")
    presenceData.details = `Searching for ${searchQuery}`;
  else {
    if (pathname === "/") presenceData.details = "Browsing Home Page";
    else if (pathname === "/busca.php") {
      const searchBox: HTMLDivElement = document.querySelector(
          ".mContainer_title_small_content"
        ),
        searchQuery: string = searchBox.innerText;
      presenceData.details = "Looking at search results for";
      presenceData.state = searchQuery.substring(17);
    } else if (
      pathname === "/anime" ||
      pathname === "/animes-dublado" ||
      pathname === "/doramas" ||
      pathname === "/tokusatsu" ||
      pathname === "/donghua"
    )
      presenceData.details = "Looking at all Animes";
    else if (
      pathname.startsWith("/anime/letra/") ||
      pathname.startsWith("/animes-dublado/letra/") ||
      pathname.startsWith("/doramas/letra/") ||
      pathname.startsWith("/tokusatsu/letra/") ||
      pathname.startsWith("/donghua/letra/")
    ) {
      const query: string = pathname.substring(
        pathname.length - pathname.split("").reverse().join("").indexOf("/")
      );
      if (query !== "todos") {
        presenceData.details = "Looking for Animes";
        presenceData.state = `starting with ${query}`;
      } else presenceData.details = "Looking at all Animes";
    } else if (
      pathname.startsWith("/anime/") ||
      pathname.startsWith("/animes-dublado/") ||
      pathname.startsWith("/doramas/") ||
      pathname.startsWith("/tokusatsu/") ||
      pathname.startsWith("/donghua/")
    ) {
      const titleElement: HTMLDivElement = document.querySelector(
          ".anime_container_titulo"
        ),
        title: string = titleElement.innerText;
      presenceData.details = "Checking synopsis";
      presenceData.state = title;
    } else if (pathname.startsWith("/video/")) {
      const titleElement: HTMLDivElement = document.querySelector(
          ".mContainer_title_small_content"
        ),
        title: string = titleElement.innerText,
        videoElement: HTMLVideoElement = document.querySelector("video"),
        paused: boolean = videoElement === null ? null : videoElement.paused;

      presenceData.details = `Watching ${title.substr(
        9,
        title.substr(9).indexOf("ep")
      )}`;
      presenceData.state = `Episode ${parseInt(
        title.substr(title.indexOf("ep") + 2)
      )}`;
      presenceData.buttons = [
        {
          label: "Watch Along",
          url: document.location.href
        }
      ];
      if (!paused && videoElement) {
        [, presenceData.endTimestamp] =
          presence.getTimestampsfromMedia(videoElement);
      }
    } else if (pathname === "/contato.php")
      presenceData.details = "At contact us page";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
