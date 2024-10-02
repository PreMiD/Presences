class Weverse extends Presence {
	constructor(options: PresenceOptions) {
		super(options);
	}

	getArtistName(): string {
		return (
			document
				.querySelector(".LiveArtistProfileView_name_item__8W66y")
				?.textContent?.trim() ?? "Unknown Artist"
		);
	}

	getStreamTitle(): string {
		const titleElement = document.querySelector("h2.TitleView_title__SSnHb");
		if (titleElement) {
			const titleTextNodes = Array.from(titleElement.childNodes).filter(
				node =>
					!(
						node instanceof HTMLElement &&
						node.matches(".LiveBadgeView_badge__o2vFt")
					)
			);

			return (
				titleTextNodes
					.map(node => node.textContent)
					.join("")
					.trim() || "Unknown Title"
			);
		}
		return "Unknown Title";
	}

	getThumbnailUrl(): string | undefined {
		return document.querySelector<HTMLImageElement>(
			".ProfileThumbnailView_thumbnail_wrap__ZgeTf img"
		)?.src;
	}

	getCommunityName(): string {
		return (
			document
				.querySelector(".HeaderCommunityDropdownWrapperView_name__FZXsx")
				?.textContent?.trim() ?? "Unknown Community"
		);
	}

	getCommunityImageUrl(): string | undefined {
		return document.querySelector<HTMLImageElement>(
			".CommunityAsideWelcomeView_thumbnail__5MVun"
		)?.src;
	}

	getArtistPageName(): string {
		return (
			document
				.querySelector(".HeaderCommunityDropdownWrapperView_name__FZXsx")
				?.textContent?.trim() ?? "Unknown Artist"
		);
	}

	getMomentThumbnailUrl(): string | undefined {
		return document.querySelector<HTMLImageElement>(
			".ProfileThumbnailView_thumbnail_wrap__ZgeTf img"
		)?.src;
	}

	getMomentNickname(): string {
		return (
			document
				.querySelector(".PostHeaderView_nickname__6Cb7X")
				?.textContent?.trim() ?? "Unknown User"
		);
	}
}

const presence = new Weverse({
	clientId: "1284048129414402109",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://res.cloudinary.com/debvitdiw/image/upload/v1727852958/Presences/WeverseLogo.png",
	};

	if (document.location.pathname.includes("/live/")) {
		const thumbnailUrl = presence.getThumbnailUrl();
		presenceData.details = presence.getStreamTitle();
		presenceData.state = presence.getArtistName();

		const video = document.querySelector("video");
		if (document.querySelector(".LiveBadgeView_-replay__nNx34") !== null) {
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "Replay";
			presenceData.buttons = [
				{
					label: `Watch ${presence.getArtistName()} Replay`,
					url: document.location.href,
				},
			];
		} else if (video) {
			if (video.paused) {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Paused";
			} else {
				presenceData.smallImageKey = Assets.Live;
				presenceData.smallImageText = "Live";
			}
			presenceData.buttons = [
				{
					label: `Visit ${presence.getArtistName()} Live`,
					url: document.location.href,
				},
			];
		} else {
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "Playing";
			presenceData.buttons = [
				{
					label: `Watch ${presence.getArtistName()} Replay`,
					url: document.location.href,
				},
			];
		}

		if (thumbnailUrl) presenceData.largeImageKey = thumbnailUrl;
	} else if (document.location.pathname === "/") {
		presenceData.details = "Browsing Weverse";
		presenceData.state = "On Homepage";
	} else if (document.location.pathname.includes("/feed")) {
		presenceData.details = "Viewing Community Feed";
		presenceData.state = presence.getCommunityName();

		const communityImageUrl = presence.getCommunityImageUrl();
		if (communityImageUrl) presenceData.largeImageKey = communityImageUrl;

		presenceData.buttons = [
			{
				label: `Visit ${presence.getCommunityName()} Feed`,
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/artist")) {
		presenceData.details = "Viewing Artist";
		presenceData.state = presence.getArtistPageName();

		presenceData.buttons = [
			{
				label: `Visit ${presence.getArtistPageName()} Artist`,
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/moment")) {
		presenceData.details = "Viewing Moment";
		presenceData.state = presence.getMomentNickname();

		const momentThumbnailUrl = presence.getMomentThumbnailUrl();
		if (momentThumbnailUrl) presenceData.largeImageKey = momentThumbnailUrl;

		presenceData.buttons = [
			{
				label: `Visit ${presence.getMomentNickname()} Moment`,
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/media")) {
		presenceData.details = "Viewing Media";
		presenceData.state = presence.getCommunityName();

		presenceData.buttons = [
			{
				label: `Visit ${presence.getCommunityName()} Media`,
				url: document.location.href,
			},
		];
	}

	presence.setActivity(presenceData);
});
