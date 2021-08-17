const presence = new Presence({
    clientId: "877115128326287390"
  })

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "rawa",
  };

  const pathName = document.location.pathname

  if(pathName === '/') presenceData.details = 'Viewing the homepage'

  /*
  Profile // Account Settings
  */

  else if (pathName === '/dashboard/live') presenceData.details = `Viewing the Live Dashboard`
  else if (pathName === '/dashboard/settings') presenceData.details = `Viewing Profile Settings`
  else if (pathName === '/dashboard/achievements') presenceData.details = `Viewing Achievements`
  else if (pathName === '/account/profile') presenceData.details = `Viewing Profile Settings`
  else if (pathName === '/account/settings') presenceData.details = `Viewing Account Settings`
  else if (pathName === '/account/wallet') presenceData.details = `Viewing their Wallet`

  /*
  Directory
  */
  else if (pathName === '/directory/channels/all') presenceData.details = `Viewing Channel Directory`
  else if (pathName === '/directory/for_you') presenceData.details = `Viewing Followed Channels`

  /*
  Watching Stream
  */
   else if (
       pathName.startsWith('/')
   ) {
       const username = pathName.split('/')[1]
       const game = document.querySelector('.stream-info-game').textContent;

       presenceData.details = `Watching ${username}`
       presenceData.state = `Playing ${game}`
   }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});