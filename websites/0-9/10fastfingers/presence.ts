const presence = new Presence({
    clientId: "895022531868774451"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "typinglogo",
    startTimestamp: browsingStamp
  },
    [,end] = presence.getTimestamps(presence.timestampFromFormat("00:00"), presence.timestampFromFormat("1:00"));
  if (document.location.pathname === "/") presenceData.details = "In home page";
  else if (document.location.pathname.match(/\/typing-test\/.+\/top50/gm)) presenceData.details = "Viewing top 50";
  else if (document.location.pathname.includes("/typing-test/")) {
    const timer = document.querySelector("#timer").textContent;
    if (timer === "1:00") presenceData.details = "Waiting to start a typing test";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing a typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      } | ${wpM[0]} `;
    } else {
      presenceData.endTimestamp = end;
      presenceData.details = "Doing a typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      }`;
    }
  } else if (document.location.pathname.includes("/advanced-typing-test/")) {
    const timer = document.querySelector("#timer").textContent;
    if (timer === "1:00") presenceData.details = "Waiting to start an advance Typing test";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing an advance typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      } | ${wpM[0]} `;
    } else {
      presenceData.endTimestamp = end;
      presenceData.details = "Doing an advance typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      }`;
    }
  } else if (document.location.pathname.includes("/competition/")) {
    const timer = document.querySelector("#timer").textContent;
    if (timer === "1:00") presenceData.details = "Waiting to start a competition";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing a competition:";
      presenceData.state = `${wpM[0]} WPM `;
    } else {
      presenceData.endTimestamp = end;
      presenceData.details = "Doing a competition";
    }
  } else if (document.location.pathname.includes("/text/")) {
    const timer = document.querySelector("#time").textContent;
    if (timer === "00:00") presenceData.details = "Waiting to start a text practice";
    else {
      const finalTime = document.querySelector(".col-md-6 > p > strong");

      if (finalTime) {
        presenceData.details = "Finishing a text practice";
        presenceData.state = `Final time: ${finalTime.textContent}m`;
      } else presenceData.details = "Doing a text practice";
    }
  } else if (
    document.location.pathname.includes("/widget/") ||
    document.location.pathname.includes("/widgets/")
  ) {
    const timer = document.querySelector("#timer").textContent;

    if (
      timer === "1:00" ||
      timer === "0:30" ||
      timer === "2:00" ||
      timer === "5:00" ||
      timer === "10:00"
    )
      presenceData.details = "Waiting to start a custom typing test";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing a custom typing test:";
      presenceData.state = `${wpM[0]}`;
    } else presenceData.details = " Doing a custom typing test";
  } else if (document.location.pathname.includes("/user/")) {
    presenceData.details = "Viewing a user profile:";
    presenceData.state = document.querySelector(".row > h2").lastChild.nodeValue;
  } else if (document.location.pathname.includes("/email_settings")) presenceData.details = "Viewing email settings";
  else if (document.location.pathname.includes("/active-user-alltime")) presenceData.details = "Viewing all-time records";
  else if (document.location.pathname.includes("/text-practice/new")) presenceData.details = "Viewing text practice";
  else if (document.location.pathname.includes("/multiplayer")) presenceData.details = "Doing a multiplayer typing test";
  else if (document.location.pathname.includes("/faq")) presenceData.details = "Reading the FAQ";
  else if (document.location.pathname.includes("/forum/")) presenceData.details = "Viewing the forums";
  else if (document.location.pathname.includes("/supporter")) presenceData.details = "Viewing the list of supporters";
  else if (document.location.pathname.includes("/login")) presenceData.details = "Logging in...";
  else if (document.location.pathname.includes("/create-account")) presenceData.details = "Creating an account..";
  else if (document.location.pathname.includes("/impressum")) presenceData.details = "Reading the privacy policy";
  else if (document.location.pathname.includes("/gdpr")) presenceData.details = "Reading information about GDPR";
  else if (document.location.pathname.includes("/cookie-policy")) presenceData.details = "Reading the cookie policy";
  else if (document.location.pathname.includes("/settings")) presenceData.details = "Viewing their settings";
  else if (document.location.pathname.includes("/achievements")) presenceData.details = "Viewing their achievements";
  else if (document.location.pathname.includes("/translations")) presenceData.details = "Learning how to translate";
  else if (document.location.pathname.includes("/competitions")) presenceData.details = "Viewing the list of competitions";
  else if (document.location.pathname.includes("/anticheat")) presenceData.details = "Viewing the Anti-Cheat";
  else if (document.location.pathname.includes("/top1000/")) {
    const lang = document.location.pathname.split("/");
    presenceData.details = "Doing the top 1000 typing test:";
    presenceData.state = `In ${lang[lang.length - 3]}`;
  } else if (document.location.pathname.includes("/top1000")) presenceData.details = "Viewing the top 1000 typing mode";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
