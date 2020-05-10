const presence = new Presence({
    clientId: "635876670146084880"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "coin"
    };
    const q = new URLSearchParams(window.location.search);
    if (window.location.href.includes("gdbrowser.com")) {
        if (window.location.pathname.toLowerCase() !== "/" ||
            window.location.pathname.toLowerCase() === "/daily" ||
            window.location.pathname.toLowerCase() === "/weekly") {
            const downloads = document.getElementsByClassName("inline smaller spaced")[0].innerHTML;
            const likes = document.getElementsByClassName("inline smaller spaced")[1]
                .innerHTML;
            const orbs = document.getElementsByClassName("orbs")[1].innerHTML;
            presenceData.state = `🔽 ${downloads} | 👍 ${likes} | 🔵 ${orbs}`;
            presenceData.details = `${document.getElementsByTagName("h1")[0].innerText} ${document.getElementById("authorLink").innerText}`;
            presenceData.smallImageKey = `diff_${document
                .getElementById("difficultytext")
                .innerHTML.toLowerCase()
                .replace("<br>", "_")}`;
            presenceData.smallImageText = `${document
                .getElementById("difficultytext")
                .innerHTML.replace("<br>", " ")}`;
        }
        if (window.location.pathname.toLowerCase() === "/") {
            if (document.getElementById("credits").style.display === "block") {
                presenceData.details = "Viewing the credits";
                presenceData.state = "❤";
            }
            else {
                presenceData.details = "Viewing the homepage";
            }
        }
        if (window.location.pathname.toLowerCase() === "/iconkit") {
            presenceData.details = "In the iconkit";
        }
        if (window.location.pathname.toLowerCase().includes("/search")) {
            if (window.location.pathname.toLowerCase() === "/search") {
                presenceData.details = "Searching for levels";
            }
            else {
                presenceData.details = "Searching for levels";
                if (parseInt(q.get("mappack")) === 1) {
                    presenceData.state = "Viewing a map pack";
                }
                switch (q.get("type")) {
                    case "recent":
                        presenceData.state = "🕒 Viewing recent levels";
                        break;
                    case "mostdownloaded":
                        presenceData.state = "🔽 Viewing top downloaded levels";
                        break;
                    case "mostliked":
                        presenceData.state = "👍 Viewing top liked levels";
                        break;
                    case "trending":
                        presenceData.state = "📈 Viewing trending levels";
                        break;
                    case "magic":
                        presenceData.state = "✨ Viewing magic levels";
                        break;
                    case "awarded":
                        presenceData.state = "⭐ Viewing awarded levels";
                        break;
                    case "featured":
                        presenceData.state = "⭐ Viewing featured levels";
                        break;
                    case "followed":
                        presenceData.state = "💙 Viewing followed levels";
                        break;
                }
                switch (q.get("diff")) {
                    case "1":
                        presenceData.state = "😄 Viewing Easy levels";
                        break;
                    case "2":
                        presenceData.state = "😃 Viewing Normal levels";
                        break;
                    case "3":
                        presenceData.state = "😅 Viewing Hard levels";
                        break;
                    case "4":
                        presenceData.state = "😐 Viewing Harder levels";
                        break;
                    case "5":
                        presenceData.state = "🙁 Viewing Insane levels";
                        break;
                    case "-1":
                        presenceData.state = "😶 Viewing Unrated levels";
                        break;
                    case "-2":
                        switch (q.get("demonFilter")) {
                            case "1":
                                presenceData.state = "😠 Viewing Easy Demons";
                                break;
                            case "2":
                                presenceData.state = "😡 Viewing Medium Demons";
                                break;
                            case "3":
                                presenceData.state = "🤬 Viewing Hard Demons";
                                break;
                            case "4":
                                presenceData.state = "😈 Viewing Insane Demons";
                                break;
                            case "5":
                                presenceData.state = "👿 Viewing Extreme Demons";
                                break;
                        }
                        break;
                    default:
                        presenceData.state = `Searching for ${document.getElementById("header").innerHTML}`;
                }
            }
        }
        if (window.location.pathname.toLowerCase().includes("/mappacks")) {
            presenceData.details = "Viewing the Map Packs";
        }
        if (window.location.pathname.toLowerCase().includes("/gauntlets")) {
            presenceData.details = "Viewing the Gauntlets";
        }
        if (window.location.pathname.toLowerCase().includes("/leaderboards")) {
            presenceData.details = "Viewing the leaderboards";
        }
        if (window.location.pathname.toLowerCase() === "/messages") {
            presenceData.details = "Checking messages";
        }
        if (window.location.pathname.toLowerCase().includes("/profile")) {
            presenceData.details = `Looking at ${window.location.href.split("/")[4]}'s profile`;
        }
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsTUFBTSxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV0RCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUVsRCxJQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLEdBQUc7WUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUTtZQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxTQUFTLEVBQ3BEO1lBQ0EsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUMvQyx1QkFBdUIsQ0FDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDZixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3RFLFNBQVMsQ0FBQztZQUNiLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDbEUsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLFNBQVMsU0FBUyxLQUFLLFNBQVMs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