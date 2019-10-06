var presence = new Presence({
    clientId: "630447400716206114",
    mediaKeys: true
});

var play, artist, track, title;
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "upbeatlogo"
    };
	
	let urlData = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'); // Get everything after the / in the URL, for paste ID's
	let currentPage = (document.title).slice(15); // Get the page title, and remove the "Pastebin.com - " part
    
    if (window.location.pathname.includes("News.Article")) {
        presenceData.details = "Reading an article";

        let newsArticleName = (document.title).slice(9);
        presenceData.state = newsArticleName;
    }  else {
        presenceData.details = "Viewing a page";
        let pageName = (document.title).slice(9);
        presenceData.state = pageName;
      }
	  
      presence.setActivity(presenceData);
      presence.setTrayTitle();
});
