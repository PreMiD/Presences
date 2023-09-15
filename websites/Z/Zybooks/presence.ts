const presence = new Presence({
	clientId: "1152294065115779102",
});

function getTextContent(querySelectorString: string): string {
	return (
		document
			.querySelector<HTMLElement>(querySelectorString)
			?.textContent?.trim() || ""
	);
}

const zybooksTimestamp: {
	hash: string;
	timestamp: number;
} = {
	hash: "",
	timestamp: Date.now(),
};

presence.on("UpdateData", async () => {
	const { pathname, href } = document.location;
	let hash: string = href;
	const presenceData: PresenceData = {
		startTimestamp: zybooksTimestamp.timestamp,
		largeImageKey: "https://i.imgur.com/1lSQQh1.png",
		smallImageKey: Assets.Reading,
		smallImageText: "Reading",
	};
	if (pathname === "/library") presenceData.details = "Viewing Library";
	else if (pathname.match(/zybook\/[a-zA-Z0-9]+\/?$/)) {
		const assignmentPanelOpen = document.querySelector(".assignments-panel"),
			doingSingleAssignment =
				getTextContent(
					".assignment-panel-control-row span.title"
				).toLowerCase() === "back",
			title = getTextContent(".info h3");
		if (assignmentPanelOpen) {
			if (doingSingleAssignment) {
				presenceData.details = `Doing Assignment: ${document
					.querySelector("div[assignment_id] h4")
					.textContent.trim()}`;
				presenceData.state = document
					.querySelector(".assignment-points-text")
					.textContent.trim();
			} else {
				presenceData.details = "Viewing Assignments";
				if (title) presenceData.state = `Zybook: ${title}`;
			}
		} else {
			if (!title) return;
			presenceData.details = "Viewing Zybook";
			presenceData.state = `Zybook: ${title}`;
		}
		presenceData.buttons = [
			{
				label: "View Zybook",
				url: href,
			},
		];
		hash = `${href}-${assignmentPanelOpen}-${doingSingleAssignment}`;
	} else if (
		pathname.match(/zybook\/[a-zA-Z0-9]+\/chapter\/(\d+)\/section\/(\d+)\/?$/)
	) {
		const [, zybookId, chapter, section] = pathname.match(
			/zybook\/([a-zA-Z0-9]+)\/chapter\/(\d+)\/section\/(\d+)\/?$/
		);
		if (document.querySelector(".assignment-completion-summary-card")) {
			presenceData.details = `Completing Section ${chapter}.${section}`;
			presenceData.smallImageKey = Assets.Writing;
			presenceData.smallImageText = "Writing";
			presenceData.state = `Assignment: ${getTextContent(
				".points-completed-text"
			)}`;
		} else {
			presenceData.details = `Viewing Section ${chapter}.${section}`;
			presenceData.state = [...document.querySelector("h1").childNodes]
				.filter(node => node.textContent.trim())[1]
				.textContent.trim();
		}
		presenceData.buttons = [
			{
				label: "View Section",
				url: href,
			},
			{
				label: "View Zybook",
				url: `https://learn.zybooks.com/zybook/${zybookId}`,
			},
		];
	}
	// Generate a hash of the presenceData object using native methods
	if (zybooksTimestamp.hash !== hash) {
		zybooksTimestamp.hash = hash;
		zybooksTimestamp.timestamp = Date.now();
	}
	presenceData.startTimestamp = zybooksTimestamp.timestamp;
	presence.setActivity(presenceData);
});
