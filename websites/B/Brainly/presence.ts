const presence = new Presence({
  clientId: "787449693449093160"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const presenceData: PresenceData = {
      details: "Browsing the homepage",
      largeImageKey: "logo",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/question/")) {
    const question = document.querySelector("meta[property='og:title']").getAttribute("content").replace('-', '').replace('Brainly.com', '').replace('Brainly.in', '');
    const presenceData: PresenceData = {
      details: "Viewing a question",
      largeImageKey: "logo",
      state: question,
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/app/")) {
    const presenceData: PresenceData = {
      details: "Browsing...",
      largeImageKey: "logo",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/hindi")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Hindi",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/math")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Math",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/history")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "History",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/english")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "English",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/geography")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Geography",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/biology")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Biology",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/physics")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Physics",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/chemistry")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Chemistry",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/social_sciences")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Social Science",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/subject/environmental_sciences")) {
    const presenceData: PresenceData = {
      details: "Viewing questions",
      largeImageKey: "logo",
      state: "Environmental Science",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/all-questions")) {
    const presenceData: PresenceData = {
      details: "Viewing all questions",
      largeImageKey: "logo",
      smallImageKey: "qmark",
      startTimestamp: Date.now()
    };
    presence.setActivity(presenceData);
  }  
});
