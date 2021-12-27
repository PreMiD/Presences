const presence = new Presence({
    clientId: "924713441464295424"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/myaccount/summary") {
    presenceData.details = "Viewing:";
    presenceData.state = "Dashboard";}

  else if (document.location.pathname === ("/myaccount/transfer/homepage")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Send Money";}
  else if (document.location.pathname.includes("/myaccount/money/")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Wallet";}
  else if (document.location.pathname === ("/myaccount/transfer/homepage/request")) {
    presenceData.details = "About to:";
    presenceData.state = "Request money";}
  else if (document.location.pathname === ("/myaccount/transactions/")){
    presenceData.details = "Viewing:";
    presenceData.state = "Activity";
    if (document.querySelector(".chevron-rotation")){
      presenceData.details = "Inspecting:";
      presenceData.state = "Transaction";}
      }
  else if (document.location.pathname.includes("/smarthelp/home")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Help";}
  else if (document.location.pathname === "/myaccount/transfer/homepage/send/preview" || document.location.pathname === ("/myaccount/transfer/homepage/buy/preview"))
  {
    presenceData.details = "About to:";
    presenceData.state = "Send money";
  }
  else if (document.location.pathname.includes("/myaccount/settings/")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Settings"}
  else if (document.location.pathname.includes("/myaccount/transactions/details")){
    presenceData.details = "Viewing:";
    presenceData.state = "Transaction"}
  else presenceData.details = "Browsing..."


  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});