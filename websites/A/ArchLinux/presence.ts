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
      root: "Viewing the home page"
    },
    "bbs.archlinux.org": {
      root: "Viewing the forums"
    },
    "wiki.archlinux.org": {
      root: "Viewing the Wiki"
    },
    "bugs.archlinux.org": {
      root: "Viewing the Bugtracker"
    },
    "security.archlinux.org": {
      root: "Viewing Security Issues"
    },
    "aur.archlinux.org": {
      root: "Viewing the user repository"
    },
    "status.archlinux.org": {
      root: "Viewing the status dashboard"
    },
    "lists.archlinux.org": {
      root: "Viewing the mailing lists"
    },
    "archive.archlinux.org": {
      root: "Viewing the archive"
    },
    "matrix.archlinux.org": {
      root: "Viewing nothing of importance..."
    },
    "dashboards.archlinux.org": {
      root: "Viewing the Grafana dashboards"
    },
    "conf.archlinux.org": {
      root: "Viewing the Arch Conferences"
    },
    "whatcanidofor.archlinux.org": {
      root: "Learning how to help Arch Linux"
    },
    "reproducible.archlinux.org": {
      root: "Viewing the Reproducible Status"
    },
    "aur-dev.archlinux.org": {
      root: "Viewing the AUR-DEV Repository"
    },
    "terms.archlinux.org": {
      root: "Viewing the terms of service"
    },
    "gitlab.archlinux.org": {
      root: "Viewing the GitLab repository"
    },
    "patchwork.archlinux.org": {
      root: "Viewing the patch tracking system"
    },
    "man.archlinux.org": {
      root: "Viewing the manual pages"
    }
  };

  if (hostName in archData) {
    if (webPath in archData[hostName])
      presenceData.details = archData[hostName][webPath];
    else presenceData.details = archData[hostName].root;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
