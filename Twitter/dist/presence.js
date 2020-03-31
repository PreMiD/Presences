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
const capitalize = (text) => {
    var texts = text.replace(/[\[{(_)}\]]/g, " ").split(" ");
    return texts
        .map(str => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQ1QsMEtBQTBLLENBQzNLLENBQUM7QUFFRixJQUFJLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFFcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxLQUFLLEVBQ1AsSUFBSSxFQUNKLEtBQUssR0FBRyxTQUFTLENBQUM7SUFFcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFdEMsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDbkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELEtBQUssR0FBRyxhQUFhLENBQUM7SUFDdEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3RCLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDdEIsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0tBQzNCO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFCLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDdEIsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0tBQ3pCO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVCLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSTthQUNqRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2IsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pCLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztRQUM3QixJQUFJLFlBQVksR0FBNEIsUUFBUSxDQUFDLGdCQUFnQixDQUNuRSx3QkFBd0IsQ0FDekIsQ0FBQztRQUNGLElBQUksWUFBWSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQ2xDLElBQUksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsSUFBSSxTQUFTLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ2pELHVIQUF1SCxDQUN4SCxDQUFDO0lBRUYsSUFBSSxTQUFTLEVBQUU7UUFDYixLQUFLLEdBQUcscUJBQXFCLENBQUM7UUFDOUIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsT0FBTyxVQUFVLENBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ25CLEVBQUUsQ0FBQztRQUVKLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUMvQixLQUFLLEdBQUcsbUNBQW1DLENBQUM7U0FDN0M7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEIsS0FBSyxHQUFHLDJCQUEyQixDQUFDO1NBQ3JDO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hCLEtBQUssR0FBRywyQkFBMkIsQ0FBQztTQUNyQztLQUNGO0lBRUQsSUFBSSxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDaEQsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1FBQzVCLElBQUksR0FBRyxTQUFTLENBQ2QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsa0hBQWtILENBQ25ILEVBQ0QsT0FBTyxDQUNSLENBQUM7S0FDSDtJQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLEVBQUU7UUFDeEMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO1FBQzlCLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsSUFBSSxTQUFTLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ2pELDJFQUEyRSxDQUM1RSxDQUFDO0lBRUYsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUN2QyxLQUFLLEdBQUcscUJBQXFCLENBQUM7UUFDOUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFO1FBQ3JDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUM1QixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN2QztJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDeEQsSUFBSSxTQUFTLEdBQ1gsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztZQUMxQyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFM0MsS0FBSyxHQUFHLGNBQWMsU0FBUyxDQUFDLGlCQUFpQixXQUFXLENBQUM7UUFDN0QsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNqQixLQUFLLEdBQUcsV0FBVyxDQUFDO1FBRXBCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6RCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFbkUsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksR0FBRyxxQkFBcUIsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1NBQ3BEO0tBQ0Y7SUFFRCxJQUFJLElBQUksR0FBaUI7UUFDdkIsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsSUFBSTtRQUNYLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLGNBQWMsRUFBRSxPQUFPO0tBQ3hCLENBQUM7SUFFRixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sS0FBSztTQUNULEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNULE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLFNBQVMsU0FBUyxDQUNoQixPQUFvQixFQUNwQixLQUFhLE1BQU0sRUFDbkIsTUFBZSxJQUFJO0lBRW5CLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7UUFDakMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztLQUN2QztTQUFNO1FBQ0wsSUFBSSxHQUFHO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FDVCw2S0FBNks7Z0JBQzNLLEVBQUUsRUFDSixzR0FBc0csRUFDdEcsc0dBQXNHLEVBQ3RHLGVBQWUsQ0FDaEIsQ0FBQztRQUNKLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDIn0=