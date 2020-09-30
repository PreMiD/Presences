const presence = new Presence({
  clientId: "760981805695762441"
});

// Timestamp
function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

// Variables 
let isPadlet: boolean,
  PadletTitle: string;

presence.on("UpdateData", async () => {
  // Presence Data
  const PadletElement = document.querySelector('#surface-header .surface-title .title-heading'),
    data: PresenceData = {
      largeImageKey: "padlet_image"
    };

  // Setup Routes & Query (For Features)
  // Routes = document.location.href.replace(document.location.search, '').split("/").splice(3);
  // Queries = Object.fromEntries(document.location.search.slice(1).split("&").map((k, i, a) => {
  //   const item: string[] = k.replace(/\[(.*?)\]+/g, '').split('='),
  //     Keys = a.map(i => i.replace(/\[(.*?)\]+/g, '').split('=')).filter(i => i[0] === item[0]),
  //     Values = Keys.map(i => i[1]);
  //   if (Keys.length === 1) return item;
  //   else return [item[0], Values];
  // }));

  PadletTitle = PadletElement && PadletElement.textContent;
  isPadlet = !!PadletElement;

  if (isPadlet) {
    data.details = PadletTitle;
    data.state = 'Working with Padlet...';
    data.startTimestamp = getTimeStamp();
  } else {
    data.details = 'Idle';
    data.state = 'Idle';
  }

  presence.setActivity(data, true);
});
