const presence = new Presence({
    clientId: "1061324603022114998",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
const presenceData: PresenceData = {
    largeImageKey: "https://i.imgur.com/eIpvMGf.png",
    startTimestamp: browsingTimestamp,
},
{ pathname, href } = document.location;

    switch (pathname.split("/")[1]) {
        case "":
            presenceData.details = "In the Homepage";
            break;

        case "chat":
            presenceData.details = "Chatting with";

            let char = document
            .querySelector("head > title")
            .textContent.replace("Character.AI - ", "");
            
            let pict = document
            .querySelector("meta[property='og:image']")
            .getAttribute("content");

            let title = document
            .querySelector(".chattitle.p-0.pe-1.m-0")
            .textContent;

            if (pict = true){
                presenceData.largeImageKey = `${pict.replace("80", "400")}`
                presenceData.state = `${char}`;
                presenceData.buttons = [
                    { label: `Chat ${char}`, url: document.location.href },
                ]; 
            } else {
                presenceData.details = "Chatting in room";
                presenceData.state = `${title}`;
            }
            break;
        
        case "feed":
            presenceData.details = "Browsing the feed";
            break;

        case "post":
            let user = document.querySelector(".p-0.m-0").textContent;
            let title = document.querySelector(".pb-2").textContent;
                
            presenceData.details = "Viewing a post";
            presenceData.state = `${title} - ${user}`
            break;

        case "posts":
            let title = document.querySelector(".ps-2").textContent;
            let pict = document.querySelector(".sb-avatar__image").src;

            presenceData.details = "Browsing posts";
            presenceData.state = `\"${title}\"`;
            presenceData.smallImageKey = `${pict.replace("80", "400")}`;
            break;

        case "signup":
            presenceData.details = "Signing up";
            break;

        case "character":
            if (pathname.split("/")[2] === "create"){
            presenceData.details = "Creating a character";
                }
            presenceData.details = "Creating a character";
            break;

        case "chats":
            presenceData.details = "Browsing chats";
            break;

        case "community":
            presenceData.details = "Viewing the community tab";
            break;

        case "profile":
            presenceData.details = "Viewing my profile";
            break;
}

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});