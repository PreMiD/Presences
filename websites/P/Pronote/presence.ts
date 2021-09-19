const presence = new Presence({
  clientId: "886576430408929291"
});
function get_url_extension( url ) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}
LeTimeMicieu = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  if (document.getElementById('breadcrumbBandeau') !== null) {
  eingrosscarott = document.getElementsByClassName("titre-onglet")[0].textContent;
  } else if (document.getElementById('id_14') !== null) {
    eingrosscarott = "Connection - " + document.querySelector("#id_14 > div.InlineBlock.Texte10 > div.Texte14.Gras").textContent;
  } else {
    eingrosscarott = "Visionne un fichier " + get_url_extension(document.location.pathname);
  }
  if (document.location.pathname.includes('FichiersExternes')) {
    ladetay = "Fichiers Externes";
    smallImageKeyy = "nonmaiscprlesfichiers";
    smallImageSext = get_url_extension(document.location.pathname);
  }else{
    ladetay = document.getElementsByClassName("ibe_etab_cont")[0].textContent;
    smallImageKeyy = "mini_logo";
    smallImageSext = "Lieu de l'établissement : " + document.querySelector("head > meta:nth-child(14)").content;
  }
  const presenceData = {
    largeImageKey: "pronote_2",
    smallImageKey: smallImageKeyy,
    details: ladetay,
    state: eingrosscarott,
    smallImageText: smallImageSext,
    startTimestamp: LeTimeMicieu,
    buttons: [
     {
             label: "Accéder à pronote",
             url: window.location.href
         }
    ]
  };
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
