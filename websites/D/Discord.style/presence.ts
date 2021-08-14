const presence = new Presence({
    clientId: "847409866528260116"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "discordstyle_logo"
    };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/results")) {
    const search =
        document.querySelectorAll("span.font-semibold")[1]?.textContent,
      resultsAmount =
        document.querySelectorAll("span.font-semibold")[0]?.textContent;
    presenceData.details = `🔍 Searching for: ${search || "Nothing"}`;
    presenceData.state = `📖 ${resultsAmount} result(s)`;
  } else if (document.location.pathname.includes("/template/")) {
    const templateName = document.querySelector(
        "h1.w-full.pr-6.text-4xl.font-bold.break-words.opacity-95"
      )?.textContent,
      downloads = document.querySelectorAll("span.font-bold")[0]?.textContent,
      likes = document.querySelectorAll("span.font-bold")[1]?.textContent,
      comments = document.querySelectorAll("span.font-bold")[2]?.textContent,
      age = document
        .querySelectorAll("span.font-bold")[3]
        ?.textContent.split("ago")[0];
    presenceData.details = `Viewing ${templateName} template`;
    presenceData.state = `👇 ${downloads}, ❤️ ${likes}, 💬 ${comments}, 📆 ${age}`;
    presenceData.buttons = [
      {
        label: "View Template",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/user")) {
    const username = document.querySelector(
        "h1.text-2xl.font-semibold.text-white"
      )?.textContent,
      templates = document.querySelectorAll("span.text-on-naked.text-xs")[0]
        ?.textContent,
      liked = document.querySelectorAll("span.text-on-naked.text-xs")[1]
        ?.textContent;
    presenceData.details = `Viewing ${
      username
        ? username.endsWith("s")
          ? `${`${username}'`}`
          : `${`${username}'s`}`
        : "Unknown"
    } profile`;
    presenceData.state = `🖼️ ${templates} & ❤️ ${liked}`;
    presenceData.buttons = [
      {
        label: "View User",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/latest")) {
    const page = document.querySelector(
      "h2.text-lg.font-semibold.text-white"
    )?.textContent;
    presenceData.details = "Viewing latest templates";
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Latest",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/search")) {
    presenceData.details = "Viewing search page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/bot")) {
    presenceData.details = "Viewing 🤖 bot page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/new"))
    presenceData.details = "Creating 🎨 new template";
  else if (document.location.pathname.includes("/browse")) {
    const [tag] = document.location.href.split("tag=")[1].split("&"),
      page = document.querySelector(
        "h2.text-lg.font-semibold.text-white"
      )?.textContent;
    presenceData.details = `Viewing ${tag ? `${`${tag} tag`}` : "Nothing"}`;
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Tag",
        url: document.location.href
      }
    ];
  }

  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
