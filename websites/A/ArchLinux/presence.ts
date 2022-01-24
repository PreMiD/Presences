const presence = new Presence({
    clientId: "929881116679237653"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
  hostName = location.hostname,
  webPath = location.pathname,
  pathArr = webPath.split("/"),
  path0 = pathArr[0],
  path1 = pathArr[1],
  data = "";
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "arch",
    startTimestamp: browsingTimestamp
  };

  type dt = {
    [hostName: string]: {
      [webPath: string]: {
        [data: string]: string;
      };
    };
  };

  const archData: dt = {
    "archlinux.org": {
      "": {
        details: "Browsing the home page",
        state: "h2"
      },
      packages: {
        details: "Browsing the official repo",
        state: "h2"
      },
      news: {
        details: "Browsing the news archives",
        state: "h2"
      },
      donate: {
        details: "Browsing the donation page"
      },
      mirrorlist: {
        details: "Browsing the Mirrorlist"
      },
      mirrors: {
        details: "Browsing the Mirrorlist"
      },
      groups: {
        details: "Browsing the package groups",
        state: "h2"
      },
      todo: {
        details: "Browsing the todo lists",
        state: "h2"
      },
      people: {
        details: "Browsing the people of Arch",
        state: "h2"
      }
    },
    "bbs.archlinux.org": {
      "": {
        details: "Browsing the forums"
      }
    },
    "wiki.archlinux.org": {
      "": {
        details: "Browsing the Wiki"
      }
    },
    "bugs.archlinux.org": {
      "": {
        details: "Browsing the Bugtracker"
      }
    },
    "security.archlinux.org": {
      "": {
        details: "Browsing Security Issues"
      }
    },
    "aur.archlinux.org": {
      "": {
        details: "Browsing the user repository"
      }
    },
    "status.archlinux.org": {
      "": {
        details: "Browsing the status dashboard"
      }
    },
    "lists.archlinux.org": {
      "": {
        details: "Browsing the mailing lists"
      }
    },
    "archive.archlinux.org": {
      "": {
        details: "Browsing the archive"
      }
    },
    "matrix.archlinux.org": {
      "": {
        details: "Browsing nothing of importance..."
      }
    },
    "dashboards.archlinux.org": {
      "": {
        details: "Browsing the Grafana dashboards"
      }
    },
    "conf.archlinux.org": {
      "": {
        details: "Browsing the Arch Conferences"
      }
    },
    "whatcanidofor.archlinux.org": {
      "": {
        details: "Learning how to help Arch Linux"
      }
    },
    "reproducible.archlinux.org": {
      "": {
        details: "Browsing the Reproducible Status"
      }
    },
    "aur-dev.archlinux.org": {
      "": {
        details: "Browsing the AUR-DEV Repository"
      }
    },
    "terms.archlinux.org": {
      "": {
        details: "Browsing the terms of service"
      }
    },
    "gitlab.archlinux.org": {
      "": {
        details: "Browsing the GitLab repository"
      }
    },
    "patchwork.archlinux.org": {
      "": {
        details: "Browsing the patch tracking system"
      }
    },
    "man.archlinux.org": {
      "": {
        details: "Browsing the manual pages"
      }
    }
  };

  if (hostName in archData && path1 in archData[hostName]) {
    presenceData.details = archData[hostName][path1].details;
    if (archData[hostName][path1].state) {
      presenceData.state = document
        .getElementsByTagName(archData[hostName][path1].state)
        .item(0).innerHTML;
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
