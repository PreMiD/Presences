import { selectDashboardPage } from "./dashboard";
import { handleCodeblocks, handleThing } from "./handleThing";

const presence = new Presence({
	clientId: "1217153856665026580",
});

export const enum Assets {
	Logo = "https://i.imgur.com/XXez3yK.png",
	ThreeDIco = "https://icon-library.com/images/3d-icon-png/3d-icon-png-17.jpg",
	CircuitIco = "https://img.freepik.com/premium-vector/circuit-board-linecpuchip-icon-logo-illustration-vector-design_598213-3208.jpg",
	CodeblockIco = "https://cdn.iconscout.com/icon/free/png-512/code-280-460136.png",
	TrashCanIco = "https://www.nicepng.com/png/detail/208-2086588_trash-can-icon.png",
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
