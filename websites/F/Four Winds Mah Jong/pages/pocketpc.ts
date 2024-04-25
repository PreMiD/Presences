export default function handler(
	pathList: string[],
	presenceData: PresenceData
) {
	const mainPage = pathList[0] ?? "index.htm";
	if (mainPage === "index.htm") {
		presenceData.details = "Viewing the PPC page";
	} else if (mainPage === "overview.htm") {
		presenceData.details = "Reading the PPC overview";
	} else if (mainPage === "features.htm") {
		presenceData.details = "Reading about the PPC features";
	} else if (mainPage.startsWith("gallery")) {
		presenceData.details = "Viewing the PPC gallery";
	} else if (mainPage === "devices.htm") {
		presenceData.details = "Viewing PPC system information";
	} else if (mainPage === "downloads.htm") {
		presenceData.details = "Viewing PPC downloads";
	} else if (mainPage === "support.htm") {
		presenceData.details = "Viewing PPC support resources";
	}
}
