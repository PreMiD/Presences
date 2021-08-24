const presence = new Presence({
  clientId: "879675566385659945"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "biglogo",
    smallImageText: "AHK v2 Documentation",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  switch (document.location.pathname) {
    case "/":
      presenceData.details = "Selecting AHK / docs version...";
      return presence.setActivity(presenceData);
    case "/v2/docs/AutoHotkey.htm":
      return presence.setActivity(presenceData);
    default:
      presenceData.details = "Viewing a Doc page";
      break;
  }

  const reg = '([^,(\\n\'"]*)',

  iframeObj = document.querySelector("iframe").contentDocument;
  if (!iframeObj) {
    presence.setActivity();
    return;
  }

  const headingObj = iframeObj.querySelector("h1");
  let headingTxt;
  if (headingObj !== null) 
    headingTxt = headingObj.textContent.match(reg)[0].trim();
   else {
    presence.setActivity();
    return;
  }

  let subTxt;
  const [subMatch] = document.location.href.match(new RegExp("#.*"));
  if (subMatch !== null && !(subMatch.includes("(") || subMatch.includes(")"))) {
    const subObj = iframeObj.querySelector(subMatch);
    if (subObj.tagName.toLowerCase() === "p") 
      subTxt = `${subObj.textContent.slice(0, 51)}(...)`;
     else if (subObj.tagName.toLowerCase() === "div") 
      subTxt = subObj.querySelector('[class*="head"]').textContent;
     else if (subObj.tagName.toLowerCase() === "tr") 
      subTxt = subObj.children[0].textContent.match(reg)[0].trim();
     else subTxt = subObj.textContent;
  }

  presenceData.state = headingTxt + (subTxt === null ? "" : ` - ${subTxt}`);

  presence.setActivity(presenceData);
});