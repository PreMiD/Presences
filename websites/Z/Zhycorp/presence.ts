const presence = new Presence({
  clientId: "795629338401832990"
}),
presenceData: PresenceData = {
  largeImageKey: "zhycorp"
};

presence.on("UpdateData", async () => {
  presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  if (document.location.hostname.startsWith("bin")) {
    presenceData.largeImageKey = "hastebin";
    if (document.location.pathname.endsWith("/") && document.location.pathname.length > 1 ? document.location.pathname.slice(0, document.location.pathname.length - 1) : document.location.pathname === "/") {
      if (document.querySelector("textarea").value !== "") {
        presenceData.details = "Writing something..";
      } else presenceData.details = "Viewing zhycorp's hastebin";
    } else {
      presenceData.details = "Reading a hastebin";
      presenceData.smallImageKey = "reading";
    }
  } else {
    switch (document.location.pathname.endsWith("/") &&
        document.location.pathname.length > 1
        ? document.location.pathname.slice(0, document.location.pathname.length - 1)
        : document.location.pathname) {
        case "/":
          presenceData.details = "Viewing homepage";
          break;
        case "/member":
          presenceData.details = "Viewing supporter page";
          break;
        case "/staff":
          presenceData.details = "Viewing staff list page";
          break;
        default: {
          if (document.location.pathname.startsWith("/bots")) {
            presenceData.details = "Viewing bot list";
            presenceData.state = `Page ${document.querySelector(".white-text.text-center.mt-2").textContent.split("/").join("of")}`;
          } else if (document.location.pathname.startsWith("/bot")) {
            presenceData.details = "Viewing bot";
            presenceData.state = document.querySelector("title").textContent.substring("Zhycorp -".length).trim();
          }
          break;
        }
    }
  }
  presence.setActivity(presenceData);
});

function toTitleCase(string: string) {
  return string.split(" ").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
}