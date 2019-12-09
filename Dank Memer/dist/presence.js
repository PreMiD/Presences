var presence = new Presence({
    clientId: "653324146503188490",
    mediaKeys: false
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    if (window.location.pathname.endsWith("commands")) {
        presenceData.details = "Wieving a page:";
     presenceData.state = "Commands"
    }
 else if (window.location.pathname.endsWith("about")) {
       presenceData.details = "Wieving a page:";
    presenceData.state = "About"
   }
   else if (window.location.pathname.endsWith("blogs")) {
         presenceData.details = "Wieving a page:";
      presenceData.state = "Blogs"
    }
     else if (window.location.pathname.startsWith("/blogs/")) {
           presenceData.details = "Wieving a blog:";
           presenceData.state = document.querySelector("#root > div.psuedoBody > header").textContent
       }
       else if (window.location.pathname.includes("/store/presences/")) {
             presenceData.details = "Wieving a presence page:";
          presenceData.state = document.querySelector("#app > div.page-wrapper > div.content > div > div > div.fullpresence__header > div.header__title > h1").textContent
         }
         else if (window.location.pathname.endsWith("loot")) {
               presenceData.details = "Wieving a page:";
            presenceData.state = "Lootboxes"
           }

    presence.setActivity(presenceData);

});
