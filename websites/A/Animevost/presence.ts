const presence = new Presence({
		clientId: "978634361266110534"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function GetSeria() {
	const all: string[] = [],
		nodes = document.querySelectorAll("div[id='items']>div");
	for (let i = 0; nodes[i]; i++) {
		const node = nodes[i];
		if (node.className.includes("active")) all.push(node.textContent);
	}
	return all.join("");
}

function SetCategory(tag: string) {
	const data = Array.from(
		document.querySelectorAll("span[id='blok_4']>a")
	).reduce(
		(obj, rule: HTMLElement) => {
			if (rule.getAttribute("href").includes(tag)) {
				obj.tag = rule.textContent;
				return obj;
			}
			return obj;
		},
		{ tag: null }
	);
	return data;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "animevost",
		startTimestamp: browsingTimestamp
	};

	if (document.location.pathname === "/")
		presenceData.details = "Просмотр главной страницы сайта";
	else if (
		document.location.pathname.includes("/tip/") &&
		!document.location.pathname.endsWith(".html")
	) {
		presenceData.details = "Просмативает категорию";
		presenceData.state = SetCategory(document.location.pathname).tag
			? `${SetCategory(document.location.pathname).tag}`
			: "";
	} else if (document.location.pathname.includes("/ongoing"))
		presenceData.details = "Просмативает категорию Онгоинги";
	else if (
		document.location.pathname.endsWith(".html") &&
		document.location.pathname.includes("/tip/")
	) {
		presenceData.state = `смотрит\n ${GetSeria()}`;
		presenceData.details = `${
			document
				.querySelector("meta[name='description']")
				.getAttribute("content")
				.split(" / ")[0]
		}`;
	} else if (document.location.pathname.includes("zhanr")) {
		presenceData.state = `жанр ${
			document.querySelector("div[class='present']>h1").textContent
		}`;
		presenceData.details = "Просмативает категорию";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
