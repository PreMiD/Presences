var presence = new Presence({
    clientId: "630194809763790871",
    mediaKeys: false
});

var play, artist, track, title;
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "pastebinlogo"
    };
	
	let urlData = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'); // Get everything after the / in the URL, for paste ID's
	let currentPage = (document.title).slice(15); // Get the page title, and remove the "Pastebin.com - " part
	
    if (urlData.length == 8) {
    
        let element = document.querySelector('.paste_box_line1'); // Getting the element which contains the title in a HTML tag
		let pasteName = element.getAttribute	('title'); // Getting the title from the HTML tag
		
        presenceData.details = "Viewing a paste";
        presenceData.state = pasteName + " | " + urlData; // Displaying the paste name
        
      }  else {
    
            presenceData.details = "Browsing pastebin";
			
			if(currentPage === "#1 paste tool since 2002!") {
				currentPage = "Homepage"
			}
			
            presenceData.state = currentPage;
      }
	  
      presence.setActivity(presenceData);

      presence.setTrayTitle();
});
