let iframe = new iFrame();
let anime;
iframe.on("UpdateData", async () => {
    if (document.querySelector("video") !== null) {
        anime = document.querySelector("video");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxLQUFLLENBQUM7QUFFVixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNsQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzdDLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsWUFBWSxFQUFFO29CQUNiLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNwQjthQUNELENBQUMsQ0FBQztTQUNIO0tBQ0Q7QUFDRixDQUFDLENBQUMsQ0FBQyJ9