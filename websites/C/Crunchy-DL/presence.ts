const presence = new Presence({
  clientId: "811867948721504268"
});

function handlePresenceData(presenceData: PresenceData) {
  const viewingRoutes = ["/", "/perfil", "/categoria"];
  const path = location.pathname;

  const capitalize = (str: String) => {
    // joke below. ignore it

    return str.split(" ").map((e) => {
      return e.split("").map((ee, ii) => {
          return ii == 0 ? ee.toUpperCase() : ee.toLowerCase();
      }).join("");
    }).join(" ");

  }

  if(viewingRoutes.includes("/" + path.split("/")[1])) {
    presenceData.details = "Visualizando:";
  }

  if(path == "/") {

    presenceData.state = "Página Inicial";

  } else if(path.includes("/categoria")) {
    
    const category = capitalize(document.querySelector(".category > h1").textContent);
    presenceData.state = category;

  } else if(path.includes("/perfil")) {

    if(path == "/perfil/") {
      presenceData.state = "Meu Perfil";
    } else {
      presenceData.state = "Perfil - " + document.querySelector(".profile-username").textContent;
    }

  } else if(path.includes("/anime") && !path.includes("/colecao")) {

    presenceData.details = "Visualizando Anime:";
    presenceData.state = document.querySelector(".anime-name").textContent;

  } else if(path.includes("/episodio")) {
    
    try {
      const getTime = (str: String) => {
        const parts = str.split(":").map(e => parseInt(e));
        return parts[0] * 60 + parts[1];
      }
      
      const timeElapsed = document.querySelector(".jw-text-elapsed").textContent;
      const timeDuration = document.querySelector(".jw-text-duration").textContent;
      const videoInfo = document.querySelector(".video-name") as HTMLElement;
      const videoName = (videoInfo.innerText.split(" -")[0]).toUpperCase();
      const collectionNumber = path.split("/").slice(-4, -3)[0].padStart(2, "0");
      const episodeNumber = path.split("/").slice(-2, -1)[0].padStart(2, "0");
      const mountedEpi = `COL ${collectionNumber} - EPI ${episodeNumber}`;

      presenceData.endTimestamp = new Date().getTime() + (getTime(timeDuration) - getTime(timeElapsed)) * 1000;
      
      presenceData.details = videoName;
      presenceData.state = mountedEpi;
    } catch(e) {
      void(0);
    }
    
  } else if(path.includes("/sala")) {

    presenceData.details = "Em uma sala";
    presenceData.state = "Assistindo com amigo";

  }

  presence.setActivity(presenceData);
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "large",
    smallImageKey: "funi",
    smallImageText: "CR-DL",
    details: ".",
    state: ".",
   };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    handlePresenceData(presenceData);
  }
});
