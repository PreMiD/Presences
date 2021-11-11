interface PageContext {
  middleware: (ref: Window, ...args: unknown[]) => boolean;
  exec: (
    context: Presence,
    data: PresenceData,
    options?: { [key: string]: unknown }
  ) => Promise<PresenceData> | PresenceData;
}
function getQuery() {
  const queryString = location.search.split("?", 2),
    query =
      queryString && queryString.length > 0 && queryString[1]
        ? queryString[1].split("&").reduce(function (l, r) {
            const entry = r ? r.split("=", 2) : null;
            if (entry === null) return l;
            return Object.assign(l, { [entry[0]]: entry[1] });
          }, {})
        : {};
  return query;
}
(function () {
  const pages: PageContext[] = [
      {
        middleware: (ref) =>
          !!ref.location.pathname.match(/\/(latest|toplist|hot|random)/gi),
        exec: (
          context,
          data,
          {
            strings,
            query
          }: {
            strings: { [key: string]: string };
            query: { page: number };
          }
        ) => {
          if (!context) return null;

          data.state = strings.browsing;
          presenceData.details = `${(
            document.querySelector<HTMLElement>("header.listing-header>h1")
              .textContent as string
          )?.trim()}, Page ${query?.page || 1}`;
          return data;
        }
      },
      {
        middleware: (ref) =>
          ref.location.pathname === "/forums" ||
          !!ref.location.pathname.match(/\/forums((\/thread|\/board))/gi),
        exec: (
          context,
          data,
          {
            strings
          }: {
            strings: { [key: string]: string };
          }
        ) => {
          if (!context) return null;
          const pageTitle = (
            document.querySelector<HTMLElement>("#forums-title>a") ||
            document.querySelector<HTMLElement>(
              "#forums-title .forum-thread-title>a"
            )
          )?.textContent as string;
          if (!pageTitle) return;
          data.state = strings.reading;
          presenceData.details = `${pageTitle}`;
          delete data.buttons;
          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.pathname.match(/\/search/gi),
        exec: (
          context,
          data,
          {
            strings,
            query
          }: {
            strings: { [key: string]: string };
            query: { page: number; q: string };
          }
        ) => {
          if (!context) return null;
          data.state = strings.searching;
          presenceData.details = `${decodeURIComponent(
            document.querySelector<HTMLElement>("span.search-term")
              ?.textContent ??
              query?.q ??
              "Invalid Search Term"
          )}, Page ${query?.page || 1}`;

          return data;
        }
      },
      {
        middleware: (ref) => !!ref.location.pathname.match(/\/w\/(\w+)/gi),
        exec: (
          context,
          data,
          {
            showButton
          }: {
            strings: { [key: string]: string };
            showButton: boolean;
          }
        ) => {
          if (!context) return null;
          const tags = Array.from(
            document.querySelectorAll<HTMLElement>("#tags>.tag-sfw") || []
          ).map((x) => x.textContent);
          data.state = "Viewing...";
          presenceData.details =
            tags.length > 0
              ? tags.slice(0, 3).join(", ")
              : "Wallpaper has no tags";

          if (showButton) {
            data.buttons = [
              {
                label: "Open Wallpaper URL",
                url: document.URL
              }
            ];
          } else delete data.buttons;

          return data;
        }
      },
      {
        middleware: (ref) => !!ref.window,
        exec: (
          context,
          data,
          { strings }: { strings: { browsing: string } }
        ) => {
          if (!context) return null;
          data.state = strings.browsing;
          presenceData.details = "";
          return data;
        }
      }
    ],
    presence = new Presence({
      clientId: "813563332753752112"
    });

  (function (app: Presence) {
    app.on("UpdateData", async () => {
      const presenceData: PresenceData = {
        largeImageKey: "logo",
        largeImageText: "Wallhaven"
      } as PresenceData;
      if (document.location.hostname === "wallhaven.cc") {
        const query: { [key: string]: unknown } = getQuery(),
          strings: { [key: string]: string } = await app.getStrings({
            play: "presence.playback.playing",
            pause: "presence.playback.paused",
            browsing: "presence.activity.browsing",
            searching: "presence.activity.searching",
            reading: "presence.activity.reading"
          }),
          context = pages.find((x) => x.middleware(window, [query]));
        if (!context) return false;
        const result = Promise.resolve(
          context.exec(app, presenceData, {
            strings,
            query,
            showButtons: await app
              .getSetting("buttons")
              .then((x) => !!x)
              .catch(() => true)
          })
        );
        return result.then((data) => {
          if (!data?.details) {
            presenceData.details = strings.browsing;

            presence.setActivity();
          } else if (data) presence.setActivity(data);
          else presence.setActivity();
          return data;
        });
      }

      if (!presenceData.details) {
        app.setTrayTitle();
        app.setActivity();
      } else app.setActivity(presenceData);
    });
  })(presence);
})();
