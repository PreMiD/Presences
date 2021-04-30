const presence = new Presence({
  clientId: "807748912940711996"
});

var time = Math.floor(Date.now() / 1000);
var path = window.location.pathname;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: time
  };

  switch (path) {
    case '/': presenceData.details = "Viewing Home Page"; break;
    case '/premium': presenceData.details = "Viewing Premium Page"; break;
    case '/create': presenceData.details = "Creating Profile"; break;
    case '/legal': presenceData.details = "Viewing Legal Page"; break;
    case '/partners': presenceData.details = "Viewing Partners Page"; break;
    case '/supporters': presenceData.details = "Viewing Supporters"; break;
    case '/moderators': presenceData.details = `Viewing Moderators Page ${location.href.split("=")[1]}`; break;
    case '/settings': presenceData.details = "Modifying CV"; break;
    case '/profile': presenceData.details = "Viewing Profile Page"; break;
<<<<<<< HEAD
    case '/search':
      presenceData.details = `Searching for ${escape(location.href.split("term=")[1].split("&")[0])}`;
      presenceData.state = `at Page ${location.href.split("page=")[1]}`;
      break;
    default:
      if (path.includes("cv")) {
        var name = !path.endsWith("/rate")
          ? document.querySelector("body > div:nth-child(7) > div.user_box > div.container.left > div > h2")?.getAttribute("data-title")
          : document.querySelector("#box1 > div.vote_box > h1")?.textContent.split("#")[0]
=======
    default:
      if (path.includes("cv")) {
        var name = !path.endsWith("/rate") 
        ? document.querySelector("body > div:nth-child(7) > div.user_box > div.container.left > div > h2")?.getAttribute("data-title")
        : document.querySelector("#box1 > div.vote_box > h1")?.textContent.split("#")[0]
>>>>>>> f8449e789f011c1cef6bf8ab7af6f1e2fd4e484f

        presenceData.details = `${path.endsWith("/rate") ? "Rating" : "Viewing"} ${name || "Dummy"} CV`;
        presenceData.buttons = [
          {
            url: location.href,
            label: "Visit CV Page"
          }
        ];
      } else if (path.includes("u")) {
        var name = document.querySelector("body > div.profile_header > div > div > h1")?.textContent.split("#")[0];
        presenceData.details = `Viewing ${name || "Dummy"} Profile`;
        presenceData.buttons = [
          {
            url: location.href,
            label: "Visit User Page"
          }
        ];
      } else presenceData.details = "Unknown Page";
      break;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
