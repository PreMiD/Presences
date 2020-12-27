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
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
