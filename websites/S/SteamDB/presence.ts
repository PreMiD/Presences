const presence = new Presence({
    clientId: "858408468854997052"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("time"),
    buttons = await presence.getSetting("buttons"),
    accountValue = await presence.getSetting("accountValue"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };

  switch (document.location.hostname) {
    case "steamdb.info":
      switch (document.location.pathname.split("/")[1]) {
        case "realtime":
          presenceData.details = "Viewing Realtime Stream";
          presenceData.smallImageKey = "users";
          presenceData.smallImageText = `Users: ${
            document.getElementById("js-realtime-users").textContent
          }`;
          if (
            !document
              .getElementById("js-realtime-log")
              .children.item(0)
              .children.item(0)
              .textContent.includes("Connection opened, listening for changes…")
          ) {
            [, presenceData.state] = document
              .getElementById("js-realtime-log")
              .children.item(0)
              .textContent.split("—");
            if (
              document
                .getElementById("js-realtime-log")
                .children.item(0)
                .children.item(2) !== null
            ) {
              presenceData.buttons = [
                {
                  label: "View Page",
                  url: document.location.href
                },
                {
                  label: "View Changelist",
                  url: `${document.location.origin}${document
                    .getElementById("js-realtime-log")
                    .children.item(0)
                    .children.item(2)
                    .getAttribute("href")}`
                }
              ];
            }
          }
          break;
        case "graph":
          presenceData.details = "Viewing Steam Charts";
          if (
            (document.getElementById("js-tag-select") as HTMLSelectElement)
              .value !== "0"
          ) {
            presenceData.state = `Filter: ${
              (document.getElementById("js-tag-select") as HTMLSelectElement)
                .options[
                (document.getElementById("js-tag-select") as HTMLSelectElement)
                  .selectedIndex
              ].text
            }`;
          }
          if (
            (document.getElementById("js-category-select") as HTMLSelectElement)
              .value !== "0"
          ) {
            presenceData.state = `Filter: ${
              (
                document.getElementById(
                  "js-category-select"
                ) as HTMLSelectElement
              ).options[
                (
                  document.getElementById(
                    "js-category-select"
                  ) as HTMLSelectElement
                ).selectedIndex
              ].text
            }`;
          }
          if (
            (
              document.getElementById("table-apps_filter").firstElementChild
                .firstElementChild as HTMLInputElement
            ).value !== ""
          ) {
            presenceData.state = `Search: ${
              (
                document.getElementById("table-apps_filter").firstElementChild
                  .firstElementChild as HTMLInputElement
              ).value
            }`;
          }
          break;
        case "changelist":
          presenceData.details =
            document.querySelector("h1.header-title").textContent;
          presenceData.state =
            document.querySelector("h2.header-subtitle").textContent;
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
          break;
        case "calculator":
          if (document.location.pathname === "/calculator/") {
            presenceData.details = "Viewing Calculator";
            presenceData.state = "Selecting User";
          } else {
            presenceData.details = "Viewing Calculator";
            if (accountValue === 0) {
              presenceData.state = `${
                document.getElementsByClassName("player-name").item(0)
                  .textContent
              } (${
                document
                  .getElementsByClassName("number-price")
                  .item(0)
                  .innerHTML.split(">")[2]
                  .split("<")[0]
              })`;
            } else if (accountValue === 1) {
              presenceData.state = `${
                document.getElementsByClassName("player-name").item(0)
                  .textContent
              } (${
                document
                  .getElementsByClassName("number-price-lowest")
                  .item(0)
                  .innerHTML.split(">")[2]
                  .split("<")[0]
              })`;
            }
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
          }
          break;
        case "app":
          presenceData.state =
            document.querySelector("h1").lastChild.textContent;
          presenceData.smallImageKey = document
            .querySelector("tbody")
            .children.item(1)
            .children.item(1)
            .textContent.toLowerCase();
          presenceData.smallImageText = document
            .querySelector("tbody")
            .children.item(1)
            .children.item(1).textContent;
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
          if (document.querySelector("a.tabnav-tab.selected")) {
            presenceData.details = `Viewing App ${
              document.querySelector("a.tabnav-tab.selected").childNodes[1]
                .textContent
            }`;
          } else if (document.location.pathname.includes("/patchnotes/"))
            presenceData.details = "Viewing App Patchnotes";
          break;
        case "apps":
          presenceData.details = "Browsing Applications";
          presenceData.state =
            document.querySelector("h2.header-title").textContent;
          break;
        case "sub":
          presenceData.state =
            document.querySelector("h1").lastChild.textContent;
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
          presenceData.details = `Viewing Sub ${
            document.querySelector("a.tabnav-tab.selected").childNodes[1]
              .textContent
          }`;
          break;
        case "subs":
          presenceData.details = "Browsing Packages";
          presenceData.state =
            document.querySelector("h2.header-title").textContent;
          break;
        case "bundle":
          presenceData.details = "Viewing Bundle";
          presenceData.state =
            document.querySelector("h1").lastChild.textContent;
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
          break;
        case "bundles":
          presenceData.details = "Browsing Bundles";
          presenceData.state = `Page ${
            document.querySelector("a.paginate_button.active").textContent
          }/${
            document.querySelectorAll("a.paginate_button").item(7).textContent
          }`;
          break;
        case "blog":
          if (document.location.pathname === "/blog/")
            presenceData.details = "Browsing Blog";
          else if (document.location.pathname.includes("/tag/")) {
            presenceData.details = "Browsing Blog Tag";
            presenceData.state = document.querySelector(
              "h1.header-title span"
            ).textContent;
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
          } else {
            presenceData.details = "Viewing Blog Post";
            presenceData.state =
              document.getElementById("blog-post-title").textContent;
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
          }
          break;
        case "faq":
          presenceData.details = "Viewing FAQ";
          break;
        case "instantsearch":
          presenceData.details = "Instant Search";
          if (
            (
              document.querySelector(
                "input.ais-SearchBox-input"
              ) as HTMLInputElement
            ).value !== ""
          ) {
            presenceData.state = `Search: ${
              (
                document.querySelector(
                  "input.ais-SearchBox-input"
                ) as HTMLInputElement
              ).value
            }`;
          }
          break;
        case "donate":
          presenceData.details = "Viewing How To Help";
          break;
        case "extension":
          presenceData.details = "Viewing Extension";
          break;
        case "history":
          if (document.location.pathname.includes("/subs/"))
            presenceData.details = "Viewing Global Package History";
          else presenceData.details = "Viewing Global App History";
          break;
        case "pricechanges":
          if (document.location.href.includes("subs"))
            presenceData.details = "Viewing App Price Changes";
          else presenceData.details = "Viewing Package Price Changes";
          if (
            (
              document.getElementById("DataTables_Table_0_filter")
                .firstElementChild.firstElementChild as HTMLInputElement
            ).value !== ""
          ) {
            presenceData.state = `Search: ${
              (
                document.getElementById("DataTables_Table_0_filter")
                  .firstElementChild.firstElementChild as HTMLInputElement
              ).value
            }`;
          }
          break;
        case "tags":
          presenceData.details = "Browsing Game Tags";
          if (
            (
              document.querySelector(
                "input.input-block.search"
              ) as HTMLInputElement
            ).value !== ""
          ) {
            presenceData.state = `Search: ${
              (
                document.querySelector(
                  "input.input-block.search"
                ) as HTMLInputElement
              ).value
            }`;
          }
          break;
        case "tag":
          presenceData.details = `Browsing Tag: ${
            document
              .querySelector("h1.header-title.flex-grow")
              .textContent.split("»")[1]
          }`;
          if (
            (
              document.getElementById("table-apps_filter").firstElementChild
                .firstElementChild as HTMLInputElement
            ).value !== ""
          ) {
            presenceData.state = `Search: ${
              (
                document.getElementById("table-apps_filter").firstElementChild
                  .firstElementChild as HTMLInputElement
              ).value
            }`;
          }
          break;
        case "tech":
          if (document.location.pathname === "/tech/")
            presenceData.details = "Browsing Technologies";
          else {
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
            if (
              (
                document.getElementById("table-apps_filter").firstElementChild
                  .firstElementChild as HTMLInputElement
              ).value !== ""
            ) {
              presenceData.state = `Search: ${
                (
                  document.getElementById("table-apps_filter").firstElementChild
                    .firstElementChild as HTMLInputElement
                ).value
              }`;
            }
            switch (document.location.pathname.split("/")[2]) {
              case "Engine":
                presenceData.details = `Browsing Engine ${
                  document
                    .querySelector("h1.header-title")
                    .textContent.split("»")[2]
                }`;
                break;
              case "SDK":
                presenceData.details = `Browsing SDK ${
                  document
                    .querySelector("h1.header-title")
                    .textContent.split("»")[2]
                }`;
                break;
              case "Emulator":
                presenceData.details = `Browsing Emulator ${
                  document
                    .querySelector("h1.header-title")
                    .textContent.split("»")[2]
                }`;
                break;
              case "Container":
                presenceData.details = `Browsing Container ${
                  document
                    .querySelector("h1.header-title")
                    .textContent.split("»")[2]
                }`;
                break;
              case "AntiCheat":
                presenceData.details = `Browsing AntiCheat ${
                  document
                    .querySelector("h1.header-title")
                    .textContent.split("»")[2]
                }`;
                break;
            }
          }
          break;
        case "patchnotes":
          if (document.location.pathname === "/patchnotes/")
            presenceData.details = "Browsing Patch Notes";
          else {
            presenceData.details = "Viewing Patchnote";
            if (
              document.querySelector("h2.header-subtitle").textContent !==
              "\xa0"
            ) {
              presenceData.state = `${
                document.querySelector("h1.header-title").firstElementChild
                  .textContent
              } ${document.querySelector("h2.header-subtitle").textContent}`;
            } else {
              presenceData.state = `${
                document.querySelector("h1.header-title").textContent
              }`;
            }
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
          }
          break;
        case "discord":
          presenceData.details = "Viewing Discord Info";
          break;
        case "watching":
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
          if (
            document.querySelector("h1.header-title").textContent !==
            "Your watch list"
          ) {
            presenceData.details = `Viewing ${
              document.querySelector("h1.header-title").textContent
            }`;
          } else presenceData.details = "Viewing their own watch list";
          break;
        case "freepackages":
          presenceData.details = "Viewing Free Packages";
          break;
        case "user":
          presenceData.details = "Viewing Settings";
          break;
        case "badges":
          presenceData.details = "Browsing Profile Badges";
          break;
        case "badge":
          presenceData.details = "Viewing Badge";
          if (document.location.pathname.includes("/foil/")) {
            presenceData.state = `${
              document
                .querySelector("h1.header-title.flex-grow")
                .childNodes.item(4).textContent
            } (Foil)`;
          } else {
            presenceData.state = document
              .querySelector("h1.header-title.flex-grow")
              .childNodes.item(4).textContent;
          }
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
          break;
        case "signout":
          presenceData.details = "Signing Out";
          break;
        case "depot":
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
          presenceData.state =
            document.querySelector("h1").lastChild.textContent;
          presenceData.details = `Viewing Depot ${
            document.querySelector("a.tabnav-tab.selected").childNodes[1]
              .textContent
          }`;
          break;
        case "upcoming":
          if (document.location.pathname.includes("/free/"))
            presenceData.details = "Viewing Free Promotions";
          else if (document.location.pathname.includes("/mostfollowed/")) {
            presenceData.details = "Browsing Most Followed Upcoming Games";
            if (
              (document.getElementById("js-tag-select") as HTMLSelectElement)
                .value !== "0"
            ) {
              presenceData.state = `Filter: ${
                (document.getElementById("js-tag-select") as HTMLSelectElement)
                  .options[
                  (
                    document.getElementById(
                      "js-tag-select"
                    ) as HTMLSelectElement
                  ).selectedIndex
                ].text
              }`;
            }
          } else {
            presenceData.details = "Browsing Upcoming Games";
            if (
              (document.getElementById("js-tag-select") as HTMLSelectElement)
                .value !== "0"
            ) {
              presenceData.state = `Filter: ${
                (document.getElementById("js-tag-select") as HTMLSelectElement)
                  .options[
                  (
                    document.getElementById(
                      "js-tag-select"
                    ) as HTMLSelectElement
                  ).selectedIndex
                ].text
              }`;
            }
          }
          break;
        case "calendar":
          presenceData.details = "Viewing Release Calendar";
          presenceData.state = document.querySelector(
            "h2.header-title.hide-small"
          ).textContent;
          break;
        case "stats":
          switch (document.location.pathname.split("/")[2]) {
            case "mostfollowed":
              presenceData.details = "Browsing Most Followed Games";
              if (
                (
                  document.getElementById("table-apps_filter").firstElementChild
                    .firstElementChild as HTMLInputElement
                ).value !== ""
              ) {
                presenceData.state = `Search: ${
                  (
                    document.getElementById("table-apps_filter")
                      .firstElementChild.firstElementChild as HTMLInputElement
                  ).value
                }`;
              } else if (
                (
                  document.getElementById(
                    "js-category-select"
                  ) as HTMLSelectElement
                ).value !== "0"
              ) {
                presenceData.state = `Filter: ${
                  (
                    document.getElementById(
                      "js-category-select"
                    ) as HTMLSelectElement
                  ).options[
                    (
                      document.getElementById(
                        "js-category-select"
                      ) as HTMLSelectElement
                    ).selectedIndex
                  ].text
                }`;
              }
              break;
            case "mostwished":
              presenceData.details = "Browsing Most Wishlisted Games";
              if (
                (
                  document.getElementById("table-apps_filter").firstElementChild
                    .firstElementChild as HTMLInputElement
                ).value !== ""
              ) {
                presenceData.state = `Search: ${
                  (
                    document.getElementById("table-apps_filter")
                      .firstElementChild.firstElementChild as HTMLInputElement
                  ).value
                }`;
              }
              break;
            case "gameratings":
              if (document.location.href.includes("?all_types")) {
                presenceData.details = "Browsing Top Rated Apps";
                if (
                  (
                    document.getElementById("table-apps_filter")
                      .firstElementChild.firstElementChild as HTMLInputElement
                  ).value !== ""
                ) {
                  presenceData.state = `Search: ${
                    (
                      document.getElementById("table-apps_filter")
                        .firstElementChild.firstElementChild as HTMLInputElement
                    ).value
                  }`;
                }
              } else if (document.location.pathname === "/stats/gameratings/") {
                presenceData.details = "Browsing Top Rated Games";
                if (
                  (
                    document.getElementById("table-apps_filter")
                      .firstElementChild.firstElementChild as HTMLInputElement
                  ).value !== ""
                ) {
                  presenceData.state = `Search: ${
                    (
                      document.getElementById("table-apps_filter")
                        .firstElementChild.firstElementChild as HTMLInputElement
                    ).value
                  }`;
                }
              } else if (document.querySelector("button.btn")) {
                presenceData.details = `Browsing Top Rated Games ${
                  document.querySelector("button.btn").textContent
                }`;
              }
              break;
            case "toplevels":
              presenceData.details = "Viewing Top Users By Level";
              break;
            case "releases":
              presenceData.details = "Viewing Game Release Summary";
              if (
                (document.getElementById("js-tag-select") as HTMLSelectElement)
                  .value !== "0"
              ) {
                presenceData.state = `Filter: ${
                  (
                    document.getElementById(
                      "js-tag-select"
                    ) as HTMLSelectElement
                  ).options[
                    (
                      document.getElementById(
                        "js-tag-select"
                      ) as HTMLSelectElement
                    ).selectedIndex
                  ].text
                }`;
              }
              break;
          }
          break;
        case "topsellers":
          presenceData.details = "Weekly Top Sellers";
          if (document.querySelector("button.btn")) {
            presenceData.state = `${
              document.querySelector("button.btn").textContent
            } ${
              document.querySelector("h2.flex-grow").textContent.split(" ")[8]
            }`;
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
          }
          break;
        case "sales":
          if (document.location.pathname.includes("/history/")) {
            presenceData.details = "Viewing Upcoming & previous sales";
            presenceData.state = `Next Sale: ${
              document.getElementsByClassName("sale-name").item(0).textContent
            }`;
          } else {
            presenceData.details = "Browsing Sales";
            if (
              (
                document.getElementById("DataTables_Table_0_filter")
                  .firstElementChild.firstElementChild as HTMLInputElement
              ).value !== ""
            ) {
              presenceData.state = `Search: ${
                (
                  document.getElementById("DataTables_Table_0_filter")
                    .firstElementChild.firstElementChild as HTMLInputElement
                ).value
              }`;
            }
          }
          break;
        case "servers":
          if (document.location.pathname.includes("/maps/"))
            presenceData.details = "Viewing Valve MM Maps";
          else presenceData.details = "Viewing Valve MM Servers";
          break;
        case "search":
          presenceData.details = `Searching ${
            document.querySelector("a.tabnav-tab.selected").textContent
          }`;
          switch (document.querySelector("a.tabnav-tab.selected").textContent) {
            case "Apps":
              presenceData.state = `${
                (document.getElementById("inputQuery-app") as HTMLInputElement)
                  .value
              } Type: ${
                (document.getElementById("inputType") as HTMLSelectElement)
                  .options[
                  (document.getElementById("inputType") as HTMLSelectElement)
                    .selectedIndex
                ].textContent
              } Category: ${
                (document.getElementById("inputCategory") as HTMLSelectElement)
                  .options[
                  (
                    document.getElementById(
                      "inputCategory"
                    ) as HTMLSelectElement
                  ).selectedIndex
                ].textContent
              }`;
              break;
            case "Packages":
              if (
                (document.getElementById("inputQuery-sub") as HTMLInputElement)
                  .value
              ) {
                presenceData.state = `Search: ${
                  (
                    document.getElementById(
                      "inputQuery-sub"
                    ) as HTMLInputElement
                  ).value
                }`;
              }
              break;
            case "Bundles":
              if (
                document.getElementById("inputQuery-bundle") as HTMLInputElement
              ) {
                presenceData.state = `Search: ${
                  (
                    document.getElementById(
                      "inputQuery-bundle"
                    ) as HTMLInputElement
                  ).value
                }`;
              }
              break;
            case "App Keys":
              presenceData.state = `${
                (document.getElementById("inputType2") as HTMLSelectElement)
                  .options[
                  (document.getElementById("inputType2") as HTMLSelectElement)
                    .selectedIndex
                ].textContent
              } ${
                (document.getElementById("inputKeyName") as HTMLSelectElement)
                  .options[
                  (document.getElementById("inputKeyName") as HTMLSelectElement)
                    .selectedIndex
                ].textContent
              } ${
                (document.getElementById("inputOperator") as HTMLSelectElement)
                  .options[
                  (
                    document.getElementById(
                      "inputOperator"
                    ) as HTMLSelectElement
                  ).selectedIndex
                ].textContent
              } ${
                (document.getElementById("inputKeyValue") as HTMLInputElement)
                  .value
              } Raw: ${
                (
                  document.querySelector(
                    "input[name='display_value']"
                  ) as HTMLInputElement
                ).checked
              }`;
              break;
            case "Package Keys":
              presenceData.state = `${
                (document.getElementById("inputKeyName2") as HTMLSelectElement)
                  .options[
                  (
                    document.getElementById(
                      "inputKeyName2"
                    ) as HTMLSelectElement
                  ).selectedIndex
                ].textContent
              } ${
                (document.getElementById("inputOperator2") as HTMLSelectElement)
                  .options[
                  (
                    document.getElementById(
                      "inputOperator2"
                    ) as HTMLSelectElement
                  ).selectedIndex
                ].textContent
              } ${
                (document.getElementById("inputKeyValue2") as HTMLInputElement)
                  .value
              }`;
              break;
            case "Patch Notes":
              presenceData.state = `${
                (
                  document.getElementById(
                    "patchnotes_query"
                  ) as HTMLInputElement
                ).value
              } AppID: ${
                (
                  document.getElementById(
                    "patchnotes_appid"
                  ) as HTMLInputElement
                ).value || "All"
              }`;
              break;
          }
          if (document.getElementById("table-sortable_filter")) {
            if (
              (
                document.getElementById("table-sortable_filter")
                  .firstElementChild.firstElementChild as HTMLInputElement
              ).value !== ""
            ) {
              presenceData.state = `Search: ${
                (
                  document.getElementById("table-sortable_filter")
                    .firstElementChild.firstElementChild as HTMLInputElement
                ).value
              }`;
            }
          }
          break;
        case "tokendumper":
          presenceData.details = "Viewing Token Dumper";
          presenceData.state = `${
            document.getElementById("stats").textContent.split(" ")[0]
          } Users Contributed`;
          break;
        case "keys":
          presenceData.details = "Viewing Contribute Keys";
          break;
        case "":
          presenceData.details = "Viewing Homepage";
          break;
        default:
          presenceData.details = "Unsupported Page";
          break;
      }
      break;
    case "steamstat.us":
      presenceData.details = "Viewing Steam Status";
      presenceData.state = `${
        document.getElementById("online").textContent
      } users online`;
      break;
  }

  if (!time) delete presenceData.startTimestamp;
  if (!buttons && presenceData.buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
