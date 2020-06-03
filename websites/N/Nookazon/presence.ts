const presence = new Presence({
  clientId: "717505812964048986"
});

const elapsed = Math.floor(Date.now() / 1000);

interface String {
  capitalize(): string;
}

String.prototype.capitalize = function(d = /[ -]/) {
  let r = "";
  const a = this.toString().split(d);
  for (let i = 0; i < a.length; i++) {
    if (i == 0) {
      r = a[i].charAt(0).toUpperCase() + a[i].slice(1);
    } else {
      r = r + this.toString().substring(a.slice(0, i).join().length, a.slice(0, i).join().length + 1) + a[i].charAt(0).toUpperCase() + a[i].slice(1);
    }
  }
  return r;
}

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "icon",
    startTimestamp: elapsed
  };

  const useChatNames: boolean = await presence.getSetting("useChatNames");

  const urlVars = new URLSearchParams(document.location.search);

  switch (document.location.pathname.replace("/", "").split("/")[0]) {
    case "":
      presenceData.details = "Homepage";
      break;
    case "latest":
      presenceData.details = "Latest Listings";
      break;
    case "guide":
      presenceData.details = "Getting Started Guide";
      break;
    case "faq":
      presenceData.details = "Frequently Asked Questions";
      break;
    case "trading-guide":
      presenceData.details = "Trading Guide";
      break;
    case "signup":
      presenceData.details = "Signing Up";
      break;
    case "login":
      presenceData.details = "Logging In";
      break;
    case "submit-feedback":
      presenceData.details = "Feedback Submission Guide";
      break;
    case "report-users":
      presenceData.details = "User Reporting Guide";
      break;
    case "products":
      try {
        var department = document.querySelector(".nav-bottom .selected").textContent;
      }
      catch {
        var department = "All Products";
      }
      try {
        var category = document.querySelector(".items-category-active").textContent.capitalize();
      }
      catch {
        var category = "";
      }
      try {
        var tag = urlVars.get("tag").capitalize();
      }
      catch {
        var tag = "";
      }
      try {
        const element = <HTMLInputElement>document.querySelector(".search-diy-filter");
        var diy = element.checked;
      }
      catch {
        var diy = false;
      }
      let filter = "None";
      if (category !== "") {
        filter = category;
      }
      if (tag !== "") {
        if (filter == "None") {
          filter = tag;
        }
        else {
          filter = filter + ", " + tag;
        }
      }
      if (diy) {
        if (filter == "None") {
          filter = "DIY";
        }
        else {
          filter = filter + ", " + "DIY";
        }
      }
      presenceData.details = "Looking For " + department;
      presenceData.state = "Filters: " + filter;
      break;
    case "profile":
      presenceData.details = document.querySelector(".profile-name").textContent + "'s Profile";
      try {
        presenceData.state = "Viewing " + document.querySelector("a.profile-tab-active").textContent;
      }
      catch {
        console.log("No active profile tab - State parameter will not be reported to PreMiD.");
      }
      break;
    case "chat":
      presenceData.details = "Viewing Chats";
      if (document.querySelector(".chat-info") !== null) {
        if (useChatNames) {
          presenceData.state = "Chatting With " + document.querySelector(".chat-info").textContent.replace("Report User", "");
        }
        else {
          presenceData.state = "Chatting With A User";
        }
      }
      else {
        presenceData.state = "No Chats";
      }
      break;
    case "cart":
      presenceData.details = "Viewing Cart";
      presenceData.state = document.querySelector(".profile-tab-active").textContent + " Offers";
      break;
    case "product":
      presenceData.details = "Viewing A Product";
      presenceData.state = document.querySelector(".product-name").textContent.capitalize();
  }
  presence.setActivity(presenceData);
});
