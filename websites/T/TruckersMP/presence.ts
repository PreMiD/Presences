const presence = new Presence({
    clientId: "821104573329440848"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    buttons = await presence.getSetting("buttons");

  if (document.location.hostname == "truckersmp.com") {
    presenceData.details = "Viewing the home page";
    presenceData.smallImageKey = "reading";
    if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing the staff team";
    } else if (document.location.pathname.includes("/status")) {
      presenceData.details = "Viewing the server status";
    } else if (document.location.pathname == "/knowledge-base") {
      presenceData.details = "Viewing the knowledge base";
    } else if (document.location.pathname.includes("/article/")) {
      presenceData.details = "Viewing a knowledge base article";
      presenceData.state = document.querySelector("h1").innerHTML;
      presenceData.buttons = [{ label: "Read Article", url: document.URL }];
    } else if (document.location.pathname.includes("/support")) {
      presenceData.details = "Viewing the Support Center";
    } else if (document.location.pathname.includes("/rules")) {
      presenceData.details = "Viewing the rules";
    } else if (document.location.pathname.includes("/download")) {
      presenceData.details = "Viewing the downloads page";
    } else if (document.location.pathname.includes("/user")) {
      presenceData.details = "Viewing a user profile";
      presenceData.state = document.querySelector(
        "div.col-md-12 > h1 > span"
      ).innerHTML;
      presenceData.buttons = [{ label: "View Profile", url: document.URL }];
    } else if (document.location.pathname == "/profile/settings") {
      presenceData.details = "Viewing profile settings";
    } else if (document.location.pathname == "/vtc") {
      presenceData.details = "Viewing the VTC center";
    } else if (document.location.pathname == "/vtc/search") {
      delete presenceData.smallImageKey;
      presenceData.smallImageKey = "search";
      presenceData.details = "Searching for a VTC";
    } else if (document.location.pathname == "/vtc/create") {
      delete presenceData.smallImageKey;
      presenceData.smallImageKey = "editing";
      presenceData.details = "Creating a VTC";
    } else if (document.location.pathname.includes("/vtc/")) {
      presenceData.details = "Viewing a VTC";
      presenceData.state = document.querySelector("h2").innerText;
      presenceData.buttons = [{ label: "View VTC", url: document.URL }];
    } else if (document.location.pathname.includes("/members/")) {
      presenceData.details = "Viewing VTC members";
      presenceData.state = document.querySelector("h2").innerText;
    } else if (document.location.pathname == "/blog") {
      delete presenceData.smallImageKey;
      presenceData.smallImageKey = "search";
      presenceData.details = "Browsing the blog";
    } else if (document.location.pathname.includes("/blog/")) {
      const blogTitle = document.querySelector("div.container-fluid > h1");
      presenceData.details = "Reading the blog:";
      presenceData.state = blogTitle.innerHTML.substring(0, 125) + "...";
      presenceData.buttons = [
        { label: "Read News Article", url: document.URL }
      ];
    } else if (document.location.pathname == "/events") {
      presenceData.details = "Browsing the events center";
    } else if (document.location.pathname == "/events/manage") {
      delete presenceData.smallImageKey;
      presenceData.smallImageKey = "editing";
      presenceData.details = "Managing their events";
    } else if (document.location.pathname == "/events/manage/past") {
      presenceData.details = "Viewing their past events";
    } else if (document.location.pathname.includes("/events/create")) {
      delete presenceData.smallImageKey;
      presenceData.smallImageKey = "editing";
      presenceData.details = "Creating an event";
    } else if (document.location.pathname.includes("/events/search")) {
      delete presenceData.smallImageKey;
      presenceData.smallImageKey = "search";
      presenceData.details = "Searching for an event";
    } else if (document.location.pathname.includes("/events/")) {
      presenceData.details = "Viewing an event";
      presenceData.state = document.querySelectorAll("h1")[1].innerText;
      presenceData.buttons = [{ label: "View Event", url: document.URL }];
    }
  } else if (document.location.hostname == "forum.truckersmp.com") {
    if (document.location.pathname.includes("/forum/")) {
      presenceData.details = "Browsing a forum category";
      presenceData.state = document.querySelector("header > h1").innerHTML;
      presenceData.buttons = [
        { label: "View Forum Category", url: document.URL }
      ];
    } else if (document.location.pathname.includes("/topic/")) {
      presenceData.details = "Viewing a forum topic";
      presenceData.state = document.querySelector(
        "main > div > div > div > div > div > div > h1 > span.ipsType_break > span"
      ).innerHTML;
      presenceData.buttons = [{ label: "Read Forum Topic", url: document.URL }];
    } else if (document.location.pathname.includes("/profile/")) {
      presenceData.details = "Viewing a forum user";
      presenceData.state = document
        .querySelectorAll(
          "main > div > div > div> div > header > div  > div > div"
        )[1]
        .querySelector("div > h1 > span").innerHTML;
      presenceData.buttons = [{ label: "View Forum User", url: document.URL }];
    }
    presenceData.details = "Viewing the forum";
  } else if (document.location.hostname == "map.truckersmp.com") {
    presenceData.details = "Viewing the TruckersMP Map";
    if (document.location.pathname.includes("?follow=")) {
      presenceData.details = "TruckersMP Map";
      presenceData.state = `Following ${
        document.querySelector("div.player-name").innerHTML
      }`;
    }
  } else if (document.location.hostname == "stats.truckersmp.com") {
    presenceData.smallImageKey = "reading";
    if (document.location.pathname == "/") {
      presenceData.details = "Viewing the statistics";
    } else if (document.location.pathname.includes("/api")) {
      presenceData.details = "Viewing the";
      presenceData.state = "API Documentation";
    } else if (document.location.pathname.includes("/live")) {
      presenceData.details = "Viewing the";
      presenceData.state = "Live statistics";
    } else if (document.location.pathname.includes("/history")) {
      presenceData.details = "Viewing the history";
    } else if (document.location.pathname.includes("/settings")) {
      presenceData.details = "Viewing their settings";
      delete presenceData.smallImageKey;
      presenceData.smallImageKey = "editing";
    }
  }
  if (!buttons) delete presenceData.buttons;
  presence.setActivity(presenceData);
});
