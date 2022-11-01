const presence = new Presence({
		clientId: "1036066765735727144",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/1rey7rc.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, hostname } = window.location,
		pathSplit = pathname.split("/").slice(1);

	function useBlogPostState(namespace: string): void {
		if (pathSplit[1] === "page" || pathSplit[1] === "") {
			presenceData.details = `Browsing ${namespace} posts`;
		} else {
			presenceData.details = `Reading a ${namespace} post`;
			presenceData.state = document.querySelector("h1").textContent;
			presenceData.buttons = [{ label: "Read Post", url: href }];
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(".post-cover").src;
		}
	}

	switch (hostname) {
		case "fly.io":
		case "www.fly.io": {
			switch (pathSplit[0]) {
				case "": {
					presenceData.details = "Browsing the homepage";
					break;
				}
				case "blog": {
					useBlogPostState("blog");
					break;
				}
				case "phoenix-files": {
					useBlogPostState("Phoenix Files");
					break;
				}
				case "laravel-bytes": {
					useBlogPostState("Laravel Bytes");
					break;
				}
				case "ruby-dispatch": {
					useBlogPostState("Ruby Dispatch");
					break;
				}
				case "docs": {
					presenceData.details = "Reading the documentation";
					presenceData.state = document.querySelector("h1").textContent;
					break;
				}
				default: {
					presenceData.details = "Browsing";
					presenceData.state = document.title.match(/^(.*)( · .*?)?$/)[1];
					break;
				}
			}
			break;
		}
		case "community.fly.io": {
			break;
		}
	}

	presence.setActivity(presenceData);
});
