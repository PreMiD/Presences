let presence = new Presence({
    clientId: "609183409440555018"
}), startTimestamp = Math.floor(Date.now() / 1000), subReddit, postTitle, username, nickname, rpanTitle, strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
}), oldReddit = document.querySelector("._1tvdSTbdxaK-BnUbzUIqIY") == null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQzlDLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLEVBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsSUFBSSxJQUFJLENBQUM7QUFFekUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGNBQWM7S0FDZixDQUFDO0lBQ0YsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDckMsSUFBSSxTQUFTLEVBQUU7UUFDYixTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7WUFDL0MsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDMUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNYLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNuQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDOUQsWUFBWSxDQUFD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