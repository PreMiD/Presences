const presence = new Presence({
  clientId: "630778865643552779"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "scratchlogo"
  };

  if (window.location.href.toLowerCase().includes("scratch.mit.edu")) {
    if (window.location.pathname === "") {
      presenceData.details = "Community:";
      presenceData.state = "Viewing public projects";
    }
    if (window.location.pathname === "/") {
      presenceData.details = "Community:";
      presenceData.state = "Viewing public projects";
    }
    if (window.location.pathname.toLowerCase().includes("/projects/editor")) {
      presenceData.details = "Editing a project:";
      if (
        window.location.pathname
          .toLowerCase()
          .includes("/projects/editor/?tutorial=getstarted")
      )
        presenceData.state = "Tutorial";
      else if (
        window.location.pathname
          .toLowerCase()
          .includes("/projects/editor/?tutorial=all")
      ) {
        presenceData.details = "Viewing projects:";
        presenceData.state = "Tutorials";
      } else if (
        window.location.pathname
          .toLowerCase()
          .includes("/projects/editor?tutorial=all")
      ) {
        presenceData.details = "Viewing projects:";
        presenceData.state = "Tutorials";
      }
    } else if (window.location.pathname.toLowerCase().includes("/explore")) {
      if (
        window.location.pathname.toLowerCase().includes("/explore/projects")
      ) {
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/projects/all")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Projects - All";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/projects/animations")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Projects - Animations";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/projects/art")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Projects - Art";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/projects/games")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Projects - Games";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/projects/music")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Projects - Music";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/projects/stories")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Projects - Stories";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/projects/tutorials")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Projects - Tutorials";
        }
      }
      if (window.location.pathname.toLowerCase().includes("/explore/studios")) {
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/studios/all")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Studios - All";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/studios/animations")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Studios - Animations";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/studios/art")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Studios - Art";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/studios/games")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Studios - Games";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/studios/music")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Studios - Music";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/studios/stories")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Studios - Stories";
        }
        if (
          window.location.pathname
            .toLowerCase()
            .includes("/explore/studios/tutorials")
        ) {
          presenceData.details = "Explore:";
          presenceData.state = "Studios - Tutorials";
        }
      }
    } else if (window.location.pathname.toLowerCase().includes("/ideas")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Ideas";
    } else if (
      window.location.pathname.toLowerCase().includes("/starter-projects")
    ) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Starter Projects";
    } else if (window.location.pathname.toLowerCase().includes("/parents")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Parents";
    } else if (window.location.pathname.toLowerCase().includes("/educators")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Educators";
    } else if (window.location.pathname.toLowerCase().includes("/developers")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Developers";
    } else if (window.location.pathname.toLowerCase().includes("/credits")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Credits";
    } else if (window.location.pathname.toLowerCase().includes("/jobs")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Jobs";
    } else if (
      window.location.pathname.toLowerCase().includes("/community_guidelines")
    ) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Community Guidelines";
    } else if (window.location.pathname.toLowerCase().includes("/discuss")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Discussion";
    } else if (window.location.pathname.toLowerCase().includes("/statistics")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Statistics";
    } else if (window.location.pathname.toLowerCase().includes("/info/faq")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Help, Info & FAQ";
    } else if (window.location.pathname.toLowerCase().includes("/download")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Download offline editor";
    } else if (window.location.pathname.toLowerCase().includes("/contact-us")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Contact us";
    } else if (window.location.pathname.toLowerCase().includes("/store")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Store";
    } else if (
      window.location.pathname.toLowerCase().includes("/terms_of_use")
    ) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Terms and conditions";
    } else if (
      window.location.pathname.toLowerCase().includes("/privacy_policy")
    ) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Privacy Policy";
    } else if (window.location.pathname.toLowerCase().includes("/dmca")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "DMCA";
    } else if (window.location.pathname.toLowerCase().includes("/conference")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Scratch Conference";
    }
  } else {
    presenceData.details = "Viewing A Page:";
    presenceData.state = document.title
      .replace("Scratch - ", "")
      .replace(" - Scratch", "")
      .replace("Scratch", "");
  }
  if (
    window.location.hostname.toLowerCase().includes("scratchfoundation.org")
  ) {
    if (window.location.pathname.toLowerCase().includes("/media-kit")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Press";
    } else {
      presenceData.details = "Viewing page:";
      presenceData.state = "Scratch Foundation";
    }
  }
  if (window.location.hostname.toLowerCase().includes("scratch-wiki.info")) {
    presenceData.details = "Viewing page:";
    presenceData.state = "Wiki";
  }
  if (window.location.hostname.toLowerCase().includes("scratchjr.org")) {
    presenceData.details = "Viewing page:";
    presenceData.state = "Scratch JR";
  }
  if (window.location.hostname.toLowerCase().includes("donationpay.org")) {
    if (window.location.pathname.toLowerCase().includes("/scratchfoundation")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Donate";
    }
  }
  if (
    window.location.hostname.toLowerCase().includes("scratched.gse.harvard.edu")
  ) {
    presenceData.details = "Viewing page:";
    presenceData.state = "Scratch ED";
  }
  presence.setActivity(presenceData);
});
