function getQuery(key: string): string | undefined {
	for (const query of document.location.search.slice(1).split("&")) {
		const [name, value] = query.split("=");

		if (name === key) return value;
	}
}

export function getImage(): string | undefined {
	const { pathname } = document.location;

	for (const img of document.images) {
		if (pathname === "/watch" && img.className === "sc-fijUiK hFQnQi")
			return String(img.src);

		if (pathname === "/info" && img.className === "sc-hFpvvS iNOKyp")
			return String(img.src);
	}
}

export function getTitle(): string | undefined {
	const en = document.querySelector(".anime-title"),
		ro = document.querySelector(".anime-title-romaji");

	if (en) return en.textContent;
	if (ro) return ro.textContent;

	return [...document.querySelector("h1").childNodes]
		.filter(el => el.nodeType === 3)
		?.at(0)?.textContent;
}

export function getEpisode(): number {
	return Number(getQuery("ep") || 1);
}

export function getId(): number {
	return Number(getQuery("id"));
}
