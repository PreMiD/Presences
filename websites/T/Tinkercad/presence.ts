import { selectDashboardPage } from "./dashboard";
import { handleCodeblocks, handleThing } from "./handleThing";

const presence = new Presence({
	clientId: "1217153856665026580",
});

export const enum Assets {
	Logo = "https://i.imgur.com/2Nyp2DT.png",
	ThreeDIco = "https://i.imgur.com/OAvYVsM.png",
	CircuitIco = "https://i.imgur.com/plgAsZu.png",
	CodeblockIco = "https://i.imgur.com/wk7x7PB.png",
	TrashCanIco = "https://i.imgur.com/S5D4Qdj.jpeg",
}

const enum Pages {
	homepage = "dashboard",
	things = "things",
	codeblocks = "codeblocks",
}

presence.on("UpdateData", async () => {
	if (!document.location.toString()) return;

	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			name: "Tinkercad",
			type: ActivityType.Playing,
		},
		[, page, subpage, subsubpage] = document.location.pathname.split("/");

	switch (page) {
		case Pages.homepage:
			selectDashboardPage(presenceData, subpage, subsubpage);
			break;

		case Pages.things:
			handleThing(presenceData, subpage, subsubpage?.includes("edit")); // can be "edit" or "editel"
			break;

		case Pages.codeblocks:
			handleCodeblocks(presenceData, subpage?.includes("edit"));
			break;

		default:
			// blog and help
			presenceData.details = `Viewing ${document.title}`;
			break;
	}

	presence.setActivity(presenceData);
});
