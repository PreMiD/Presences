import { presence } from "./util";

const CACHE_TIME = 1500;
const variableCache: Record<string, unknown> = {};
const variableCacheTimes: Record<string, number> = {};

export enum GameScreenType {
	playerTurn,
	otherTurn,
	handEnd,
	gameEnd,
}

interface GameEndResult {
	players: {
		part_point_1: number; // final raw score
		total_point: number; // +/- value (divide by 1000 to get the displayed value)
		seat: number; // player index
	}[]; // index indicates the position of the player
}

export async function getGameType(): Promise<GameScreenType> {
	const {
		view: {
			DesktopMgr: {
				Inst: {
					seat: playerIndex,
					gameEndResult: gameEndResult,
					index_player: activePlayerIndex,
				},
			},
		},
		uiscript: {
			UI_Win: {
				Inst: { enable: enableWinScreen },
			},
			UI_ScoreChange: {
				Inst: { enable: enableScoreChangeScreen },
			},
		},
	} = await getVariable(
		[
			"view.DesktopMgr.Inst.seat",
			"view.DesktopMgr.Inst.gameEndResult",
			"view.DesktopMgr.Inst.index_player",
			"uiscript.UI_Win.Inst.enable",
			"uiscript.UI_ScoreChange.Inst.enable",
		],
		{
			view: {
				DesktopMgr: {
					Inst: {
						seat: -1,
						gameEndResult: null as GameEndResult | null,
						index_player: -1,
					},
				},
			},
			uiscript: {
				UI_Win: {
					Inst: { enable: false },
				},
				UI_ScoreChange: {
					Inst: { enable: false },
				},
			},
		}
	);
	if (enableWinScreen || enableScoreChangeScreen) {
		return GameScreenType.handEnd;
	}
	if (gameEndResult) return GameScreenType.gameEnd;
	if (playerIndex === activePlayerIndex) return GameScreenType.playerTurn;
	return GameScreenType.otherTurn;
}

export async function getBasicGameInfo(): Promise<{
	playerIndex: number;
	activePlayerIndex: number;
	honbaCount: number;
	roundCount: number;
	windIndex: number;
	tilesLeft: number;
	gameMode: number;
	gameEndResult: GameEndResult | null;
}> {
	const {
		view: {
			DesktopMgr: {
				Inst: {
					seat: playerIndex,
					index_player: activePlayerIndex,
					index_ben: honbaCount,
					index_ju: roundCount,
					index_change: windIndex,
					left_tile_count: tilesLeft,
					game_config: { mode: gameMode },
					gameEndResult: gameEndResult,
				},
			},
		},
	} = await getVariable(
		[
			"view.DesktopMgr.Inst.seat",
			"view.DesktopMgr.Inst.index_player",
			"view.DesktopMgr.Inst.index_ben",
			"view.DesktopMgr.Inst.index_ju",
			"view.DesktopMgr.Inst.index_change",
			"view.DesktopMgr.Inst.left_tile_count",
			"view.DesktopMgr.Inst.game_config.mode",
			"view.DesktopMgr.Inst.gameEndResult",
		],
		{
			view: {
				DesktopMgr: {
					Inst: {
						seat: -1,
						index_player: -1,
						index_ben: 0,
						index_ju: 0,
						index_change: 0,
						left_tile_count: 0,
						game_config: {
							mode: 0,
						},
						gameEndResult: null,
					},
				},
			},
		}
	);
	return {
		playerIndex,
		activePlayerIndex,
		honbaCount,
		roundCount,
		windIndex,
		tilesLeft,
		gameMode,
		gameEndResult,
	};
}

export async function getPlayerInfo(playerIndex: number): Promise<{
	playerSeat: number;
	playerScore: number;
	playerName: string;
}> {
	const {
		view: {
			DesktopMgr: {
				Inst: {
					players: {
						[playerIndex]: { seat: playerSeat, score: playerScore },
					},
					player_datas: {
						[playerIndex]: { nickname: playerName },
					},
				},
			},
		},
	} = await getVariable(
		[
			`view.DesktopMgr.Inst.players.${playerIndex}.seat`,
			`view.DesktopMgr.Inst.players.${playerIndex}.score`,
			`view.DesktopMgr.Inst.player_datas.${playerIndex}.nickname`,
		],
		{
			view: {
				DesktopMgr: {
					Inst: {
						players: [
							{
								seat: -1,
								score: 0,
							},
						],
						player_datas: [
							{
								nickname: "Unknown Player",
							},
						],
					},
				},
			},
		}
	);
	return { playerSeat, playerScore, playerName };
}

