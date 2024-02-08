export function makePossessive(name: string): string {
	return name.endsWith("s") ? `${name}'` : `${name}'s`;
}

export function deEsser(word: string): string {
	return word.endsWith("s") ? word.slice(0, -1) : word;
}

export function giveArticle(word: string): string {
	return `${
		["a", "e", "i", "o", "u"].some(vowel =>
			word.toLowerCase().startsWith(vowel)
		)
			? "an"
			: "a"
	} ${word}`;
}

export function makeProgressBar(
	value: number,
	maxValue: number,
	size: number,
	color?: string
): string {
	const progressPercentage = Math.min(
			100,
			Math.max(0, Math.floor((value / maxValue) * 100))
		),
		completedSquares = Math.floor((progressPercentage * size) / 100);

	return `${(
		{
			owl: "🟩",
			bee: "🟨",
			fox: "🟨",
			cosmos: "🟦",
		}[color] ?? "🟩"
	).repeat(completedSquares)}${"⬛".repeat(
		size - completedSquares
	)} ${progressPercentage}%`;
}

type obj = Record<string, unknown>;
export function updateUndefinedKeys(obj1: obj, obj2: obj): void {
	for (const key of Object.keys(obj2)) {
		if (Object.prototype.hasOwnProperty.call(obj2, key) && !obj1[key])
			obj1[key] = obj2[key];
	}
}

export const assets: Record<string, string> = {
  "lang_tlh": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902603913408572.png?size=512",
  "lang_tr": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902604941004830.png?size=512",
  "lang_uk": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902605981200396.png?size=512",
  "lang_vi": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902606878789632.png?size=512",
  "lang_yi": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902608241934426.png?size=512",
  "lang_zh": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902609319858176.png?size=512",
  "lang_zu": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902610653663282.png?size=512",
  "lang_ar": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902617859477524.png?size=512",
  "lang_ca": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902618949996544.png?size=512",
  "lang_cs": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902619952422942.png?size=512",
  "lang_cy": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902620820639785.png?size=512",
  "lang_da": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902621835661394.png?size=512",
  "lang_de": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902622829727794.png?size=512",
  "lang_el": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902623731490846.png?size=512",
  "lang_eo": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902626772361297.png?size=512",
  "lang_es": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902627573481594.png?size=512",
  "lang_fr": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902631058939964.png?size=512",
  "lang_ga": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902632145256468.png?size=512",
  "lang_gd": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902633550364702.png?size=512",
  "lang_he": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902636666728499.png?size=512",
  "lang_hi": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902638025682984.png?size=512",
  "lang_hu": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902641309810718.png?size=512",
  "lang_hv": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902642656190524.png?size=512",
  "lang_hw": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902644090646608.png?size=512",
  "lang_it": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902646993109052.png?size=512",
  "lang_ja": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902648326893640.png?size=512",
  "lang_la": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902651338412052.png?size=512",
  "lang_nv": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902655268474950.png?size=512",
  "lang_pl": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902656363176038.png?size=512",
  "lang_ro": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902659747975179.png?size=512",
  "lang_ru": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902660863660042.png?size=512",
  "lang_sw": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902663816462449.png?size=512",
  "lang_th": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902664940527617.png?size=512",
  "lang_en": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902702034948136.png?size=512",
  "lang_fi": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902703154839672.png?size=512",
  "lang_gn": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902704119513168.png?size=512",
  "lang_ht": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902705314893844.png?size=512",
  "lang_id": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902706560598017.png?size=512",
  "lang_ko": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902707542077450.png?size=512",
  "lang_pt": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902710037676082.png?size=512",
  "lang_sv": "https://cdn.discordapp.com/app-assets/1177802176140156998/1177902711409213492.png?size=512",
  "lang_nl": "https://cdn.discordapp.com/app-assets/1177802176140156998/1178413375521292431.png?size=512",
  "lang_no": "https://cdn.discordapp.com/app-assets/1177802176140156998/1178413683383218256.png?size=512",
}
