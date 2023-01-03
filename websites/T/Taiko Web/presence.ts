const presence = new Presence({
		clientId: "858246998561783828",
	}),
	slideshow = presence.createSlideshow(),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	difficulty: Record<number, string> = {
		2: "Easy",
		3: "Normal",
		4: "Hard",
		5: "Extreme",
	};

interface Song {
	category_id: number;
	id: number;
	title: string;

	title_lang: Record<string, string>;
	category: string;
}
/* eslint-enable camelcase */

let selectedSong: Song = null,
	lastId = -1,
	songs: Song[] = [],
	songIndex = -1,
	songIndexToSongId: Record<number, number> = {};

async function getSongIndex(multiplayer: boolean) {
	if (multiplayer) {
		try {
			presence
				.getPageletiable<number>(
					'p2"]["lastMessages"]["songsel"]["value"]["song'
				)
				.then(res => {
					songIndex = res;
				});
		} catch (e) {
			/* Pass */
		}
	} else songIndex = parseInt(localStorage.getItem("selectedSong"));
}

async function getSongs() {
	presence.getPageletiable<Song[]>('assets"]["songs').then(res => {
		if (res) {
			songs = res;
			songIndexToSongId = songs
				.sort((a, b) => {
					return (
						a.category_id * songs.length +
						a.id -
						(b.category_id * songs.length + b.id)
					);
				})
				.map(song => song.id);
		}
	});
}

async function getSong(id: number) {
	selectedSong = songs.find(s => s.id === id);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/YOBgufd.png",
			startTimestamp: browsingTimestamp,
		},
		canvas = document.querySelector<HTMLCanvasElement>("canvas"),
		initialLoading = document.querySelector<HTMLSpanElement>("span.percentage"),
		mulitplayer = !!(
			document.querySelector(".multiplayer") || document.location.hash
		);

	let slideShowSet = false;

	if (canvas) {
		if (songs.length === 0) await getSongs();
		presenceData.state = mulitplayer ? "MultiPlayer" : "Singleplayer";

		const songId =
			songIndex >= 0 && songIndex <= 200
				? <number>songIndexToSongId[songIndex]
				: -1;

		switch (canvas.id) {
			case "logo": {
				presenceData.details = "At Home Screen";

				break;
			}

			case "song-sel-canvas": {
				await getSongIndex(mulitplayer);

				if (songId !== -1 && songId !== lastId) {
					await getSong(songId);
					lastId = songId;
				}

				if (songId !== -1)
					presenceData.details = `Selecting Song ${selectedSong.title_lang.en}`;
				else {
					switch (songIndex) {
						case 201:
						case 207: {
							presenceData.details = "Back to homescreen";
							break;
						}
						case 202: {
							presenceData.details = "Random Song";
							break;
						}
						case 203: {
							presenceData.details = "How to Play";
							break;
						}
						case 204: {
							presenceData.details = "About Simulator";
							break;
						}
						case 205: {
							presenceData.details = "Game Settings";
							break;
						}
						case 206:
							{
								presenceData.details = "Custom Songs";
								// No default
							}
							break;
					}
				}

				break;
			}

			case "canvas": {
				if (songId !== -1 && songId !== lastId) {
					await getSong(songId);
					lastId = songId;
				}

				presenceData.details = `Playing ${selectedSong.title_lang.en}`;
				presenceData.smallImageKey = "taiko_logo";
				presenceData.smallImageText = selectedSong.title;

				slideshow.addSlide("slide1", presenceData, 3500);
				slideshow.addSlide(
					"slide2",
					<PresenceData>{
						largeImageKey: "https://i.imgur.com/YOBgufd.png",
						startTimestamp: browsingTimestamp,
						smallImageKey: "taiko_logo",
						smallImageText: selectedSong.title,
						details: `Category: ${selectedSong.category}`,
						state: `Difficulty: ${
							difficulty[parseInt(localStorage.getItem("selectedDiff"))]
						}`,
					},
					3500
				);

				slideShowSet = true;
				break;
			}
		}
	} else if (initialLoading) {
		presenceData.details = "At Loading screen";
		presenceData.state = `${initialLoading.textContent} Loaded`;
	} else if (document.querySelector<HTMLDivElement>("div#loading-don"))
		presenceData.details = "Game Loading ...";
	else if (document.querySelector<HTMLDivElement>("div.view"))
		presenceData.details = "Changing Game Settings";

	if (document.querySelector<HTMLDivElement>("div#session-invite")) {
		presenceData.details = "Waiting for other player to join ...";
		presenceData.buttons = [
			{
				label: "Join the game",
				url: document.location.href,
			},
		];
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(slideShowSet ? slideshow : presenceData);
});
