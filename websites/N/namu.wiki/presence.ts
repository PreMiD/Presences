const presence = new Presence({
  clientId: "846385772688834591"
});

interface interfaceMapping {
  [key: string]: string;
}

const boardTypeMapping: interfaceMapping = {
    w: "Reading",
    acl: "View ACl",
    diff: "View Difference",
    history: "View History",
    backlink: "View Backlink",
    contribution: "View Contribution",
    Policy: "View Policy",
    Search: "Searching",

    // edit
    edit: "Editing",
    move: "Move Document",
    delete: "Delete Confirm",
    // eslint-disable-next-line camelcase
    new_edit_request: "Create New Edit Request",

    // discuss
    discuss: "Dicsussing",
    thread: "View Discuss",
    // eslint-disable-next-line camelcase
    edit_request: "Edit Request",

    // recent
    RecentDiscuss: "View Recent Discuss",
    RecentChanges: "View Recent Changes",

    // not used well
    NeededPages: "View Needed Pages",
    OrphanedPages: "View Orphaned Pages",
    UncategorizedPages: "View Uncategorized Pages",
    OldPages: "View Old Pages",
    ShortestPages: "View Shortest Pages",
    LongestPages: "View Longest Pages",
    BlockHistory: "View Block History",
    RandomPage: "View Random Page",
    Upload: "Upload file",
    License: "View License"
  },
  // /member/(action)
  validateMembershipUrl = /\/member\/(.+)/,
  membersMapping: interfaceMapping = {
    login: "Login",
    // eslint-disable-next-line camelcase
    recover_password: "Recover Password",
    signup: "Sign Up",
    mypage: "My Page",
    // eslint-disable-next-line camelcase
    change_email: "Change Email",
    // eslint-disable-next-line camelcase
    change_password: "Change Password",
    // eslint-disable-next-line camelcase
    activate_otp: "Activate OTP"
  },
  // /RecentChanges?logtype=(search)
  changesMapping: interfaceMapping = {
    all: "All Changes",
    create: "Created Documents",
    delete: "Deleted Documents",
    move: "Moved Documents",
    revert: "Reverted Documents"
  },
  // /RecentDiscuss?logtype=(search)
  discussMapping: interfaceMapping = {
    // eslint-disable-next-line camelcase
    normal_thread: "Normal Thread",
    // eslint-disable-next-line camelcase
    old_thread: "Old Thread",
    // eslint-disable-next-line camelcase
    closed_thread: "Closed Thread",
    // eslint-disable-next-line camelcase
    open_editrequest: "Opened Edit Request",
    // eslint-disable-next-line camelcase
    accepted_editrequest: "Accepted Edit Request",
    // eslint-disable-next-line camelcase
    closed_editrequest: "Closed Edit Request",
    // eslint-disable-next-line camelcase
    old_editrequest: "Old Edit Request"
  },
  // /contribution/(type)/(username)/(contributeType)
  validateContributeUrl = /\/contribution\/(.+)\/(.+)\/(.+)/;

let currentPage = document.location.pathname,
  currentTime = Date.now();
presence.on("UpdateData", async () => {
  const privacy = await presence.getSetting("privacy"),
    showTimestamp = await presence.getSetting("showTimestamp"),
    path = document.location.pathname,
    params = document.location.search,
    parsedUrl = path.split("/"), // It's a very bad design, but they have a slash document.
    [, action] = parsedUrl,
    details = boardTypeMapping[action],
    presenceData: PresenceData = { largeImageKey: "namu" };

  /**
   *
   * Setting Details & State
   *
   */
  presenceData.details = !details ? "Unknown Action" : details;

  let page: RegExpExecArray | string = validateContributeUrl.exec(path);
  /* View Contribute */
  if (page) {
    if (page[1] === "author") page = `User: ${page[2]}`;
    else page = "IP User";
  } else if (validateMembershipUrl.exec(path)) {
    page = validateMembershipUrl.exec(path);
    /* View Membership */
    presenceData.details = "Member Page";
    page = membersMapping[page[1]];

    /* Searching */
    // /Search?q=(search)
  } else if (action === "Search") {
    page = getParam(params, "q");
    if (page.length === 0) page = "Blank Query...";

    /* View Recent Discuss History */
  } else if (action === "RecentDiscuss")
    page = discussMapping[getParam(params, "logtype")];
  /* Recent Changes History */ else if (action === "RecentChanges")
    page = changesMapping[getParam(params, "logtype")];
  /* View Discuss Thread */ else if (
    action === "thread" ||
    action === "edit_request"
  )
    page = document.querySelector("h1 > a").textContent;
  // H1 Tag Only one
  /* Other */ else if (details)
    page = decodeURI(path.substring(`/${action}/`.length));
  else page = null;

  if (action === "w") {
    presenceData.buttons = [
      { label: "View Page", url: document.location.href }
    ];
  }
  if (page) {
    presenceData.state =
      page.length > 128 ? `${page.slice(0, 120)}...` : (page as string);
  }

  /**
   *
   * Login Status
   *
   */
  if (details) {
    const members = document.querySelectorAll(
      "#app > div > div > nav > ul[class=r] > li > div > div > div"
    );
    if (members[1].textContent.indexOf("Please login!") === -1) {
      presenceData.smallImageKey = "user";
      if (!privacy) presenceData.smallImageText = members[0].textContent;
    }
  }

  /**
   *
   * Set Time
   *
   */
  if (currentPage !== path) {
    currentPage = path;
    currentTime = ~~(Date.now() / 1000);
  }

  /**
   *
   * Apply
   *
   */
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    if (showTimestamp) presenceData.startTimestamp = currentTime;
    presence.setActivity(presenceData);
  }
});

/**
 *
 * Extract parameter from url on the current page
 *
 * @param query Parameter Name
 * @returns Parameter Value
 */
const getParam = (params: string, query: string): string => {
  return new URLSearchParams(params).get(query);
};
