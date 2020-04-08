const presence = new Presence({
    clientId: "609183409440555018"
}), startTimestamp = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
}), oldReddit = document.querySelector("._1tvdSTbdxaK-BnUbzUIqIY") == null;
let subReddit, postTitle, username, nickname, rpanTitle;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "reddit_lg",
        startTimestamp
    };
    const { pathname } = window.location;
    if (oldReddit) {
        subReddit = document.querySelector(".redditname")
            ? `r/${document.querySelector(".redditname").textContent}`
            : `Home`;
        if (pathname.includes(`/comments/`)) {
            postTitle = document.querySelector("p.title > a").textContent;
            presenceData.details = `Reading '${postTitle}'`;
            presenceData.state = subReddit;
        }
        else if (pathname.startsWith(`/user/`)) {
            username = document.querySelector(".titlebox > h1").textContent;
            presenceData.details = `Looking at ${username}'s profile`;
        }
        else if (pathname.startsWith(`/search`)) {
            presenceData.details = "Searching...";
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Searching";
        }
        else {
            presenceData.details = (await strings).browsing;
            presenceData.state = subReddit;
        }
    }
    else {
        if (pathname.includes("/comments/")) {
            postTitle =
                document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h") != undefined
                    ? document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h").textContent
                    : "";
            subReddit = document.querySelector("span._1GieMuLljOrqnVpRAwz7VP")
                .textContent;
            subReddit =
                subReddit == "Home" &&
                    document.querySelectorAll("._19bCWnxeTjqzBElWZfIlJb")[1] != undefined
                    ? document.querySelectorAll("._19bCWnxeTjqzBElWZfIlJb")[1].textContent
                    : subReddit;
            presenceData.details = `Reading '${postTitle}'`;
            presenceData.state = subReddit;
        }
        else if (pathname.startsWith("/user/")) {
            username = document.querySelector("span._1GieMuLljOrqnVpRAwz7VP")
                .textContent;
            nickname = document.querySelector("h4._3W1eUu5jHdcamkzFiJDITJ")
                ? document.querySelector("h4._3W1eUu5jHdcamkzFiJDITJ").textContent
                : "";
            presenceData.details =
                nickname == ""
                    ? "Looking at a profile"
                    : `Looking at ${nickname}'s profile`;
            presenceData.state = username;
        }
        else if (pathname.startsWith("/search")) {
            presenceData.details = "Searching...";
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Searching";
        }
        else if (pathname.startsWith("/rpan")) {
            rpanTitle = document.querySelector("._17PXlsAvhmFm8yKmnpboBI")
                ? document.querySelector("._17PXlsAvhmFm8yKmnpboBI").textContent
                : "Loading title...";
            presenceData.details = "Watching RPAN";
            presenceData.state = rpanTitle;
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = (await strings).live;
        }
        else {
            subReddit = document.querySelector("span._1GieMuLljOrqnVpRAwz7VP")
                .textContent;
            presenceData.details = (await strings).browsing;
            presenceData.state = subReddit;
            delete presenceData.smallImageKey;
        }
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQzlDLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLEVBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDekUsSUFBSSxTQUFpQixFQUNuQixTQUFpQixFQUNqQixRQUFnQixFQUNoQixRQUFnQixFQUNoQixTQUFpQixDQUFDO0FBRXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsV0FBVztRQUMxQixjQUFjO0tBQ2YsQ0FBQztJQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3JDLElBQUksU0FBUyxFQUFFO1FBQ2IsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQzFELENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDWCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbkMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQzlE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