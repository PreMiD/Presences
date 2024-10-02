function getDomainExtension(url: string): string | null {
	try {
		const match = /\.([a-zA-Z0-9-]+)$/.exec(new URL(url).hostname);
		return match ? match[1] : null;
	} catch (error) {
		return "com";
	}
}

export function extToCountry(url: string): string {
	const extension = getDomainExtension(url),
		extensionToCountry: { [key: string]: string } = {
			hu: "Hungary",
			ro: "Romania",
			sk: "Slovakia",
			de: "Germany",
			at: "Austria",
			it: "Italy",
			es: "Spain",
			fr: "France",
			nl: "Netherlands",
			pl: "Poland",
			cl: "Chile",
			ar: "Argentina",
			mx: "Mexico",
		};
	let country: string;
	if (extension === "com") country = url.includes("irish") ? "Ireland" : "UK";
	else country = extensionToCountry[extension.toLowerCase()];
	return country ? ` (${country})` : "";
}
