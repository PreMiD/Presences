const presence = new Presence({
    clientId: "843058683100266526"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let moduleName: HTMLElement;

// checkmate javascript
function pathIncludes(string: string): boolean {
  return document.location.pathname.toLowerCase().includes(string);
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.state = "Viewing Deno.land Home";

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/manual")) {
    presenceData.state = "Docs";
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Reading";
    switch (true) {
      case pathIncludes("/manual/introduction"):
        presenceData.details = "Introduction";
        break;
      case pathIncludes("/manual/getting_started"):
        presenceData.details = "Getting Started";
        break;
      case pathIncludes("/manual/runtime"):
        presenceData.details = "The Runtime";
        break;
      case pathIncludes("/manual/linking_to_external_code"):
        presenceData.details = "Linking to External Code";
        break;
      case pathIncludes("/manual/standard_library"):
        presenceData.details = "Standard Library";
        break;
      case pathIncludes("/manual/testing"):
        presenceData.details = "Testing";
        break;
      case pathIncludes("/manual/tools"):
        presenceData.details = "Tools";
        break;
      case pathIncludes("/manual/embedding_deno"):
        presenceData.details = "Embedding Deno";
        break;
      case pathIncludes("/manual/contributing"):
        presenceData.details = "Contributing";
        break;
      case pathIncludes("/manual/examples"):
        presenceData.details = "Examples";
        break;
      case pathIncludes("/home"):
      default:
        presenceData.details = "Home";
    }
  } else if (document.location.hostname === "doc.deno.land") {
    presenceData.state = "Viewing Deno API";

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/std")) {
    presenceData.details = "Deno Standard Modules";
    moduleName = document.querySelector("span.ml-2.font-medium");
    presenceData.state = `Viewing: ${moduleName.innerText}`;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/x")) {
    presenceData.details = "Deno Third-Party Modules";
    moduleName = document.querySelector("span.ml-2.font-medium");
    presenceData.state = `Viewing "${document.title.split(" | Deno")[0]}"`;

    presenceData.startTimestamp = browsingStamp;
  }
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
