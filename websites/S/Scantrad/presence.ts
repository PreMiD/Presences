const presence = new Presence({
    clientId: "817856303719907389"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
  path = document.location.pathname,
  [, , mangaName] = path.split("/");

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp
  };

  if (document.body.contains(document.querySelector(".titre"))) {
    presenceData.state = (<HTMLElement>(
      document.querySelector(".titre")
    )).textContent;
    presenceData.details = "Visite la page du manga :";
  } else if (path.includes("/forum")) {
    presenceData.details = "Visite une page :";
    presenceData.state = "Page du Forum";
    if (path.includes("/forum/d")) {
      presenceData.details = "Lis un topic du forum :";
      presenceData.state = `[${document
        .querySelector(".TagLabel-text")
        .textContent.trim()}] ${
        document.querySelector(".DiscussionHero-title").textContent
      }`;
      presenceData.smallImageKey = "reading";
    }
  } else if (path.includes("mangas/") + mangaName) {
    const page = (<HTMLElement>document.querySelector(".pageLinkAct"))
        .textContent,
      
      manga = (title: string) => {
        const arr = title.split(" "),
          result = arr.map(function (value: string) {
            return value.replace(
              value.charAt(0),
              value.charAt(0).toUpperCase()
            );
          });
        return result.join(" ");
      }(mangaName.split("-").join(" "));

    presenceData.details = `Entrain de lire ${manga} :`;
    presenceData.state = `${
      (<HTMLElement>document.querySelector(".chapitre-main")).textContent
    } | ${page}`;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Lis un scan";
    presenceData.buttons = [
      {
        label: "Lire le chapitre",
        url: document.location.href
      }
    ];
  } else if (path.startsWith("/mangas")) {
    presenceData.details = "Visite une page :";
    presenceData.state = "Liste des mangas";
  } else if (
    path.includes("/connexion") ||
    document.location.pathname.includes("/inscription")
  ) {
    presenceData.details = "Visite une page :";
    presenceData.state = "Page de Login";
  } else if (path.includes("/planning")) {
    presenceData.details = "Visite une page :";
    presenceData.state = "Page du Planning";
  } else if (path.includes("/rejoindre")) {
    presenceData.details = "Visite une page :";
    presenceData.state = "Page Nous Rejoindre";
  } else {
    presenceData.details = "Visite une page :";
    presenceData.state = "Page d'accueil";
  }

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity(); 
});
