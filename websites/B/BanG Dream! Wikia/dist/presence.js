var presence = new Presence({
    clientId: "651145049811451924"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/wiki/")) {
        const page = document.getElementsByClassName("page-header__title")[0];
        let pageText;
        if (page == null) {
            pageText = "Unknown Page";
        }
        else {
            pageText = page.textContent;
        }
        const presenceData = {
            details: "Viewing a page...",
            state: pageText,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ25ELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2hCLFFBQVEsR0FBRyxjQUFjLENBQUM7U0FDM0I7YUFBTTtZQUNMLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzdCO1FBQ0QsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsS0FBSyxFQUFFLFFBQVE7WUFDZixhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=