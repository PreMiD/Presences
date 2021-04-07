const iframe = new iFrame();

iframe.on("UpdateData", () => {
  if (document.querySelector("div.nick")) {
    iframe.send({
      blog: document.querySelector("div.nick").textContent
    });
  }
});
