var presence = new Presence({
    clientId: "622436057866043434"
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    var audio = document.querySelector("#jp_audio_0");
    if (audio !== null) {
        var title = document.querySelector(".brg-player-title");
        presenceData.details =
            title !== null ? title.innerText : "Title not found...";
        presenceData.largeImageKey = "logo";
        presence.setTrayTitle(audio.paused ? "" : title.innerText);
        if (title !== null) {
            presence.setActivity(presenceData, !audio.paused);
        }
    }
    else {
        var pageData = {
            details: "Browsing..",
            largeImageKey: "logo"
        };
        presence.setActivity(pageData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDbEIsSUFBSSxLQUFLLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVyRSxZQUFZLENBQUMsT0FBTztZQUNsQixLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBRSxLQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUM7UUFDM0UsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFFcEMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkQ7S0FDRjtTQUFNO1FBQ0wsSUFBSSxRQUFRLEdBQWlCO1lBQzNCLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==