const presence = new Presence({
    clientId: "867305038937587762"
  }),
  timer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "keep_logo",
      startTimestamp: timer
    },
    { hash } = location,
    [, , , , userInt, , LorLNorId] = location.href.split("/");

  if (location.pathname === `/u/${userInt}/`) {
    presenceData.details = "Viewing homepage";
    presenceData.state = "Notes";

    if (hash === "#home") {
      presenceData.details = "Viewing Homepage";
      presenceData.state = "Notes";
    } else if (hash === `#LIST/${LorLNorId}`) {
      const listName =
        document.querySelector(
          "body > div.notes-container.RfDI4d-sKfxWe > div.RfDI4d-Iu19ad > div.RfDI4d-bN97Pc.ogm-kpc > div.gkA7Yd-sKfxWe.ma6Yeb-r8s4j-gkA7Yd > div > div.IZ65Hb-n0tgWb.rymPhb.NYTeh-IT5dJd.RNfche > div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme > div.IZ65Hb-s2gQvd > div.IZ65Hb-r4nke-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.r4nke-YPqjbf"
        ) ??
        document.querySelector(
          "body > div.VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd > div > div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme > div.IZ65Hb-s2gQvd > div.IZ65Hb-r4nke-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.r4nke-YPqjbf"
        );

      presenceData.details = "Reading Tasks:";

      if (listName.textContent) presenceData.state = listName.textContent;
      else if (!listName.textContent) presenceData.state = "Untitled List";
    } else if (hash === `#NOTE/${LorLNorId}`) {
      const noteName = document.querySelector(
        "body > div.VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd > div > div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme > div.IZ65Hb-s2gQvd > div.IZ65Hb-r4nke-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.r4nke-YPqjbf"
      );

      presenceData.details = "Reading a Note:";

      if (noteName.textContent) presenceData.state = noteName.textContent;
      else if (!noteName.textContent) presenceData.state = "Untitled Note";
    } else if (hash === "#reminders") {
      presenceData.details = "Viewing at reminders";
      delete presenceData.state;
    } else if (hash === `#label/${LorLNorId}`) {
      presenceData.details = "Viewing at a label:";
      presenceData.state = decodeURIComponent(LorLNorId);
    } else if (hash === "#archive") {
      presenceData.details = "Viewing the archive";
      delete presenceData.state;
    } else if (hash === "#trash") {
      presenceData.details = "Viewing at the trash";
      delete presenceData.state;
    }
  }

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
