var presence = new Presence({
    clientId: "653644508507930645",
    mediaKeys: false
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo-dbl"
    };

    if (window.location.pathname.endsWith("bots")) {
        presenceData.details = "Wieving a page:";
     presenceData.state = "All bots"
    }
 else if (window.location.pathname.endsWith("contact")) {
       presenceData.details = "Wieving a page:";
    presenceData.state = "Contact"
   }
   else if (window.location.pathname.endsWith("api-docs")) {
         presenceData.details = "Wieving a page:";
      presenceData.state = "API Docs."
    }
     else if (window.location.pathname.startsWith("/bots/")) {
           presenceData.details = "Wieving a bot:";
           presenceData.state = document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong").textContent + document.querySelector("#main-content > div.container > div.collapsed.row.d-md-none.d-lg-none.d-xl-none > div > h1 > span.text-muted").textContent
       }

       else if (window.location.pathname.endsWith("partners")) {
             presenceData.details = "Wieving a page:";
          presenceData.state = "Partners"
        }
        else if (window.location.pathname.startsWith("/tags/")) {
              presenceData.details = "Wieving a tag:";
              presenceData.state = document.querySelector("#header > h1").textContent
          }


    presence.setActivity(presenceData);

});
