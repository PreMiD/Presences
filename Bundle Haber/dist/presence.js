var presence = new Presence({
    clientId: "651771207385088031",
    mediaKeys: false
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "bundle"
    };
   



    if (window.location.pathname.startsWith("/detay/")) {
       
       const kaynak =document.querySelector("body > div.site > div.detailpage > div > div.detail > div.channel > h4").textContent  
       
        presenceData.details = "Bir haber okuyor:";
         presenceData.state=document.querySelector("body > div.site > div.detailpage > div > h2").textContent + " | " + kaynak
              
        }

        //lol, thats all




    presence.setActivity(presenceData);

});