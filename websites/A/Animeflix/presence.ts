const presence = new Presence({
		clientId: "1039178085922250873",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
    largeImageKey: "https://i.imgur.com/4hiyxuW.png"
  }, { pathname } = document.location;

  console.log(pathname)
  if (pathname === "/") presenceData.details = "Exploring Main Page";
  else if(pathname === "/genres") presenceData.details = "Exploring Genres";
  else if(pathname === "/series") presenceData.details = "Exploring Series";
  else if(pathname === "/movies") presenceData.details = "Exploring Movies";
  else if(pathname === "/mylist") presenceData.details = "Going through My List";
  else if(pathname.includes("/watch")) {
    const showName = <HTMLMetaElement>document.querySelector('meta[name="anime-skip.show.name"]');
    const episodeName = <HTMLMetaElement>document.querySelector('meta[name="anime-skip.episode.name"]');
    const epNum = <HTMLMetaElement>document.querySelector('meta[name="anime-skip.episode.number"]');
    presenceData.details = `Watching ${showName.content}`
    presenceData.state = episodeName.content.includes("Episode") ? episodeName.content : `${epNum.content}. ${episodeName.content}`
  }
  else presenceData.details = "Exploring Animeflix";
	presence.setActivity(presenceData);
});
