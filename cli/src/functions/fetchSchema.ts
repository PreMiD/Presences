import fetch from "cross-fetch";

export default async function fetchSchema() {
	return (await fetch("https://schemas.premid.app/metadata/1.11")).json();
}
