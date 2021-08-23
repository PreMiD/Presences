const presence = new Presence({
    clientId: "814986239681626143"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
  
presence.on("UpdateData", async () => {
  const data: PresenceData = {
	largeImageKey: "logo"
},
   docTitle = document.title,
   url = new URL(window.location.href),
   params = new URLSearchParams(url.search);
  
  if (document.location.pathname == "/") {
	if (params.has("s") === true) {
      data.details = "Cherche un animé..";
	  data.state = params.get("s");
      data.startTimestamp = browsingStamp;
   } else{
	  data.details = "Page d'accueil";
	  data.startTimestamp = browsingStamp;
	}
  } else if (document.location.pathname.endsWith("/tous-les-animes-en-vf/")) {
    data.details = "Cherche un animé en VF..";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/films/")) {
    data.details = "Cherche un film..";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/tous-les-animes-en-vostfr-fullhd-2/")) {
    data.details = "Cherche un animé..";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/regarder-animes-oav-streaming/")) {
    data.details = "Cherche un OAV..";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/calendrier-de-sorties-des-nouveaux-episodes/")) {
    data.details = "Regarde le calendrier de sortie";
    data.startTimestamp = browsingStamp;
  } else {
	data.details = "Regarde un animé :";
	data.state = docTitle;
	data.startTimestamp = browsingStamp;
  }


  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(data);
  
});