const presence = new Presence({
		clientId: "1212664221788274698",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/OzDunh4.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp
	},
	{ pathname } = document.location,
	path = pathname.split("/");
	path.shift(); 
	if (pathname.endsWith("/")) path.pop();

	getDetails(presenceData, path);

	presence.setActivity(presenceData);
});

function getDetails(presenceData: PresenceData, path: string[]): void {
	// console.log(path);
	// console.log(path.length);
	if(path.length === 0) {
		presenceData.details = "Viewing home page";
		return;
	}

	switch(path[0].toLowerCase()) {
		case "library":
			if(path.length === 1)
				presenceData.details = "Viewing library page";
			else
				presenceData.details = getLibraryCategory(path[1].toLowerCase());
			break;
		case "explore":
			if(path.length === 1)
				presenceData.details = "Viewing explore page";
			else
				presenceData.details = getExploreCategory(path[1].toLowerCase());
			break;
		case "classes":
			presenceData.details = "Viewing classes page";
			break;
		case "settings":
			presenceData.details = "Viewing account settings";
			break;
		case "faq":
			presenceData.details = "Viewing Frequently Asked Questions";
			break;
		case "terms":
			presenceData.details = "Viewing Terms of Service";
			break;
		case "privacy":
			presenceData.details = "Viewing Privacy Policy";
			break;
		case "beta":
			presenceData.details = "Viewing beta apps page";
			break;
		case "videos":
			getVideoDetails(presenceData);
			break;
		default: //todo make it work for podcasts and classes
			getOtherDetails(presenceData);
			break;
	}
}

function getExploreCategory(category: string): string {
	switch(category) {
		case "videos":
			return "Exploring videos";
		case "channels":
			return "Exploring channels";
		case "podcasts":
			return "Exploring podcasts";
		case "episodes":
			return "Exploring episodes";
	}
}

function getLibraryCategory(category: string): string {
	switch(category) {
		case "latest-videos":
			return "Viewing latest videos";
		case "followed-channels":
			return "Viewing followed channels";
		case "watch-later":
			return "Viewing Watch Later";
		case "watch-history":
			return "Viewing watch history";
		case "latest-episodes":
			return "Viewing latest episodes";
		case "followed-shows":
			return "Viewing followed shows";
		case "saved-episodes":
			return "Viewing saved episodes";
		case "listen-history":
			return "Viewing listening history";
		case "classes-in-progress":
			return "Viewing classes in progress";
		case "saved-classes":
			return "Viewing saved classes";
		case "lesson-history":
			return "Viewing lesson history";
	}
}

function getVideoDetails(presenceData: PresenceData): void {
	const videoElement = document.querySelector("video");

	presenceData.details = document.querySelector(".css-11wyb0j").innerHTML;
	presenceData.state = document.querySelector(".css-r06ha9").innerHTML;

	if(videoElement === null) return;
	setTimestamps(videoElement, presenceData);
}

function getOtherDetails(presenceData: PresenceData): void {
	const videoElement = document.querySelector("video"),
	audioElement = document.querySelector("audio");

	if(videoElement === null && audioElement === null) { // viewing a channel?
		const channelName = document.querySelector(".css-dv828b"),
		podcastName = document.querySelector(".css-xdl2kn");

		if(channelName === null && podcastName === null)
			return;
	
		if(channelName === null) {
			presenceData.details = "Viewing a podcast";
			presenceData.state = podcastName.innerHTML;
		} else {
			presenceData.details = "Viewing a channel";
			presenceData.state = channelName.innerHTML;
		}
	} else if(videoElement === null) { //its a podcast
		presenceData.details = document.querySelector(".css-l7qxoj").innerHTML;
		presenceData.state = document.querySelector(".css-2m8aus").innerHTML;
		setTimestamps(audioElement, presenceData);
	} else { //its an episode
		const episodeName = document.querySelector(".css-13igzay"),
		className = document.querySelector(".css-1ls4t7r");

		if(episodeName !== null) 
			presenceData.details = `${episodeName.innerHTML} | ${className.innerHTML}`;
		else
			presenceData.details = className.innerHTML;

		presenceData.state = document.querySelector(".css-p7br9k").innerHTML;
		setTimestamps(videoElement, presenceData);
	}

}

function setTimestamps(element: HTMLAudioElement | HTMLVideoElement, presenceData: PresenceData): void {
	delete presenceData.startTimestamp;
	presenceData.endTimestamp = presence.getTimestampsfromMedia(element)[1];
	if (element.paused) {
		delete presenceData.endTimestamp;
		presenceData.smallImageKey = Assets.Pause;
	} else 
		presenceData.smallImageKey = Assets.Play;
	
}