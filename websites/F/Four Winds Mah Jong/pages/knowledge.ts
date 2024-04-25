export default function handler(presenceData: PresenceData) {
	const mainFrame = document.querySelector<HTMLFrameElement>(
			"frame[src='kbstart.htm']"
		),
		{ contentDocument } = mainFrame;

	presenceData.details = "Viewing the knowledge base";
	presenceData.state = contentDocument.querySelector("h3");
}
