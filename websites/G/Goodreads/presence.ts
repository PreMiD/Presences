const presence = new Presence({
	clientId: "765622778317373440"
}),
elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo-1"
	},
	path = window.location.href.replace(window.location.origin, ''),
	urlParamshere = new URLSearchParams(window.location.search);

	if(path === '/'){
		presenceData.details = "Browsing Home";
	}else if(path.startsWith('/book/show/')){
		bookname = Document.getElementById("bookTitle").innerHTML;
		presenceData.details = "Browsing " + bookname;
	}else if(path.startsWith('/search')){
		const searchTerm = <HTMLInputElement>Document.getElementById("search_query_main").value;
		presenceData.details = "Searching for: " + searchTerm;
	}else if(path.startsWith('/author/show/')){
		author = Document.querySelector("h1.authorName span[itemprop=\"name\"]").innerHTML;
		presenceData.details = "Viewing " + author + "'s profile";
	}else{
		presenceData.details = "Browsing a goodreads page";
	}
	presenceData.startTimestamp = elapsed;

	if (presenceData.details == null) {
		presence.setTrayTitle();
		presence.setActivity();
	} else {
		presence.setActivity(presenceData);
	}
});
