const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const l1 = document.querySelector("#box-points-team > a"),
  l2 = document.querySelector("#slot-0 > div.pu > div.pu-bar.ui-progressbar.ui-widget.ui-widget-content.ui-corner-all > div");
  if (l1 && l2 !== undefined) {
  iframe.send({
    iframe_d: {
 points: l1.textContent,
 progress: l2.textContent,
    }
});
  };
});