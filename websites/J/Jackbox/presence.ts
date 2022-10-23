const presence = new Presence({
	clientId: "638118757453004820",
});

interface Game {
	name: string;
	logo: string;
}

interface GamePlayerState {
	playerName?: string;
	username?: string;
	playerInfo?: {
		username?: string;
	};
	state?: string;
	status?: string;
	kind?: string;
	category?: string;
	prompt?: {
		text?: string;
		html?: string;
	};
	entryId?: string;
	choiceId?: string;
	responseKey?: string;
	placeholder?: string;
	choiceType?: string;
	classes?: string[];
	[x: string]: unknown;
}

interface GameInfoState {
	name?: string;
}

interface GameCallbackParams {
	playerState: GamePlayerState;
	infoState: GameInfoState;
	tag: string;
}

let gamePlayerState: GamePlayerState = {
		playerName: null,
		state: null,
		username: null,
	},
	gamePlayerInfoState: GameInfoState = {
		name: null,
	},
	game: Game,
	browsingTimestamp = Math.round(Date.now() / 1000),
	gametag: string;

if (window.location.hostname === "jackbox.tv") {
	setInterval(async () => {
		const playerStateLogs = await presence.getLogs(
			/recv <- .*?("key": "(bc:customer|player|info):[a-z0-9-]+",)/s
		);
		if (playerStateLogs.length > 0) {
			let updatedMainState = false,
				updatedInfoState = false;
			for (
				let i = playerStateLogs.length - 1;
				!(updatedInfoState && updatedMainState) &&
				i >= playerStateLogs.length - 6 &&
				i >= 0;
				i--
			) {
				const latestLog = playerStateLogs[i];
				if (/recv <- .*?"entities": {\n/s.test(latestLog)) {
					if (!updatedMainState) {
						gamePlayerState = JSON.parse(latestLog.slice(8)).result.entities[
							latestLog.match(
								/"key": "((?:bc:customer|player):(?:[a-z0-9-]+))",/s
							)[1]
						][1].val;
					}
					if (!updatedInfoState) {
						gamePlayerInfoState =
							JSON.parse(latestLog.slice(8)).result.entities[
								latestLog.match(/"key": "(info:\d+)",/s)?.[1]
							]?.[1].val ?? {};
					}
					updatedInfoState = true;
					updatedMainState = true;
				} else if (
					/recv <- .*?"key": "((?:bc:customer|player):(?:[a-z0-9-]+))",/s.test(
						latestLog
					)
				) {
					if (!updatedMainState) {
						gamePlayerState = JSON.parse(latestLog.slice(8)).result.val;
						updatedMainState = true;
					}
				} else if (
					/recv <- .*?"key": "info:\d+",/s.test(latestLog) &&
					!updatedInfoState
				) {
					gamePlayerInfoState = JSON.parse(latestLog.slice(8)).result.val;
					updatedInfoState = true;
				}
			}
		}
		if (!game) {
			type JackboxStorageLetiable = {
				tag: string;
			};
			const { tag } = await presence.getPageletiable<JackboxStorageLetiable>(
				'tv"]["storage'
			);
			gametag = tag;
			if (tag && tag !== "@connect") {
				game = Games[tag];
				browsingTimestamp = Math.round(Date.now() / 1000);
				if (!game) game = Games.unknown;
			}
		}
	}, 2000);
}

const Games: Record<string, Game> = {
	// Party Pack 9
	fourbage: {
		name: "Fibbage 4",
		logo: "https://i.imgur.com/DnqcuUX.png",
	},
	lineup: {
		name: "Quixort",
		logo: "https://i.imgur.com/zqzsySL.png",
	},
	"range-game": {
		name: "Nonsensory",
		logo: "https://i.imgur.com/JH3JgaM.png",
	},
	"antique-freak": {
		name: "Junktopia",
		logo: "https://i.imgur.com/5vqvCuK.png",
	},
	htmf: {
		name: "Roomerang",
		logo: "https://i.imgur.com/jZAqMNf.png",
	},
};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/SXfEdnL.png",
		},
		[useName, useTime, useDetails] = await Promise.all([
			presence.getSetting<boolean>("useName"),
			presence.getSetting<boolean>("useTime"),
			presence.getSetting<boolean>("useDetails"),
		]),
		{ href, hostname, pathname, search } = window.location,
		pathSplit = pathname.split("/").slice(1);

	if (useTime) presenceData.startTimestamp = browsingTimestamp;

	switch (hostname) {
		case "jackbox.tv": {
			if (game) {
				const { name, logo } = game;
				presenceData.largeImageKey = logo;
				presenceData.details = `Playing ${name}`;
				if (useName) {
					const { playerName, username, playerInfo } = gamePlayerState,
						realUsername =
							playerName ??
							username ??
							playerInfo?.username ??
							gamePlayerInfoState.name;
					if (realUsername) {
						if (useDetails) presenceData.details += ` as ${realUsername}`;
						else presenceData.state = `as ${realUsername}`;
					}
				}
				if (useDetails) {
					switch (game) {
						// Party Pack 9
						case Games.fourbage: {
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "waiting": {
									presenceData.state = "Waiting";
									break;
								}
								case "choosing": {
									switch (gamePlayerState.context) {
										case "pick-category": {
											presenceData.state = "Choosing a category";
											break;
										}
										case "pick-truth": {
											presenceData.state = "Looking for the truth";
											break;
										}
										case "pick-likes": {
											presenceData.state = "Awarding likes to other's answers";
											break;
										}
										case "final-round-1":
										case "final-round-2": {
											presenceData.state =
												"Looking for the truth - Final Round";
											break;
										}
									}
									break;
								}
								case "writing": {
									presenceData.state = "Writing lies";
									break;
								}
								case "voting": {
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
							}
							break;
						}
						case Games.lineup: {
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "choices": {
									presenceData.state = "Selecting a topic to sort";
									break;
								}
								case "falling": {
									presenceData.state = "Sorting an item";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								default: {
									presenceData.state = "Waiting";
								}
							}
							break;
						}
						case Games["range-game"]: {
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								case "drawing": {
									presenceData.state = "Drawing a picture";
									break;
								}
								case "guess": {
									presenceData.state = "Guessing the value in the range";
									break;
								}
								case "postGuess": {
									presenceData.state = "Waiting for other players to guess";
									break;
								}
								case "singleTextEntry": {
									presenceData.state = "Answering a prompt";
									break;
								}
								case "choices": {
									if (gamePlayerState.category === "walkthrough")
										presenceData.state = "Watching the tutorial";
									else presenceData.state = "Making a choice";
									break;
								}
								default: {
									presenceData.state = "Waiting";
								}
							}
							break;
						}
						case Games["antique-freak"]: {
							const { prompt, kind, responseKey } = gamePlayerState;
							switch (kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								case "ranking": {
									presenceData.state = "Ranking items";
									break;
								}
								case "choosing": {
									if (responseKey.startsWith("skip"))
										presenceData.state = "Watching the tutorial";
									else if (responseKey.startsWith("shopping"))
										presenceData.state = "Shopping for an item";
									else if (responseKey.startsWith("presentationChoice")) {
										if (prompt === "Ready to present?")
											presenceData.state = "Preparing to present";
										else presenceData.state = "Presenting their item";
									} else if (responseKey.startsWith("reaction"))
										presenceData.state = "Reacting to an item";
									else if (responseKey.startsWith("voting"))
										presenceData.state = "Voting on a collection";
									break;
								}
								case "fact": {
									presenceData.state = "Creating facts about an item";
									break;
								}
								case "writing": {
									if (prompt === "This piece is entitled:")
										presenceData.state = "Naming their item";
									else if (
										prompt ===
										'Your two items are part of a collection called "[blank][/blank]"'
									)
										presenceData.state = "Naming their collection";
									break;
								}
								case "waiting": {
									presenceData.state = "Waiting";
									break;
								}
							}
							break;
						}
						case Games.htmf: {
							presenceData.smallImageKey =
								document.querySelector<HTMLImageElement>(".avatar > img")?.src;
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								case "eliminating": {
									presenceData.state = "Voting to eliminate a player";
									break;
								}
								case "choosing": {
									if (gamePlayerState.prompt === "")
										presenceData.state = "Voting for a response";
									else if (gamePlayerState.round === "firestarter")
										presenceData.state = "Choosing a player to burn";
									else if (gamePlayerState.round === "finale")
										presenceData.state = "Deciding who should win";
									break;
								}
								case "waiting": {
									presenceData.state = "Waiting";
									break;
								}
								case "writing": {
									if (gamePlayerState.isGoodbye)
										presenceData.state = "Writing a goodbye message";
									else {
										switch (gamePlayerState.round) {
											case "intro": {
												presenceData.state = "Writing an introduction";
												break;
											}
											case "connection": {
												presenceData.state = "Writing about a connection";
												break;
											}
											case "quickie": {
												presenceData.state = "Writing an anonymous response";
												break;
											}
											case "firestarter": {
												presenceData.state = "Writing a dramatic response";
												break;
											}
											case "finale": {
												presenceData.state =
													"Writing a response for the finale";
												break;
											}
											case "": {
												presenceData.state = "Writing a victory speech";
												break;
											}
											default: {
												presenceData.state = "Writing a response";
											}
										}
									}
									break;
								}
							}
							break;
						}
					}
				}
			} else presenceData.details = "Idle";
			break;
		}
		case "games.jackbox.tv": {
			presenceData.details = "Looking at a past game";
			presenceData.state = document.title;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=-artifact] .image"
			).src;
			presenceData.buttons = [
				{
					label: "View Game",
					url: href,
				},
			];
			break;
		}
		case "www.jackboxgames.com": {
			switch (pathSplit[0] ?? "") {
				case "": {
					presenceData.details = "Browsing home page";
					break;
				}
				case "author": {
					presenceData.details = "Browsing blog posts by author";
					presenceData.state = document
						.querySelector("h1")
						.textContent.match(/Author: (.*)/i)[1];
					break;
				}
				case "blog": {
					presenceData.details = "Browsing blog posts";
					break;
				}
				case "category": {
					presenceData.details = "Browsing blog category";
					presenceData.state = document
						.querySelector("h1")
						.textContent.match(/Category: (.*)/i)[1];
					break;
				}
				case "games": {
					presenceData.details = "Browsing games";
					break;
				}
				case "tag": {
					presenceData.details = "Browsing blog posts by tag";
					presenceData.state = document
						.querySelector("h1")
						.textContent.match(/Tag: (.*)/i)[1];
					break;
				}
				default: {
					if (/^\/\d{4}(\/\d{2})?(\/\d{2})?\/$/.test(pathname)) {
						presenceData.details = "Browsing blog posts by date";
						presenceData.state = document.querySelector("h1").textContent;
					} else if (
						document.body.getAttribute("itemtype") === "http://schema.org/Blog"
					) {
						presenceData.details = "Reading an article";
						presenceData.state = document.querySelector("h1").textContent;
						presenceData.buttons = [
							{
								label: "Read Article",
								url: href,
							},
						];
					} else {
						presenceData.details = "Browsing";
						presenceData.state = document.title.match(
							/^(.*?)( - Jackbox Games)?$/
						)[1];
					}
				}
			}
			break;
		}
		case "shop.jackboxgames.com": {
			switch (pathSplit[0] ?? "") {
				case "": {
					presenceData.details = "Browsing store";
					break;
				}
				case "cart": {
					presenceData.details = "Viewing cart";
					break;
				}
				case "collections": {
					if (pathSplit[1]) {
						if (pathSplit.includes("products")) {
							presenceData.details = "Viewing a product";
							presenceData.state = document.querySelector("h1").textContent;
						} else {
							presenceData.details = "Browsing collection";
							presenceData.state = document.querySelector("h1").textContent;
						}
					} else presenceData.details = "Browsing collections";
					break;
				}
				case "products": {
					if (pathSplit[1]) {
						presenceData.details = "Viewing a product";
						presenceData.state = document.querySelector("h1").textContent;
					} else presenceData.details = "Browsing collections";
					break;
				}
				case "search": {
					presenceData.details = "Searching store";
					presenceData.state = new URLSearchParams(search).get("q");
					break;
				}
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
