const presence = new Presence({
    clientId: "901608545743683674"
  }),
  strings = presence.getStrings({
    homepage: "general.viewHome",
    reading: "general.reading",
    searchSomething: "general.searchSomething",
    searchFor: "general.searchFor",
    genre: "general.viewGenre"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    details: (await strings).searchFor
  };

  if (document.location.pathname === "/" || !document.location.pathname)
    data.details = (await strings).searchSomething;
  else if (document.location.pathname.includes("/search")) {
    data.state = `"${
      document.querySelector(".block_area-header i").textContent
    }"`;
  } else if (document.location.pathname.includes("/home"))
    data.details = (await strings).homepage;
  else if (document.location.pathname.includes("/genre")) {
    data.details = (await strings).genre;
    data.state = `📔 ${
      document.querySelector(".block_area-header").textContent
    }`;
  } else if (document.location.pathname.includes("/new-release"))
    data.state = "✌️ New releases";
  else if (document.location.pathname.includes("/completed"))
    data.state = "✅ Completed Manga";
  else if (document.location.pathname.includes("/most-viewed"))
    data.state = "🔥 Most Viewed";
  else if (document.location.pathname.includes("/latest-updated"))
    data.state = "⚡ Latest Updated";
  else if (document.location.pathname.includes("/az-list"))
    data.state = "🔠 A-Z List";
  else if (document.location.pathname.includes("/type")) {
    data.state = `📖 ${
      document.querySelector(".block_area-header").textContent
    }s`;
  } else if (document.location.pathname.includes("/character")) {
    data.details = "Viewing Character:";
    data.state = document.querySelector(".name").textContent;
  } else if (document.location.pathname.includes("/author")) {
    data.details = "Viewing Author:";
    data.state = document.querySelector(".name").textContent;
  } else {
    data.details = document.querySelector(".manga-name").textContent;
    data.buttons = [
      {
        label: "Read Manga",
        url: document.location.href
      }
    ];

    if (document.location.pathname.includes("/read")) {
      data.details = `${(await strings).reading} ${data.details}`;
      data.state = `${document
        .querySelector("#current-chapter")
        .textContent.replace(" ", " #️")} | ${document
        .querySelector("#c-selected-lang, #v-selected-lang")
        .textContent.replace("Language: ", "")}`;
      data.startTimestamp = browsingStamp;
    }
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
