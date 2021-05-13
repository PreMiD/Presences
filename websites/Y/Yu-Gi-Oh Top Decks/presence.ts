const presence = new Presence({
  clientId: "630550023133724692"
});
var deck;

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const presenceData: PresenceData = {
      details: "Browsing Decks..",
      state: "at Homepage",
      //largeImageKey: "banner",
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "browsing"
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/decklists") {
    var pagenumber =
      document.getElementsByClassName("current")[0].firstElementChild
        .textContent;
    var no1 =
      document.getElementById("deck_lists").lastElementChild.firstElementChild
        .children[2].textContent;
    var auth =
      document.getElementById("deck_lists").lastElementChild.firstElementChild
        .children[1].ENTITY_NODE;
    var deckurl = (
      document.getElementById("deck_lists").lastElementChild.firstElementChild
        .children[2].firstElementChild as HTMLLinkElement
    ).href;
    const presenceData: PresenceData = {
      details: "Looking at Decklists",
      state: `Page: ${pagenumber} top: ${no1} by ${auth}`,
      //largeImageKey: "banner",
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: deckurl
    };

    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/top_decks") {
    const top = document
      .getElementsByClassName("sortable")[0]
      .children[1].firstElementChild.children[1].textContent.replace(
        "Most Used Cards",
        ""
      );
    const presenceData: PresenceData = {
      details: "Looking at Top decks",
      state: `Current Meta: ${top}`,
      //largeImageKey: "banner",
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "looking"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/top_cards") {
    const top =
      document.getElementsByClassName("sortable")[0].children[1]
        .firstElementChild.children[2].textContent;
    var price =
      document.getElementsByClassName("sortable")[0].children[1]
        .firstElementChild.children[4].textContent;
    const presenceData: PresenceData = {
      details: "Looking at Top Cards",
      state: `Top Card: ${top} Price: ${price}`,
      //largeImageKey: "banner",
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "looking"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/new_deck") {
    deck = (document.getElementsByName("deck_name")[0] as HTMLInputElement)
      .value;
    const presenceData: PresenceData = {
      details: "Building Deck",
      state: `Editing: ${deck}`,
      //largeImageKey: "banner",
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "creating deck"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/deck")) {
    if (/\d/.test("/deck/8205")) {
      deck = document.getElementsByClassName("large-12 columns panel")[0]
        .firstElementChild.textContent;
      var by = document.getElementsByClassName("large-12 columns panel")[0]
        .children[1].children[1].textContent;
      var archetype = document.getElementsByClassName(
        "large-12 columns panel"
      )[0].children[1].children[10].textContent;
      var value = document
        .getElementsByClassName("large-12 columns panel")[1]
        .children[1].textContent.replace("\n", ":")
        .split(":")[1];

      const presenceData: PresenceData = {
        details: `Viewing deck: ${deck} (archetype: ${archetype})`,
        state: `by: ${by}, price: ${value}`,
        //largeImageKey: "banner",
        largeImageKey: "banner",
        smallImageKey: "icon",
        smallImageText: document.location.href
      };
      presence.setActivity(presenceData);
    }
  }
});
