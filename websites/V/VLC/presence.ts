const presence = new Presence({
		clientId: "721748388143562852",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	}),
	media: MediaObj = {
		// anyone is welcome to suggest more metadata via GH issues
		time: null,
		length: null,
		state: "stopped",
		loop: null,
		repeat: null,
		filename: null,
		title: null,
		album: null,
		artist: null,
		trackNumber: null,
		showName: null,
		seasonNumber: null,
		episodeNumber: null,
	};
let isShow = false,
	isSong = false,
	prev: string,
	elapsed: number,
	i: number;

function setLoop(f: () => void, ms: number): number {
	f();
	return setInterval(f, ms);
}

function decodeReq(entity: Element): string {
	// decoding HTML entities the stackoverflow way
	const txt = document.createElement("textarea");
	txt.textContent = entity.textContent;
	return txt.textContent;
}

function getTag(collection: NodeListOf<Element>, tagName: string): Element {
	for (const tag of collection)
		if (tag.getAttribute("name") === tagName) return tag;
}

presence.on("UpdateData", async () => {
	if (
		document.querySelector(".footer") &&
		document.querySelector(".footer").textContent.includes("VLC")
	) {
		const presenceData: PresenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/V/VLC/assets/logo.png",
		};

		if (media.state !== prev) {
			prev = media.state;
			elapsed = Math.floor(Date.now() / 1000);
		}

		if (media.state === "playing" || media.state === "paused") {
			if (isSong) {
				if (media.title && media.album && media.title === media.album)
					media.album = null;

				presenceData.details =
					((media.title ?? "") +
						(media.trackNumber ? ` Track N°${media.trackNumber}` : "") ||
						"A song") + (media.album ? ` on ${media.album}` : "");
				media.artist
					? (presenceData.state = `by ${media.artist}`)
					: media.filename
					? (presenceData.state = media.filename)
					: delete presenceData.state;
			} else if (isShow) {
				media.showName
					? (presenceData.details = media.showName)
					: media.title
					? (presenceData.details = media.title)
					: media.filename
					? (presenceData.details = media.filename)
					: (presenceData.details = "some TV");
				presenceData.state = `S${media.seasonNumber}E${media.episodeNumber}`;
			} else {
				media.showName
					? (presenceData.details = media.showName)
					: media.title
					? (presenceData.details = media.title)
					: media.filename
					? (presenceData.details = media.filename)
					: (presenceData.details = "something");
				media.seasonNumber
					? (presenceData.state = `season ${media.seasonNumber}`)
					: media.episodeNumber
					? (presenceData.state = `episode ${media.episodeNumber}`)
					: delete presenceData.state;
			}

			if (presenceData.details && presenceData.details.length > 100)
				presenceData.details = presenceData.details.substring(0, 127);
			if (
				typeof presenceData.state === "string" &&
				presenceData.state.length > 100
			)
				presenceData.state = presenceData.state.substring(0, 127);

			presenceData.smallImageKey =
				media.state === "paused"
					? Assets.Pause
					: media.loop === "true" && media.repeat === "false"
					? Assets.Repeat
					: media.repeat === "true" && media.loop === "false"
					? Assets.RepeatOne
					: media.state === "playing"
					? Assets.Play
					: Assets.Pause;

			presenceData.smallImageText =
				media.state === "paused"
					? (await strings).pause
					: media.loop === "true" && media.repeat === "false"
					? "All on loop"
					: media.repeat === "true" && media.loop === "false"
					? "On loop"
					: media.state === "playing"
					? (await strings).play
					: (await strings).pause;

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Number(media.time), Number(media.length));

			if (media.state === "playing") presence.setActivity(presenceData, true);
			else {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
				presence.setActivity(presenceData, false);
			}
		} else if (media.state === "stopped") {
			presenceData.details = "standby";
			delete presenceData.state;
			delete presenceData.smallImageKey;
			delete presenceData.smallImageText;
			presenceData.startTimestamp = elapsed;
			delete presenceData.endTimestamp;

			presence.setActivity(presenceData, false);
		}
	}
});

