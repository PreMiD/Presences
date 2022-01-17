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

  type st = {
    [hostName: string]: {
      [webPath: string]: string;
    };
  };

  const archData: st = {
    "archlinux.org": {
      "/": "Viewing the home page"
    },
    "bbs.archlinux.org": {
      "/": "Viewing the forums"
    },
    "wiki.archlinux.org": {
      "/": "Viewing the Wiki"
    },
    "bugs.archlinux.org": {
      "/": "Viewing the Bugtracker"
    },
    "security.archlinux.org": {
      "/": "Viewing Security Issues"
    },
    "aur.archlinux.org": {
      "/": "Viewing the user repository"
    },
    "status.archlinux.org": {
      "/": "Viewing the status dashboard"
    },
    "lists.archlinux.org": {
      "/": "Viewing the mailing lists"
    },
    "archive.archlinux.org": {
      "/": "Viewing the archive"
    },
    "matrix.archlinux.org": {
      "/": "Viewing nothing of importance..."
    },
    "dashboards.archlinux.org": {
      "/": "Viewing the Grafana dashboards"
    },
    "conf.archlinux.org": {
      "/": "Viewing the Arch Conferences"
    },
    "whatcanidofor.archlinux.org": {
      "/": "Learning how to help Arch Linux"
    },
    "reproducible.archlinux.org": {
      "/": "Viewing the Reproducible Status"
    },
    "aur-dev.archlinux.org": {
      "/": "Viewing the AUR-DEV Repository"
    },
    "terms.archlinux.org": {
      "/": "Viewing the terms of service"
    },
    "gitlab.archlinux.org": {
      "/": "Viewing the GitLab repository"
    },
    "patchwork.archlinux.org": {
      "/": "Viewing the patch tracking system"
    },
    "man.archlinux.org": {
      "/": "Viewing the manual pages"
    }
  };

  if (hostName in archData) {
    if (webPath in archData[hostName])
      presenceData.details = archData[hostName][webPath];
    else presenceData.details = archData[hostName]["/"];
  }

  //testing

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
