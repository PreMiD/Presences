const presence = new Presence({
    clientId: "738522217221980222"
  }),
  time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "nm",
      startTimestamp: time
    },
    path = document.location.pathname,
    porcent: HTMLElement = document.querySelector(
      "#settings-section > div > ul > li:nth-child(1) > div > div"
    ),
    currentChapTitle: HTMLElement = document.querySelector(
      "body > div:nth-child(2) > main > section.landing.novel-single > div.novel-head.pt-3 > div > div > div:nth-child(2) > div > h1 > a"
    ),
    novelName: HTMLElement = document.querySelector("h1"),
    ChapNumber: HTMLElement = document.querySelector("#chapter-content > h2"),
    notice: HTMLElement = document.querySelector(
      "body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-12.text-center > div > h1"
    ),
    PagTitle: HTMLElement = document.querySelector(
      "body > div > main > section.navbar-novel > div > div > div > div > h2"
    ),
    favoritar: HTMLElement =
      document.querySelector(
        "body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > div.w-100 > a"
      ) ||
      document.querySelector(
        "body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > div.w-100 > a.btn.btn-dark.mb-2"
      ),
    trad_orig: HTMLElement =
      document.querySelector("#translate-tab.active") ||
      document.querySelector("#original-cap.active.show");
  if (path == "/" || !path) {
    if (document.body.contains(trad_orig)) {
      presenceData.details = "Na página inicial"; /* Home */
      presenceData.state =
        "Vendo as Novels " +
        trad_orig.innerText +
        " recentes"; /* Looking the beautiful homepage */
      presenceData.startTimestamp = time;
    } else {
      presenceData.details = "Na página inicial"; /* at home */
      presenceData.state =
        "Só olhando... Que estranho!"; /* Juist lookin, how strange! */
      presenceData.startTimestamp = time;
    }
  } else if (path.indexOf("/noticias/") === 0) {
    presenceData.details = "Lendo notícia:"; /* reading a notice */
    presenceData.state = notice.innerText;
  } else if (path.indexOf("/novels/") === 0) {
    if (document.body.contains(favoritar)) {
      presenceData.details = "No indice da novel:"; /* At the novels's indice */
      presenceData.state = novelName.innerText;
      presenceData.startTimestamp = time;
    } else {
      presenceData.details =
        "Lendo " + currentChapTitle.innerText; /* reading */
      presenceData.state =
        "Em " +
        porcent.innerText +
        " do " +
        ChapNumber.innerText; /*in... of...*/
      presenceData.startTimestamp = time;
    }
  } else if (path.indexOf("/u/") === 0) {
    const perf: HTMLElement = document.querySelector(
      "body > div > main > section.profile-top > div > div > div > div.col-sm-8.col-md-9.d-flex.align-items-center > div > ul > li.admin-name > h5"
    );
    presenceData.details = "Vendo o perfil de:"; /* Seeing the * user profile */
    presenceData.state = perf.innerText;
    presenceData.startTimestamp = time;
  } else if (
    path.includes("/editoria") ||
    path.includes("/salao-da-contribuicao") ||
    path.includes("/regras-setorias") ||
    path.includes("/politica-de-privacidade") ||
    path.includes("contato")
  ) {
    presenceData.details = "Lendo página: "; /* reading page */
    presenceData.state = PagTitle.innerText;
    presenceData.startTimestamp = time;
  } else if (
    path.indexOf("/genero/") ||
    path.indexOf("/chinesa") ||
    path.indexOf("/japonesa") ||
    path.indexOf("/coreana") ||
    path.indexOf("/brasileira") ||
    path.indexOf("/americana")
  ) {
    presenceData.details = "Procurando:"; /* searching for */
    presenceData.state = PagTitle.innerText;
    presenceData.startTimestamp = time;
  } else {
    presenceData.details =
      "Buscando... Obviamente algo incrível "; /* searching... obviously something incredible*/
    presenceData.startTimestamp = time;
  }
  presence.setActivity(presenceData);
});
