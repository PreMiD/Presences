const presence = new Presence({
  clientId: "612042450785271811",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };
  const titleElement: HTMLHeadingElement = document.querySelector(
    ".mtl.mbxxxl.xs-mts.xs-mbxs.petition-title"
  );

  if (titleElement !== null) {
    let votesElement: HTMLElement = document.querySelector(".mbxs span strong");
    if (votesElement === null) {
      votesElement = document.querySelector("div.xs-phs.xs-pbs > div.hidden-xs > p.type-weak");
    }
    presenceData.details = titleElement.innerText;
    presenceData.state = votesElement.innerText;
  } else {
    presenceData.details = "Browsing...";
  }

  presence.setActivity(presenceData);
});
