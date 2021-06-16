const presence = new Presence({
  clientId: "854448403273351202"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  // typer.io/play presence (aka quick play)
  if (document.location.pathname.startsWith("/play")) {

    const playingStatus = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.Status_root__2iFRH > div > h3").textContent.split("Jump to")[0]
      .trim();

    if (playingStatus) {
      presenceData.details = "In a quick play race:";
      presenceData.state = playingStatus;
    }

    try {
      const quickplayWPM = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div:nth-child(1) > div > div.ClientList_username__3mARu > div.ClientList_usernameWrapper__3AP4s > div")
        .textContent.split("Jump to")[0]
        .trim(),
        quickplayAccuracyUnmerged = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div:nth-child(1) > div > div.ClientList_stats__3aNhg > span:nth-child(2)").textContent.split("Jump to")[0]
          .trim().replace("ACCURACY", ""),
        quickplayAccuracy = `${quickplayAccuracyUnmerged} acc`,
        quickplayRaceStatus = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.Status_root__2iFRH > div > h3").textContent.split("Jump to")[0]
          .trim();

      if (quickplayRaceStatus === "GO!") {
        presenceData.details = "In a quick play race:";
        presenceData.state = `${quickplayWPM}, ${quickplayAccuracy}`;
      }

      const quickplayRacePlace = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div:nth-child(1) > div > div.ClientList_username__3mARu > div.ClientList_placement__3G8W_").textContent.split("Jump to")[0]
        .trim(),
        quickplayRaceTime = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div:nth-child(1) > div > div.ClientList_stats__3aNhg > span:nth-child(3)").textContent.split("Jump to")[0]
          .trim().replace("TIME", "");

      if (quickplayRaceTime !== "--:--") {
        presenceData.details = `Placed ${quickplayRacePlace} in a quick play race!`;
        presenceData.state = `${quickplayWPM}, ${quickplayAccuracy}, ${quickplayRaceTime}`;
      }

      if (quickplayRacePlace === "-" && quickplayWPM !== "undefined" && quickplayRaceStatus === "Game has Ended") {
        presenceData.details = "The game ended, did not place.";
        presenceData.state = `${quickplayWPM}, ${quickplayAccuracy}`;
      }
    } catch {
      presenceData.details = "In a quick play race:";
      presenceData.state = "Connecting...";
    }
  } else if (document.location.pathname.startsWith("/solo")) {
    // typer.io/solo (when playing on the solo mode, aka solo play)
    const soloRaceStatus = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.Play_soloContainer__1IpE4 > div.Status_root__2iFRH > div > h3").textContent.split("Jump to")[0]
      .trim();

    if (soloRaceStatus !== "Press 'Space' to begin...") {
      presenceData.details = "In a solo race:";
      presenceData.state = soloRaceStatus;
    } else if (soloRaceStatus === "Press 'Space' to begin...") {
      presenceData.details = "In a solo race:";
      presenceData.state = "Waiting for user to start the race.";
    }

    try {
      const soloWPM = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.Play_soloContainer__1IpE4 > div.ClientList_root__3kp8e.ClientList_soloRoot__1gfSf > div > div > div > div.ClientList_username__3mARu > div > div").textContent.split("Jump to")[0]
        .trim(),
        soloAccuracyUnmerged = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.Play_soloContainer__1IpE4 > div.ClientList_root__3kp8e.ClientList_soloRoot__1gfSf > div > div > div > div.ClientList_stats__3aNhg > span:nth-child(2)").textContent.split("Jump to")[0]
          .trim().replace("ACCURACY", ""),
        soloAccuracy = `${soloAccuracyUnmerged} acc`,
        soloRaceTime = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.Play_soloContainer__1IpE4 > div.ClientList_root__3kp8e.ClientList_soloRoot__1gfSf > div > div > div > div.ClientList_stats__3aNhg > span:nth-child(3)").textContent.split("Jump to")[0]
          .trim().replace("TIME", "");

      if (soloRaceStatus === "GO!") {
        presenceData.details = "In a solo race:";
        presenceData.state = `${soloWPM}, ${soloAccuracy}`;
      }

      if (soloRaceStatus === "Game has Ended" && soloRaceTime !== "--:--") {
        presenceData.details = "Completed a solo race:";
        presenceData.state = `${soloWPM}, ${soloAccuracy}, ${soloRaceTime}`;
      } else if (soloRaceStatus === "Game has Ended" && soloRaceTime === "--:--") {
        presenceData.details = "Did not complete solo race:";
        presenceData.state = `${soloWPM}, ${soloAccuracy}`;
      }
    } catch {
      presenceData.details = "In a solo race:";
      presenceData.state = "Connecting...";
    }
  } else if (document.location.pathname.startsWith("/lobby")) {
    // typer.io/lobby (aka custom play or group play)
    try {
      const lobbyInfo = document.querySelector("#__next > main > div > div.Lobby_container__1Y-Os > div.Banner_root__thCyZ > h3").textContent.split("Jump to")[0]
        .trim();
      presenceData.details = lobbyInfo;
    } catch {
      const playingStatus = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.Status_root__2iFRH > div > h3").textContent.split("Jump to")[0]
        .trim(),
        privateWPM = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div > div > div.ClientList_username__3mARu > div.ClientList_usernameWrapper__3AP4s > div")
          .textContent.split("Jump to")[0]
          .trim(),
        privateAccuracyUnmerged = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div > div > div.ClientList_stats__3aNhg > span:nth-child(2)").textContent.split("Jump to")[0]
          .trim().replace("ACCURACY", ""),
        privateRacePlace = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div > div > div.ClientList_username__3mARu > div.ClientList_placement__3G8W_").textContent.split("Jump to")[0]
          .trim(),
        privateAccuracy = `${privateAccuracyUnmerged} acc`,
        privateRaceTime = document.querySelector("#__next > div.Play_root__16QtH > div.Play_container__392yl.false > div.ClientList_root__3kp8e.false > div > div > div > div.ClientList_stats__3aNhg > span:nth-child(3)").textContent.split("Jump to")[0]
          .trim().replace("TIME", "");

      if (playingStatus === "Get Ready..." || playingStatus === "Get Set...") {
        presenceData.details = "In a private lobby race:";
        presenceData.state = playingStatus;
      }

      if (playingStatus === "GO!") {
        presenceData.details = "In a private lobby race:";
        presenceData.state = `${privateWPM}, ${privateAccuracy}`;
      }

      if (privateRacePlace !== "-" || playingStatus === "Game has Ended") {
        presenceData.details = `Placed ${privateRacePlace} in a private race!`;
        presenceData.state = `${privateWPM}, ${privateAccuracy}, ${privateRaceTime}`;
      }

      if (privateRacePlace === "-" && playingStatus === "Game has Ended") {
        presenceData.details = "The game ended, did not place.";
        presenceData.state = `${privateWPM}, ${privateAccuracy}`;
      }
    }
  } else if (document.location.pathname.startsWith("/forum/post/")) {
    // typer.io/forum/posts (when viewing individual posts)
    try {
      const postName = document.querySelector("#__next > div.Post_root__ivA4B > div > div.Post_postContainer__oful_ > div.Post_postContent__2KI4z > div.Post_header__19SiQ > h1").textContent.split("Jump to")[0]
        .trim();
      presenceData.details = "Reading a post on the forum:";
      presenceData.state = postName;
    } catch {
      presenceData.details = "Reading a post on the forum.";
    }
  } else if (document.location.pathname === ("/forum")) presenceData.details = "Scrolling through forum posts.";
  // typer.io/forum (when scroling through all the posts on the forum)
  else if (document.location.pathname.startsWith("/hiscores")) presenceData.details = "Viewing the hiscores.";
  // typer.io/hiscores (when viewing the hiscores page)
  else if (document.location.pathname === "/u/settings") presenceData.details = "Editing account settings...";
  // typer.io/u/settings (when a user is editing their bio/settings)
  else if (document.location.pathname.startsWith("/u/")) {
    // typer.io/u/(username) (when viewing a users profile)
    try {
      const user = document.querySelector("#__next > div.Profile_root__2QIUs > div.Profile_headerContainer__IYvIA > div.Profile_profileContainer__k2Fu9 > div.Profile_wrapper__3Ghk7 > div.Profile_content__rWK4h > h3").textContent.split("Jump to")[0]
        .trim();
      presenceData.details = "Viewing a users profile:";
      presenceData.state = user;
    } catch {
      presenceData.details = "Viewing a users profile.";
    }
  } else if (document.location.pathname.startsWith("/login")) presenceData.details = "Logging in...";
  // typer.io/login (when logging into an account via the login page)
  else if (document.location.pathname.startsWith("/signup")) presenceData.details = "Creating an account...";
  // typer.io/singup (when creating account via the signup page)
  else if (document.location.pathname === "/") presenceData.details = "Viewing the home page.";
  // When viewing the home page (typer.io, no ending on the url typer.io)
  else {
    // When viewing a 404 page
    try {
      const pageNotFoundText = document.querySelector("#__next > main > h1").textContent.split("Jump to")[0]
        .trim();
      presenceData.details = pageNotFoundText;
    } catch {
      // When viewing a page which does not have 404 text.
      presenceData.details = "Viewing an unsupported page.";
    }
  }
  presence.setActivity(presenceData);
});