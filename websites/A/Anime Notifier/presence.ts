const presence = new Presence({

  clientId: "838833715013746729"
});

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "notifymoe_1024"
  };


  if (!document.getElementById("audio-player-anime-info").classList.contains("hidden")) //    Check for music
  {
    let musicPlayer = document.getElementById("audio-player");

    presenceData.smallImageKey = "music_512";
    presenceData.smallImageText = "Listening to " + musicPlayer.children[1].innerHTML;
  }

  var location = window.location.pathname.split("/");

  switch (location[1]) {

    case "activity":
      presenceData.details = "Viewing recent activity";
    break;

    case "forum":
      presenceData.details = "Viewing the forum";
    break;

    case "explore":
      presenceData.details = "Exploring the explore page";
    break;

    case "amvs":
      presenceData.details = "Looking at AMVs";
    break;

    case "soundtracks":
      presenceData.details = "Looking for music";
    break;

    case "quotes":
      presenceData.details = "Scrolling through quotes";
    break;

    case "quote":
      presenceData.details = `Looking at a quote`;
    break;

    case "groups":
      presenceData.details = "Viewing groups";
    break;

    case "group":
      presenceData.details = `Viewing the ${document.getElementsByTagName("title")[0].innerHTML} group`
    break;

    case "users":
      presenceData.details = "Scrolling though users";
    break;

    case "support":
      presenceData.details = "Considering supporting";
    break;

    case "post":
      let postAuthor = document.getElementById(`post-${location[2]}`).children[0].children[1].children[0].children[0].children[0].innerHTML;
      presenceData.details = `Viewing ${postAuthor}'s post`;
    break;

    case "thread":
      presenceData.details = `Viewing ${document.getElementsByTagName("title")[0].innerHTML} on the forums`;
    break;

    case "anime":
      presenceData.details = `Viewing ${document.getElementsByTagName("title")[0].innerHTML}`;
    break;

    case "settings":
      presenceData.details = "Setting settings";
    break;

    case "notifications":
      presenceData.details = "Viewing notifications";
    break;

    default:

    if (window.location.toString().startsWith("https://notify.moe/+") && location.length == 2)
    {
      presenceData.details = "Viewing " + document.getElementsByTagName("title")[0].innerHTML + "'s profile";
    }
    else 
    {
      switch (location[2])
      {
        case "animelist":
          switch (location[3])
          {
            case "watching":
              presenceData.details = `Viewing the anime ${location[1].replace('+', '')} is watching`;
            break;

            case "completed":
              presenceData.details = `Viewing anime ${location[1].replace('+','')} has finished`;
            break;

            case "planned":
              presenceData.details = `Viewing anime ${location[1].replace('+','')} plans to watch`;
            break;

            case "hold":
              presenceData.details = `Viewing anime ${location[1].replace('+','')} has on hold`;
            break;

            case "dropped":
              presenceData.details = `Viewing anime ${location[1].replace('+','')} dropped`;
            break;

            case "anime":
              presenceData.details = `Putting ${document.getElementsByTagName("title")[0].innerHTML} on my list`;
            break;

          }
        break;

        default:
          console.error("Something bad happened.");
        break;
      }
    }
      
    break;
  }

  if (await presence.getSetting("button-to-list") == true) {
    presenceData.buttons = [
      {
        "label": "View my list",
        "url": `https://notify.moe/${await presence.getSetting("set-user-name")}/`
      }
    ]
  }

  presence.setActivity(presenceData);
});