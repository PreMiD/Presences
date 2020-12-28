const presence = new Presence({
    clientId: "785263902321541181" //Presence Application ID on Discord Developers.
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "linkedin_logo"
    },
    path = document.location.pathname;

  if (document.location.hostname == "www.linkedin.com") {
    //Feed section.
    if (path == "/feed/") {
      presenceData.details = "Browsing Feed.";
      presenceData.startTimestamp = browsingStamp;
    }
    //Feed subsections.
    else if (path.includes("/feed/")) {
      enum feedSubSection {
        "follow/" = "Browsing suggestions.",
        "following/" = "Viewing Following:",
        "followers/" = "Viewing Followers."
      }
      enum filterType {
        connection = "Connections.",
        member = "Members.",
        company = "Companies.",
        channel = "Hashtags."
      }
      const subSection =
        feedSubSection[
          path.split("/feed/").pop() as keyof typeof feedSubSection
        ];

      presenceData.details = subSection;
      //If the user is on following/ subsection, show the selected filter.
      if (subSection == feedSubSection["following/"]) {
        presenceData.state = `Filtering by ${
          filterType[
            document.location.search.split("=").pop() as keyof typeof filterType
          ] || "All."
        }`;
      }
      presenceData.startTimestamp = browsingStamp;
    }
    //My Network section & subsections.
    else if (path.includes("/mynetwork/")) {
      presenceData.details = "Managing Network:";
      presenceData.startTimestamp = browsingStamp;

      //Invitations subsection.
      if (path.includes("/invitation-manager/")) {
        presenceData.state = "Viewing Invitations.";
      }
      //Contacts subsections.
      else if (path.includes("/import-contacts/")) {
        //Contacts homepage.
        if (path.endsWith("saved-contacts/")) {
          presenceData.state = "Browsing Contacts.";
        }
        //Adding contacts.
        else {
          presenceData.state = "Adding Contacts.";
        }
      }
      //Teammates subsection.
      else if (path.includes("/colleagues/")) {
        presenceData.state = "Browsing Colleagues.";
      }
      //My Network subsections with same link path structure.
      else {
        enum networkSubSection {
          "connections/" = "Browsing Connections.",
          "events/" = "Browsing Events.",
          "newsletters/" = "Reading Newsletters."
        }

        presenceData.state =
          networkSubSection[
            path
              .split(/\/[a-z]+-[a-z]+\//)
              .pop() as keyof typeof networkSubSection
          ] || "Homepage.";
      }
    }
    //Jobs section.
    else if (path.includes("/jobs/") || path == "/my-items/saved-jobs/") {
      presenceData.startTimestamp = browsingStamp;

      //Application settings subsection.
      if (path.endsWith("application-settings/")) {
        presenceData.details = "Editing settings:";
        presenceData.state = "Application.";
      }
      //Others subsections.
      else {
        presenceData.details = "Browsing Jobs:";

        //Saved Jobs subsection.
        if (path == "/my-items/saved-jobs/") {
          presenceData.state = "Saved Jobs.";
        }
        //Searching for a Job subsection.
        else if (path == "/jobs/search/") {
          //Getting user preference for showJobsQuery.
          const showJobsQuery = await presence.getSetting("showJobsQuery");

          if (showJobsQuery) {
            const jobsQuery = decodeURI(
              document.location.search
                .split("keywords=")
                .pop()
                .split("&")
                .shift()
            );

            presenceData.state = `Searching for a "${jobsQuery}" position.`;
          } else {
            presenceData.state = "Searching for a job.";
          }
        }
        //Homepage.
        else {
          presenceData.state = "Homepage.";
        }
      }
    }
    //Interview prep section (Jobs related section with a different path).
    else if (path.includes("/interview-prep/")) {
      const interviewPrepArg = document.querySelector(
        "div.application-outlet > div.authentication-outlet > main > div > section > #ember50 > header > div > div.mr1 > h2"
      ).innerHTML;

      presenceData.details = "Taking an Interview Prep:";
      presenceData.state = `${interviewPrepArg}.`;
      presenceData.startTimestamp = browsingStamp;
    }
    //Messaging section.
    else if (path.includes("/messaging/")) {
      presenceData.details = "Messaging:";
      presenceData.startTimestamp = browsingStamp;

      //New message subsection.
      if (path == "/messaging/thread/new/") {
        presenceData.state = "Writing a new message.";
      }
      //New group subsection.
      else if (path == "/messaging/compose-group/") {
        presenceData.state = "Creating a new group.";
      }
      //Chats subsection.
      else {
        //Getting user preference for showChatUsername.
        const showChatUsername = await presence.getSetting("showChatUsername");

        if (showChatUsername) {
          const charUsername = document
            .querySelector(
              "div.application-outlet > div.authentication-outlet > #messaging > div > div > div:nth-child(2) > div:first-child > div > a > div > div > dl > dt > #thread-detail-jump-target"
            )
            .innerHTML.trim();

          presenceData.state = `Chatting with ${charUsername}`;
        } else {
          presenceData.state = "Chatting with someone.";
        }
      }
    }
    //Notifications section.
    else if (path == "/notifications/") {
      presenceData.details = "Viewing Notifications.";
      presenceData.startTimestamp = browsingStamp;
    }
    //Profile page section.
    else if (path.match(/\/in\/[A-z0-9-]+\/$/)) {
      const username = document
        .querySelector(
          "div.application-outlet > div.authentication-outlet > #profile-content > div > div > div > div:nth-child(2) > main > div > section > div:nth-child(2) > div:nth-child(2) > div:first-child > ul:first-child > li:first-child"
        )
        .innerHTML.trim();

      presenceData.details = "Viewing a Profile:";
      presenceData.state = `${username}.`;
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
