const presence = new Presence({
		clientId: "1004813284253380628",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Yb4CWnm.png",
			startTimestamp: browsingTimestamp,
		},
	{pathname: path, hostname: domain} = document.location;

	if(domain === "musixmatch.com" || domain === "www.musixmatch.com") {
		if(path === "/") 
			presenceData.details = "Viewing the home page";
		 else if(path.includes("/explore")) 
			presenceData.details = "Exploring lyrics";
		 else if(path.includes("/community")) 
			presenceData.details = "Viewing the community page";
		 else if(path.includes("/contribute")) 
			presenceData.details = "Viewing the contribute page";
		 else if(path.includes("/profile/me")) {
			//if user status = curator show curator badge
			if(document.querySelector("#site > div > div > div > main > div > div.mxm-user-header.mxm-user-header--profile > div > div:nth-child(1) > div:nth-child(2) > div > div > span")) {
				presenceData.smallImageKey = "https://i.imgur.com/Bl7BSIW.png";
				presenceData.smallImageText = "Curator";
			}
			presenceData.details = "Viewing their profile";
		 } else if(path.includes("/profile/")) {
			//if user status = curator show curator badge
			if(document.querySelector("#site > div > div > div > main > div > div.mxm-user-header.mxm-user-header--profile > div > div:nth-child(1) > div:nth-child(2) > div > div > span")) {
				presenceData.smallImageKey = "https://i.imgur.com/Bl7BSIW.png";
				presenceData.smallImageText = "Curator";
			}
			presenceData.details = `Viewing ${document.querySelector("#site > div > div > div > main > div > div.mxm-user-header.mxm-user-header--profile > div > div:nth-child(1) > div:nth-child(2) > div > div > h1").textContent}'s profile`;
		 } else if(path.includes("/search")) {
			presenceData.details = "Searching";
			presenceData.state = path.split("/")[2].replaceAll("%20", " ");
		 } else if(path.includes("/lyrics") && path.includes("/translation/")) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>("#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div > div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img").src;
			presenceData.smallImageKey = "https://i.imgur.com/Yb4CWnm.png";
			presenceData.details = `Reading ${path.split("/")[5]} translation`;
			presenceData.state = `${document.querySelector("#site h1").textContent} - ${document.querySelector("#site h2 > span > a").textContent}`;
		 } else if(path.includes("/lyrics")) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>("#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div > div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img").src;
			presenceData.smallImageKey = "https://i.imgur.com/Yb4CWnm.png";
			presenceData.details = "Reading lyrics";
			presenceData.state = `${document.querySelector("#site h1").textContent} - ${document.querySelector("#site h2 > span > a").textContent}`;
		 }
	} else if(domain === "curators.musixmatch.com") {
		if(path === "/" || path === "/missions") presenceData.details = "Browsing curator's missions";
		else if(path.includes("/tasks/")) 
			presenceData.details = `Browsing ${document.querySelector("#__next > div > div > div > div > div > div > div:nth-child(2) > div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-12vffkv.r-u8s1d.r-zchlnj.r-ipm5af > div.css-1dbjc4n.r-13awgt0.r-12vffkv > div > div > div > div > div > div.css-1dbjc4n.r-1mdbw0j.r-1guathk > div > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1wtj0ep.r-1wzrnnt > div.css-901oao.r-jwli3a.r-1grxjyw.r-uho16t.r-146t82q.r-tskmnb.r-fdjqy7").textContent} tasks`;
		 else if(path.includes("/tool")) {
			presenceData.details = "Editing lyrics";
			presenceData.state = `${document.querySelector("#__next > div > div > div > div > div > div > div > div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-12vffkv.r-u8s1d.r-zchlnj.r-ipm5af > div.css-1dbjc4n.r-13awgt0.r-12vffkv > div > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > div.css-1dbjc4n.r-13awgt0.r-1jkjb > div.css-901oao.css-bfa6kz.r-a023e6.r-rjixqe.r-fdjqy7").textContent} - ${document.querySelector("#__next > div > div > div > div > div > div > div > div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-12vffkv.r-u8s1d.r-zchlnj.r-ipm5af > div.css-1dbjc4n.r-13awgt0.r-12vffkv > div > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > div.css-1dbjc4n.r-13awgt0.r-1jkjb > div.css-901oao.css-bfa6kz.r-jwli3a.r-1inkyih.r-1kfrs79.r-rjixqe.r-fdjqy7").textContent}`;
		}
	}

	presence.setActivity(presenceData);
}); 
