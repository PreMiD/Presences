const presence = new Presence({
    clientId: "924713441464295424"
}), browsingTimestamp = Math.floor(Date.now() / 1000);
let title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: browsingTimestamp
    };
    if (document.location.pathname === "/myaccount/summary")
        presenceData.details = "Viewing Dashboard";
    else if (document.location.pathname.includes("/webapps")) {
        title = document.querySelector("head > title");
        presenceData.details = ("Reading about" + title.textContent); }
    else if (document.location.pathname.includes("/myaccount/money/cards/new"))
        presenceData.details = "About to link a credit card";
    else if (document.location.pathname.includes("/myaccount/money/banks/new"))
        presenceData.details = "About to link a bank account";
    else if (document.location.pathname === "/myaccount/money/")
        presenceData.details = "Viewing Wallet";
    else if (document.location.pathname === "/myaccount/profile/seller-tools")
        presenceData.details = "Editing settings: Seller Tools";
    else if (document.location.pathname === "/myaccount/transfer/homepage/request")
        presenceData.details = "About to request money";
    else if (document.location.pathname === "/signin")
        presenceData.details = "About to log in";
    else if (document.location.pathname === "/myaccount/transfer/homepage/contact-list")
        presenceData.details = "Looking through contacts";
    else if (document.location.pathname === "/myaccount/transfer/homepage/more")
        presenceData.details = "Viewing More";
    else if (document.location.pathname === "/myaccount/transfer/gift")
        presenceData.details = "About to send a gift";
    else if (document.location.pathname === "/fundraiser/hub")
        presenceData.details = "About to donate";
    else if (document.location.pathname.includes("/myaccount/transfer/split/preview"))
        presenceData.details = "About to split a bill";
    else if (document.location.pathname === "/invoice/s/create")
        presenceData.details = "About to create an Invoice";
    else if (document.location.pathname === "/smc/async/")
        presenceData.details = "Viewing Message Center";
    else if (document.location.pathname === "/disputes/")
        presenceData.details = "Viewing Resolution Center";
    else if (document.location.pathname.includes("/smarthelp/home"))
        presenceData.details = "Viewing Help";
    else if (document.location.pathname ===
        "/myaccount/transfer/homepage/send/preview" ||
        document.location.pathname === "/myaccount/transfer/homepage/buy/preview" ||
        document.location.pathname === "/myaccount/transfer/homepage")
        presenceData.details = "About to send money";
    else if (document.location.pathname === "/myaccount/settings/")
        presenceData.details = "Editing settings: Account";
    else if (document.location.pathname === "/myaccount/security/")
        presenceData.details = "Editing settings: Security";
    else if (document.location.pathname === "/myaccount/privacy/")
        presenceData.details = "Editing settings: Privacy";
    else if (document.location.pathname === "/myaccount/settings/payments")
        presenceData.details = "Editing settings: Payments";
    else if (document.location.pathname === "/myaccount/settings/notifications")
        presenceData.details = "Editing settings: Notifications";
    else if (document.location.pathname.includes("/myaccount/transactions/details"))
        presenceData.details = "Viewing transaction";
    else if (document.location.pathname === "/myaccount/crypto/")
        presenceData.details = "Viewing Finances";
    else if (document.location.pathname === "/shopping")
        presenceData.details = "Looking for Deals";
    else if (document.location.pathname === "/myaccount/transactions/")
        presenceData.details = "Viewing Activity";
    if (document.querySelector(".chevron-rotation"))
        presenceData.details = "Inspecting transaction";

    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
