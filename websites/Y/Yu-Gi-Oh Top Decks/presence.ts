const presence = new Presence({
  clientId: "630550023133724692"
});
let deck;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "banner",
    smallImageKey: "icon"
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Browsing Decks..";
    presenceData.state = "at Homepage";
    presenceData.smallImageText = "browsing";
  } else if (document.location.pathname === "/decklists") {
    presenceData.details = "Looking at Decklists";
    presenceData.state = `Page: ${
      document.getElementsByClassName("current")[0].firstElementChild
        .textContent
    } top: ${
      document.getElementById("deck_lists").lastElementChild.firstElementChild
        .children[2].textContent
    } by ${
      document.getElementById("deck_lists").lastElementChild.firstElementChild
        .children[1].ENTITY_NODE
    }`;
    presenceData.smallImageText = (
      document.getElementById("deck_lists").lastElementChild.firstElementChild
        .children[2].firstElementChild as HTMLLinkElement
    ).href;
  } else if (document.location.pathname === "/top_decks") {
    presenceData.details = "Looking at Top decks";
    presenceData.state = `Current Meta: ${document
      .getElementsByClassName("sortable")[0]
      .children[1].firstElementChild.children[1].textContent.replace(
        "Most Used Cards",
        ""
      )}`;
    presenceData.largeImageKey = "banner";
    presenceData.smallImageKey = "icon";
    presenceData.smallImageText = "looking";
  } else if (document.location.pathname === "/top_cards") {
    presenceData.details = "Looking at Top Cards";
    (presenceData.state = `Top Card: ${
      document.getElementsByClassName("sortable")[0].children[1]
        .firstElementChild.children[2].textContent
    } Price: ${
      document.getElementsByClassName("sortable")[0].children[1]
        .firstElementChild.children[4].textContent
    }`),
      (presenceData.largeImageKey = "banner");
    presenceData.smallImageKey = "icon";
    presenceData.smallImageText = "looking";
  } else if (document.location.pathname === "/new_deck") {
    deck = (document.getElementsByName("deck_name")[0] as HTMLInputElement)
      .value;
    presenceData.details = "Building Deck";
    presenceData.state = `Editing: ${deck}`;
    presenceData.largeImageKey = "banner";
    presenceData.smallImageKey = "icon";
    presenceData.smallImageText = "creating deck";
  } else if (document.location.pathname.includes("/deck")) {
    if (/\d/.test("/deck/8205")) {
      deck = document.getElementsByClassName("large-12 columns panel")[0]
        .firstElementChild.textContent;
      presenceData.details = `Viewing deck: ${deck} (archetype: ${
        document.getElementsByClassName("large-12 columns panel")[0].children[1]
          .children[10].textContent
      })`;
      presenceData.state = `by: ${
        document.getElementsByClassName("large-12 columns panel")[0].children[1]
          .children[1].textContent
      }, price: ${
        document
          .getElementsByClassName("large-12 columns panel")[1]
          .children[1].textContent.replace("\n", ":")
          .split(":")[1]
      }`;
      presenceData.largeImageKey = "banner";
      presenceData.smallImageKey = "icon";
      presenceData.smallImageText = document.location.href;
    }
  }
  presence.setActivity(presenceData);
});
