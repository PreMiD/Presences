export let buildIdentifier: string | null = null;

export async function getBuildIdentifier(presence: Presence) {
	if (!buildIdentifier) {
		buildIdentifier = await presence
			.getPageVariable(
				"netflix.reactContext.models.serverDefs.data.BUILD_IDENTIFIER"
			)
			.then(
				data =>
					data[
						"netflix.reactContext.models.serverDefs.data.BUILD_IDENTIFIER"
					] as string
			)
			.catch(() => null);
		return;
	}
}
