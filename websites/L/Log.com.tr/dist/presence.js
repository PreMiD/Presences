const presence = new Presence({
    clientId: "657615662537244673"
});
const browsingStamp = Math.floor(Date.now() / 1000);
const presenceData = {
    largeImageKey: "log-logo",
    startTimestamp: browsingStamp
};
function makeCategoryRPC(title) {
    presenceData.details = "Bir kategoriye göz atıyor:";
    presenceData.state = title;
}
presence.on("UpdateData", () => {
    const page = document.location.pathname;
    if (page.length == 1) {
        presenceData.details = "Ana Sayfa";
        presenceData.state = "Haberlere göz atıyor...";
    }
    if (document.getElementsByClassName("entry-title").length > 0) {
        const title = document.getElementsByClassName("entry-title")[0];
        presenceData.details = "Bir haber okuyor...";
        presenceData.state = title ? title.textContent : "Bilinmeyen";
    }
    if (page.includes("/page")) {
        const pagenum = parseInt(document.location.pathname.split("/")[2]);
        presenceData.details = "Ana Sayfa";
        presenceData.state = "Sayfa: " + pagenum;
    }
    if (page.includes("/asfalt"))
        makeCategoryRPC("Asfalt");
    if (page.includes("/teknoloji-haberleri"))
        makeCategoryRPC("Teknoloji");
    if (page.includes("/radar"))
        makeCategoryRPC("Radar");
    if (page.includes("/play"))
        makeCategoryRPC("Play");
    if (page.includes("/dosya-konusu"))
        makeCategoryRPC("Dosya");
    if (page.includes("/uygulama-rehberi"))
        makeCategoryRPC("Uygulama Rehberi");
    if (page.includes("/nasil-yapilir"))
        makeCategoryRPC("Nasıl yapılır?");
    if (page.includes("/test"))
        makeCategoryRPC("Test");
    if (page.includes("/etiket")) {
        const tag = document.querySelector("body > div.container > div.grid12.first.breadcrumbs.borderTop.borderBottom.marginBottom.padding > h1");
        presenceData.details = "Bir etiket görüntülüyor:";
        presenceData.state = tag ? tag.textContent : "Bilinmeyen";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsVUFBVTtJQUN6QixjQUFjLEVBQUUsYUFBYTtDQUM5QixDQUFDO0FBRUYsU0FBUyxlQUFlLENBQUMsS0FBYTtJQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO0lBQ3BELFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzdCLENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDN0IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFeEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUNwQixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFDO0tBQ2hEO0lBRUQsSUFBSSxRQUFRLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUU3RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0tBQy9EO0lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUM7S0FDMUM7SUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztRQUFFLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4RSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQUUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztRQUFFLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFBRSxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1RSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFBRSxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM1QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQyxzR0FBc0csQ0FDdkcsQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztLQUMzRDtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=