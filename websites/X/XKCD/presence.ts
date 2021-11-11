const presence = new Presence({
    clientId: "754549450772316160"
  }),
  browsingTimestamp = Math.round(Date.now() / 1000);

presence.on("UpdateData", () => {
  let details: string,
    state: string,
    title: string,
    alt: string,
    comicNumber: string;

  if (
    !document.body.textContent.includes("404 Not Found\nnginx") &&
    !isNaN(Number(location.pathname.replace(/\//g, "")))
  ) {
    title = document.getElementById("ctitle").textContent;
    alt = document.querySelector("#comic > img").getAttribute("title");
    [comicNumber] = document
      .querySelector('[property="og:url"]')
      .getAttribute("content")
      .split("xkcd.com/")[1]
      .split("/");
    details = `Reading #${comicNumber}`;
    state = title;
  } else details = "Browsing XKCD";

  presence.setActivity({
    details,
    state,
    largeImageKey: "logo",
    smallImageKey: "help",
    smallImageText: alt,
    startTimestamp: browsingTimestamp
  });
});
