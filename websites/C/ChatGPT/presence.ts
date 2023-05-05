const presence = new Presence({ clientId: "1102935778570547282" });
enum Assets {
	Logo = "https://i.imgur.com/qw4f6EN.png",
	Talking = "https://i.imgur.com/hSv055V.png",
}
presence.on("UpdateData", async () => {
	const showTitle = await presence.getSetting<boolean>("showTitle"),
		talking = document.querySelector('[class*="text-2xl"] > span:nth-child(3)');

	let words = 0;
	for (const element of document.querySelectorAll(
		'[class*="flex flex-col items-center"] > *'
	)) {
		const text = element.textContent.replace(
			/([.])|(\n)|([0-9]*)|(\/)|()/gm,
			""
		);
		words += text.split(" ").slice(2, text.split(" ").length).length;
	}

	presence.setActivity({
		largeImageKey: Assets.Logo,
		startTimestamp: Math.floor(Date.now() / 1000),
		details: showTitle
			? `${
					document.querySelector("li a button > svg")?.closest("li")
						?.textContent
			  }` ??
			  document.querySelector('[class*="visible"]')?.parentElement?.textContent
			: "Talking with AI about something",
		state: talking
			? "AI is responding..."
			: `asked (${
					Number(document.querySelectorAll('[class*="group w-full"]').length) /
					2
			  }) times | (${words}) words`,
		smallImageKey: talking ? Assets.Talking : null,
	});
});
