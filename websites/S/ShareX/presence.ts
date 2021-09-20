const presence = new Presence({
  clientId: "888726220571811914" 
}),
 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting("timestamp"),
  showButtons: boolean = await presence.getSetting("buttons"),
presenceData: PresenceData = {
  largeImageKey:
    "sharex-logo",
  smallImageKey:
    "sharex-white-logo",
  smallImageText: "Navigating on getsharex.com"
};
// Main Pages
if (document.location.pathname === "/") 
presenceData.state = "🏠 | Browsing Home Page";

else if (document.location.pathname.includes('/downloads')) {
presenceData.state = "⚡ | Browsing Downloads Page";

}else if(document.location.pathname.includes('/screenshots')) {
presenceData.state = "🖼 | Viewing Screenshots";
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/changelog')) {
  presenceData.details = "📜 | Reading Changelog";
  presenceData.state = document.querySelector("h2")?.textContent; 
  presenceData.buttons = [
    {
      label: "View Page",
      url: document.location.href
    }
  ];

}else if(document.location.pathname.includes('/donate')) {
presenceData.state = "🛒 | Browsing Donations Page";
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes("/image-effects")) {
presenceData.state = "🤳 | Browsing Image Effects";
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/actions')) {
presenceData.state = "💻 | Browsing Actions Page";
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/brand-assets')) {
presenceData.state = "🎨 | Browsing Brand Assets";
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}

// Docs
if(document.location.pathname.includes('/faq')) {
presenceData.state = '🙋‍♂️ | Browsing FAQ';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/dev-builds')) {
presenceData.state = '🥼 | Browsing Dev Builds';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/region-capture')) {
presenceData.state = '⚙ | Browsing RC Keybinds';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/command-line-arguments')) {
presenceData.state = '⛓ | Browsing CLI Page';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/translation')) {
presenceData.state = '📝 | Reading Translation Guide';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/custom-uploader')) {
presenceData.state = '📱 | Reading Custom Uploaders Guide';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('amazon-s3')) {
presenceData.state = '🦺 | Reading Amazon S3 Guide';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('/google-cloud-storage')) {
presenceData.state = '🧱 | Reading Google Cloud Guide';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}else if(document.location.pathname.includes('website-capture')) {
presenceData.state = '🔌 | Reading Website Capture Guide';
presenceData.buttons = [
  {
    label: "View Page",
    url: document.location.href
  }
];

}

// Start Browsing Timestamp
if (showTimestamp) presenceData.startTimestamp = browsingStamp;

// If Buttons option is off, delete buttons
if (!showButtons) delete presenceData.buttons;

// Activate Presence
presence.setActivity(presenceData);
});
