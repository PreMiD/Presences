let presence = new Presence({
    clientId: "628019683718856714"
});
presence.on("UpdateData", async () => {
    let name = document.querySelector("#main > header > div._3V5x5 > div._1lpto > div > span"), typing = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)")
        ? document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)").firstChild
        : null, textPermission = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div._13mgZ")
        ? true
        : false, contactName = null;
    if (!name || name.innerText == "")
        return presence.clearActivity();
    if (isNaN(name.innerText.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "")))
        contactName = name.innerText;
    const data = {
        largeImageKey: "waweb-logo",
        details: `Texting with ${contactName ? contactName : "someone"}`,
        state: `${typing && typing.tagName == "BUTTON"
            ? "Typing..."
            : `${!typing && !textPermission
                ? "Can't really type..."
                : "Just waiting..."}`}`,
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLHVEQUF1RCxDQUN6QyxFQUNoQixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IsOERBQThELENBQy9EO1FBQ0MsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLDhEQUE4RCxDQUMvRCxDQUFDLFVBQTBCO1FBQzlCLENBQUMsQ0FBQyxJQUFJLEVBQ1IsY0FBYyxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQ3RDLHdEQUF3RCxDQUN6QztRQUNmLENBQUMsQ0FBQyxJQUFJO1FBQ04sQ0FBQyxDQUFDLEtBQUssRUFDVCxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBRXJCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1FBQUUsT0FBTyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkUsSUFDRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQVEsQ0FBQztRQUU1RSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUUvQixNQUFNLElBQUksR0FBRztRQUNYLGFBQWEsRUFBRSxZQUFZO1FBQzNCLE9BQU8sRUFBRSxnQkFBZ0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUNoRSxLQUFLLEVBQUUsR0FDTCxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxRQUFRO1lBQ2xDLENBQUMsQ0FBQyxXQUFXO1lBQ2IsQ0FBQyxDQUFDLEdBQ0UsQ0FBQyxNQUFNLElBQUksQ0FBQyxjQUFjO2dCQUN4QixDQUFDLENBQUMsc0JBQXNCO2dCQUN4QixDQUFDLENBQUMsaUJBQ04sRUFDTixFQUFFO1FBQ0YsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztLQUM5QyxDQUFDO0lBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyJ9