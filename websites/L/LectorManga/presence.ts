const presence = new Presence({
    clientId: "894307990876881026"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lm",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname === "lectormanga.com") {
    if (document.location.pathname === "/") presenceData.details = "Buscando algo para leer";
    else if (document.location.pathname.includes("/library/manga/")) {
      const [title] = document.querySelector(".text-dark").textContent.split("(");
      presenceData.details = "Viendo un manga:";
      presenceData.state = title;
    } else if (document.location.pathname.includes("/library/manhua/")) {
      const [title] = document.querySelector(".text-dark").textContent.split("(");
      presenceData.details = "Viendo un manhua:";
      presenceData.state = title;
    } else if (document.location.pathname.includes("/library/manhwa/")) {
      const [title] = document.querySelector(".text-dark").textContent.split("(");
      presenceData.details = "Viendo un manhwa:";
      presenceData.state = title;
    } else {
      switch (document.location.pathname) {
        case "/login":
          presenceData.details = "Iniciando sesión...";
          break;
        case "/contact":
          presenceData.details = "Viendo la página de contacto";
          break;
        case "/rules":
          presenceData.details = "Leyendo las normas";
          break;
        case "/collaborate":
          presenceData.details = "Como colaborar";
          break;
        case "/guide":
          presenceData.details = "Leyendo la guía";
          break;
        case "/about":
          presenceData.details = "Viendo Sobre TuMangaOnline";
          break;
        case "/faq":
          presenceData.details = "Leyendo las preguntas preguntas frecuentes";
          break;
        case "/library":
          presenceData.details = "Viendo la librería";
          break;
        case "/profile":
          presenceData.details = "Viendo su perfil";
          break;
      }
    }
  } else {
    if(document.querySelector("section > div > div > h1").textContent) {
      const cap = document.querySelector("section > div > div > h2").textContent.split(":")[0].split(" ");
      presenceData.details = `Reading ${document.querySelector("section > div > div > h1").textContent}:`;
      presenceData.state = `${cap[1]} ${cap[2]}`;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else
    presence.setActivity(presenceData);
  
});
