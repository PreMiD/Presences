const presence = new Presence({
    clientId: "929881116679237653"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
  hostName = document.location.hostname,
  webPath = document.location.pathname;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "arch",
    startTimestamp: browsingTimestamp
  };

  type dt = {
    [hostName: string]: {
      [webPath: string]: string;
    };
  };

  const archData: dt = {
    "archlinux.org": {
      root: "Browsing the home page",
      news: "Browsing the news archives",
      donate: "Browsing the donation page",
      mirrorlist: "Browsing the Mirrorlist",
      mirrors: "Browsing the Mirrorlist",
      groups: "Browsing the package groups",
      todo: "Browsing the todo lists"
    },
    "bbs.archlinux.org": {
      root: "Browsing the forums"
    },
    "wiki.archlinux.org": {
      root: "Browsing the Wiki"
    },
    "bugs.archlinux.org": {
      root: "Browsing the Bugtracker"
    },
    "security.archlinux.org": {
      root: "Browsing Security Issues"
    },
    "aur.archlinux.org": {
      root: "Browsing the user repository"
    },
    "status.archlinux.org": {
      root: "Browsing the status dashboard"
    },
    "lists.archlinux.org": {
      root: "Browsing the mailing lists"
    },
    "archive.archlinux.org": {
      root: "Browsing the archive"
    },
    "matrix.archlinux.org": {
      root: "Browsing nothing of importance..."
    },
    "dashboards.archlinux.org": {
      root: "Browsing the Grafana dashboards"
    },
    "conf.archlinux.org": {
      root: "Browsing the Arch Conferences"
    },
    "whatcanidofor.archlinux.org": {
      root: "Learning how to help Arch Linux"
    },
    "reproducible.archlinux.org": {
      root: "Browsing the Reproducible Status"
    },
    "aur-dev.archlinux.org": {
      root: "Browsing the AUR-DEV Repository"
    },
    "terms.archlinux.org": {
      root: "Browsing the terms of service"
    },
    "gitlab.archlinux.org": {
      root: "Browsing the GitLab repository"
    },
    "patchwork.archlinux.org": {
      root: "Browsing the patch tracking system"
    },
    "man.archlinux.org": {
      root: "Browsing the manual pages"
    }
  };

  if (hostName in archData) {
    if (webPath.split("/")[1] in archData[hostName])
      presenceData.details = archData[hostName][webPath.split("/")[1]];
    else presenceData.details = archData[hostName].root;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
