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
    let data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxzQkFBc0IsRUFBRSxxQkFBcUI7SUFDN0MsV0FBVyxFQUFFLG9CQUFvQjtJQUNqQyxNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsY0FBYyxFQUFFLHdCQUF3QjtJQUN4QyxTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLGFBQWEsRUFBRSxhQUFhO0lBQzVCLG1CQUFtQixFQUFFLG1CQUFtQjtJQUN4QyxTQUFTLEVBQUUsaUNBQWlDO0lBQzVDLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsU0FBUyxFQUFFLFFBQVE7SUFDbkIsb0JBQW9CLEVBQUUsWUFBWTtJQUNsQyxhQUFhLEVBQUUsWUFBWTtJQUMzQixtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLFlBQVksRUFBRSxXQUFXO0lBQ3pCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLG9CQUFvQixFQUFFLFdBQVc7SUFDakMsa0JBQWtCLEVBQUUsY0FBYztJQUNsQyxjQUFjLEVBQUUsVUFBVTtDQUMxQixFQUNELFVBQVUsR0FBRztJQUNaLElBQUksRUFBRTtRQUNMLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsS0FBSyxFQUFFLDJCQUEyQjtLQUNsQztDQUNELENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDdEMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDaEQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUM3QixLQUFLLEdBQ0osUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4QyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQzdCLE1BQU0sR0FDTCxRQUFRLENBQUMsYUFBYSxDQUNyQiw4R0FBOEcsQ0FDOUc7UUFDRCxRQUFRLENBQUMsYUFBYSxDQUNyQiw4R0FBOEcsQ0FDOUc7UUFDRCxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEVBQ3pDLFNBQVMsR0FDUixRQUFRLENBQUMsYUFBYSxDQUNyQixrR0FBa0csQ0FDbEc7UUFDRCxRQUFRLENBQUMsYUFBYSxDQUNyQixrR0FBa0csQ0FDbEc7UUFDRCxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLEVBQ2hELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qiw4WkFBOFosQ0FDOVosRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1NBQzNCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1NBQ3ZCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFMUIsSUFBSSxJQUFJLEdBQXlCO1FBQ2hDLGFBQWEsRUFBRSxhQUFhO1FBQzVCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDN0MsQ0FBQztJQUVGLElBQ0MsSUFBSSxJQUFJLFlBQVk7UUFDcEIsSUFBSSxJQUFJLGFBQWE7UUFDckIsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsRUFDakM7UUFDRCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QyxzREFBc0QsQ0FDdEQsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUs7WUFDVCxlQUFlLElBQUksZUFBZSxDQUFDLFdBQVcsSUFBSSxFQUFFO2dCQUNuRCxDQUFDLENBQUMsZUFBZSxDQUFDLFdBQVc7Z0JBQzdCLENBQUMsQ0FBQyxlQUFlLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyx3QkFBd0IsQ0FBQztLQUMvQztTQUFNLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyRDtTQUFNLElBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3RFLEtBQUs7UUFDTCxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFDdEI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztLQUMvQjtTQUFNLElBQ04sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQ3hFLENBQUMsTUFBTTtZQUNOLE1BQU0sQ0FBQyxXQUFXO1lBQ2xCLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDcEQ7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUs7WUFDbkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXO1lBQ25CLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsR0FDcEMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksRUFBRTtZQUN2QyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXO1lBQy9CLENBQUMsQ0FBQyxFQUNKLEVBQUUsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUM7S0FDM0M7U0FBTSxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7UUFDN0IsTUFBTSxZQUFZLEdBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLHdLQUF3SyxDQUN4SyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLO1lBQ1QsWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLElBQUksRUFBRTtnQkFDN0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXO2dCQUMxQixDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0tBQzlCO1NBQU0sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ3pDO1NBQU07UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQ3BCO0lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMifQ==