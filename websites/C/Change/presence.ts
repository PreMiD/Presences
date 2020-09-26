var presence = new Presence({
    clientId: "612042450785271811"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

presence.on("UpdateData", async () => {
  var title: HTMLElement = document.querySelector(
    ".mtl.mbxxxl.xs-mts.xs-mbxs.petition-title"
  );
  if (title !== null) {
    var votes = document.querySelector(".mbxs span strong");
    presenceData.details = (title as HTMLElement).innerText;
    presenceData.state = (votes as HTMLElement).innerText;
    presenceData.largeImageKey = "logo";

    presence.setActivity(presenceData);
  } else {
    var pageData: PresenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
