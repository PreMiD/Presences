export function getImage(): string | undefined {
	for (const img of document.images) {
		if (["poster anime", "Poster Anime", "Anime Cover"].includes(String(img.attributes.getNamedItem("alt")?.value)))
			return String(img.src);
	}
}

export function getTitle() {
	const nt = document.querySelectorAll(".title-nt")[0],
		ro = document.querySelectorAll(".title-rm")[0],
		en = document.querySelectorAll(".title-en")[0];

	if (en) return en.innerHTML;
	if (ro) return ro.innerHTML;
	if (nt) return nt.innerHTML;

	for (const div of document.querySelectorAll("div")) {
		if (
			div.className === "flex flex-col gap-1 text-center md:text-start w-full"
		) {
			for (const element of div.children) 
				if (element.tagName.toLowerCase() === "h1") return element.innerHTML;
			
		}
	}
}

export function getEpisode(): number {
	let episode = 1;
	const query = document.querySelector(
		"#primary > div.flex.flex-col.px-3.lg\\:px-0.mt-2 > div.flex.flex-col.gap-2.font-karla.pt-2.pb-3.w-full > div.flex.justify-between.items-center > div:nth-child(1) > div"
	);

	if (query) episode = Number(query.children[0].innerHTML.split(" ").pop());

	return episode;
}

export function getId(): number {
	for (const [key, value] of location.search
		.substr(1)
		.split("&")
		.map(s => s.split("=")))
		if (key === "id") return Number(value);

	for (const path of location.pathname.split("/")) 
		if (path.match(/^(\d+)$/)) return Number(path);
	
}
