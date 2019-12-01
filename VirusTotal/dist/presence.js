let presence = new Presence({
    clientId: "650675444374306836"
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo",
        startTimestamp: new Date().getTime()
    };

    const path = document.location.pathname;
	
	if(path === '/') {
		presenceData.details = "Browsing Virus Total",
		presenceData.state = "Home Page"
		presence.setActivity(presenceData);
	} else if (path === '/gui/home') {
		presenceData.details = "Browsing Virus Total",
		presenceData.state = "Uploading a file"
		presence.setActivity(presenceData);
	} else if (path === '/gui/upload') {
		presenceData.details = "Browsing Virus Total",
		presenceData.state = "Uploading a file"
		presence.setActivity(presenceData);
	} else if (path === '/gui/url') {
		presenceData.details = "Browsing Virus Total",
		presenceData.state = "Virus checking a URL"
		presence.setActivity(presenceData);
	} else if (path === '/gui/search') {
		presenceData.details = "Browsing Virus Total",
		presenceData.state = "Searching files"
		presence.setActivity(presenceData);
	} else if (path === '/gui/file-analysis') {
		presenceData.details = "Browsing Virus Total",
		presenceData.state = "Waiting for a file to be analysed..."
		presence.setActivity(presenceData);
	} else if (path.startsWith('/gui/file/') && path.endsWith('/detection')) {
		const header = document.getElementsByTagName('body')[0]
			.getElementsByTagName('vt-virustotal-app')[0]
			.shadowRoot.getElementById('mainContent')
			.getElementsByTagName('vt-auth-checker')[0]
			.getElementsByTagName('file-view')[0]
			.shadowRoot.getElementById('report')
			.shadowRoot.querySelector('.wrapper')
			.getElementsByTagName('header')[1];

		const fileName = header.getElementsByTagName('vt-ui-file-card')[0]
			.shadowRoot.querySelector('vt-ui-generic-card')
			.querySelector('div.object-id')
			.getElementsByClassName('file-name')[0]
			.getElementsByTagName('a')[0]
			.innerHTML;
		
		const viruses = {
			positive: header.getElementsByClassName('veredict-widget')[0]
				.getElementsByTagName('vt-ui-detections-widget')[0]
				.shadowRoot.querySelector('div.positives')
				.innerHTML + " ",
			total: header.getElementsByClassName('veredict-widget')[0]
				.getElementsByTagName('vt-ui-detections-widget')[0]
				.shadowRoot.querySelector('div.total')
				.innerHTML
		}

		presenceData.details = "Viewing detected viruses (File)",
		presenceData.state = `${fileName} (${viruses.positive}${viruses.total})`
		presence.setActivity(presenceData);
	} else if (path.startsWith('/gui/url/') && path.endsWith('/detection')) {
		const header = document.getElementsByTagName('body')[0]
			.getElementsByTagName('vt-virustotal-app')[0]
			.shadowRoot.getElementById('mainContent')
			.getElementsByTagName('vt-auth-checker')[0]
			.getElementsByTagName('url-view')[0]
			.shadowRoot.getElementById('report')
			.shadowRoot.querySelector('div.wrapper')
			.getElementsByTagName('header')[1];

		const url = header.getElementsByTagName('vt-ui-url-card')[0]
			.shadowRoot.querySelector('vt-ui-generic-card')
			.querySelector('div.url-id')
			.innerHTML
		
		const viruses = {
			positive: header.getElementsByClassName('veredict-widget')[0]
				.getElementsByTagName('vt-ui-detections-widget')[0]
				.shadowRoot.querySelector('div.positives')
				.innerHTML + " ",
			total: header.getElementsByClassName('veredict-widget')[0]
				.getElementsByTagName('vt-ui-detections-widget')[0]
				.shadowRoot.querySelector('div.total')
				.innerHTML
		}

		presenceData.details = "Viewing detected viruses (URL)",
		presenceData.state = `${url} (${viruses.positive}${viruses.total})`
		presence.setActivity(presenceData);
	} else if (path.startsWith('/gui/search/')) {
		const searchQ = document.getElementsByTagName('body')[0]
			.getElementsByTagName('vt-virustotal-app')[0]
			.shadowRoot.querySelector('iron-pages')
			.getElementsByTagName('vt-ui-omnibar')[0]
			.getElementsByTagName('span')[0]
			.getElementsByTagName('vt-ui-search-bar')[0]
			.shadowRoot.getElementById('wrapper')
			.getElementsByTagName('vt-ui-text-input')[0]
			.shadowRoot.querySelector('input#input')
			.value;
		
		presenceData.details = "Searching for virus scans",
		presenceData.state = searchQ
		presence.setActivity(presenceData);
	}
});

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}