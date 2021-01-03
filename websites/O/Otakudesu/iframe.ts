// const iframe = new iFrame();

// iframe.on("UpdateData", async () => {
//   if (document.querySelector("video")) {
//     let video: HTMLVideoElement|void = undefined;
//     if (document.querySelector(".jw-video") !== null) {
//       video = document.querySelector(".jw-video") as HTMLVideoElement;
//     } else if (document.querySelector(".video-wrapper > #video")) {
//       video = document.querySelector(".video-wrapper > #video") as HTMLVideoElement;
//     }
//     if (video && !isNaN(video.duration)) {
//       iframe.send({
//         duration: video.duration,
//         currentTime: video.currentTime,
//         paused: video.paused
//       });
//     }
//   }
// });
