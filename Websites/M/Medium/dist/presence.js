const presence = new Presence({
    clientId: "632936001269923880"
}), pages = {
    "/elemental-by-medium": "Elemental by Medium",
    "/one-zero": "One Zero by Medium",
    "/gen": "Gen by Medium",
    "/zora": "ZORA by Medium",
    "/forge": "Forge by Medium",
    "/human-parts": "Humand Parts by Medium",
    "/marker": "Marker by Medium",
    "/topic/self": "Self Topics",
    "/topic/technology": "Technology Topics",
    "/heated": "Heated by Medium x Mark Bittman",
    "/modus": "Modus by Medium",
    "/topics": "Topics",
    "/me/stories/drafts": "My Stories",
    "/me/stories": "My Stories",
    "/me/series/drafts": "My Series",
    "/me/series": "My Series",
    "/me/stats": "My Stats",
    "/creators": "Creators",
    "/me/list/bookmarks": "Bookmarks",
    "/me/publications": "Publications",
    "/me/settings": "Settings"
}, subdomains = {
    help: {
        details: "Viewing help page",
        state: "Probably needs some help."
    }
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, subdomain = document.location.hostname.split(".")
        ? document.location.hostname.split(".")[0]
        : document.location.hostname, title = document.querySelector("#\\35 ee1 > h1") ||
        document.querySelector("#\\33 d2a > h1") ||
        document.querySelector("h1"), author = document.querySelector("#root > div > article > div > section > div > div.kl > div > div.ks.af.l > div > div > span > div > span > a") ||
        document.querySelector("#root > div > article > div > section > div > div.fr > div > div.fz.af.l > div > div > span > div > span > a") ||
        document.querySelector("div > span > a"), createdAt = document.querySelector("#root > div > article > div > section > div > div.kl > div > div.ks.af.l > span > span > div > a") ||
        document.querySelector("#root > div > article > div > section > div > div.fr > div > div.fz.af.l > span > span > div > a") ||
        document.querySelector("span > span > div > a"), draft = document.querySelector("#_obv\\.shell\\._surface_1570974921796 > div > div.metabar.u-clearfix.u-fixed.u-backgroundTransparentWhiteDarkest.u-xs-sizeFullViewportWidth.js-metabar > div.js-metabarMiddle.metabar-inner.u-marginAuto.u-maxWidth1032.u-flexCenter.u-justifyContentSpaceBetween.u-height65.u-xs-height56.u-paddingHorizontal20 > div.metabar-block.u-flex1.u-flexCenter > div.u-flexCenter.u-height65.u-xs-height56.u-marginLeft10 > span"), href = document.location.href
        .replace("https://", "")
        .replace("http://", "");
    const data = {
        largeImageKey: "medium-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (page == "/new-story" ||
        page == "/new-story/" ||
        (draft && draft.textContent != "")) {
        const newArticleTitle = document.querySelector("#editor_6 > section > div.section-content > div > h3");
        data.details = "Writing a New Story";
        data.state =
            newArticleTitle && newArticleTitle.textContent != ""
                ? newArticleTitle.textContent
                : "No title set.";
        data.smallImageKey = "writing";
        data.smallImageText = "Writing a new story...";
    }
    else if ((page && pages[page]) || (page && pages[page.slice(0, -1)])) {
        data.details = "Viewing a page:";
        data.state = pages[page] || pages[page.slice(0, -1)];
    }
    else if (href.includes("medium.com/@") &&
        href.match("[^/]*$")[0].includes("@") &&
        href.match("[^/]*$")[0] == href.slice(-href.match("[^/]*$")[0].length) &&
        title &&
        title.textContent != "") {
        data.details = "Viewing a profile:";
        data.state = title.textContent;
    }
    else if ((title && title.textContent != "" && author && author.textContent != "") ||
        (author &&
            author.textContent &&
            document.title.includes(author.textContent + " - "))) {
        data.details = title
            ? title.textContent
            : document.title.replace(author.textContent + " - ", "");
        data.state = `by ${author.textContent}${createdAt && createdAt.textContent != ""
            ? " • " + createdAt.textContent
            : ""}`;
        data.smallImageKey = "reading";
        data.smallImageText = "Reading a story...";
    }
    else if (page == "/search") {
        const searchingFor = document.querySelector("#_obv\\.shell\\._surface_1570975515304 > div > div.container.u-foreground.u-maxWidth1000.u-paddingTop40 > div.row.u-paddingBottom40.u-xs-paddingBottom20 > header > h1") || document.querySelector("header > .u-hide");
        data.details = "Searching for:";
        data.state =
            searchingFor && searchingFor.textContent != ""
                ? searchingFor.textContent
                : "Something...";
        data.smallImageKey = "search";
    }
    else if (subdomains[subdomain] || subdomains[subdomain.slice(0, -1)]) {
        data.details = subdomains[subdomain].details;
        data.state = subdomains[subdomain].state;
    }
    else {
        data.details = "Viewing a page:";
        data.state = "Home";
    }
    if (data.details && data.state && data.details != "" && data.state != "")
        presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixzQkFBc0IsRUFBRSxxQkFBcUI7SUFDN0MsV0FBVyxFQUFFLG9CQUFvQjtJQUNqQyxNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsY0FBYyxFQUFFLHdCQUF3QjtJQUN4QyxTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLGFBQWEsRUFBRSxhQUFhO0lBQzVCLG1CQUFtQixFQUFFLG1CQUFtQjtJQUN4QyxTQUFTLEVBQUUsaUNBQWlDO0lBQzVDLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsU0FBUyxFQUFFLFFBQVE7SUFDbkIsb0JBQW9CLEVBQUUsWUFBWTtJQUNsQyxhQUFhLEVBQUUsWUFBWTtJQUMzQixtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLFlBQVksRUFBRSxXQUFXO0lBQ3pCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLG9CQUFvQixFQUFFLFdBQVc7SUFDakMsa0JBQWtCLEVBQUUsY0FBYztJQUNsQyxjQUFjLEVBQUUsVUFBVTtDQUMzQixFQUNELFVBQVUsR0FBRztJQUNYLElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsS0FBSyxFQUFFLDJCQUEyQjtLQUNuQztDQUNGLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDckMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUss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