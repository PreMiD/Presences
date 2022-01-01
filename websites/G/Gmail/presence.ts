const presence = new Presence({
    clientId: "808667100319186964"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
  return presence.getStrings(
    {
      categoryPrimary: "gmail.categoryPrimary",
      categorySocial: "gmail.categorySocial",
      categoryUpdates: "gmail.categoryUpdates",
      categoryPromotions: "gmail.categoryPromotions",
      categoryForum: "gmail.categoryForum",
      inLabel: "gmail.inLabel",
      generalSettings: "gmail.generalSettings",
      labelSettings: "gmail.labelSettings",
      accountSettings: "gmail.accountSettings",
      filterSettings: "gmail.filterSettings",
      fwdAndPOPSettings: "gmail.fwdAndPOPSettings",
      addonSettings: "gmail.addonSettings",
      chatSettings: "gmail.chatSettings",
      advancedSettings: "gmail.advancedSettings",
      offlineSettings: "gmail.offlineSettings",
      themeSettings: "gmail.themeSettings",
      lookingForEmail: "gmail.lookingForEmail",
      viewingSentEmail: "gmail.viewingSentEmail",
      viewingStarredEmails: "gmail.viewingStarredEmails",
      viewingSnoozedEmails: "gmail.viewingSnoozedEmails",
      viewingImportantEmails: "gmail.viewingImportantEmails",
      viewingDrafts: "gmail.viewingDrafts",
      viewingSentEmails: "gmail.viewingSentEmails",
      viewingChat: "gmail.viewingChat",
      viewingScheduled: "gmail.viewingScheduled",
      viewingSpam: "gmail.viewingSpam",
      viewingAllEmails: "gmail.viewingAllEmails",
      composingEmail: "gmail.composingEmail",
      viewingTrash: "gmail.viewingTrash",
      viewingEmail: "gmail.viewingEmail"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}

let strings: Awaited<ReturnType<typeof getStrings>>,
  oldLang: string = null;

presence.on("UpdateData", async () => {
  let presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const { href } = window.location,
    [newLang, timestamps, privacy] = await Promise.all([
      presence.getSetting<string>("lang").catch(() => "en"),
      presence.getSetting<boolean>("timestamps"),
      presence.getSetting<boolean>("privacy")
    ]);

  if (oldLang !== newLang || !strings) {
    oldLang = newLang;
    strings = await getStrings();
  }

  const pages: Record<string, PresenceData> = {
    "#category/social": {
      details: strings.categorySocial
    },
    "#category/updates": {
      details: strings.categoryUpdates
    },
    "#category/promotions": {
      details: strings.categoryPromotions
    },
    "#category/forum": {
      details: strings.categoryForum
    },
    "#settings/general": {
      details: strings.generalSettings
    },
    "#settings/labels": {
      details: strings.inLabel
    },
    "#settings/inbox": {
      details: strings.generalSettings
    },
    "#settings/accounts": {
      details: strings.accountSettings
    },
    "#settings/filters": {
      details: strings.filterSettings
    },
    "#settings/fwdandpop": {
      details: strings.fwdAndPOPSettings
    },
    "#settings/addons": {
      details: strings.addonSettings
    },
    "#settings/chat": {
      details: strings.chatSettings
    },
    "#settings/labs": {
      details: strings.advancedSettings
    },
    "#settings/offline": {
      details: strings.offlineSettings
    },
    "#settings/oldthemes": {
      details: strings.themeSettings
    },
    inbox: {
      details: strings.lookingForEmail
    },
    starred: { details: strings.viewingStarredEmails },
    snoozed: { details: strings.viewingSnoozedEmails },
    sent: { details: strings.viewingSentEmails },
    drafts: { details: strings.viewingDrafts },
    imp: { details: strings.viewingImportantEmails },
    chats: { details: strings.viewingChat },
    scheduled: { details: strings.viewingScheduled },
    spam: { details: strings.viewingSpam },
    all: { details: strings.viewingAllEmails },
    trash: { details: strings.viewingTrash }
  };

  if (window.location.href.split("/").length === 7) {
    for (const [path, data] of Object.entries(pages)) {
      if (document.location.pathname.endsWith(path))
        presenceData = { ...presenceData, ...data };
    }
    if (href.match("/#label/")) {
      const labelname = document.querySelector("head > title").textContent;
      presenceData.details = "In the Label: ";
      if (!privacy) {
        presenceData.state = labelname
          .replace('"', "")
          .split('" - ')[0]
          .replace(
            ` - ${
              labelname.match(
                /([a-zA-Z][\w.-]*[a-zA-Z0-9])@([a-zA-Z0-9][\w.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z.]*[a-zA-Z])/
              )[0]
            } - Gmail`,
            ""
          );
      }
    } else if (href.match("/#search"))
      presenceData.details = strings.lookingForEmail;
    else if (href.match("compose=new"))
      presenceData.details = strings.composingEmail;
    else presenceData.details = strings.viewingEmail;
  }

  if (timestamps) presenceData.startTimestamp = browsingTimestamp;

  presence.setActivity(presenceData);
});
