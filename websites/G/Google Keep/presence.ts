const presence = new Presence({
    clientId: "867305038937587762"
  }),
  timer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "keep_logo",
      startTimestamp: timer
    },
    { pathname, hash, href } = location,
    [, , , , userInt, , LorLNorId] = href.split("/");

  if (pathname === `/u/${userInt}/`) {
    data.details = "Viewing homepage";
    data.state = "Notes";

    if (hash === "#home") {
      data.details = "Viewing Homepage";
      data.state = "Notes";
    } else if (hash === `#LIST/${LorLNorId}`) {
      const listName =
        document.querySelector(
          "body > div.notes-container.RfDI4d-sKfxWe > div.RfDI4d-Iu19ad > div.RfDI4d-bN97Pc.ogm-kpc > div.gkA7Yd-sKfxWe.ma6Yeb-r8s4j-gkA7Yd > div > div.IZ65Hb-n0tgWb.rymPhb.NYTeh-IT5dJd.RNfche > div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme > div.IZ65Hb-s2gQvd > div.IZ65Hb-r4nke-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.r4nke-YPqjbf"
        ) ??
        document.querySelector(
          "body > div.VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd > div > div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme > div.IZ65Hb-s2gQvd > div.IZ65Hb-r4nke-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.r4nke-YPqjbf"
        );

      data.details = "Reading Tasks:";

      if (listName.textContent) data.state = listName.textContent;
      else if (!listName.textContent) data.state = "Untitled List";
    } else if (hash === `#NOTE/${LorLNorId}`) {
      const noteName = document.querySelector(
        "body > div.VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd > div > div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme > div.IZ65Hb-s2gQvd > div.IZ65Hb-r4nke-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.r4nke-YPqjbf"
      );

      data.details = "Reading a Note:";

      if (noteName.textContent) data.state = noteName.textContent;
      else if (!noteName.textContent) data.state = "Untitled Note";
    } else if (hash === "#reminders") {
      data.details = "Viewing at reminders";
      delete data.state;
    } else if (hash === `#label/${LorLNorId}`) {
      const formattedName = decodeURIComponent(LorLNorId);

      data.details = "Viewing at a label:";
      data.state = formattedName;
    } else if (hash === "#archive") {
      data.details = "Viewing the archive";
      delete data.state;
    } else if (hash === "#trash") {
      data.details = "Viewing at the trash";
      delete data.state;
    }
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
