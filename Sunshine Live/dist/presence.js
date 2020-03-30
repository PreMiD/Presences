var presence = new Presence({
    clientId: "624914025247146000"
});
presence.on("UpdateData", () => {
    let paused = true;
    let children = document.getElementById("audioPlayer-controls-buttons")
        .children;
    console.log(children);
    for (let i = 0; i < children.length; i++) {
        console.log(children[i].id);
        if (children[i].id == "stopButton") {
            paused = false;
        }
    }
    let presenceData = {
        largeImageKey: "lg",
        smallImageKey: paused ? "pause" : "play",
        smallImageText: paused ? "Pausiert" : "Spielt",
        details: "Channel: " +
            document.getElementsByClassName("trackInfos-stream")[0].textContent,
        state: document.getElementsByClassName("trackInfos-artist")[0].textContent +
            " - " +
            document.getElementsByClassName("trackInfos-title")[0].textContent
    };
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbEIsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyw4QkFBOEIsQ0FBQztTQUNwRSxRQUFRLENBQUM7SUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUU7WUFDbkMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNmO0tBQ0Q7SUFFRCxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLElBQUk7UUFDbkIsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQ3hDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUM5QyxPQUFPLEVBQ04sV0FBVztZQUNYLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFDcEUsS0FBSyxFQUNKLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7WUFDbkUsS0FBSztZQUNMLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7S0FDbkUsQ0FBQztJQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMifQ==