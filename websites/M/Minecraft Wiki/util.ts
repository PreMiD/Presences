const promiseCache = new Map<string, Promise<any>>();

export async function getUserNamespace() {
	const cached = sessionStorage.getItem("PMD_UserNamespace");
	if (cached) return cached;
	let response: Response;
	const promise = promiseCache.get("getUserNamespace");
	if (promise) response = await promise;
	else {
		const promise = fetch(
			`https://${document.location.hostname}/w/User:Example`
		);
		promiseCache.set("getUserNamespace", promise);
		response = await promise;
	}
	sessionStorage.setItem(
		"PMD_UserNamespace",
		new URL(response.url).pathname.split("/").filter(Boolean)[1].split(":")[0]
	);
	return sessionStorage.getItem("PMD_UserNamespace");
}

export async function getTalkNamespace() {
	const cached = sessionStorage.getItem("PMD_TalkNamespace");
	if (cached) return cached;
	let response: Response;
	const promise = promiseCache.get("getTalkNamespace");
	if (promise) response = await promise;
	else {
		const promise = fetch(
			`https://${document.location.hostname}/w/Talk:Example`
		);
		promiseCache.set("getTalkNamespace", promise);
		response = await promise;
	}
	sessionStorage.setItem(
		"PMD_TalkNamespace",
		new URL(response.url).pathname.split("/").filter(Boolean)[1].split(":")[0]
	);
	return sessionStorage.getItem("PMD_TalkNamespace");
}
