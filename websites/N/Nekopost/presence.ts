const presence = new Presence({
    clientId: "846071986902925312"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "nekopost_logo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname.includes("/manga")) {
    if (document.location.pathname.includes("/manga/")) {
      if (document.querySelector("head > title").textContent.includes("Ch")) {
        presenceData.details = `Manga :${
          document.querySelector("head > title").textContent.split("-")[1]
        }!`;
        const [state] = document
          .querySelector("head > title")
          .textContent.split(" ");
        presenceData.state = state;
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.details = `Manga :${
          document.querySelector("head > title").textContent
        }!`;
        presenceData.smallImageKey = "search";
      }
    } else {
      presenceData.details = "กำลังเลือก Manga";
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/novel")) {
    if (document.location.pathname.includes("/novel/")) {
      if (document.querySelector("head > title").textContent.includes("Ch")) {
        presenceData.details = `Novel :${
          document.querySelector("head > title").textContent.split("-")[1]
        }!`;
        const [state] = document
          .querySelector("head > title")
          .textContent.split(" ");
        presenceData.state = state;
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.details = `Novel :${
          document.querySelector("head > title").textContent
        }!`;
        presenceData.smallImageKey = "search";
      }
    } else {
      presenceData.details = "กำลังเลือก Novel";
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/comic")) {
    if (document.location.pathname.includes("/comic/")) {
      if (document.querySelector("head > title").textContent.includes("Ch")) {
        presenceData.details = `Comic :${
          document.querySelector("head > title").textContent.split("-")[1]
        }!`;
        const [state] = document
          .querySelector("head > title")
          .textContent.split(" ");
        presenceData.state = state;
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.details = `Comic :${
          document.querySelector("head > title").textContent
        }!`;
        presenceData.smallImageKey = "search";
      }
    } else {
      presenceData.details = "กำลังเลือก Original Comic";
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/fiction")) {
    if (document.location.pathname.includes("/fiction/")) {
      if (document.querySelector("head > title").textContent.includes("Ch")) {
        presenceData.details = `ONovel :${
          document.querySelector("head > title").textContent.split("-")[1]
        }!`;
        const [state] = document
          .querySelector("head > title")
          .textContent.split(" ");
        presenceData.state = state;
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.details = `ONovel :${
          document.querySelector("head > title").textContent
        }!`;
        presenceData.smallImageKey = "search";
      }
    } else {
      presenceData.details = "กำลังเลือก Original Novel";
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/explore")) {
    presenceData.details = "กำลังเลือก Project";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname === "/") {
    presenceData.details = "กำลังหา...";
    presenceData.smallImageKey = "search";
  }
  presence.setActivity(presenceData);
});
