const presence = new Presence({
    clientId: "628019683718856714"
});
presence.on("UpdateData", () => {
    const name = document.querySelector("#main > header > div._5SiUq > div._16vzP > div > span"), typing = document.querySelector("#main > footer > div._3pkkz.V42si.copyable-area > div._1Plpp > div > div._2S1VP.copyable-text.selectable-text"), textPermission = document.querySelector("#main > footer > .copyable-area");
    let contactName = null;
    if (!name || name.innerText == "")
        return presence.setActivity();
    if (isNaN(Number(name.innerText.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, ""))))
        contactName = name.innerText;
    const data = {
        largeImageKey: "waweb-logo",
        details: `Texting with ${contactName ? contactName : "someone"}`,
        state: `${typing && typing.textContent
            ? "Typing..."
            : `${!typing && !textPermission
                ? "Can't really type..."
                : "Just waiting..."}`}`,
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLElBQUksR0FBb0IsUUFBUSxDQUFDLGFBQWEsQ0FDaEQsdURBQXVELENBQ3hELEVBQ0QsTUFBTSxHQUFRLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLCtHQUErRyxDQUNoSCxFQUNELGNBQWMsR0FBUSxRQUFRLENBQUMsYUFBYSxDQUMxQyxpQ0FBaUMsQ0FDbEMsQ0FBQztJQUVKLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztJQUV2QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtRQUFFLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pFLElBQ0UsS0FBSyxDQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQ3ZFO1FBRUQsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFFL0IsTUFBTSxJQUFJLEdBQWlCO1FBQ3pCLGFBQWEsRUFBRSxZQUFZO1FBQzNCLE9BQU8sRUFBRSxnQkFBZ0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUNoRSxLQUFLLEVBQUUsR0FDTCxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVc7WUFDMUIsQ0FBQyxDQUFDLFdBQVc7WUFDYixDQUFDLENBQUMsR0FDRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGNBQWM7Z0JBQ3hCLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQ3hCLENBQUMsQ0FBQyxpQkFDTixFQUNOLEVBQUU7UUFDRixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQzlDLENBQUM7SUFFRixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDIn0=