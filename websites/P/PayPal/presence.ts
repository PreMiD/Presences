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
    presenceData.details = "Viewing";
    presenceData.state = "Dashboard";
  } else if (document.location.pathname.includes("/webapps")) {
    title = document.querySelector("head > title");
    presenceData.details = "Reading about";
    presenceData.state = title.textContent;
  } else if (document.location.pathname === "/myaccount/transfer/homepage") {
    presenceData.details = "About to";
    presenceData.state = "Send Money";
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
  } else if (document.location.pathname === "/myaccount/money/") {
    presenceData.details = "Viewing";
    presenceData.state = "Wallet";
  } else if (document.location.pathname === "/myaccount/profile/seller-tools") {
    presenceData.details = "Editing settings";
    presenceData.state = "Seller Tools";
  } else if (
    document.location.pathname === "/myaccount/transfer/homepage/request"
  ) {
    presenceData.details = "About to";
    presenceData.state = "Request money";
  } else if (document.location.pathname === "/signin") {
    presenceData.details = "About to";
    presenceData.state = "Log In";
  } else if (
    document.location.pathname === "/myaccount/transfer/homepage/contact-list"
  ) {
    presenceData.details = "Looking through";
    presenceData.state = "Contacts";
  } else if (
    document.location.pathname === "/myaccount/transfer/homepage/more"
  ) {
    presenceData.details = "Viewing";
    presenceData.state = "More";
  } else if (document.location.pathname === "/myaccount/transfer/gift") {
    presenceData.details = "About to";
    presenceData.state = "Send a gift";
  } else if (document.location.pathname === "/fundraiser/hub") {
    presenceData.details = "About to";
    presenceData.state = "Donate";
  } else if (
    document.location.pathname.includes("/myaccount/transfer/split/preview")
  ) {
    presenceData.details = "About to";
    presenceData.state = "Split a bill";
  } else if (document.location.pathname === "/invoice/s/create") {
    presenceData.details = "About to";
    presenceData.state = "Create an Invoice";
  } else if (document.location.pathname === "/smc/async/") {
    presenceData.details = "Viewing";
    presenceData.state = "Message Center";
  } else if (document.location.pathname === "/disputes/") {
    presenceData.details = "Viewing";
    presenceData.state = "Resolution Center";
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
  } else if (document.location.pathname === "/myaccount/settings/") {
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
  } else if (
    document.location.pathname.includes("/myaccount/transactions/details")
  ) {
    presenceData.details = "Viewing";
    presenceData.state = "Transaction";
  } else if (document.location.pathname === "/myaccount/crypto/") {
    presenceData.details = "Viewing";
    presenceData.state = "Finances";
  } else if (document.location.pathname === "/shopping") {
    presenceData.details = "Looking for";
    presenceData.state = "Deals";
  } else if (document.location.pathname === "/myaccount/transactions/") {
    presenceData.details = "Viewing:";
    presenceData.state = "Activity";
  }
  if (document.querySelector(".chevron-rotation")) {
    presenceData.details = "Inspecting";
    presenceData.state = "Transaction";
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
