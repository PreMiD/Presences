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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFMUIsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFcEUsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1gsWUFBWSxFQUFFLEtBQUssQ0FBQyxXQUFXO1FBQy9CLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtRQUN4QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07S0FDcEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNYLFlBQVksRUFBRSxLQUFLLENBQUMsV0FBVztRQUMvQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7UUFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0tBQ3BCLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9