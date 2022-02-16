const presence = new Presence({
		clientId: "928068375031214170"
	}),
	timer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "keep_logo",
			startTimestamp: timer
		},
		{ hash } = location,
		id = location.href.split("/")[4],
		privacy = await presence.getSetting<boolean>("privacy");

	presenceData.details = "Viewing Homepage";
	presenceData.state = "Notes";

	if (hash === `#LIST/${id}`) {
		if (!privacy) {
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
		} else {
			presenceData.details = "Reading Tasks";
			delete presenceData.state;
		}
	} else if (hash === `#NOTE/${id}`) {
		if (!privacy) {
			const noteName = document.querySelector(
				"body > div.VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd > div > div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme > div.IZ65Hb-s2gQvd > div.IZ65Hb-r4nke-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.r4nke-YPqjbf"
			);
			presenceData.details = "Reading a Note:";
			if (noteName.textContent) presenceData.state = noteName.textContent;
			else if (!noteName.textContent) presenceData.state = "Untitled Note";
		} else {
			presenceData.details = "Reading a Note";
			delete presenceData.state;
		}
	} else if (hash === "#search" || hash === `#search/${id}`) {
		presenceData.details = "Search";
		delete presenceData.state;
	} else if (hash === "#reminders") {
		presenceData.details = "Viewing reminders";
		delete presenceData.state;
	} else if (hash === `#label/${id}`) {
		if (!privacy) {
			presenceData.details = "Viewing a label:";
			presenceData.state = decodeURIComponent(id);
		} else {
			presenceData.details = "Viewing a label";
			delete presenceData.state;
		}
	} else if (hash === "#archive") {
		presenceData.details = "Viewing the archive";
		delete presenceData.state;
	} else if (hash === "#trash") {
		presenceData.details = "Viewing the trash";
		delete presenceData.state;
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
