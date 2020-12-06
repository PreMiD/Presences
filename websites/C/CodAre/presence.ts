const presence = new Presence({
  clientId: "737633529738952765"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
   },
  searchURL = new URL(document.location.href),
  searchResult = searchURL.searchParams.get("q"),
  searchCategory = searchURL.searchParams.get("k");;

	
   if (window.location.pathname.toLowerCase() === "/") {
      presenceData.details = "Bir sayfa görüntülüyor:";
      presenceData.state = "Anasayfa";
	}    
   if (window.location.pathname.toLowerCase() === "/yetkililer") {
      presenceData.details = "Bir sayfa görüntülüyor:";
      presenceData.state = "Yetkililer";
	}     
   if (window.location.pathname.toLowerCase() === "/sss") {
      presenceData.details = "Bir sayfa görüntülüyor:";
      presenceData.state = "Sıkça Sorulan Sorular (S.S.S)";
	}     
   if (window.location.pathname.toLowerCase() === "/v11tov12") {
      presenceData.details = "Bir sayfa görüntülüyor:";
      presenceData.state = "v11 To v12";
	}
   if (window.location.pathname.toLowerCase().includes("/profil")) {
      presenceData.details = "Bir kullanıcı profili görüntülüyor:";
      presenceData.state = document.querySelector('#page-top > div.container-fluid > div > div.col-lg-4 > div > div > div > a').innerHTML + ' ' + '('+ document.querySelector('#page-top > div.container-fluid > div > div.col > div > div.card-body > h4:nth-child(4) > span').innerHTML +')' ;
	}    
	if (document.location.pathname.toLowerCase().includes('/arama')) {
	  presenceData.details = "Bir kod arıyor:";
      if(!searchCategory) presenceData.state = searchResult.charAt(0).toUpperCase() + searchResult.slice(1).toLocaleString();
	  if(searchCategory) presenceData.state = searchCategory.replace('html', 'HTML').replace('jsplus', 'Javascript+').replace('diger', 'Diğer').replace('altyapi', 'Altyapı').replace('booster', 'Booster').replace('py', 'PYTHON').replace('js', 'Javascript') + ' adlı kategoride' + ' ' +searchResult.charAt(0).toUpperCase() + searchResult.slice(1).toLocaleString() + ' adlı kodu arıyor';
	}
	if (window.location.pathname.toLowerCase().includes("/uptime")) {
      presenceData.details = "Bir sayfa görüntülüyor:";
      presenceData.state = "Uptime"
	  }
	if (window.location.pathname.toLowerCase() === "/admin/paylas") {
      presenceData.details = "Bir admin sayfası görüntülüyor:";
      presenceData.state = "Paylaş";
	}
	if (window.location.pathname.toLowerCase() === "/admin/kodlar") {
      presenceData.details = "Bir admin sayfası görüntülüyor:";
      presenceData.state = "Kodlar";
	}
	if (window.location.pathname.toLowerCase() === "/admin/yorumlar") {
      presenceData.details = "Bir admin sayfası görüntülüyor:";
      presenceData.state = "Yorumlar";
	}
   if(window.location.pathname.toLowerCase() === '/kategori/js') {
      presenceData.details = "Bir kategori görüntülüyor:";
	  presenceData.state = "Javascript"
	}; 
   if(window.location.pathname.toLowerCase() === '/kategori/py') {
      presenceData.details = "Bir kategori görüntülüyor:";
	  presenceData.state = "Python"
	}; 
   if(window.location.pathname.toLowerCase() === '/kategori/html') {
      presenceData.details = "Bir kategori görüntülüyor:";
	  presenceData.state = "HTML"
	};
   if(window.location.pathname.toLowerCase() === '/kategori/diger') {
      presenceData.details = "Bir kategori görüntülüyor:";
	  presenceData.state = "Diğer"
	};
   if(window.location.pathname.toLowerCase() === '/kategori/js+') {
      presenceData.details = "Bir kategori görüntülüyor:";
	  presenceData.state = "Javascript+"
	};
   if(window.location.pathname.toLowerCase() === '/kategori/booster') {
      presenceData.details = "Bir kategori görüntülüyor:";
	  presenceData.state = "Booster"
	};
   if(window.location.pathname.toLowerCase() === '/kategori/altyapi') {
      presenceData.details = "Bir kategori görüntülüyor:";
	  presenceData.state = "Altyapı"
	};

	if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
