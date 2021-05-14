const presence = new Presence({
    clientId: "817856303719907389"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  path = document.location.pathname,
  pathSplit = path.split("/"),
  mangaName = pathSplit[2];

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (document.body.contains(document.querySelector(".titre"))) {
    const titre = (<HTMLElement>document.querySelector(".titre")).innerText;
    presenceData.details = "Visite la page du manga :";
    presenceData.state = titre;
  } else if (path.includes("/forum")) {
    presenceData.details = "Visite une page :";
    presenceData.state = "Page du Forum";
    if (path.includes("/forum/d")) {
      const groupName = document
          .querySelector(".TagLabel-text")
          .textContent.trim(),
        topicName = document.querySelector(".DiscussionHero-title").textContent;

      presenceData.details = "Lis un topic du forum :";
      presenceData.state = "[" + groupName + "] " + topicName;
      presenceData.smallImageKey = "reading";
    }
  } else if (path.includes("mangas/") + mangaName) {
    const chapter = (<HTMLElement>document.querySelector(".chapitre-main"))
        .textContent,
      page = (<HTMLElement>document.querySelector(".pageLinkAct")).textContent,
      fullMangaName = mangaName.split("-").join(" "),
      upperCaseWords = (title: string) => {
        const arr = title.split(" "),
          result = arr.map(function (value: string) {
            return value.replace(
              value.charAt(0),
              value.charAt(0).toUpperCase()
            );
          });
        return result.join(" ");
      },
      manga = upperCaseWords(fullMangaName);

    presenceData.details = "Entrain de lire " + manga + " :";
    presenceData.state = chapter + " | " + page;
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

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
