const presence = new Presence({
  clientId: "886576430408929291"
});
function getUrlExtension( url ) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}
presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "pronote_2",
    startTimestamp: Math.floor(Date.now() / 1000),
    buttons: [
    {
        label: "Découvrir pronote",
        url: "https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php"
     }
    ]
  };
  if (document.getElementById("breadcrumbBandeau")) 
    presenceData.state = document.getElementsByClassName("titre-onglet")[0].textContent;
  else if (document.getElementById("id_14")) 
    presenceData.state = `Connection - ${document.querySelector("#id_14 > div.InlineBlock.Texte10 > div.Texte14.Gras").textContent}`;
  else 
    presenceData.state = `Visionne un fichier ${getUrlExtension(document.location.pathname)}`;
  if (document.location.pathname.includes("FichiersExternes")) {
    presenceData.details = "Fichiers Externes";
    presenceData.smallImageKey = "nonmaiscprlesfichiers";
    presenceData.smallImageText = getUrlExtension(document.location.pathname);
  }else{
    presenceData.details = document.getElementsByClassName("ibe_etab_cont")[0].textContent;
    presenceData.smallImageKey = "mini_logo";
    presenceData.smallImageText = `Lieu de l'établissement : ${document.querySelector("head > meta:nth-child(14)").content}`;
  }
  presence.setActivity(presenceData);
});
