let presence = new Presence({
    clientId: "628019683718856714"
});
presence.on("UpdateData", async () => {
    let name = document.querySelector("#main > header > div._3V5x5 > div._1lpto > div > span"), typing = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)")
        ? document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)").firstChild
        : null, textPermission = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div._13mgZ")
        ? true
        : false, contactName = null;
    if (!name || name === null || name.innerText == "")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLHVEQUF1RCxDQUN4QyxFQUNoQixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDOUIsOERBQThELENBQzlEO1FBQ0EsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxhQUFhLENBQ3ZCLDhEQUE4RCxDQUM3RCxDQUFDLFVBQTBCO1FBQzlCLENBQUMsQ0FBQyxJQUFJLEVBQ1AsY0FBYyxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQ3ZDLHdEQUF3RCxDQUN4QztRQUNoQixDQUFDLENBQUMsSUFBSTtRQUNOLENBQUMsQ0FBQyxLQUFLLEVBQ1IsV0FBVyxHQUFHLElBQUksQ0FBQztJQUVwQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1FBQ2pELE9BQU8sUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2pDLElBQ0MsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFRLENBQUM7UUFFNUUsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFFOUIsTUFBTSxJQUFJLEdBQUc7UUFDWixhQUFhLEVBQUUsWUFBWTtRQUMzQixPQUFPLEVBQUUsZ0JBQWdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFDaEUsS0FBSyxFQUFFLEdBQ04sTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksUUFBUTtZQUNuQyxDQUFDLENBQUMsV0FBVztZQUNiLENBQUMsQ0FBQyxHQUNBLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYztnQkFDekIsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDeEIsQ0FBQyxDQUFDLGlCQUNILEVBQ0osRUFBRTtRQUNGLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDN0MsQ0FBQztJQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMifQ==