const presence = new Presence({
		clientId: "1260572178068406282",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.kaneproductions.co.uk/art/PlanetXO/shortlogo.png",
	};

	// const DocumentURL = document.URL;
	const real = document.URL.replace(/\/[^\/]*$/, "");

	if (document.location.hostname === "planetxo.uk") {
		presenceData.startTimestamp = browsingTimestamp;
		switch (real) {
			case "https://planetxo.uk": {
				presenceData.details = "Viewing the map";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/xoradio": {
				presenceData.details = "Viewing XO Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/planetxo": {
				presenceData.details = "Viewing the PlanetXO Global Panel";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/admin": {
				presenceData.details =
					"Viewing the PlanetXO System Administrator Panel";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/blastradio": {
				presenceData.details = "Viewing Blast Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/qtfm": {
				presenceData.details = "Viewing QTFM";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/lushradio": {
				presenceData.details = "Viewing Lush Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/everyradio": {
				presenceData.details = "Viewing Every Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel": {
				presenceData.details = "Viewing PlanetXO Panel";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/xoradio": {
				presenceData.details = "Viewing the Panel for XO Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/blastradio": {
				presenceData.details = "Viewing the Panel for Blast Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/qtfm": {
				presenceData.details = "Viewing the Panel for QTFM";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/lushradio": {
				presenceData.details = "Viewing the Panel for Lush Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/everyradio": {
				presenceData.details = "Viewing the Panel for Every Radio";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			case "https://planetxo.uk/panel/panel": {
				presenceData.details = "Viewing the Panel for PlanetXO Panel";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
				break;
			}
			default:
				if (document.location.hostname === "planetxo.uk")
					presenceData.details = "Viewing PlanetXO";
				presenceData.buttons = [
					{
						label: "Home",
						url: "https://planetxo.uk",
					},
				];
		}
	}

	if (document.location.hostname === "panel.planetxo.uk")
		presenceData.details = "Viewing the Panel for PlanetXO";
	presenceData.startTimestamp = browsingTimestamp;
	presenceData.buttons = [
		{
			label: "Home",
			url: "https://planetxo.uk",
		},
	];

	if (presenceData.details) presence.setActivity(presenceData);
	else {
		presence.setActivity();
	}
});
