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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQzlDLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLEVBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsSUFBSSxJQUFJLENBQUM7QUFFeEUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxZQUFZLEdBQWlCO1FBQ2xDLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGNBQWM7S0FDZCxDQUFDO0lBQ0YsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDckMsSUFBSSxTQUFTLEVBQUU7UUFDZCxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7WUFDaEQsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDMUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNWLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNwQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDOUQsWUFBWSxDQUFD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