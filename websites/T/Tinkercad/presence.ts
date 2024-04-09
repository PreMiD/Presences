import { selectDashboardPage } from "./dashboard";
import { handleCodeblocks, handleThing } from "./handleThing";

const presence = new Presence({
	clientId: "1217153856665026580",
});

export const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/T/Tinkercad/assets/logo.png",
	ThreeDIco = "https://cdn.rcd.gg/PreMiD/websites/T/Tinkercad/assets/0.png",
	CircuitIco = "https://cdn.rcd.gg/PreMiD/websites/T/Tinkercad/assets/1.png",
	CodeblockIco = "https://cdn.rcd.gg/PreMiD/websites/T/Tinkercad/assets/2.png",
	TrashCanIco = "https://cdn.rcd.gg/PreMiD/websites/T/Tinkercad/assets/3.jpeg",
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
