const presence = new Presence({
    clientId: "853327058054545438"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "anitube_logo_",
      startTimestamp: browsingTimestamp
    },
    search: HTMLInputElement = document.querySelector(
      ".searchContainer > form > input"
    ),
    { pathname } = document.location;

  if (
    (document.querySelector(".searchContainer") as HTMLDivElement).style
      .display === "block"
  )
    presenceData.details = `Searching for ${search ? search.value : null}`;
  else if (pathname === "/") presenceData.details = "Browsing Home Page";
  else if (pathname === "/busca.php") {
    presenceData.details = "Looking at search results for";
    presenceData.state = (
      document.querySelector(
        ".mContainer_title_small_content"
      ) as HTMLDivElement
    ).textContent.substring(17);
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
    const title: string = (
      document.querySelector(".anime_container_titulo") as HTMLDivElement
    ).textContent;
    presenceData.details = "Checking synopsis";
    presenceData.state = title;
  } else if (pathname.startsWith("/video/")) {
    const title: string = (
        document.querySelector(
          ".mContainer_title_small_content"
        ) as HTMLDivElement
      ).textContent,
      videoElement: HTMLVideoElement = document.querySelector("video");

    presenceData.details = `Watching ${title.substring(
      9,
      title.substring(9).indexOf("ep")
    )}`;
    presenceData.state = `Episode ${parseInt(
      title.substring(title.indexOf("ep") + 2)
    )}`;
    presenceData.buttons = [
      {
        label: "Watch Along",
        url: document.location.href
      }
    ];
    if (!videoElement.paused) {
      [, presenceData.endTimestamp] =
        presence.getTimestampsfromMedia(videoElement);
    }
  } else if (pathname === "/contato.php")
    presenceData.details = "At contact us page";

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
