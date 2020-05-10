const presence = new Presence({
    clientId: "638565041154555913"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/wiki/")) {
        const page = document.getElementsByClassName("page-header__title") !== null
            ? document.getElementsByClassName("page-header__title")[0].textContent
            : "N/A";
        const presenceData = {
            details: "Viewing a page...",
            state: page,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ25ELE1BQU0sSUFBSSxHQUNSLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLElBQUk7WUFDNUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7WUFDdEUsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNaLE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLEtBQUssRUFBRSxJQUFJO1lBQ1gsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9