export async function getPlayerInfoBySeat(
	playerSeat: number
): ReturnType<typeof getPlayerInfo> {
	const {
		view: {
			DesktopMgr: {
				Inst: {
					players: {
						0: { seat: seat0 },
						1: { seat: seat1 },
						2: { seat: seat2 },
						3: { seat: seat3 },
					},
				},
			},
		},
	} = await getVariable(
		[
			"view.DesktopMgr.Inst.players.0.seat",
			"view.DesktopMgr.Inst.players.1.seat",
			"view.DesktopMgr.Inst.players.2.seat",
			"view.DesktopMgr.Inst.players.3.seat",
		],
		{
			view: {
				DesktopMgr: {
					Inst: {
						players: [{ seat: -1 }, { seat: -1 }, { seat: -1 }, { seat: -1 }],
					},
				},
			},
		}
	);
	let playerIndex = 0;
	if (seat0 === playerSeat) playerIndex = 0;
	else if (seat1 === playerSeat) playerIndex = 1;
	else if (seat2 === playerSeat) playerIndex = 2;
	else if (seat3 === playerSeat) playerIndex = 3;
	return getPlayerInfo(playerIndex);
}

export async function getHandEndInfo(): Promise<{
	handScore: number;
	seat: number;
}> {
	const {
		uiscript: {
			UI_ScoreChange: {
				Inst: {
					data: {
						// while there can be more than one winner, this presence currently only displays the first
						hules: [{ dadian: handScore, seat }],
					},
				},
			},
		},
	} = await getVariable(
		[
			"uiscript.UI_ScoreChange.Inst.data.hules.0.dadian",
			"uiscript.UI_ScoreChange.Inst.data.hules.0.seat",
		],
		{
			uiscript: {
				UI_ScoreChange: {
					Inst: {
						data: {
							hules: [
								{
									dadian: 0,
									seat: -1,
								},
							],
						},
					},
				},
			},
		}
	);
	return { handScore, seat };
}

export async function isInGame() {
	const {
		GameMgr: {
			Inst: { ingame },
		},
	} = await getVariable(["GameMgr.Inst.ingame"], {
		GameMgr: { Inst: { ingame: false } },
	});
	return ingame;
}

export async function getAccountInfo(): Promise<{
	nickname: string;
	coppers: number;
	signature: string;
}> {
	const {
		GameMgr: {
			Inst: {
				account_data: { nickname, gold: coppers, signature },
			},
		},
	} = await getVariable(
		[
			"GameMgr.Inst.account_data.nickname",
			"GameMgr.Inst.account_data.gold",
			"GameMgr.Inst.account_data.signature",
		],
		{
			GameMgr: {
				Inst: {
					account_data: {
						nickname: "Unknown Player",
						gold: 0,
						signature: "",
					},
				},
			},
		}
	);
	return { nickname, coppers, signature };
}

export enum HomeScreenType {
	shop,
	dorm,
	createRoom,
	roomLobby,
	gacha,
	rules,
	playerInfo,
	achievement,
	rankedQueue,
	friendlyQueue,
	tournamentQueue,
	loading,
	home,
}

export async function getLobbyType(): Promise<HomeScreenType> {
	const {
		uiscript: {
			UI_Lobby: {
				Inst: { enable: enabledLobby },
			},
			UI_Shop: {
				Inst: { enable: enabledShop },
			},
			UI_Sushe: {
				Inst: { enable: enabledDorm },
			},
			UI_WaitingRoom: {
				Inst: { enable: enabledRoomLobby },
			},
			UI_Treasure: {
				Inst: { enable: enabledGacha },
			},
			UI_Rules: {
				Inst: { enable: enabledRules },
			},
			UI_PlayerInfo: {
				Inst: { enable: enabledPlayerInfo },
			},
			UI_Achievement: {
				Inst: { enable: enabledAchievement },
			},
			UI_Loading: {
				Inst: { enable: enabledLoading },
			},
			UI_CreateRoom: {
				Inst: { enable: enabledCreateRoom },
			},
		},
	} = await getVariable(
		[
			"uiscript.UI_Lobby.Inst.enable",
			"uiscript.UI_Shop.Inst.enable",
			"uiscript.UI_Sushe.Inst.enable",
			"uiscript.UI_WaitingRoom.Inst.enable",
			"uiscript.UI_Treasure.Inst.enable",
			"uiscript.UI_Rules.Inst.enable",
			"uiscript.UI_PlayerInfo.Inst.enable",
			"uiscript.UI_Achievement.Inst.enable",
			"uiscript.UI_Loading.Inst.enable",
			"uiscript.UI_CreateRoom.Inst.enable",
		],
		{
			uiscript: {
				UI_Lobby: { Inst: { enable: false } },
				UI_Shop: { Inst: { enable: false } },
				UI_Sushe: { Inst: { enable: false } },
				UI_WaitingRoom: { Inst: { enable: false } },
				UI_Treasure: { Inst: { enable: false } },
				UI_Rules: { Inst: { enable: false } },
				UI_PlayerInfo: { Inst: { enable: false } },
				UI_Achievement: { Inst: { enable: false } },
				UI_Loading: { Inst: { enable: false } },
				UI_CreateRoom: { Inst: { enable: false } },
			},
		}
	);
	if (enabledShop) return HomeScreenType.shop;
	if (enabledDorm) return HomeScreenType.dorm;
	if (enabledCreateRoom) return HomeScreenType.createRoom;
	if (enabledGacha) return HomeScreenType.gacha;
	if (enabledRules) return HomeScreenType.rules;
	if (enabledPlayerInfo) return HomeScreenType.playerInfo;
	if (enabledAchievement) return HomeScreenType.achievement;
	if (enabledLoading) return HomeScreenType.loading;
	if (enabledRoomLobby) return HomeScreenType.roomLobby;
	if (enabledLobby) {
		const {
			uiscript: {
				UI_Lobby: {
					Inst: { nowpage: lobbyPage },
				},
			},
		} = await getVariable(["uiscript.UI_Lobby.Inst.nowpage"], {
			uiscript: {
				UI_Lobby: {
					Inst: {
						nowpage: 0,
					},
				},
			},
		});
		switch (lobbyPage) {
			case 1:
				return HomeScreenType.rankedQueue;
			case 2:
				return HomeScreenType.friendlyQueue;
			case 3:
				return HomeScreenType.tournamentQueue;
		}
		return HomeScreenType.home;
	}
	return HomeScreenType.loading;
}

