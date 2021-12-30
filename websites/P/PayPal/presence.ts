const presence = new Presence({
    clientId: "924713441464295424"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let title: HTMLElement;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/myaccount/summary") {
    // Dashboard
    presenceData.details = "Viewing";
    presenceData.state = "Dashboard";
  } else if (document.location.pathname.includes("/webapps")) {
    // Most info pages
    title = document.querySelector("head > title");
    presenceData.details = "Reading about";
    presenceData.state = title.textContent;
  } else if (document.location.pathname === "/myaccount/transfer/homepage") {
    // Send money
    presenceData.details = "About to";
    presenceData.state = "Send Money";
    // eslint-disable-next-line brace-style
  } // WALLET
  else if (document.location.pathname.includes("/myaccount/money/")) {
    presenceData.details = "Viewing";
    presenceData.state = "Wallet";
  } else if (
    document.location.pathname.includes("/myaccount/money/cards/new")
  ) {
    presenceData.details = "About to";
    presenceData.state = "Link a credit card";
  } else if (
    document.location.pathname.includes("/myaccount/money/banks/new")
  ) {
    presenceData.details = "About to";
    presenceData.state = "Link a bank account";
  } else if (
    document.location.pathname === "/myaccount/transfer/homepage/request"
  ) {
    presenceData.details = "About to";
    presenceData.state = "Request money";
  } else if (
    document.location.pathname === "/myaccount/transfer/homepage/contact-list"
  ) {
    presenceData.details = "Looking through";
    presenceData.state = "Contacts";
  } else if (document.location.pathname.includes("/smarthelp/home")) {
    presenceData.details = "Viewing";
    presenceData.state = "Help";
  } else if (
    document.location.pathname ===
      "/myaccount/transfer/homepage/send/preview" ||
    document.location.pathname === "/myaccount/transfer/homepage/buy/preview"
  ) {
    presenceData.details = "About to";
    presenceData.state = "Send money";
    // eslint-disable-next-line brace-style
  }
  // SETTINGS
  else if (document.location.pathname === "/myaccount/settings/") {
    presenceData.details = "Editing settings";
    presenceData.state = "Account";
  } else if (document.location.pathname === "/myaccount/security/") {
    presenceData.details = "Editing settings";
    presenceData.state = "Security";
  } else if (document.location.pathname === "/myaccount/privacy/") {
    presenceData.details = "Editing settings";
    presenceData.state = "Privacy";
  } else if (document.location.pathname === "/myaccount/settings/payments") {
    presenceData.details = "Editing settings";
    presenceData.state = "Payments";
  } else if (
    document.location.pathname === "/myaccount/settings/notifications"
  ) {
    presenceData.details = "Editing settings";
    presenceData.state = "Notifications";
    // eslint-disable-next-line brace-style
  }
  // TRANSACTIONS
  else if (
    document.location.pathname.includes("/myaccount/transactions/details")
  ) {
    presenceData.details = "Viewing";
    presenceData.state = "Transaction";
  } else if (document.location.pathname === "/myaccount/transactions/") {
    if (document.querySelector(".filter-search-hasValue")) {
      presenceData.details = "Searching";
      presenceData.state = "Activities";
    } else {
      presenceData.details = "Viewing:";
      presenceData.state = "Activity";
    }
    if (document.querySelector(".chevron-rotation")) {
      presenceData.details = "Inspecting";
      presenceData.state = "Transaction";
    }
  } else presenceData.details = "Browsing...";

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
