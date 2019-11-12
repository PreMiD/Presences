let  presence : Presence = new Presence({
    clientId: "639889063469645854"
}),
startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData: presenceData = {
        largeImageKey: "large_img",
        startTimestamp
    };
    const url = window.location.href;

  if (url.includes("/submit"))
  {
    presenceData.details = "Submitting code"
  }

  else if (url.includes("/contest/") || url.includes("/gym/") || url.includes("/problem/"))
  {
    var tokens = document.title.split("-");
    if (url.includes("/problem/"))
    {
      presenceData.details = "Problem "+document.getElementsByClassName("title")[0].innerText.replace("."," -");
      var val=0;
      if (url.includes("/group"))
      {
       val = 1;
     }
      tokens[1] = document.getElementsByTagName("th")[val].innerText;
    }
    else
    {
    presenceData.details =tokens[0].trim();
  }
    presenceData.state = tokens.join("-").replace(tokens[0]+"-","").replace("- Codeforces","");
  }

  else if (url.includes("/group/"))
  {
    presenceData.details = "Viewing "+ document.title.replace(" - Codeforces","");
    presenceData.state = document.getElementsByTagName("th")[0].innerText;
  }

  else if (url.includes("/problemset"))
  {
    presenceData.details = "Browsing Problemset"
    if (url.includes("?"))
    {
    presenceData.details = "Searching...";
    presenceData.smallImageKey = "search";
  }
  }

  else if (url.includes("/blog/entry/"))
  {
    const author = document.getElementsByClassName("info")[0].outerText.split(",")[0].substring(3);
    presenceData.state = author+"'s blog entry";
    presenceData.details = document.title.replace(" - Codeforces","");
  }

  else if (url.includes("/profile/"))
  {
    presenceData.details = "Viewing someone's profile"
  }

  else
  {
    presenceData.state = "Browsing";
  }
    presence.setActivity(presenceData, true);
});
