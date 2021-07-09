const presence = new Presence({ clientId: "863104116502429717" });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const path: string = document.location.pathname;
  let cat: string = path.split("/")[1];

  if (cat === "drama-streaming") cat = "drama";

  if (cat !== "") {
    const HtmlTitle: Element = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1");
    if (HtmlTitle) {
      let titleParts: string[] = HtmlTitle.textContent.trim().split("-");

      let descrParts: string[] = titleParts.pop().split(" ");
      let lang: string = descrParts.pop().toUpperCase();
      let descr = descrParts.join(" ");

      presenceData.details = titleParts.join("-");
      presenceData.state = `${descr} (${lang})`;

      let bigImage: string = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > img.col-12.m-hidden").getAttribute("src");

      presenceData.smallImageText = bigImage

      console.log(bigImage);

    } else {
      presenceData.details = "Parcours les " + cat + "s";
    }
  }


  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});