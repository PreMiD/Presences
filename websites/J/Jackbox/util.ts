const uploadedFiles: Record<string, string> = {};
export async function uploadFile(
	url: string,
	defaultImage: string,
	presence: Presence
): Promise<string> {
	if (uploadedFiles[url]) return uploadedFiles[url];
	uploadedFiles[url] = defaultImage;

	try {
		const imageData = await fetch(url).then(res => res.blob()),
			formData = new FormData();
		formData.append("file", imageData, "file");
		const resultURL = await fetch("https://pd.premid.com/create/image", {
			method: "POST",
			body: imageData,
		}).then(res => res.text());

		presence.info(resultURL);
		uploadedFiles[url] = resultURL;
		return resultURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}
