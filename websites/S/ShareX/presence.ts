const presence = new Presence({
    clientId: "888726220571811914"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "sharex-logo",
      smallImageKey: "sharex-white-logo",
      smallImageText: "Navigating on getsharex.com",
      buttons: [
        {
          label: "View Page",
          url: document.location.href
        }
      ]
    };
  // Main Pages
  if (document.location.pathname === "/") {
    presenceData.state = "Browsing Home Page";
    delete presenceData.buttons;
  } else if (document.location.pathname.includes("/downloads")) {
    presenceData.state = "Browsing Downloads Page";
    presenceData.smallImageKey = "download";
  } else if (document.location.pathname.includes("/screenshots")) {
    presenceData.state = "Viewing Screenshots";
    presenceData.smallImageKey = "screenshot";
  } else if (document.location.pathname.includes("/changelog")) {
    presenceData.details = "Reading Changelog";
    presenceData.state = document.querySelector("h2")?.textContent;
    presenceData.smallImageKey = "changelog";
  } else if (document.location.pathname.includes("/donate")) {
    presenceData.state = "Browsing Donations Page";
    presenceData.smallImageKey = "donate";
  } else if (document.location.pathname.includes("/image-effects")) {
    presenceData.state = "Browsing Image Effects";
    presenceData.smallImageKey = "imageeffects";
  } else if (document.location.pathname.includes("/actions")) {
    presenceData.state = "Browsing Actions Page";
    presenceData.smallImageKey = "actionspage";
  } else if (document.location.pathname.includes("/brand-assets"))
    presenceData.state = "Browsing Brand Assets";

  // Docs
  if (document.location.pathname.includes("/faq")) {
    presenceData.state = "Browsing FAQ";
    presenceData.smallImageKey = "faq";
  } else if (document.location.pathname.includes("/dev-builds")) {
    presenceData.state = "Browsing Dev Builds";
    presenceData.smallImageKey = "beta";
  } else if (document.location.pathname.includes("/region-capture")) {
    presenceData.state = "Browsing RC Keybinds";
    presenceData.smallImageKey = "shortcuts";
  } else if (document.location.pathname.includes("/command-line-arguments")) {
    presenceData.state = "Browsing CLI Page";
    presenceData.smallImageKey = "cli";
  } else if (document.location.pathname.includes("/translation")) {
    presenceData.state = "Reading Translation Guide";
    presenceData.smallImageKey = "translate";
  } else if (document.location.pathname.includes("/custom-uploader")) {
    presenceData.state = "Reading Custom Uploaders Guide";
    presenceData.smallImageKey = "customupload";
  } else if (document.location.pathname.includes("amazon-s3")) {
    presenceData.state = "Reading Amazon S3 Guide";
    presenceData.smallImageKey = "amazon";
  } else if (document.location.pathname.includes("/google-cloud-storage")) {
    presenceData.state = "Reading Google Cloud Guide";
    presenceData.smallImageKey = "googlecloud";
  } else if (document.location.pathname.includes("website-capture")) {
    presenceData.state = "Reading Website Capture Guide";
    presenceData.smallImageKey = "websitecapture";
  }

  // Start Browsing Timestamp
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  // If Buttons option is off, delete buttons
  if (!showButtons) delete presenceData.buttons;

  // Activate Presence
  presence.setActivity(presenceData);
});
