const presence = new Presence({
    clientId: "825307070584586250"
  }),
  getServiceName = (url = document.location.hostname) => {
    switch (true) {
      case !!url.match(/tv[.]naver[.]([a-z0-9]+)/):
        return "NAVER_TV";
      case !!url.match(/comic[.]naver[.]([a-z0-9]+)/):
        return "NAVER_WEBTOON";
      case !!url.match(/now[.]naver[.]([a-z0-9]+)/):
        return "NAVER_NOW";
      case !!url.match(/papago[.]naver[.]([a-z0-9]+)/):
        return "NAVER_PAPAGO";
      case !!url.match(/blog[.]naver[.]([a-z0-9]+)/):
        return "NAVER_BLOG";
      case !!url.match(/cafe[.]naver[.]([a-z0-9]+)/):
        return "NAVER_CAFE";
      case !!url.match(/([a-z]+)[.]naver[.]([a-z0-9]+)/):
        return "NAVER";
      default:
        break;
    }
  },
  data: {
    isChecked: boolean;
    service: string;
    settings?: {
      id: string;
      delete?: boolean;
      data: Array<string>;
    }[];
    presence: {
      [key: string]: {
        env?: boolean;
        service:
          | "NAVER"
          | "NAVER_PAPAGO"
          | "NAVER_NOW"
          | "NAVER_WEBTOON"
          | "NAVER_TV"
          | "NAVER_BLOG"
          | "NAVER_CAFE"
          | "ANY";
        setPresenceData?: () => void;
        data?: {
          [key in keyof PresenceData]: {
            setTo?: unknown;
            if?: {
              s: {
                k: unknown;
                v: unknown;
                then?: {
                  v?: unknown;
                  delete?: boolean;
                };
                else?: {
                  v?: unknown;
                  delete?: boolean;
                };
              };
              else?: {
                k: unknown;
                v: unknown;
                then?: {
                  v?: unknown;
                  delete?: boolean;
                };
                else?: {
                  v?: unknown;
                  delete?: boolean;
                };
              }[];
            };
          };
        };
      };
    };
  } = {
    isChecked: false,
    service: null,
    presence: null
  };

let blog: string, cafeTitle: string;

presence.on("iFrameData", (data: { blog: string }) => {
  blog = data.blog;
});

