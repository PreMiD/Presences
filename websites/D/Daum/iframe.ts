const IFrame = new iFrame();

IFrame.on("UpdateData", () => {
  if (document.querySelector("video")) {
    const { duration, currentTime, paused } = document.querySelector("video"),
      title = document.querySelector("span.link_title")?.textContent;

    IFrame.send({ video: { duration, currentTime, paused, title } });
  }

  if (document.location.hostname === "cafe.daum.net")
    IFrame.send({
      cafe: {
        name: document
          .querySelector("#cafe_info_outer > div.cafename")
          ?.textContent.trim(),
        title: (
          document.querySelector("strong.tit_item") ??
          document.querySelector("h3.title")
        )?.textContent.trim(),
        article: document
          .querySelector("strong.tit_info > b")
          ?.textContent.trim()
      }
    });
});
