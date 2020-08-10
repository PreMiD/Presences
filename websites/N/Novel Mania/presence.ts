const presence = new Presence({
  clientId: "738522217221980222"
});

let time = Math.floor(Date.now() / 1000);
  
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "nm",
    startTimestamp: time
  },
    porcent: HTMLElement = document.querySelector(
      "#settings-section > div > ul > li:nth-child(1) > div > div"
    ),
    currentChapTitle: HTMLElement = document.querySelector(
      "body > div:nth-child(2) > main > section.landing.novel-single > div.novel-head.pt-3 > div > div > div:nth-child(2) > div > h1 > a.text-white.mr-2"
    ),
    novelName: HTMLElement = document.querySelector(
      "body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > span.d-flex.flex-row.align-items-center > h1"
    ),
    ChapNumber: HTMLElement = document.querySelector(
      "body > div:nth-child(2) > main > section.landing.novel-single > div.novel-head.pt-3 > div > div > div:nth-child(2) > div > h3"
    ),
    Fav = document.querySelector(
      "body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > div.w-100 > a.btn.btn-orange.mb-2"
    ),
    Notice: HTMLElement = document.querySelector(
      "body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-12.text-center > div > h1"
    ),
    PagTitle: HTMLElement = document.querySelector(
      "body > div > main > section.navbar-novel > div > div > div > div > h2"
    ),
    path = document.location.pathname;
    
    if (path == "/" || !path) {
      presenceData.details = "Na home."; /* Home */
      presenceData.state = "Olhando a linda página inicial"; /* Looking the beautiful homepage */
      presenceData.startTimestamp = time;
    } else if (path.indexOf("/noticias/") === 0) {
      presenceData.details = 
      "Lendo notícia:"; /* reading a very important notice */
      presenceData.state = 
      Notice.innerText;
    } else if (path.indexOf("/novels/") === 0) {
        if (document.body.contains(Fav)){
          presenceData.details = 
            "No indice da novel:"; /* At the novels's indice */
          presenceData.state = novelName.innerText;
          presenceData.startTimestamp = time;
        } else {
          presenceData.details = 
          "Lendo " + currentChapTitle.innerText; /* reading */
          presenceData.state = 
            "Em " + porcent.innerText + " do " +  ChapNumber.innerText; /*in... of...*/
          presenceData.startTimestamp = time;
        }
    } else if (
      path.includes("/editoria") ||
      path.includes("/salao-da-contribuicao") ||
      path.includes("/regras-setorias") ||
      path.includes("/politica-de-privacidade") ||
      path.includes("contato")
    ){
      presenceData.details = "Lendo página: ";
      presenceData.state = 
      PagTitle.innerText;
      presenceData.startTimestamp = time;
    } else {
      presenceData.details = 
        "Buscando uma Novel... "; /* searching for a novel */
      presenceData.startTimestamp = time;
    }
      presence.setActivity(presenceData);
});