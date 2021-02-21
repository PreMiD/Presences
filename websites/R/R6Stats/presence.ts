const presence = new Presence({
  clientId: "812646634663837706"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (window.location.pathname.includes('/leaderboards')) {
    presenceData.details = "Leaderboards";
  } else if (window.location.pathname.includes('/compare')) {
    presenceData.details = "Comparing Players...";
  } else if (window.location.pathname.includes('/search')) {
    presenceData.details = "Searching Player:";
    presenceData.state = document.querySelector(
      "#__layout > div > div.layout-default__content > div.container__wrapper--content > div > main > div > div.page-search__wrapper > div > div > div.page-search__results__header--left > span.page-search__results__header--light"
    ).textContent.trim().slice(1, -1);
  } else if (window.location.pathname.includes('/stats')) {
    presenceData.details = "Viewing Player:";
    presenceData.state = document.querySelector(
      "#__layout > div > div.layout-default__content > div.container__wrapper--content > div > main > div > div.player-header > div.player-header__about > div.player-header__about__meta > div.player-header__about__meta--player > div > span.player-info__player__username"
    ).textContent.trim();
  } else if (window.location.pathname.includes('/account')) {
    presenceData.details = "Personal Account";
  } else if (window.location.pathname.includes('/privacy-policy')) {
    presenceData.details = "Privacy Policy";
  } else {
    presenceData.details = "Browsing...";
  }

  presence.setActivity(presenceData);
});
