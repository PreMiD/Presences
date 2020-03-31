var iframe = new iFrame();
let video = document.querySelector("#kwikPlayer");
video.ondurationchange = () => {
    iframe.send({
        current_time: video.currentTime,
        duration: video.duration,
        paused: video.paused
    });
};
video.ontimeupdate = () => {
    iframe.send({
        current_time: video.currentTime,
        duration: video.duration,
        paused: video.paused
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFMUIsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFcEUsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1YsWUFBWSxFQUFFLEtBQUssQ0FBQyxXQUFXO1FBQy9CLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtRQUN4QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07S0FDckIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNWLFlBQVksRUFBRSxLQUFLLENBQUMsV0FBVztRQUMvQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7UUFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0tBQ3JCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9