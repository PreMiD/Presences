var presence = new Presence({
    clientId: "670612134878773297",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "canva"
    };
		 if (document.location.pathname == ("/")) {
    data.details = "In the Homepage",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/folder")) {
        if (document.location.pathname.startsWith("/folder/all-designs")){
        data.details = "Browsing his designs",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if(document.location.pathname.startsWith("/folder/uploads")){
        data.details = "Browsing the photos he",
        data.state = "uploaded",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if(document.location.pathname.startsWith("/folder/purchased")){
        data.details = "Browsing the photos he",
        data.state = "purchased",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if(document.location.pathname.startsWith("/folder/likes")){
        data.details = "Browsing the photos he",
        data.state = "likes",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if(document.location.pathname.startsWith("/folder/shared")){
        data.details = "Browsing the designs and",
        data.state = "photos shared with him",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if(document.location.pathname.startsWith("/folder/trash")){
        data.details = "Browsing the trash",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname == ("/folder/")) {
        data.details = "Browsing his folders",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname == ("/folder")) {
        data.details = "Browsing the folders",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else {
    var foldername = document.querySelector("head > title").textContent;
    data.details = "Browsing the folder: ",
    data.state = foldername.replace(" - Canva", ""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data); }
    } else if (document.location.pathname.startsWith("/templates/")) {
        if (document.location.pathname.startsWith("/templates/search/")){
        data.details = "Searching templates",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else {
    data.details = "Browsing the templates",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    } else if (document.location.pathname.startsWith("/photos/")) {
        if (document.location.pathname.startsWith("/photos/search/")){
        var photoname = document.querySelector("head > title").textContent;
        data.details = "Searching photos of:",
        data.state = photoname.split(" - ")[0],
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else {
    data.details = "Browsing the photos",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data); 
    }
    } else if (document.location.pathname.startsWith("/brand")) {
    data.details = "Editing his brand",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/teams")) {
        if (document.location.pathname.startsWith("/teams/designs")){
        data.details = "Browsing the team designs",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/teams/folders")) {
        data.details = "Browsing the team folders",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/teams/members")) {
        data.details = "Viewing the team",
        data.state = "members",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/teams/groups")) {
        data.details = "Viewing the team groups",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/teams/create")) {
        data.details = "Creating a new group",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else {
    data.details = "Browsing the team info",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    } else if (document.location.pathname.startsWith("/groups/")) {
        if (document.location.pathname.endsWith("/designs")){
        data.details = "Browsing the group",
        data.state = "designs",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.endsWith("/folders")) {
        data.details = "Browsing the group folders",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.endsWith("/members")) {
        data.details = "Viewing the group",
        data.state = "members",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else {
    data.details = "Browsing the group info",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    } else if (document.location.pathname.startsWith("/account")) {
        if (document.location.pathname.startsWith("/account/information")){
        data.details = "In the account settings",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/account/billing")) {
        data.details = "In the billing settings",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/account/print-orders")) {
        data.details = "Viewing his Print Orders",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else {
    data.details = "In the account settings",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    } else if (document.location.pathname.startsWith("/rewards")) {
    data.details = "Inviting friends",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/design/")) {
        if (document.location.pathname.endsWith("/edit")){
        var designe = document.querySelector("head > title").textContent;
        data.details = "Editing the design:",
        data.smallImageKey = "brush",
        data.state = designe,
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.endsWith("/view")) {
        var designv = document.querySelector("head > title").textContent;
        data.details = "Watching the design:",
        data.state = designv,
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else {
    data.details = "Viewing a design",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    } else {
    data.details = "Browsing...",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    };
});