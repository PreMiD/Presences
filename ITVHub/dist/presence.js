let presence = new Presence({
    clientId: "645290651604221999"
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "itv_logo",
        startTimestamp: new Date().getTime()
    };

    const path = document.location.pathname;

    if(path === '/') {
        presenceData.details = "Browsing ITV Hub",
		presenceData.state = "Home Page"
		presence.setActivity(presenceData);
    } else if(path === '/hub/itv') {
        presenceData.details = "Watching live",
		presenceData.state = "Channel: ITV"
		presence.setActivity(presenceData);
    } else if(path === '/hub/itv2') {
        presenceData.details = "Watching live",
		presenceData.state = "Channel: ITV2"
		presence.setActivity(presenceData);
    } else if(path === '/hub/itvbe') {
        presenceData.details = "Watching live",
		presenceData.state = "Channel: ITVBe"
		presence.setActivity(presenceData);
    } else if(path === '/hub/itv3') {
        presenceData.details = "Watching live",
		presenceData.state = "Channel: ITV3"
		presence.setActivity(presenceData);
    } else if(path === '/hub/itv4') {
        presenceData.details = "Watching live",
		presenceData.state = "Channel: ITV4"
		presence.setActivity(presenceData);
    } else if(path === '/hub/citv') {
        presenceData.details = "Watching live",
		presenceData.state = "Channel: CITV"
		presence.setActivity(presenceData);
    } else if(path === '/hub/tv-guide') {
        presenceData.details = "Browsing ITV",
		presenceData.state = "Viewing the TV-Guide"
		presence.setActivity(presenceData);
    } else if(path === '/hub/shows') {
        presenceData.details = "Browsing ITV",
		presenceData.state = "Viewing shows"
		presence.setActivity(presenceData);
    } else if(path === '/hub/categories') {
        presenceData.details = "Browsing ITV",
		presenceData.state = "Viewing categories"
		presence.setActivity(presenceData);
    } else if(path.startsWith('/hub/categories/')) {
        let category = path.split('/')[path.split('/').length - 1];
        presenceData.details = "Browsing ITV",
		presenceData.state = `Viewing ${category} category`
		presence.setActivity(presenceData);
    } else if(/^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/.test(path.split('/')[path.split('/').length - 1])) { // Last path is a valid hex (Show ID)
        delete presenceData.startTimestamp;
        let showDetails = {
            name: document.getElementById('programme-title').innerText,
            episode: document.getElementsByClassName('episode-info__episode-title')[0].textContent.trim()
        }

        let video = document.getElementsByTagName('video')[0];
        if(!video.paused) {
            let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));

            presenceData.details = `Watching ${showDetails.name}`;
            presenceData.state = showDetails.episode;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = 'play';
            presenceData.smallImageText = 'Playing';
            presence.setActivity(presenceData);
        } else {
            presenceData.details = `Watching ${showDetails.name}`;
            presenceData.state = showDetails.episode;
            presenceData.smallImageKey = 'pause';
            presenceData.smallImageText = 'Paused';
            presence.setActivity(presenceData);
        }
    }
});

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}