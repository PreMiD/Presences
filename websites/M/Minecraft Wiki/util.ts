async function getUserNamespace() {
	const cached = sessionStorage.getItem("PMD_UserNamespace");
	if (cached) return cached;
	const response = await fetch("/w/User:Example");
	sessionStorage.setItem(
		"PMD_UserNamespace",
		response.url.split("/").filter(Boolean)[1].split(":")[0]
	);
	return sessionStorage.getItem("PMD_UserNamespace");
}

async function getTalkNamespace() {
	const cached = sessionStorage.getItem("PMD_TalkNamespace");
	if (cached) return cached;
	const response = await fetch("/w/Talk:Example");
	sessionStorage.setItem(
		"PMD_TalkNamespace",
		response.url.split("/").filter(Boolean)[1].split(":")[0]
	);
	return sessionStorage.getItem("PMD_TalkNamespace");
}
