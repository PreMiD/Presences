const presence = new Presence({
    clientId: "824726477936656424"
  }), data: {
    presenceData?: PresenceData;
    privacyMode?: boolean;
    dataSent?: boolean;
  } = {};  

presence.on("UpdateData", async () => {
  console.log(1)

  data.privacyMode = await presence.getSetting("privacy");
  data.presenceData = {
    largeImageKey: "logo"
  };

  if(await matchPage("/"))
    updateData("Viewing page:", "Homepage", false);
  else if(await matchPage("/pics"))
    updateData("Viewing page:", "Memes and Pictures")
  else if(await matchPage("/LeaderBoard"))
    updateData("Viewing page:", "Leaderboard")
  else if(await matchPage("/Upload/joke"))
    updateData("Viewing page", "Upload (Joke)")
  else if(await matchPage("/upload/picture"))
    updateData("Viewing page", "Upload (Picture)")
  else if(await matchPage("/manage/profile"))
    updateData("Viewing page", "Manage Profile")
  else if(await matchPage("/message"))


  if(data.dataSent) presence.setActivity(data.presenceData);
  else presence.setTrayTitle();
});

async function matchPage(href: string) {
  console.log(href, window.location.pathname);

  if(window.location.pathname === href) return true;
  else return false;
}

function updateData(details?: string, state?: string, buttons: boolean = true) {
  console.log(details, state, buttons)
  if(buttons && !data.privacyMode) data.presenceData.buttons = [{ label: "View Page", url: window.location.href }];
  if(details && !data.privacyMode) data.presenceData.details = details;
  if(state && !data.privacyMode) data.presenceData.state = state;
  if(data.privacyMode) data.presenceData = {
    ...data.presenceData,
    details: "Privacy mode enabled",
    state: "Content hidden"
  };

  data.dataSent = true;
}