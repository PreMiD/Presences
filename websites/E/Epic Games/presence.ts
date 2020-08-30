const presence = new Presence({
    clientId: "749642170813907004"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp,
  };

  const pathname = document.location.pathname;
  const hostname = document.location.hostname;

  if(
    hostname === "epicgames.com" || hostname === "www.epicgames.com"
    ){
      // Epic Games Store

      if(pathname === "/store/en-US/"){
        presenceData.details = "Viewing:";
        presenceData.state = "Store";
      }

      if(pathname.startsWith("/store/en-US/product")){
        const gameName = document.querySelector("#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > nav.css-1v9fujt-PageNav__topNav-PageNav__desktopNav-PageNav__themed > div > nav > div > div.css-eizwrh-NavigationBar__contentPrimary > ul > li:nth-child(2) > a > h2 > span").textContent;
        presenceData.details = "Viewing game:";
        presenceData.state = gameName;
      }

      if(pathname.startsWith("/store/en-US/bundles")){
        const bundleName = document.querySelector("#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > nav.css-1v9fujt-PageNav__topNav-PageNav__desktopNav-PageNav__themed > div > nav > div > div.css-eizwrh-NavigationBar__contentPrimary > ul > li:nth-child(2) > a > h2 > span").textContent;
        presenceData.details = "Viewing bundle:";
        presenceData.state = bundleName;
      }

      if(pathname === "/store/en-US/news"){
        presenceData.details = "Viewing:";
        presenceData.state = "News";
      }

      if(pathname.startsWith("/store/en-US/news/")){
        const articleName = document.querySelector("#storeNews > div > section > div > article > div > div.blog-header-info > div:nth-child(1) > div > h1").textContent;
        presenceData.details = "Reading article:";
        presenceData.state = articleName;
      }

      if(pathname === "/store/en-US/about"){
        presenceData.details = "Viewing:";
        presenceData.state = "About Page";
      }

      if(pathname === "/store/en-US/redeem"){
        presenceData.details = "Redeeming";
      }

      // Epic Games Site

      if(pathname === "/site/en-US/home"){
        presenceData.details = "Viewing:";
        presenceData.state = "Home Page";
      }

      if(pathname === "/site/en-US/epic-games-store-faq"){
        presenceData.details = "Viewing:";
        presenceData.state = "FAQ Page";
      }

      // Epic Games account management & more

      if(pathname.startsWith("/account/")){
        const nav = document.querySelector(".navigation-section");
        const activeSetting = nav.querySelector(".active").textContent;
        presenceData.details = "Changing account details:";
        presenceData.state = activeSetting;
      }

      // Epic Games Help page

      if(pathname === "/help/en-US/"){
        presenceData.details = "Viewing:";
        presenceData.state = "Help Page";
      }

      if(pathname.startsWith("/help/en-US/")){
        const helpHeading = document.querySelector("#epicGamesReactWrapper > div > div.eg-content > div > div.sspgrid-container > div.Layout2Cols__wrapper.LayoutCol7Col4__wrapper > div > div.Layout2Cols__body-col--main.sspgrid-col-lg-7 > div.Article__wrapper > h1");
        if(helpHeading === null){
          presenceData.details = null;
        }else {
          presenceData.details = "Viewing help article:";
          presenceData.state = helpHeading.textContent;
        }
      }
    }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
