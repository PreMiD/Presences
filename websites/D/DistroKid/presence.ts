const presence = new Presence({
  clientId: "1261851627003056139",
}),
pages: { [key: string]: [string, number] } = {
  "/mymusic/": ["Uploaded tracks", 0],
  "/account/": ["Account Details", 0],
  "/stats/": ["Daily Streaming Stats", 0],
  "/bank/": ["Bank Details", 0],
  "/new/": ["Uploading a new track", 1],
  "/dashboard/album/": ["Browsing a track", 2],
  "/dashboard/album/edit/": ["Editing a track", 2],
},
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
const pagePath = document.location.pathname;

if (pages[pagePath] || pages[pagePath.slice(0, -1)]) {
  const pageInfo = pages[pagePath] || pages[pagePath.slice(0, -1)];

  switch (pageInfo[1]) {
    case 0: {
      presence.setActivity({
        largeImageKey: "https://i.ibb.co/0fzwDXR/unnamed.png",
        details: "Browsing a page:",
        state: pageInfo[0],
        startTimestamp: browsingTimestamp,
      });
      break;
    }
    case 1: {
      presence.setActivity({
        largeImageKey: "https://i.ibb.co/0fzwDXR/unnamed.png",
        state: pageInfo[0],
        startTimestamp: browsingTimestamp,
      });
      break;
    }
    case 2: {
      const trackName =
        document.querySelector(".albumTitleBig > span:nth-child(1)")
          ?.textContent ||
        document.querySelector(".songTitlePreview")?.innerHTML ||
        "";
      presence.setActivity({
        largeImageKey: "https://i.ibb.co/0fzwDXR/unnamed.png",
        details: pageInfo[0],
        state: trackName,
        startTimestamp: browsingTimestamp,
      });
      break;
    }
  }
}
});
