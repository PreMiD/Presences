const IFrame = new iFrame();

IFrame.on("UpdateData", () => {
   if (document.querySelector("video")){
    const { duration, currentTime, paused } = document.querySelector("video"),
    title = document.querySelector('span.link_title')?.textContent;

    IFrame.send({duration, currentTime, paused, title});
   }
});