const getStatus = setLoop(function () {
	if (
		document.querySelector(".footer") &&
		document.querySelector(".footer").textContent.includes("VLC")
	) {
		const req = new XMLHttpRequest();
		// jquery sucks!!!

		req.onload = function (): void {
			if (req.readyState === req.DONE) {
				if (req.status === 200) {
					if (i > 0) i = 0;

					req.responseXML.querySelectorAll("state")[0].textContent.length > 0
						? (media.state =
								req.responseXML.querySelectorAll("state")[0].textContent)
						: (media.state = "stopped");

					if (media.state !== "stopped") {
						media.time =
							req.responseXML.querySelectorAll("time")[0].textContent;
						media.length =
							req.responseXML.querySelectorAll("length")[0].textContent;
						media.loop =
							req.responseXML.querySelectorAll("loop")[0].textContent;
						media.repeat =
							req.responseXML.querySelectorAll("repeat")[0].textContent;
					} else {
						media.time = null;
						media.length = null;
						media.loop = null;
						media.repeat = null;
					}

					if (navigator.userAgent.toLowerCase().includes("firefox")) {
						const collection = req.responseXML.querySelectorAll("info");

						// basically the same thing but with a Firefox workaround because it's annoying

						getTag(collection, "filename")
							? (media.filename = decodeReq(getTag(collection, "filename")))
							: (media.filename = null);
						getTag(collection, "title")
							? (media.title = decodeReq(getTag(collection, "title")))
							: (media.title = null);
						getTag(collection, "showName")
							? (media.showName = decodeReq(getTag(collection, "showName")))
							: (media.showName = null);

						if (getTag(collection, "artist") || getTag(collection, "album")) {
							isSong = true;
							getTag(collection, "artist")
								? (media.artist = decodeReq(getTag(collection, "artist")))
								: (media.artist = null);
							getTag(collection, "album")
								? (media.album = decodeReq(getTag(collection, "album")))
								: (media.album = null);
						} else {
							isSong = false;
							media.artist = null;
							media.album = null;
						}

						getTag(collection, "trackNumber")
							? (media.trackNumber = decodeReq(
									getTag(collection, "trackNumber")
							  ))
							: (media.trackNumber = null);

						if (
							getTag(collection, "seasonNumber") &&
							getTag(collection, "episodeNumber")
						) {
							isShow = true;
							media.seasonNumber = decodeReq(
								getTag(collection, "seasonNumber")
							);
							media.episodeNumber = decodeReq(
								getTag(collection, "episodeNumber")
							);
						} else {
							isShow = false;
							media.seasonNumber = null;
							media.episodeNumber = null;
						}
					} else {
						req.responseXML.getElementsByName("filename")[0]
							? (media.filename = decodeReq(
									req.responseXML.getElementsByName("filename")[0]
							  ))
							: (media.filename = null);
						req.responseXML.getElementsByName("title")[0]
							? (media.title = decodeReq(
									req.responseXML.getElementsByName("title")[0]
							  ))
							: (media.title = null);
						req.responseXML.getElementsByName("showName")[0]
							? (media.showName = decodeReq(
									req.responseXML.getElementsByName("showName")[0]
							  ))
							: (media.showName = null);

						if (
							req.responseXML.getElementsByName("artist")[0] ||
							req.responseXML.getElementsByName("album")[0]
						) {
							isSong = true;
							req.responseXML.getElementsByName("artist")[0]
								? (media.artist = decodeReq(
										req.responseXML.getElementsByName("artist")[0]
								  ))
								: (media.artist = null);
							req.responseXML.getElementsByName("album")[0]
								? (media.album = decodeReq(
										req.responseXML.getElementsByName("album")[0]
								  ))
								: (media.album = null);
						} else {
							isSong = false;
							media.artist = null;
							media.album = null;
						}

						req.responseXML.getElementsByName("track_number")[0]
							? (media.trackNumber = decodeReq(
									req.responseXML.getElementsByName("track_number")[0]
							  ))
							: (media.trackNumber = null);

						if (
							req.responseXML.getElementsByName("seasonNumber")[0] &&
							req.responseXML.getElementsByName("episodeNumber")[0]
						) {
							isShow = true;
							media.seasonNumber = decodeReq(
								req.responseXML.getElementsByName("seasonNumber")[0]
							);
							media.episodeNumber = decodeReq(
								req.responseXML.getElementsByName("episodeNumber")[0]
							);
						} else {
							isShow = false;
							media.seasonNumber = null;
							media.episodeNumber = null;
						}
					}
					for (const key of Object.keys(media))
						media[key] = media[key]?.replace("&#39;", "'");
				} else {
					i++;
					if (i > 4) {
						i = 0;

						clearInterval(getStatus);
						media.state = "stopped";
						alert(
							`Something went wrong with the request, please contact other people at https://discord.premid.app with the following infos (RES: ${req.status} / S: ${req.readyState})`
						);
					}
				}
			}
		};

		req.onerror = function (): void {
			media.state = "stopped";
		};

		req.open(
			"GET",
			`${document.location.protocol}//${document.location.hostname}:${
				document.location.port ?? ""
			}/requests/status.xml`,
			true
		);
		req.send();
	}
}, (navigator.userAgent.toLowerCase().includes("firefox") ? 5 : 2) * 1000);

interface MediaObj {
	time?: string;
	length?: string;
	state?: string;
	loop?: string;
	repeat?: string;
	filename?: string;
	title?: string;
	album?: string;
	artist?: string;
	trackNumber?: string;
	showName?: string;
	seasonNumber?: string;
	episodeNumber?: string;
	[key: string]: string;
}
