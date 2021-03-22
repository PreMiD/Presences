const presence = new Presence({
  clientId: "821810069733376022"
});
presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };
  // Landing Site - kryptonia.fr
  if (window.location.hostname == "kryptonia.fr") {
    data.details = "Navigue sur le site";
    data.state = document
      .querySelector("head > title")
      .textContent.replace("- Kryptonia", "");
  }
  // Forum - forum.kryptonia.fr
  if (window.location.hostname == "forum.kryptonia.fr") {
    data.details = "Navigue sur le forum";
    if (window.location.pathname.startsWith("/threads/")) {
      data.state =
        "📝" +
        (document.querySelector(
          "#top > div.p-body-header > div > div > div.p-title > h1 > span.label-append"
        )
          ? ""
          : " ") +
        document
          .querySelector(
            "#top > div.p-body-header > div > div > div.p-title > h1"
          )
          .textContent.replace("Accepté(e)", "")
          .replace("Refusé(e)", "")
          .replace("Résolu(e)", "")
          .replace("Important", "");
    } else if (window.location.pathname.startsWith("/members/")) {
      if (
        document.querySelector(
          "#top > div.p-body > div > div > div > div > div > div > div > div > div > div.memberHeader-main > div > h1 > span > span"
        )
      ) {
        data.state =
          "👤 " +
          document.querySelector(
            "#top > div.p-body > div > div > div > div > div > div > div > div > div > div.memberHeader-main > div > h1 > span > span"
          ).textContent;
      } else {
        data.state = document
          .querySelector("head > title")
          .textContent.replace("| Kryptonia", "");
      }
    } else if (window.location.pathname.includes("/forums/")) {
      data.state =
        "📌 " +
        document
          .querySelector("head > title")
          .textContent.replace("| Kryptonia", "");
    } else {
      data.state = document
        .querySelector("head > title")
        .textContent.replace("Kryptonia", "")
        .replace("| ", "");
    }
  }
  presence.setActivity(data);
});
