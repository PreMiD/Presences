const presence = new Presence({
    clientId: "1061324603022114998",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp,
};

if (document.location.pathname === "/")
    presenceData.details = "In the Homepage";

else if (document.location.pathname.startsWith("/chat")) {
        presenceData.details = "Chatting with";

        let char = document
        .querySelector("head > title")
        .textContent.replace("Character.AI - ", "");
        
        presenceData.state = `${char}`;

        let profile = document
                .querySelector('meta[name="og:image"]')
                .getAttribute("content");

        presenceData.largeImageKey = `${profile.replace("80", "400")}`
        presenceData.buttons = [
            { label: `Chat ${char}`, url: document.location.href },
        ];
             
} else if (document.location.pathname.startsWith("/feed")) {
    presenceData.details = "Browsing the feed";

} else if (document.location.pathname.startsWith("/post")) {
    presenceData.details = "Viewing a post";

} else if (document.location.pathname.startsWith("/signup")){
    presenceData.details = "Signing up";

} else if (document.location.pathname.startsWith("/character/create")){
    presenceData.details = "Creating a character";

} else if (document.location.pathname.startsWith("/chats")){
    presenceData.details = "Browsing chats";

} else if (document.location.pathname.startsWith("/community")) {
    presenceData.details = "Viewing the community tab";

} else if (document.location.pathname.startsWith("/profile")) {
    presenceData.details = "Viewing my profile";
    
}
else presenceData.details = "Browsing...";

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});