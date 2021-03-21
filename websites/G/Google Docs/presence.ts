const presence = new Presence({
    clientId: "630478614894477337"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: string;

async function getStrings() {
  return presence.getStrings(
    {
      editingDoc: "google docs.editingDoc",
      viewingDoc: "google docs.viewingDoc",
      browsingDoc: "google docs.browsingDoc",
      editingForm: "google docs.editingForm",
      viewingForm: "google docs.viewingForm",
      browsingForm: "google docs.browsingForm",
      editingSheet: "google docs.editingSheet",
      viewingSheet: "google docs.viewingSheet",
      browsingSheet: "google docs.browsingSheet",
      editingPresentation: "google docs.editingPresentation",
      browsingPresentation: "google docs.browsingPresentation",
      vieiwngPresentation: "google docs.viewingPresentation"
    },
    await presence.getSetting("lang")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      startTimestamp: browsingStamp
    },
    privacy = await presence.getSetting("privacy"),
    newLang = await presence.getSetting("lang");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.pathname.includes("/document")) {
    presenceData.largeImageKey = "docslogo";
    title = document.title.replace("- Google Docs", "");
    if (document.location.pathname.includes("/edit")) {
      presenceData.details = (await strings).editingDoc;
      if (!privacy) presenceData.state = title;
    } else if (document.location.pathname.includes("/document/u/")) {
      presenceData.details = (await strings).browsingDoc;
    } else {
      presenceData.details = (await strings).viewingDoc;
      if (!privacy) presenceData.state = title;
    }
  } else if (document.location.pathname.includes("/forms/")) {
    presenceData.largeImageKey = "formslogo";
    title = document.title.replace("- Google Forms", "");
    if (document.location.pathname.includes("/edit")) {
      presenceData.details = (await strings).editingForm;
      if (!privacy) presenceData.state = title;
    } else if (document.location.pathname.includes("/forms/u/")) {
      presenceData.details = (await strings).browsingForm;
    } else {
      presenceData.details = (await strings).viewingForm;
      if (!privacy) presenceData.state = title;
    }
  } else if (document.location.pathname.includes("/spreadsheets")) {
    presenceData.largeImageKey = "sheetslogo";
    title = document.title.replace("- Google Sheets", "");
    if (document.location.pathname.includes("/edit")) {
      presenceData.details = (await strings).editingSheet;
      if (!privacy) presenceData.state = title;
    } else if (document.location.pathname.includes("/spreadsheets/u/")) {
      presenceData.details = (await strings).browsingSheet;
    } else {
      presenceData.details = (await strings).viewingSheet;
      if (!privacy) presenceData.state = title;
    }
  } else if (document.location.pathname.includes("/presentation/")) {
    presenceData.largeImageKey = "slideslogo";
    title = document.title.replace("- Google Slides", "");
    if (document.location.pathname.includes("/edit")) {
      presenceData.details = (await strings).editingPresentation;
      if (!privacy) presenceData.state = title;
    } else if (document.location.pathname.includes("/presentation/u/")) {
      presenceData.details = (await strings).browsingPresentation;
    } else {
      presenceData.details = (await strings).vieiwngPresentation;
      if (!privacy) presenceData.state = title;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
