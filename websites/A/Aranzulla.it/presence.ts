const presence = new Presence({
    clientId: "670047125656043536"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "aranzulla"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname === "/") {
    if (document.location.href.match("/?s=")) {
      const search1 = document.querySelector("head > title").textContent;
      presenceData.details = "In ricerca";
      presenceData.state = `Ha cercato:${search1.replace(
        ": Risultati della ricerca | Salvatore Aranzulla",
        ""
      )}`;
    } else presenceData.details = "Nella Homepage";
  } else if (
    document.location.pathname.startsWith(
      "/informazioni-generali-su-salvatore-aranzulla"
    )
  ) {
    presenceData.details = "Guarda le Info su";
    presenceData.state = "Salvatore Aranzulla";
  } else if (
    document.location.pathname.startsWith("/libri-di-salvatore-aranzulla")
  ) {
    presenceData.details = "Guarda i libri scritti da";
    presenceData.state = "Salvatore Aranzulla";
  } else if (document.location.pathname.startsWith("/contatti")) {
    presenceData.details = "Vuole contattare";
    presenceData.state = "Salvatore Aranzulla";
  } else if (document.location.pathname.startsWith("/pubblicita")) {
    presenceData.details = "Vuole contattare";
    presenceData.state = "Salvatore Aranzulla";
  } else if (document.location.pathname.startsWith("/lavoro-aranzulla")) {
    presenceData.details = "Cerca lavoro presso";
    presenceData.state = "Aranzulla.it";
  } else if (document.location.pathname.startsWith("/computer")) {
    const computer = document.querySelector("head > title").textContent;
    presenceData.details = "Nelle guide sul Computer:";
    presenceData.state = computer.replace(" | Salvatore Aranzulla", "");
  } else if (document.location.pathname.startsWith("/telefonia")) {
    const telefonia = document.querySelector("head > title").textContent;
    presenceData.details = "Nelle guide sulla Telefonia:";
    presenceData.state = telefonia.replace(" | Salvatore Aranzulla", "");
  } else if (document.location.pathname.startsWith("/internet")) {
    const internet = document.querySelector("head > title").textContent;
    presenceData.details = "Nelle guide sull' Internet:";
    presenceData.state = internet.replace(" | Salvatore Aranzulla", "");
  } else if (document.location.pathname.startsWith("/page")) {
    const search2 = document.querySelector("head > title").textContent;
    presenceData.details = "In ricerca";
    presenceData.state = `Ha cercato:${
      search2.replace(" Risultati della ricerca (", "").split("pagina")[0]
    }`;
  } else {
    const guidename = document.querySelector("head > title").textContent;
    presenceData.details = "Guarda la guida:";
    presenceData.state = guidename.replace(" | Salvatore Aranzulla", "");
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
