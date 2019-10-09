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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFMUIsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFcEUsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1IsWUFBWSxFQUFFLEtBQUssQ0FBQyxXQUFXO1FBQy9CLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtRQUN4QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07S0FDdkIsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNSLFlBQVksRUFBRSxLQUFLLENBQUMsV0FBVztRQUMvQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7UUFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0tBQ3ZCLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSJ9