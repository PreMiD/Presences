let presence = new Presence({
    clientId: "650633388784615424"
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo",
        startTimestamp: new Date().getTime()
    };

    const path = document.location.pathname;

	console.log(path);

    if(path === '/pages' || path === '/pages/') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Home Page";
		presence.setActivity(presenceData);
	} else if (path === '/pages/enterprise') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Enterprise plans";
		presence.setActivity(presenceData);
	} else if (path.startsWith('/pages/solutions/')) {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Solutions";
		presence.setActivity(presenceData);
	} else if (path === '/pages/results') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Impact of LucidChart";
		presence.setActivity(presenceData);
	} else if (path === '/pages/integrations') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "LucidChart Integrations";
		presence.setActivity(presenceData);
	} else if (path === '/pages/case-studies') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Viewing Case Studies";
		presence.setActivity(presenceData);
	} else if (path === '/pages/resource-center') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Resource Center";
		presence.setActivity(presenceData);
	} else if (path === '/blog' || path === '/blog/') {
		presenceData.details = "Browsing LucidChart Blogs";
		presenceData.state = "Viewing all blogs";
		presence.setActivity(presenceData);
	} else if (path.startsWith('/blog/')) {
		const title = document.getElementsByClassName('main-article')[0].getElementsByTagName('h1')[0].innerText;
		presenceData.details = "Reading a LucidChart Blog";
		presenceData.state = title;
		presence.setActivity(presenceData);
	} else if (path === '/pages/tour') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Viewing examples";
		presence.setActivity(presenceData);
	} else if (path.startsWith('/users/registerLevel')) {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Viewing plans";
		presence.setActivity(presenceData);
	} else if (path === '/users/login') {
		presenceData.details = "Browsing LucidChart";
		presenceData.state = "Logging in...";
		presence.setActivity(presenceData);
	} else if (path === '/documents') {
		presenceData.details = "Editing a document";
		presenceData.state = "Viewing documents";
		presence.setActivity(presenceData);
	} else if (path.startsWith('/documents/edit/')) {
		const title = document.title.replace(': Lucidchart', '');
		presenceData.details = "Editing a document";
		presenceData.state = title;
		presence.setActivity(presenceData);
	}
});

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}