presence.on("UpdateData", async () => {
  if (!data.isChecked) {
    data.service = getServiceName();
    data.isChecked = true;
  }

  const ghtEnv: {
      sPageName: string;
      sChannelName: string;
    } = {
      sPageName: document.querySelector("div.ch_inf.open") ? "channel" : "",
      sChannelName: document.querySelector("strong.rmc_name")?.textContent
    },
    presenceData: PresenceData = {
      largeImageKey: data.service?.toLowerCase(),
      details: "Browsing...",
      smallImageKey: `${data.service.toLowerCase()}_browse`
    },
    getImageOrTimestamp = (
      video: HTMLVideoElement,
      type:
        | "startTimestamp"
        | "endTimestamp"
        | "smallImageKey"
        | "smallImageText"
    ) => {
      const timestamps = presence.getTimestamps(
          video?.currentTime,
          video?.duration
        ),
        tempData: {
          startTimestamp: number;
          endTimestamp: number;
          smallImageKey: string;
          smallImageText: string;
        } = {
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1],
          smallImageKey: `${data.service.toLowerCase()}_play`,
          smallImageText: "Playing"
        };

      if (video?.paused) {
        delete tempData.startTimestamp;
        delete tempData.endTimestamp;

        tempData.smallImageKey = `${data.service.toLowerCase()}_pause`;
        tempData.smallImageText = "Paused";
      }

      return tempData[type];
    };

  data.settings = [
    {
      id: "buttons",
      delete: true,
      data: ["buttons"]
    }
  ];

  data.presence = {
    "/v/([0-9]+)": {
      service: "NAVER_TV",
      setPresenceData() {
        if (
          document.querySelector<HTMLElement>("div.ad_info_area")?.offsetParent
        ) {
          presenceData.details = "Currently watching an ad";

          presenceData.startTimestamp = <number>(
            getImageOrTimestamp(
              document.querySelector('[data-role="videoEl"]'),
              "startTimestamp"
            )
          );
          presenceData.endTimestamp = <number>(
            getImageOrTimestamp(
              document.querySelector('[data-role="videoEl"]'),
              "endTimestamp"
            )
          );

          presenceData.smallImageKey = <string>(
            getImageOrTimestamp(
              document.querySelector('[data-role="videoEl"]'),
              "smallImageKey"
            )
          );
          presenceData.smallImageText = <string>(
            getImageOrTimestamp(
              document.querySelector('[data-role="videoEl"]'),
              "smallImageText"
            )
          );
        } else {
          presenceData.details =
            document.querySelector("h3._clipTitle")?.textContent;
          presenceData.state = document
            .querySelector("div.ch_tit")
            ?.textContent.trim();

          presenceData.startTimestamp = <number>(
            getImageOrTimestamp(
              document.querySelector("video"),
              "startTimestamp"
            )
          );
          presenceData.endTimestamp = <number>(
            getImageOrTimestamp(document.querySelector("video"), "endTimestamp")
          );

          presenceData.smallImageKey = <string>(
            getImageOrTimestamp(
              document.querySelector("video"),
              "smallImageKey"
            )
          );
          presenceData.smallImageText = <string>(
            getImageOrTimestamp(
              document.querySelector("video"),
              "smallImageText"
            )
          );

          presenceData.buttons = [
            {
              url: document.baseURI,
              label: "Watch Video"
            },
            {
              url: document.querySelector<HTMLAnchorElement>("div.ch_tit > a")
                ?.href,
              label: "View Channel"
            }
          ];
        }
      }
    },
    channel: {
      env: true,
      service: "NAVER_TV",
      data: {
        details: {
          setTo: "Viewing channel:"
        },
        state: {
          setTo: ghtEnv.sChannelName
        },
        buttons: {
          setTo: [
            {
              url: document.baseURI,
              label: "View Channel"
            }
          ]
        }
      }
    },
    "webnovel/list": {
      service: "ANY",
      data: {
        details: {
          setTo: "Viewing novel:"
        },
        state: {
          setTo: document.querySelector("h2.book_title")?.textContent
        },
        buttons: {
          setTo: [
            {
              label: "View Novel",
              url: document.baseURI
            }
          ]
        }
      }
    },
    "/webtoon/list": {
      service: "NAVER_WEBTOON",
      data: {
        details: {
          setTo: "Viewing comic:"
        },
        state: {
          setTo: document
            .querySelector("div.detail > h2")
            ?.textContent.replace(
              document.querySelector("div.detail > h2 > span")?.textContent,
              ""
            )
            .trim()
        },
        buttons: {
          setTo: [
            {
              label: "View Comic",
              url: document.baseURI
            }
          ]
        }
      }
    },
    "/webtoon/detail": {
      service: "NAVER_WEBTOON",
      data: {
        details: {
          setTo: (document
            .querySelector<HTMLMetaElement>('[property="og:title"]')
            ?.content.split(" - ") || [])[0]
        },
        state: {
          setTo: (document
            .querySelector<HTMLMetaElement>('[property="og:title"]')
            ?.content.split(" - ") || [])[1]
        },
        buttons: {
          setTo: [
            {
              url: document.baseURI,
              label: "Read Episode"
            }
          ]
        },
        smallImageKey: {
          setTo: `${data.service.toLowerCase()}_book`
        }
      }
    },
    "/webnovel/detail": {
      service: "ANY",
      data: {
        details: {
          setTo: document.querySelector("#menuFloatingLayer > a")?.textContent
        },
        state: {
          setTo: document.querySelector("#topVolumeList")?.textContent
        },
        buttons: {
          setTo: [
            {
              url: document.baseURI,
              label: "Read Episode"
            }
          ]
        },
        smallImageKey: {
          setTo: `${data.service.toLowerCase()}_book`
        }
      }
    },
    "/read": {
      service: "NAVER",
      data: {
        details: {
          setTo: "Reading article:"
        },
        state: {
          setTo: document.querySelector("h2.end_tit")?.textContent
        },
        buttons: {
          setTo: [
            {
              url: document.baseURI,
              label: "Read Article"
            }
          ]
        },
        smallImageKey: {
          setTo: `${data.service.toLowerCase()}_book`
        }
      }
    },
    "/player/([0-9]+)": {
      service: "NAVER_NOW",
      data: {
        details: {
          if: {
            s: {
              k: !!document.querySelector('[class="badge_live"]'),
              v: true,
              then: {
                v: (
                  document.querySelector('[class="flow_text flow_text1"]') ||
                  document.querySelector('[class="episode_title"]')
                )?.textContent
              },
              else: {
                v: "Viewing show:"
              }
            }
          }
        },
        state: {
          if: {
            s: {
              k: !!document.querySelector('[class="badge_live"]'),
              v: true,
              then: {
                v: "• LIVE"
              },
              else: {
                v: document.querySelector('[class="show_title"]')?.textContent
              }
            }
          }
        },
        buttons: {
          setTo: [
            {
              label: document.querySelector('[class="badge_live"]')
                ? "Watch Stream"
                : "View Show",
              url: document.baseURI
            }
          ]
        },
        smallImageKey: {
          if: {
            s: {
              k: !!document.querySelector('[class="badge_live"]'),
              v: true,
              then: {
                v: `${data.service.toLowerCase()}_live`
              }
            }
          }
        }
      }
    },
    "/show/([0-9]+)": {
      service: "NAVER_NOW",
      setPresenceData() {
        if (
          document.location.hash === "#highlight" &&
          !!document.querySelector('[data-inview="true"]')
        ) {
          const video =
            document.querySelector<HTMLVideoElement>(
              '[data-inview="true"] > div.video_wrap > a > video'
            ) || document.querySelector('[id="video_wrap"] > video');

          presenceData.details = document.querySelector(
            '[data-inview="true"] > div.text_wrap > a.title'
          )?.textContent;
          presenceData.state = "• HIGHLIGHT";

          presenceData.startTimestamp = <number>(
            getImageOrTimestamp(video, "startTimestamp")
          );
          presenceData.endTimestamp = <number>(
            getImageOrTimestamp(video, "endTimestamp")
          );

          presenceData.smallImageKey = <string>(
            getImageOrTimestamp(video, "smallImageKey")
          );
          presenceData.smallImageText = <string>(
            getImageOrTimestamp(video, "smallImageText")
          );

          presenceData.buttons = [
            {
              url: document.baseURI,
              label: "Watch Video"
            }
          ];
        } else {
          presenceData.details = "Viewing show:";
          presenceData.state = document.querySelector<HTMLImageElement>(
            '[class="logo_show"]'
          )?.alt;

          presenceData.buttons = [
            {
              url: document.baseURI,
              label: "View Show"
            }
          ];
        }
      }
    },
    "/website": {
      service: "NAVER_PAPAGO",
      data: {
        details: {
          setTo: "Translating: Website"
        },
        state: {
          setTo: `From: ${
            document.querySelector(
              "div.tool_box___3AiUH.select_wrap___1U1Ds > div:nth-child(1) > button > span:nth-child(1)"
            )?.textContent
          } - To: ${
            document.querySelector(
              "div.tool_box___3AiUH.select_wrap___1U1Ds > div:nth-child(3) > button > span:nth-child(1)"
            )?.textContent
          }`
        },
        smallImageKey: {
          setTo: `${data.service.toLowerCase()}_language`
        }
      }
    },
    "/": {
      service: "NAVER_PAPAGO",
      data: {
        details: {
          setTo: `Translating from: ${
            document.querySelector("#ddSourceLanguageButton > span")
              ?.textContent
          }`
        },
        state: {
          setTo: `To: ${
            document.querySelector("#ddTargetLanguageButton > span")
              ?.textContent
          }`
        },
        smallImageKey: {
          setTo: `${data.service.toLowerCase()}_language`
        }
      }
    },
    "/search.naver": {
      service: "NAVER",
      data: {
        details: {
          setTo: "Searching for:"
        },
        state: {
          setTo:
            new URLSearchParams(document.location.search).get("query") ||
            "Something"
        }
      }
    },
    "/([a-z])": {
      service: "ANY",
      async setPresenceData() {
        if (data.service === "NAVER_BLOG") {
          presenceData.details = "Reading blog of:";
          presenceData.state = blog;

          presenceData.buttons = [
            {
              url: document.URL,
              label: "Read Blog"
            }
          ];
        } else if (data.service === "NAVER_CAFE") {
          if (!cafeTitle)
            cafeTitle = document.querySelector("h1.d-none")?.textContent;
          if (cafeTitle) {
            presenceData.details = "Viewing cafe:";
            presenceData.state = cafeTitle;

            presenceData.buttons = [
              {
                label: "View Cafe",
                url: document.URL
              }
            ];
          } else if (document.location.pathname.includes("/search/")) {
            presenceData.details = "Searching for:";
            presenceData.state = new URLSearchParams(
              document.location.search
            ).get("q");
          }
        }
      }
    }
  };

  for (const [k, v] of Object.entries(data.presence)) {
    if (
      (document.location.pathname.match(k) &&
        (data.service === v.service || v.service === "ANY") &&
        !v.env) ||
      (v.env && k === ghtEnv.sPageName)
    ) {
      if (v.setPresenceData) {
        v.setPresenceData();
        break;
      }
      for (const [key, PData] of Object.entries(v.data)) {
        if (!PData.if && PData.setTo)
          presenceData[<"state">key] = <string>PData.setTo;
        else if (PData.if) {
          if (PData.if.s.k === PData.if.s.v) {
            if (!PData.if.s.then.delete)
              presenceData[<"state">key] = <string>PData.if.s.then.v;
            else delete presenceData[<"state">key];
          } else if (PData.if.s.else) {
            if (!PData.if.s.else.delete)
              presenceData[<"state">key] = <string>PData.if.s.else.v;
            else delete presenceData[<"state">key];
          } else if (PData.if.else) {
            for (const elseStatement of Object.values(PData.if.else)) {
              if (elseStatement.k === elseStatement.v) {
                if (!elseStatement.then.delete)
                  presenceData[<"state">key] = <string>elseStatement.then.v;
                else delete presenceData[<"state">key];
                break;
              } else if (elseStatement.else) {
                if (!elseStatement.else.delete)
                  presenceData[<"state">key] = <string>elseStatement.else.v;
                else delete presenceData[<"state">key];
                break;
              }
            }
          }
        }
      }
      break;
    }
  }

  if (data.settings) {
    for (const setting of data.settings) {
      if (!(await presence.getSetting(setting.id))) {
        if (setting.delete)
          setting.data.forEach((x) => {
            delete presenceData[<"state">x];
          });
      }
    }
  }

  presence.setActivity(presenceData);
});
