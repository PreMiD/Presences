const presence = new Presence({
  clientId: "827910536049852488"
}), browsingStamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement,
title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  page = window.location.pathname;

    presenceData.startTimestamp = browsingStamp;
    if (page === "/") {
      search = document.querySelector("#search-input");
      if (!search) {
        presenceData.details = "Viewing The Homepage";
      } else if (search.value !== "") {
        presenceData.details = "Searching:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else { 
        presenceData.details = "Viewing the homepage";
      }
    } else if (page.includes("/category/")) {
      if (page == "/category/all") {
        presenceData.details = "Viewing All Categories"
      } else {
        title = document.querySelector("#content-canvas > div.cap > div > h2 > a > span");
        presenceData.details = "Viewing Category:"
        presenceData.state = title.textContent
        presenceData.buttons = [{label: "View Category", url: window.location.href}]
      }
    } else if (page == "/community") {
      presenceData.details = `Viewing the forums`
    } else if (page.includes("/forum/")) {
      title = document.querySelector("#content-canvas > main > h1");
      presenceData.details = `Viewing Forum:`
      presenceData.state = title.textContent.replace("Forums → ", "")
      presenceData.buttons = [{label: "View Forum", url: window.location.href}]
    } else if (page.includes("thread")) {
      title = document.querySelector("#thread-title");
      presenceData.details = `Reading Forum Thread:`
      presenceData.state = title.textContent
      presenceData.buttons = [{label: "View Thread", url: window.location.href}]
    } else if (page.includes("/friends/")) {
      title = document.querySelector("#main > h2");
      if (title.textContent == "Your Friends") {
        presenceData.details = `Viewing my friends`
        presenceData.buttons = [{label: "View Friends", url: window.location.href}]
      } else {
        presenceData.details = `Viewing the friends of:`
        presenceData.state = title.textContent
        presenceData.buttons = [{label: "View Friends", url: window.location.href}]
      }
    } else if (page.includes("/user/")) {
      title = document.querySelector("#user-data > h1");
      presenceData.details = `Viewing the profile of:`
      presenceData.state = title.textContent
      presenceData.buttons = [{label: "View Profile", url: window.location.href}]
    } else if (page.includes("/author/")) {
      title = document.querySelector("#categorylisting > h2 > a");
      presenceData.details = `Viewing Games Made By:`
      presenceData.state = title.textContent
      presenceData.buttons = [{label: "View Profile", url: window.location.href}]
    } else if (page == "/register" || page == "/register/") {
      presenceData.details = "Registering"
    } else if (page == "/settings/general") {
      presenceData.details = "Viewing:"
      presenceData.state = "General Settings"
    } else if (page == "/settings/friends") {
      presenceData.details = "Viewing:"
      presenceData.state = "My Friends"
    } else if (page == "/settings/quests") {
      presenceData.details = "Viewing:"
      presenceData.state = "Quests"
    } else if (page == "/settings/favs") {
      presenceData.details = "Viewing:"
      presenceData.state = "Favs"
    } else if (page == "/settings/contact") {
      presenceData.details = "Viewing:"
      presenceData.state = "Contact Settings"
    } else if (page == "/settings/accounts") {
      presenceData.details = "Viewing:"
      presenceData.state = "Soicial Settings"
    } else if (page == "/settings/purchases") {
      presenceData.details = "Viewing:"
      presenceData.state = "My Purchases"
    } else if (page == "/settings/password") {
      presenceData.details = "Viewing:"
      presenceData.state = "Password Settings"
    } else if (page.includes("/games/")) {
      title = document.querySelector("#content-canvas > section.game-header.clearfix > h1");
      presenceData.details = "Browsing:"
      presenceData.state = "All Games"
      presenceData.buttons = [{label: "Browse Games", url: window.location.href}]
    } else if (page.includes("game")) {
      title = document.querySelector("#content-canvas > section.game-header.clearfix > h1");
      presenceData.details = "Playing:"
      presenceData.state = title.textContent
      presenceData.buttons = [{label: "Play Game", url: window.location.href}]
    } else {
      presenceData.details = "Error | idk this page."
      presenceData.state = "Create an issue on github"
    }
   


  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});