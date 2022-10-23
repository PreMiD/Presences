const uploadedFiles: Record<string, string> = {};
export async function uploadFile(
	url: string,
	defaultImage: string,
	presence: Presence
): Promise<string> {
	if (uploadedFiles[url]) return uploadedFiles[url];
	uploadedFiles[url] = defaultImage;

	try {
		const data = await fetch(url).then(res => res.blob()),
			resultURL = await fetch("https://bashupload.com/", {
				method: "POST",
				body: data,
			})
				.then(res => res.text())
				.then(text => text.match(/https(.*)/)?.[0]);

		presence.info(resultURL);
		uploadedFiles[url] = resultURL;
		return resultURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}
