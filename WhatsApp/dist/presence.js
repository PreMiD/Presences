const presence = new Presence({
    clientId: "628019683718856714"
});
presence.on("UpdateData", async () => {
    const name = document.querySelector("#main > header > div._3V5x5 > div._1lpto > div > span"), typing = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)")
        ? document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)").firstChild
        : null, textPermission = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div._13mgZ")
        ? true
        : false;
    let contactName = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLHVEQUF1RCxDQUN6QyxFQUNoQixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IsOERBQThELENBQy9EO1FBQ0MsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLDhEQUE4RCxDQUMvRCxDQUFDLFVBQTBCO1FBQzlCLENBQUMsQ0FBQyxJQUFJLEVBQ1IsY0FBYyxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQ3RDLHdEQUF3RCxDQUN6QztRQUNmLENBQUMsQ0FBQyxJQUFJO1FBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztJQUV2QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtRQUFFLE9BQU8sUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ25FLElBQ0UsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFRLENBQUM7UUFFNUUsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFFL0IsTUFBTSxJQUFJLEdBQUc7UUFDWCxhQUFhLEVBQUUsWUFBWTtRQUMzQixPQUFPLEVBQUUsZ0JBQWdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFDaEUsS0FBSyxFQUFFLEdBQ0wsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksUUFBUTtZQUNsQyxDQUFDLENBQUMsV0FBVztZQUNiLENBQUMsQ0FBQyxHQUNFLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYztnQkFDeEIsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDeEIsQ0FBQyxDQUFDLGlCQUNOLEVBQ04sRUFBRTtRQUNGLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDOUMsQ0FBQztJQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMifQ==