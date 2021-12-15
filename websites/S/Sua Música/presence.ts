const presence = new Presence({
  clientId: "692230804402864148"
});

/**
 * Check if the element exists on the web page
 *
 */
function elementExist(element: Element): boolean {
  if (typeof element !== "undefined" && element !== null) return true;
  else return false;
}

/**
 * Transforms the first letter of the string to uppercase.
 */
function firstLetterUp(str: string): string {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

/**
 * get the name of the track playing
 */
function getTrackPlaying(): string {
  const element = document.querySelector("#trackInfo > a");
  if (elementExist(element) && element.innerHTML.length > 0)
    return `🎧  ${firstLetterUp(element.innerHTML)}`;
  else return "📀 Navegando...";
}

/**
 * get the name of the artist playing
 */
function getArtistPlaying(): string {
  const element = document.querySelector("#trackInfo > span > a");
  if (elementExist(element) && element.innerHTML !== " - ")
    return `🎤  ${firstLetterUp(element.innerHTML)}`;
  else return "🇧🇷 suamusica.com.br";
}

/**
 * @returns {string} play if music is playing, pause if music stop
 */
function actionPlay(): string {
  const element = document.querySelector("a.btnPlayer.playPause.pause");
  if (elementExist(element)) return "play";
  else return "pause";
}

presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "mini_logo",
    smallImageKey: actionPlay(),
    smallImageText: "suamusica.com.br",
    details: getTrackPlaying(),
    state: getArtistPlaying(),
    startTimestamp: 0,
    endTimestamp: 0
  };

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
