export default function getFolderLetter(service: string) {
	const firstLetter = service.trim().at(0)!.toUpperCase();

	if (firstLetter.match(/[A-Z]/)) return firstLetter;
	if (firstLetter.match(/[0-9]/)) return "0-9";
	return "#";
}
