const presence = new Presence({
  clientId: "754549450772316160"
});

let elapsed = 0,
  old = "";

presence.on("UpdateData", () => {

  let details : string,
    state : string,
    title : string,
    alt : string,
    comicNumber : string;

  if(window.location.href !== old){
    old = window.location.href;
    elapsed = Math.round(Date.now() / 1000);
  }

  if(!isNaN(Number(location.pathname.replace(/\//g,"")))){
    title = document.getElementById("ctitle").textContent;
    alt = document.querySelector("#comic > img").getAttribute("title");
    comicNumber = document.querySelector("[property=\"og:url\"]").getAttribute("content").split("xkcd.com/")[1].split("/")[0];
    details = `Reading #${comicNumber}`;
    state = title;
  }

  const data : PresenceData = {
    details: details,
    state: state,
    largeImageKey: "logo",
    smallImageKey: "help",
    smallImageText: alt,
    startTimestamp: elapsed
  };

  if(data.details == null){
    presence.setTrayTitle();
    presence.setActivity();
  }else{
    presence.setActivity(data);
  }

});
