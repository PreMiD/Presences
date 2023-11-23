const presence = new Presence({
		clientId: "1177239603535675412",
	}),
	largeImage = "https://i.imgur.com/IgrY0YE.gif" || "dxvil_lg";

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: largeImage,
	};

	presenceData.details = "⠎⠕⠇⠧⠊⠝⠛ ⠍⠽⠎⠞⠑⠗⠊⠑⠎";
	presenceData.state = "⠋⠊⠝⠙ ⠞⠓⠑ ⠑⠉⠓⠕⠑⠎";
	presenceData.buttons = [
		{
			label: "⠋⠊⠝⠙ ⠞⠓⠑ ⠞⠗⠥⠞⠓",
			url: "https://dxvil.com",
		},
	];

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
