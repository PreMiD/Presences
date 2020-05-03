const presence = new Presence({
    clientId: "612437291574755349"
});
const capitalize = (text) => {
    var texts = text.replace(/[[{(_)}\]]/g, " ").split(" ");
    return texts
        .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    })
        .join(" ");
};
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
            .replace(/[[{(_)}\]]/g, " ")}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFVLEVBQUU7SUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELE9BQU8sS0FBSztTQUNULEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsU0FBUyxTQUFTLENBQUMsT0FBb0IsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsR0FBRyxJQUFJO0lBQzlELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7UUFDakMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztLQUN2QztTQUFNO1FBQ0wsSUFBSSxHQUFHO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FDVCw2S0FBNks7Z0JBQzNLLEVBQUUsRUFDSixzR0FBc0csRUFDdEcsc0dBQXNHLEVBQ3RHLGVBQWUsQ0FDaEIsQ0FBQztRQUNKLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCwwS0FBMEssQ0FDM0ssQ0FBQztBQUVGLElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUVwQixRQUFRLENB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