export async function getGachaInfo(): Promise<string> {
	const {
		uiscript: {
			UI_Treasure: {
				Inst: { tab_index },
			},
		},
	} = await getVariable(["uiscript.UI_Treasure.Inst.tab_index"], {
		uiscript: {
			UI_Treasure: {
				Inst: { tab_index: 0 },
			},
		},
	});
	const {
		uiscript: {
			UI_Treasure: {
				Inst: {
					tabs: {
						[tab_index]: {
							name: { text: tabName },
						},
					},
				},
			},
		},
	} = await getVariable(
		[`uiscript.UI_Treasure.Inst.tabs.${tab_index}.name.text`],
		{
			uiscript: {
				UI_Treasure: {
					Inst: {
						tabs: {
							[tab_index]: {
								name: {
									text: "",
								},
							},
						},
					},
				},
			},
		}
	);
	return tabName;
}

export async function getAchievementInfo(): Promise<{
	totalAchievementCount: number;
	totalCountString: string;
	bronzeAchievementCount: string;
	silverAchievementCount: string;
	goldAchievementCount: string;
}> {
	const {
		uiscript: {
			UI_Achievement: {
				Inst: {
					total_achievement_count: totalAchievementCount,
					total_count: { text: totalCountString },
					total_achievement: {
						lst: {
							0: { text: bronzeAchievementCount },
							1: { text: silverAchievementCount },
							2: { text: goldAchievementCount },
						},
					},
				},
			},
		},
	} = await getVariable(
		[
			"uiscript.UI_Achievement.Inst.total_achievement_count",
			"uiscript.UI_Achievement.Inst.total_count.text",
			"uiscript.UI_Achievement.Inst.total_achievement.lst.0.text",
			"uiscript.UI_Achievement.Inst.total_achievement.lst.1.text",
			"uiscript.UI_Achievement.Inst.total_achievement.lst.2.text",
		],
		{
			uiscript: {
				UI_Achievement: {
					Inst: {
						total_achievement_count: 0,
						total_count: { text: "0" },
						total_achievement: {
							lst: [{ text: "0" }, { text: "0" }, { text: "0" }],
						},
					},
				},
			},
		}
	);
	return {
		totalAchievementCount,
		totalCountString,
		bronzeAchievementCount,
		silverAchievementCount,
		goldAchievementCount,
	};
}

export async function getWaitingRoomInfo(): Promise<{
	roomId: number;
	mode: string;
	maxPlayers: number;
	currentPlayers: number;
}> {
	const {
		uiscript: {
			UI_WaitingRoom: {
				Inst: {
					room_id: roomId,
					container_rules: {
						modes: [mode],
					},
					max_player_count: maxPlayers,
					players: { length: currentPlayers },
				},
			},
		},
	} = await getVariable(
		[
			"uiscript.UI_WaitingRoom.Inst.room_id",
			"uiscript.UI_WaitingRoom.Inst.container_rules.modes.0",
			"uiscript.UI_WaitingRoom.Inst.max_player_count",
			"uiscript.UI_WaitingRoom.Inst.players.length",
		],
		{
			uiscript: {
				UI_WaitingRoom: {
					Inst: {
						room_id: -1,
						container_rules: {
							modes: ["Unknown Game Mode"],
						},
						max_player_count: 0,
						players: {
							length: 0,
						},
					},
				},
			},
		}
	);
	return { roomId, mode, maxPlayers, currentPlayers };
}

export async function getVariable<T extends Record<string, unknown>>(
	variables: string[],
	fallback: T
): Promise<T> {
	const now = performance.now();
	if (
		variables.every(variable => {
			return (
				variable in variableCache &&
				now - variableCacheTimes[variable] < CACHE_TIME
			);
		})
	) {
		return variableCache as T;
	}
	const result = await presence
		.getPageVariable(...variables)
		.catch(() => fallback);
	Object.assign(variableCache, result); // TODO: Assign recursively
	variables.forEach(variable => {
		variableCacheTimes[variable] = performance.now();
	});
	return result as T;
}
