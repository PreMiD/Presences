const presence = new Presence({
  clientId: "920135248006754394"
}),
timestamp = Math.floor(Date.now() / 1000),
pathData = {
  user: [
    {
      name: "supports",
      state: "My Subscriptions History"
    },
    {
      name: "edit",
      state: "Editing my details"
    }
  ],
  dashboard: [
    {
      name: "overview",
      state: "My Overview"
    },
    {
      name: "onboarding",
      state: "Starting Up"
    },
    {
      name: "goal",
      state: "My Goal"
    },
    {
      name: "tiers",
      paths: [
        {
          name: "",
          state: "My Support Tiers"
        },
        {
          name: "setup",
          state: "Setting up Supporter Tiers..."
        },
        {
          name: "add",
          state: "Adding new Supporter Tier..."
        },
        {
          name: "*",
          state: "Editing Supporter Tier..."
        }
      ]
    },
    {
      name: "posts",
      paths: [
        {
          name: "",
          state: "My Posts"
        },
        {
          name: "add",
          state: "Making new post..."
        },
        {
          name: "*",
          state: "Editing my post..."
        }
      ]
    },
    {
      name: "vouchers",
      paths: [
        {
          name: "",
          state: "My Vouchers"
        },
        {
          name: "add",
          state: "Making new Voucher..."
        },
        {
          name: "*",
          state: "Editing my Voucher..."
        }
      ]
    },
    {
      name: "overlay",
      state: "Stream Overlay"
    },
    {
      name: "supports",
      state: "Supports History"
    },
    {
      name: "bank",
      state: "Payment"
    },
    {
      name: "profile",
      state: "Editing Profile"
    },
    {
      name: "settings",
      state: "Settings"
    }
  ]
},
getUserHeader = ".q-page-container.q-pb-xl.main",
getUserHeaderHome =
  ".title.q-toolbar__title.ellipsis a.no-underline.text-primary.router-link-active",
// This function act like switch function but for objects Array (yea its a lil bit complicated)
stateSetter = (
  paths: string[],
  arrayPath: Array<{
    name: string;
    state?: string;
    paths?: Array<{
      name?: string;
      state?: string;
    }>;
  }>
): string => {
  const result = arrayPath.find((p) => p.name === (paths[1] || ""));
  if (result.state) return result.state;
  return result.paths.find((p) => {
    const b: boolean = p.name === (paths[2] || "");
    if (!b && !!paths[2]) return p.name === "*";
    return b;
  }).state;
};

presence.on("UpdateData", () => {
const presenceData: PresenceData = {
  largeImageKey: "main",
  startTimestamp: timestamp
};

const paths: string[] = window.location.pathname.split("/").splice(1);

switch (paths[0].toLowerCase()) {
  case "":
    presenceData.details = "Looking at HomePage";
    break;
  case "feed":
    presenceData.details = "Looking at Feeds";
    break;
  case "profile":
    presenceData.details = "Looking at Profile";
    break;
  case "about" || "terms":
    presenceData.details = "Looking at Terms of Service";
    break;
  case "dashboard":
    presenceData.details = "Looking at Dashboard";
    presenceData.state = stateSetter(paths, pathData.dashboard);
    break;
  case "discover": {
    presenceData.details = "Looking at Discover / Search";
    const searchBar = <HTMLInputElement>(
      document.querySelector(
        ".q-field.q-input.q-field--filled.q-field--square.q-field--float.q-validation-component input.q-field__native.q-placeholder"
      )
    );
    if (searchBar?.value)
      presenceData.state = `Searching for "${searchBar.value}"`;
    break;
  }
  case "user":
    presenceData.details = "Looking at My Detail";
    presenceData.state = stateSetter(paths, pathData.user);
    break;
  default: {
    // Default (If the path isnt defined here. Will be replaced with this!)
    presenceData.details = "Browsing Pages";

    // if no path detected, mean it on homepage
    if (!paths[0]) presenceData.details = "Looking at HomePage";

    // if user Looking at user page
    {
      const titleUser = <HTMLElement>(
          document.querySelector(`${getUserHeader} .q-px-md.q-py-md div`)
        ),
        roleUser = <HTMLElement>(
          document.querySelector(
            `${getUserHeader} .q-px-md.q-py-md .text-caption.text-grey-7`
          )
        );

      if (titleUser && roleUser) {
        presenceData.details = titleUser.innerText;
        presenceData.state = roleUser.innerText;
        presenceData.buttons = [
          {
            label: "Visit Creator",
            url: window.location.href
          }
        ];
      }
    }

    // if user Looking at user post
    {
      const titleUser = <HTMLElement>(
          document.querySelector(getUserHeaderHome)
        ),
        tagUser = <HTMLElement>(
          document.querySelector(
            "#q-app > div > div > div.q-page-container.main.q-pb-xl.bordered-desktop.post-page > div.post-date.text-body2.q-px-md.q-pt-md.q-pb-sm.post-content > a"
          )
        ),
        postTitle = <HTMLElement>(
          document.querySelector(
            "#q-app > div > div > div.q-page-container.main.q-pb-xl.bordered-desktop.post-page > h1"
          )
        );

      if (titleUser && tagUser && postTitle) {
        presenceData.details = `${titleUser.innerText} (${tagUser.innerText})`;
        presenceData.state = postTitle.innerText;
        presenceData.buttons = [
          {
            label: "View Post",
            url: window.location.href
          }
        ];
      }
    }
  }
}

presence.setActivity(presenceData);
});
