export function makePossessive(name: string) {
	return name.endsWith("s") ? `${name}'` : `${name}'s`;
}

export function deEsser(word: string) {
	return word.endsWith("s") ? word.slice(0, -1) : word;
}

export function giveArticle(word: string) {
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
) {
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
