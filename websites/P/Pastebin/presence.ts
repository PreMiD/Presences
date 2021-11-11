const presence = new Presence({
    clientId: "630194809763790871"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "pastebinlogo",
      startTimestamp: browsingTimestamp
    },
    urlData = window.location.pathname.replace(/^\/([^/]*).*$/, "$1"); // Get everything after the / in the URL, for paste ID's
  let currentPage = document.title.slice(15); // Get the page title, and remove the "Pastebin.com - " part

  if (urlData.length === 8) {
    // Getting the title from the HTML tag

    presenceData.details = "Viewing a paste";
    presenceData.state = `${document
      .querySelector(".paste_box_line1")
      .getAttribute("title")} | ${urlData}`; // Displaying the paste name
  } else {
    presenceData.details = "Browsing pastebin";

    if (currentPage === "#1 paste tool since 2002!") currentPage = "Homepage";

    presenceData.state = currentPage;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
