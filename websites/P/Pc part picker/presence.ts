const presence = new Presence({
    clientId: "813691735838425128"
}), browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "pcpp", //banner
      startTimestamp: browsingStamp,
      details : "Viewing:"
    }; 

    if (document.location.pathname == ("/")) {
      presenceData.state ="Homepage";
    } 
    else if (document.location.pathname.startsWith("/list/")) {
      presenceData.details = "Creating:";
        presenceData.state ="New build";
    } 
    else if (document.location.pathname.endsWith("guide/")) {
        presenceData.details = "Searching:";
        presenceData.state ="Build guides";
    } 
    else if (document.location.pathname.startsWith("/guide/")) {
        presenceData.details = "Vieweing guide:";
        presenceData.state =document.querySelector("#buildguide-view > section > div.wrapper.wrapper__pageTitle > section > h1").textContent;
    } 
    else if (document.location.pathname.endsWith("builds/")) {
        presenceData.details = "Searching:";
        presenceData.state ="Completed builds";
    } 
    else if (document.location.pathname.startsWith("/b/")) {
        presenceData.state =document.querySelector("#userbuild-view > section > div > div.wrapper.wrapper__pageTitle > section > h1").textContent;
    } 
    else if (document.location.pathname.startsWith("/product/")) {
        presenceData.state =document.querySelector("#product-page > section > div.wrapper.wrapper__pageTitle.wrapper__pageTitle--rating > section > h1").textContent;
    } 
    else if (document.location.pathname.startsWith("/products/pricedrop/")) {
        presenceData.state =document.querySelector("#price-drops > div > div.wrapper.wrapper__pageTitle.wrapper__pageTitle--tabs > section > h1").textContent;
    } 
    else if (document.location.pathname.startsWith("/products")) {
        presenceData.details =document.querySelector("#products > section > div > div.wrapper.wrapper__pageTitle > section > h1").textContent;
    } 
    else if (document.location.pathname.endsWith("/blog/")) {
        presenceData.details = "Reading:";
        presenceData.state =document.querySelector("#blog-roll > div.wrapper.wrapper__pageTitle > section > h1").textContent;
    }
    else if (document.location.pathname.includes("/blog/")) {
      presenceData.details = "Reading:";
      presenceData.state =document.querySelector("#blog-article > div.wrapper.wrapper__pageTitle > section > h1").textContent;
    }  
    else if (document.location.pathname.endsWith("/forums/")) {
        presenceData.state ="Forums";
    } 
    else if (document.location.pathname.startsWith("/forums/forum/")) {
      presenceData.details ="Viewing forums:";
      presenceData.state = document.querySelector("#subforum > div.wrapper.wrapper__pageTitle > section > h1").textContent;
    }
    else if (document.location.pathname.startsWith("/forums/topic/")) {
      presenceData.details ="Reading:";
      presenceData.state = document.querySelector("#forumTopic > div.wrapper.wrapper__pageTitle > section > h1").textContent;
    }
    else if (document.location.pathname.startsWith("/trends")) {
        presenceData.state ="Price Trends";
    } 
    else if (document.location.pathname.startsWith("/accounts/login/")) {
        presenceData.details ="Login";
    } 
    else if (document.location.pathname.startsWith("/accounts/register/")) {
        presenceData.details ="Registration";
    } 
    else if (document.location.pathname.startsWith("/downloads/")) {
        presenceData.state ="Downloads";
    } 
    else if (document.location.pathname.startsWith("/about/")) {
      presenceData.details = "Reading:";  
      presenceData.state ="About us";
    } 
    else if (document.location.pathname.startsWith("/contact/")) {
        presenceData.details ="Sending Us a Message";
    }
    else if (document.location.pathname.startsWith("/search/")) {
      presenceData.details ="";
      presenceData.state = document.querySelector("#search-results > div.wrapper.wrapper__pageContent > section > section.module-subTitle > div > div > h2").textContent;
    } 
    else {
        presenceData.details = "Navigating....";
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
  
});