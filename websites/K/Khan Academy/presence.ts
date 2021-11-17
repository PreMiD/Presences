const presence = new Presence({
    clientId: "900882829154598952"
  }),
  strings = presence.getStrings({
    homepage: "general.viewHome",
    settings: "google classroom.settings",
    watching: "general.watching",
    reading: "general.readingAbout",
    writing: "general.writing",
    profile: "general.viewProfile"
  });

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "khanacademy",
    details: (await strings).watching
  };

  if (document.location.pathname === "/")
    data.state = `🏠 ${(await strings).homepage}`;
  else if (document.location.pathname.includes("/courses"))
    data.state = "📚 Courses";
  else if (document.location.pathname.includes("/progress"))
    data.state = "📊 Progress";
  else if (document.location.pathname.includes("/teachers"))
    data.state = "🎓 Teachers";
  else if (document.location.pathname.includes("/profile")) {
    data.details = (await strings).profile;
    data.state = `👀 ${document.querySelector("._o77ufew").textContent}`;
  } else if (document.location.pathname.includes("/settings"))
    data.state = `⚙️ ${(await strings).settings}`;
  else if (document.location.pathname.includes("/search")) {
    data.state = `🔍 Searching for '${
      document.location.pathname.split("page_search_query=")[1]
    }'`;
  } else if (document.location.pathname.includes("/topics"))
    data.state = "🔍 Community";
  else if (document.location.pathname.includes("/posts"))
    data.state = "🔍 Community Post";
  else if (document.location.pathname.includes("/requests/new"))
    data.state = "⚠️ Submitting a Request";
  else if (document.location.hostname.includes("support"))
    data.state = "💡 Support";
  else if (document.location.pathname.split("/").length < 3)
    data.state = `📖 ${document.querySelector("._aemo2b3").textContent}`;
  else {
    data.details = document.querySelector(
      "._io410w6, span._cmfzobe:nth-child(2) > a:nth-child(2)"
    ).textContent;
    data.state = `📋 ${document
      .querySelector(
        "._1eqoe4n8, span._cmfzobe:nth-child(3) > a:nth-child(2), #uid-dialog-0-title > span:nth-child(1)"
      )
      .textContent.replace(/.*?:\s+/, "")}`;

    if (document.location.pathname.match(/\/(v|a|e|quiz)\//)) {
      data.smallImageText = document.querySelector(
        '._1l44zfj, [role="dialog"] [data-test-id="modal-title"]'
      ).textContent;

      if (document.location.pathname.includes("/v/"))
        data.smallImageKey = "video";
      else if (document.location.pathname.includes("/a/"))
        data.smallImageKey = "article";
      else data.smallImageKey = "exercise";
    }
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
