var presence = new Presence({
    clientId: "608043966285348944"
});
var lastPlaybackState = null;
var reading;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != reading) {
    lastPlaybackState = reading;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
    reading =
        document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;
    var something, a, b;
    if (reading) {
        something = document.querySelectorAll(".margin-bottom-12 h1 a");
        a = something[0];
        b = something[1];
        var page = document
            .querySelector(".page-jump.text-center")
            .getAttribute("value");
        const presenceData = {
            details: a.innerText,
            state: b.innerText + " [Page: " + page + "]",
            largeImageKey: "lg"
        };
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData, true);
    }
    else {
        const presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxpQkFBaUIsSUFBSSxPQUFPLEVBQUU7SUFDaEMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO0lBQzVCLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUMvQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE9BQU87UUFDTCxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUUzRSxJQUFJLFNBQWMsRUFBRSxDQUFNLEVBQUUsQ0FBTSxDQUFDO0lBRW5DLElBQUksT0FBTyxFQUFFO1FBQ1gsU0FBUyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQixJQUFJLElBQUksR0FBRyxRQUFRO2FBQ2hCLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQzthQUN2QyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekIsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUztZQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsSUFBSSxHQUFHLEdBQUc7WUFDNUMsYUFBYSxFQUFFLElBQUk7U0FDcEIsQ0FBQztRQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzFDO1NBQU07UUFDTCxNQUFNLFlBQVksR0FBaUI7WUFDakMsYUFBYSxFQUFFLElBQUk7U0FDcEIsQ0FBQztRQUVGLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDMUM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9