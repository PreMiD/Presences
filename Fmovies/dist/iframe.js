let iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.querySelector("video") != null ||
        document.querySelector("div.jw-media.jw-reset > video") != null) {
        var video = document.querySelector("video") != null
            ? document.querySelector("video")
            : document.querySelector("div.jw-media.jw-reset > video");
        iframe.send({
            duration: video.duration,
            currentTime: video.currentTime,
            paused: video.paused
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbEMsSUFDQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUk7UUFDdkMsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLElBQUksRUFDOUQ7UUFDRCxJQUFJLEtBQUssR0FDUixRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUk7WUFDdEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFFNUQsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNYLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUN4QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDOUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztLQUNIO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==