var presence = new Presence({
  clientId: "706517097219620874"
});
var time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  var path = document.location.pathname.toLowerCase();
  if (path === "/") {
    presenceData.details = "Initial page";
    presenceData.state = "Browsering";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/mac")) {
    presenceData.details = "Checking product";
    presenceData.state = "Mac";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/apple-card/")) {
    presenceData.details = "Checking product";
    presenceData.state = "Apple card";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/ios/")) {
    const text = "textContent" in document.body ? "textContent" : "innerText";
    document.title = document.getElementsByTagName("h1")[0][text];
    presenceData.details = "Reading about iOS";
    presenceData.state = document.title;
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path === "/apple-pencil") {
    presenceData.details = "Checking product";
    presenceData.state = "Apple Pencil";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/ipad")) {
    const text = "textContent" in document.body ? "textContent" : "innerText";
    document.title = document.getElementsByTagName("h1")[0][text];
    if (document.title.startsWith("Buy")) {
      const name = document.title.replace("Buy ", "");
      presenceData.details = "Buying product";
      presenceData.state = name;
      presenceData.startTimestamp = time;
      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Checking Product";
      presenceData.state = document.title;
      presenceData.startTimestamp = time;
      presence.setActivity(presenceData);
    }
  } else if (path.startsWith("/iphone")) {
    const text = "textContent" in document.body ? "textContent" : "innerText";
    document.title = document.getElementsByTagName("h1")[0][text];
    presenceData.details = "Checking product";
    presenceData.state = document.title;
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
    if (path.endsWith("specs/")) {
      presenceData.details = "Reading specs";
      presenceData.state = "iPhone";
      presenceData.startTimestamp = time;
      presence.setActivity(presenceData);
    }
  } else if (path.startsWith("/watch") || path.startsWith("/apple-watch")) {
    presenceData.details = "Checking product";
    presenceData.state = "Apple Watch";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/tv") || path.startsWith("/apple-tv")) {
    presenceData.details = "Checking service";
    presenceData.state = "Apple TV";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/music") || path.startsWith("/apple-music")) {
    presenceData.details = "Checking service";
    presenceData.state = "Apple music";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (document.title.startsWith("shop/product")) {
    presenceData.details = "Buying product";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/shop/buy")) {
    const text = "textContent" in document.body ? "textContent" : "innerText";
    document.title = document.getElementsByTagName("h1")[0][text];
    if (document.title.startsWith("Buy")) {
      const name = document.title.replace("Buy ", "");
      presenceData.details = "Buying product";
      presenceData.state = name;
      presenceData.startTimestamp = time;
      presence.setActivity(presenceData);
    } else if (document.title.startsWith("Customize")) {
      const name = document.title.replace("Customize your ", "");
      presenceData.details = "Buying product";
      presenceData.state = name;
      presenceData.startTimestamp = time;
      presence.setActivity(presenceData);
    } else if (document.title.startsWith("There's an")) {
      presenceData.details = "Buying product";
      presenceData.state = "Apple Watch";
      presenceData.startTimestamp = time;
      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Buying product";
      presenceData.startTimestamp = time;
      presence.setActivity(presenceData);
    }
  } else if (path.endsWith("upgrade/") || path.endsWith("/compare/")) {
    presenceData.details = "Comparing devices";
    presenceData.state = "Technical specifications";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/airpods")) {
    const text = "textContent" in document.body ? "textContent" : "innerText";
    document.title = document.getElementsByTagName("h1")[0][text];
    presenceData.details = "Checking product";
    presenceData.state = document.title;
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path === "/shop/favorites") {
    presenceData.details = "Shop";
    presenceData.state = "Favorites";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path === "/shop/bag") {
    presenceData.details = "Viewing bag";
    presenceData.state = "Saved items";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/shop")) {
    presenceData.details = "Viewing shop";
    presenceData.state = "Products";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path.startsWith("/today")) {
    presenceData.details = "Checking news";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else {
    presenceData.details = "Browsering website";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  }
});
