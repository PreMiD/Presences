const presence = new Presence({
    clientId: "857958312180187136"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {

  const stamp = Math.floor(Date.now() / 1000),

   presenceData: PresenceData = {
    largeImageKey:
      "adn_logo" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
     //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
  },

   {nodeValue} = document.getElementsByClassName('sc-qPkqk')[0].attributes[0];

  if (nodeValue) {
    presenceData.smallImageKey = nodeValue.replace('https://avatar.animedigitalnetwork.fr/web/ch', '').replace('_bg1_green0_188.jpg', '');
    presenceData.smallImageText = 'ADN';
  }

  if (document.getElementsByClassName('hFDmkT').length > 0) {
    presenceData.startTimestamp = stamp;
    presenceData.details = 'Recherche';
    presenceData.state = (<HTMLInputElement>document.querySelector("#nav-search")).value;
  } else if (document.getElementsByClassName('vjs-clickthrough').length > 0 || document.getElementsByClassName('adn-player-countdown').length > 0) {

    // Video

    presenceData.startTimestamp = stamp;

    let vfOrvostfr,
     quality;

    const title = document.getElementsByClassName('sc-qQwsb')[0].innerHTML,
     episode = document.getElementsByClassName('sc-qYRsW')[0].innerHTML;

    if (document.getElementsByClassName('vjs-menu-item vjs-selected').length > 0) {
      vfOrvostfr = ((<HTMLElement>document.getElementsByClassName('vjs-menu-item vjs-selected')[1]).innerText.replace(', selected', ''));
      quality = (<HTMLElement>document.getElementsByClassName('vjs-menu-item vjs-selected')[0].firstElementChild).innerText.replace('(', '').replace(')', '');
      presenceData.details = `${title} : ${vfOrvostfr} - ${quality}`;
      presenceData.state = episode;
    } else {
      presenceData.state = `Cette vidéo sera disponible dans : ${(<HTMLElement>document.getElementsByClassName('adn-player-countdown-value')[0]).innerText}`;
      presenceData.details = title;
    }
  } else if (document.getElementsByClassName("sc-AxjAm khAjwj").length > 0) {

    // Page de video
    
    presenceData.startTimestamp = stamp;
    const title = document.getElementsByClassName('sc-pYA-dN sc-kNYnxC giwmIo')[0].innerHTML,
     episodes = (<HTMLElement>document.getElementsByClassName('sc-pTGsb iQjwMY')[0]).innerText.replace('vidéos', 'épisodes');
    presenceData.details = title;
    presenceData.state = episodes;
  } else if (document.location.pathname.includes("/")) {
    presenceData.startTimestamp = stamp;
    presenceData.details = 'Page d\'accueil';
  } else if (document.location.pathname.includes("/video")) {
    presenceData.details = 'Le catalogue';
    presenceData.startTimestamp = stamp;
  } else if (document.location.pathname.includes("/nouveaute")) {
    presenceData.details = 'Les nouveautées';
    presenceData.startTimestamp = stamp;
  } else if (document.location.pathname.includes("/mon-espace")) {
    // Ajouer les selections
    const category = (<HTMLElement>document.getElementsByClassName('gnMpFx')[0]).innerText;
    presenceData.details = 'Mon Compte :';
    presenceData.state = category;
    presenceData.startTimestamp = stamp;
  } else if (document.location.pathname.includes("/qui-est-ce")) {
    presenceData.details = 'Choix de profil';
    presenceData.startTimestamp = stamp;
  } else if (document.location.pathname.includes("/twitch")) {
    presenceData.details = 'En direct';
    presenceData.startTimestamp = stamp;
  }
  if (presenceData.details == null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});
