const presence = new Presence({
    clientId: "612042450785271811"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

presence.on("UpdateData", async () => {
  const title: HTMLElement = document.querySelector(
    ".mtl.mbxxxl.xs-mts.xs-mbxs.petition-title"
  );
  if (title !== null) {
    const link = document.location.href,
      votes = document.querySelector(".mbxs span strong")
        ? document.querySelector(".mbxs span strong")
        : document.querySelector("p.type-weak");

    presenceData.details = (title as HTMLElement).textContent;
    presenceData.state = (votes as HTMLElement).textContent;
    presenceData.largeImageKey = "logo";
    presenceData.buttons = [
      {
        label: "View Petition",
        url: link
      }
    ];
    presence.setActivity(presenceData);
  } else {
    const pageData: PresenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
