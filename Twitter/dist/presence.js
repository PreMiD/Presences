const presence = new Presence({
    clientId: "612437291574755349"
});
console.log("When using the Twitter presence for PreMiD, make sure you have the latest UI update. Twitter classic and any legacy versions before it will not work with this presence.");
var oldUrl, elapsed;
presence.on("UpdateData", async () => {
    var title, info, image = "twitter";
    const path = window.location.pathname;
    if (oldUrl !== window.location.href) {
        oldUrl = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    title = "Browsing...";
    info = capitalize(path.split("/")[1]);
    if (path.match("/i/")) {
        info = capitalize(path.split("/")[2]);
    }
    if (path.match("/tos")) {
        title = "Browsing...";
        info = "Terms of Service";
    }
    if (path.match("/privacy")) {
        title = "Browsing...";
        info = "Privacy Policy";
    }
    if (path.match("/settings/")) {
        info = `${capitalize(path.split("/")[1])} for ${path
            .split("/")[2]
            .replace(/[\[{(_)}\]]/g, " ")}`;
    }
    if (path.match("/search")) {
        title = "Browsing Search...";
        var selectedList = document.querySelectorAll(".r-bzsno3 > div > span");
        if (selectedList === null)
            return;
        info = stripText(selectedList[1], "Selected");
    }
    var objHeader = document.querySelector("span.css-901oao.css-16my406.css-bfa6kz.r-jwli3a.r-1qd0xha.r-1vr29t4.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 > span > span");
    if (objHeader) {
        title = "Browsing Profile...";
        info = `${stripText(objHeader, "Object Header")} // ${capitalize(path.split("/")[1])}`;
        if (path.match("/with_replies")) {
            title = "Browsing Profile Tweet/Replies...";
        }
        if (path.match("/media")) {
            title = "Browsing Profile Media...";
        }
        if (path.match("/likes")) {
            title = "Browsing Profile Likes...";
        }
    }
    if (objHeader === null && path.match("/status/")) {
        title = "Browsing Tweet...";
        info = stripText(document.querySelector("div.css-901oao.css-bfa6kz.r-jwli3a.r-1qd0xha.r-a023e6.r-vw2c0b.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 > span > span"), "Tweet");
    }
    if (path.match("/messages") && objHeader) {
        title = "Browsing Message...";
        info = stripText(objHeader, "Object Header");
    }
    var etcHeader = document.querySelector("div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div > h2 > span");
    if (path.match("/moments") && etcHeader) {
        title = "Browsing Moments...";
        info = capitalize(path.split("/")[1]);
    }
    if (path.match("/lists") && etcHeader) {
        title = "Browsing Lists...";
        info = capitalize(path.split("/")[1]);
    }
    if (window.location.href.match("tweetdeck.twitter.com/")) {
        var container = document.querySelector("#container > div") ||
            document.createElement("HTMLDivElement");
        title = `Tweetdeck (${container.childElementCount} Columns)`;
        info = undefined;
        image = "tweetdeck";
        var header = document.querySelector(".mdl-header-title");
        var profile = document.querySelector(".js-action-url > .fullname");
        if (header) {
            info = "Viewing " + capitalize(header.textContent);
        }
        if (profile) {
            info = "Viewing Profile // " + profile.textContent;
        }
    }
    var data = {
        details: title,
        state: info,
        largeImageKey: image,
        startTimestamp: elapsed
    };
    presence.setActivity(data, true);
});
function capitalize(text) {
    var ret = "";
    var texts = text.replace(/[\[{(_)}\]]/g, " ").split(" ");
    texts.map(text => {
        ret += text.charAt(0).toUpperCase() + text.slice(1) + " ";
    });
    return ret;
}
function stripText(element, id = "None", log = true) {
    if (element && element.firstChild) {
        return element.firstChild.textContent;
    }
    else {
        if (log)
            console.log("%cTwitter%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: " +
                id, "font-weight: 800; padding: 2px 5px; color: white; border-radius: 25px 0 0 25px; background: #596cae;", "font-weight: 800; padding: 2px 5px; color: white; border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQ1YsMEtBQTBLLENBQzFLLENBQUM7QUFFRixJQUFJLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFFcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxLQUFLLEVBQ1IsSUFBSSxFQUNKLEtBQUssR0FBRyxTQUFTLENBQUM7SUFFbkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFdEMsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDcEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN4QztJQUVELEtBQUssR0FBRyxhQUFhLENBQUM7SUFDdEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDdEIsSUFB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