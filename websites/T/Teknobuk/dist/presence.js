const presence = new Presence({
    clientId: "658192386899312651"
});
let presenceData;
function makeRPC(title, category) {
    if (category == "kategori") {
        presenceData.details = "Bir kategoriye göz atıyor:";
        presenceData.state = title;
    }
    else if (category == "etiket") {
        presenceData.details = "Bir etikete göz atıyor:";
        presenceData.state = title;
    }
    else if (category == "author") {
        presenceData.details = "Bir yazara göz atıyor:";
        presenceData.state = title;
    }
}
presence.on("UpdateData", () => {
    const page = document.location.pathname;
    const browsingStamp = Math.floor(Date.now() / 1000);
    var pageray = [
        "/kategori",
        "/author",
        "/ara",
        "/page",
        "/",
        "",
        "/wp-login",
        "/wp-admin",
        "/etiket"
    ];
    presenceData = {
        largeImageKey: "buk-logo",
        startTimestamp: browsingStamp
    };
    if (page.length <= 1 || page.startsWith("/page")) {
        presenceData.details = "Ana Sayfa";
        presenceData.state = "Haberlere göz atıyor...";
    }
    if (document.getElementsByClassName("entry-title").length == 1 &&
        pageray.some((pagey) => !page.includes(pagey))) {
        const title = document.getElementsByClassName("entry-title")[0];
        presenceData.details = "Bir haber okuyor...";
        presenceData.state = title ? title.textContent : "Bilinmeyen";
    }
    if (page.startsWith("/kategori") && page !== "/kategori") {
        const category = document.querySelector("#blog-entries > header > h1")
            ? document
                .querySelector("#blog-entries > header > h1")
                .textContent.substring(10)
            : "Bilinmeyen";
        makeRPC(category, "kategori");
    }
    if (page.startsWith("/etiket") && page !== "/etiket") {
        let category = document.querySelector("#blog-entries > header > h1")
            ? document
                .querySelector("#blog-entries > header > h1")
                .textContent.substring(8)
            : "Bilinmeyen";
        category = category.charAt(0).toUpperCase() + category.substring(1);
        makeRPC(category, "etiket");
    }
    if (page.startsWith("/author")) {
        const author = document.querySelector("#blog-entries > header > h1 > span");
        const authort = author ? author.textContent : "Bilinmeyen";
        makeRPC(authort, "author");
    }
    if (page.startsWith("/ara")) {
        presenceData.details = "Arama bölümünde...";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity({
            largeImageKey: "buk-logo",
            details: "Bilinmeyen bir sayfada..."
        });
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksWUFBMEIsQ0FBQztBQUUvQixTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUTtJQUM5QixJQUFJLFFBQVEsSUFBSSxVQUFVLEVBQUU7UUFDMUIsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztRQUNwRCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUM1QjtTQUFNLElBQUksUUFBUSxJQUFJLFFBQVEsRUFBRTtRQUMvQixZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1FBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQzVCO1NBQU0sSUFBSSxRQUFRLElBQUksUUFBUSxFQUFFO1FBQy9CLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BELElBQUksT0FBTyxHQUFHO1FBQ1osV0FBVztRQUNYLFNBQVM7UUFDVCxNQUFNO1FBQ04sT0FBTztRQUNQLEdBQUc7UUFDSCxFQUFFO1FBQ0YsV0FBVztRQUNYLFdBQVc7UUFDWCxTQUFTO0tBQ1YsQ0FBQztJQUNGLFlBQVksR0FBRztRQUNiLGFBQWEsRUFB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