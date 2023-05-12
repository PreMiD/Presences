const presence = new Presence({
	clientId: "919182644296683520",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
interface PlaygoundInfo {
	playgroundId?: string;
	type?: string;
	playgroundName?: string;
	playgroundDescription?: string;
}

async function getPlaygroundInfo(playgroundId: string): Promise<string> {
	const resp = await fetch(
		`https://api.gametools.network/bf2042/playground/?playgroundid=${playgroundId}`
	);
	if (!resp.ok) throw new Error("Failed");
	return resp.text();
}

let called = false,
	playgroundId: string = null;

const editingStamp = Math.floor(Date.now() / 1000),
	info: PlaygoundInfo = {};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kEnCDvm.png",
		},
		[block, time, buttons, name, description] = await Promise.all([
			presence.getSetting<boolean>("block"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("name"),
			presence.getSetting<boolean>("desc"),
		]),
		url = document.URL;

	if (url.search("=") > 0) playgroundId = url.split("=").pop();

	if (
		document.cookie.match(new RegExp("(^| )sessionId=([^;]+)"))[1] &&
		playgroundId
	) {
		info.playgroundId = playgroundId;
		if (document.readyState === "complete") {
			if (!called) {
				called = true;
				await getPlaygroundInfo(playgroundId).then(value => {
					const json = JSON.parse(value);
					if (!json) called = false;
					else {
						info.type = json.naming.type;
						info.playgroundDescription = json.naming.playgroundDescription;
						info.playgroundName = json.naming.playgroundName;
						presence.info(JSON.stringify(info));
					}
				});
			}
		} else called = false;
	}
	if (info) {
		if (name) presenceData.details = `Making ${info.playgroundName}`;
		if (description) presenceData.state = info.playgroundDescription;
	}

	if (block) {
		const selected = document.querySelector(".blocklySelected");
		if (selected) {
			if (
				selected.querySelector(".subroutineBlockSubroutineText")
					?.textContent === "SUBROUTINE"
			) {
				const blocklyText = selected.querySelectorAll(
					"text[class=blocklyText]"
				);
				for (const element of blocklyText) {
					if (
						element.parentElement.getAttribute("transform") ===
						"translate(126.36666870117188,18)"
					)
						presenceData.state = `in Subroutine ${element.textContent}`;
				}
			} else if (
				selected.querySelector(".ruleBlockRuleText")?.textContent === "RULE"
			) {
				const blocklyText = selected.querySelectorAll(
					"text[class=blocklyText]"
				);
				for (const element of blocklyText) {
					if (
						element.parentElement.getAttribute("transform") ===
						"translate(72.78333282470703,8.5)"
					)
						presenceData.state = `in RULE ${element.textContent}`;
				}
			} else if (description) {
				//todo: need to implement if a single block is selected
				presenceData.state = info.playgroundDescription;
			}
		}
	}

	if (time) presenceData.startTimestamp = editingStamp;
	if (buttons) presenceData.buttons = [{ label: "View Experience", url }];
	presence.setActivity(presenceData);
});
