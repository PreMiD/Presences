const presence = new Presence({
  clientId: "699318388270301284" //The client ID of the Application created at https://discordapp.com/developers/applications
});

const browsingStamp = Math.floor(Date.now() / 1000);

let title: any;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "v2ex",
    details: "Browsing...",
    startTimestamp: browsingStamp
  };

  const path = document.location.pathname;

  if (!path) {
    presenceData.state = "Home";
  } else if (path.includes("/t/")) {
    title = document.querySelector("#Main > div.box > div.header > h1");

    presenceData.state = title.innerText.trim();
  } else if (path.includes("/member/")) {
    title = document.querySelector("#Main > div.box h1");
    presenceData.state = title.innerText.trim();
  } else if (path.includes("/go/")) {
    title = document.querySelector("head > title");
    presenceData.state = title.innerText
      .replace("V2EX", "")
      .replace("›", "")
      .trim();
  } else if (path == "/new") {
    presenceData.state = "Compose";
    presenceData.details = "New post";
  }

  presence.setActivity(presenceData);
});
