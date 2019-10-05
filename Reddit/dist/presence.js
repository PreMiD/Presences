var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "609183409440555018"
}), startTimestamp = Math.floor(Date.now() / 1000), subReddit, postTitle, username, nickname, rpanTitle, strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
}), oldReddit = document.querySelector('._1tvdSTbdxaK-BnUbzUIqIY') == null;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const presenceData = {
        largeImageKey: "reddit_lg",
        startTimestamp
    };
    const { pathname } = window.location;
    if (oldReddit) {
        subReddit = document.querySelector('.redditname') ? `r/${document.querySelector('.redditname').textContent}` : `Home`;
        if (pathname.includes(`/comments/`)) {
            postTitle = document.querySelector('p.title > a').textContent;
            presenceData.details = `Reading '${postTitle}'`;
            presenceData.state = subReddit;
        }
        else if (pathname.startsWith(`/user/`)) {
            username = document.querySelector('.titlebox > h1').textContent;
            presenceData.details = `Looking at ${username}'s profile`;
        }
        else if (pathname.startsWith(`/search`)) {
            presenceData.details = "Searching...";
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Searching";
        }
        else {
            presenceData.details = (yield strings).browsing;
            presenceData.state = subReddit;
        }
    }
    else {
        if (pathname.includes("/comments/")) {
            postTitle = document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h") != undefined ? document.querySelector("div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h").textContent : "";
            subReddit = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
            subReddit = subReddit == "Home" && document.querySelectorAll('._19bCWnxeTjqzBElWZfIlJb')[1] != undefined ? document.querySelectorAll('._19bCWnxeTjqzBElWZfIlJb')[1].textContent : subReddit;
            presenceData.details = `Reading '${postTitle}'`;
            presenceData.state = subReddit;
        }
        else if (pathname.startsWith("/user/")) {
            username = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
            nickname = document.querySelector('h4._3W1eUu5jHdcamkzFiJDITJ') ? document.querySelector('h4._3W1eUu5jHdcamkzFiJDITJ').textContent : "";
            presenceData.details = nickname == "" ? "Looking at a profile" : `Looking at ${nickname}'s profile`;
            presenceData.state = username;
        }
        else if (pathname.startsWith('/search')) {
            presenceData.details = "Searching...";
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Searching";
        }
        else if (pathname.startsWith('/rpan')) {
            rpanTitle = document.querySelector('._17PXlsAvhmFm8yKmnpboBI') ? document.querySelector('._17PXlsAvhmFm8yKmnpboBI').textContent : "Loading title...";
            presenceData.details = "Watching RPAN";
            presenceData.state = rpanTitle;
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = (yield strings).live;
        }
        else {
            subReddit = document.querySelector('span._1GieMuLljOrqnVpRAwz7VP').textContent;
            presenceData.details = (yield strings).browsing;
            presenceData.state = subReddit;
            delete presenceData.smallImageKey;
        }
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBYyxJQUFJLFFBQVEsQ0FBQztJQUNuQyxRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFDRixjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQzlDLFNBQWtCLEVBQ2xCLFNBQWtCLEVBQ2xCLFFBQWlCLEVBQ2pCLFFBQWlCLEVBQ2pCLFNBQWtCLEVBQ2xCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzFCLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsSUFBSSxFQUFFLHdCQUF3QjtDQUNqQyxDQUFDLEVBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsSUFBSSxJQUFJLENBQUM7QUFFdkUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLE1BQU0sWUFBWSxHQUFrQjtRQUNoQyxhQUFhLEVBQUUsV0FBVztRQUMxQixjQUFjO0tBQ2pCLENBQUM7SUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxJQUFJLFNBQVMsRUFBRTtRQUNYLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN0SCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDakMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQzlELFlBQVks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