const presence = new Presence({
  clientId: "825744203350802462"
}),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceD: PresenceData = {
    largeImageKey: "icon",
    startTimestamp: browsingTimestamp
  },
    page = window.location.pathname,
    urlParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );

  switch(page) {
     case "/": /* code */ break;
     case "/moderators": /* code */ break;
     case "/profile": /* code */ break;
     case "/premium": /* code */ break;
     case "/legal" : /* code */ break;
     case "/partners": /* code */ break;
     case "/supporters": /* code */ break;
     case "/settings": /* code */ break;
     case "/create": /* code */ break;
     default: {
        if (page.includes("/cv/")) {
         /* code */
        }
        /* code for unknown page */
     } break;
  }

  if (presenceD.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceD);
  }
});
