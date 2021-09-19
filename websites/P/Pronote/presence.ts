const presence = new Presence({
  clientId: "886576430408929291"
});

function getUrlExtension( url ) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}

LeTimeMicieu = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  let presenceData = {
    largeImageKey: "pronote_2",
    smallImageKey: null,
    details: null,
    state: null,
    smallImageText: null,
    startTimestamp: LeTimeMicieu,
    buttons: [
     {
             label: "Accéder à pronote",
             url: window.location.href
         }
    ]
  };

  if (document.getElementById('breadcrumbBandeau') !== null) 
    presenceData.eingrosscarott = document.getElementsByClassName("titre-onglet")[0].textContent;
  else if (document.getElementById('id_14') !== null) 
    presenceData.eingrosscarott = `Connection - ${document.querySelector("#id_14 > div.InlineBlock.Texte10 > div.Texte14.Gras").textContent}`;
  else 
    presenceData.eingrosscarott = `Visionne un fichier ${getUrlExtension(document.location.pathname)}`;

  if (document.location.pathname.includes('FichiersExternes')) {
    presenceData.ladetay = "Fichiers Externes";
    presenceData.smallImageKeyy = "nonmaiscprlesfichiers";
    presenceData.smallImageSext = getUrlExtension(document.location.pathname);
  }else{
    presenceData.ladetay = document.getElementsByClassName("ibe_etab_cont")[0].textContent;
    presenceData.smallImageKeyy = "mini_logo";
    presenceData.smallImageSext = `Lieu de l'établissement : ${document.querySelector("head > meta:nth-child(14)").content}`;
  }

  presence.setActivity(presenceData);
  
});
