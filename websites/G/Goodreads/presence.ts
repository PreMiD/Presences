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
	  bookname = path.replace('/book/show/', '').replace(/[0-9]+\./, '').replace(/[0-9]+\-/, '').replace(/_/g, ' ').split('?')[0];
	  presenceData.details = "Browsing " + bookname;
  }else if(path.startsWith('/search')){
	  const searchTerm = urlParamshere.get('q').replace(/\+/g, ' ');
	  presenceData.details = "Searching for: " + searchTerm;
  }else if(path.startsWith('/author/show/')){
	  author = path.replace('/author/show/', '').replace(/[0-9]+\./, '').replace(/[0-9]+\-/, '').replace(window.location.search, '').replace(/_/g, ' ').split('?')[0];
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
