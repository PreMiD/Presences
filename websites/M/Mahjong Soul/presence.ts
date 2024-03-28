import {
	HomeScreenType,
	getAccountInfo,
	getAchievementInfo,
	getGachaInfo,
	getHomeScreenType,
	getWaitingRoomInfo,
	isInGame,
} from "./game_variables";
import { browsingTimestamp, presence } from "./util";

const enum Asset {
	Logo = "https://i.imgur.com/X0BvMqW.jpeg",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Asset.Logo,
			startTimestamp: browsingTimestamp,
			name: "Mahjong Soul",
			type: ActivityType.Playing,
		},
		{ hostname, pathname, protocol } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	const { nickname, coppers, signature } = await getAccountInfo();

	if (hostname === "mahjongsoul.yo-star.com") {
		// TODO: Add presence for the main website
	} else {
		if (await isInGame()) {
			presenceData.type = ActivityType.Competing;
		} else {
			const homePageType = await getHomeScreenType();
			switch (homePageType) {
				case HomeScreenType.Achievement: {
					const {
						totalCountString,
						bronzeAchievementCount,
						silverAchievementCount,
						goldAchievementCount,
					} = await getAchievementInfo();
					presenceData.details = "Viewing their achievements";
					presenceData.state = totalCountString;
					presenceData.smallImageKey = Assets.Question;
					presenceData.smallImageText = `${bronzeAchievementCount} Bronze | ${silverAchievementCount} Silver | ${goldAchievementCount} Gold`;
					break;
				}
				case HomeScreenType.RoomLobby: {
					const showInviteButton = await presence.getSetting<boolean>(
							"show_invite"
						),
						{ roomId, mode, maxPlayers, currentPlayers } =
							await getWaitingRoomInfo();
					presenceData.details = "Creating a room";
					presenceData.state = `${mode} | ${currentPlayers}/${maxPlayers} players`;
					if (showInviteButton) {
						presenceData.buttons = [
							{
								label: "Join Room",
								url: `${protocol}//${hostname}/?room=${roomId}`,
							},
						];
					}
					break;
				}
				case HomeScreenType.Dorm: {
					presenceData.details = "Viewing their characters";
					break;
				}
				case HomeScreenType.FriendlyQueue: {
					presenceData.details = "In a friendly match queue";
					break;
				}
				case HomeScreenType.TournamentQueue: {
					presenceData.details = "In a tournament queue";
					break;
				}
				case HomeScreenType.RankedQueue: {
					presenceData.details = "In a ranked queue";
					break;
				}
				case HomeScreenType.Gacha: {
					const gachaName = await getGachaInfo();
					presenceData.details = "Viewing the gacha";
					presenceData.state = gachaName;
					break;
				}
				case HomeScreenType.Home: {
					presenceData.details = "Viewing the home screen";
					presenceData.state = `${coppers} coppers`;
					presenceData.smallImageKey = Assets.Question;
					presenceData.smallImageText = `${nickname} - "${signature}"`;
					break;
				}
				case HomeScreenType.PlayerInfo: {
					presenceData.details = "Viewing their statistics";
					break;
				}
				case HomeScreenType.CreateRoom: {
					presenceData.details = "Creating a room";
					break;
				}
				case HomeScreenType.Rules: {
					presenceData.details = "Viewing yakus and rules";
					break;
				}
				case HomeScreenType.Shop: {
					presenceData.details = "Viewing the shop";
					break;
				}
				default: {
					presenceData.details = "Loading...";
				}
			}
		}
	}

	presence.setActivity(presenceData);
});
