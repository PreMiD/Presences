const presence = new Presence({
  clientId: "630550023133724692"
});
let deck;

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    presence.setActivity({
      details: "Browsing Decks..",
      state: "at Homepage",
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "browsing"
    });
  } else if (document.location.pathname === "/decklists") {
    presence.setActivity({
      details: "Looking at Decklists",
      state: `Page: ${
        document.getElementsByClassName("current")[0].firstElementChild
          .textContent
      } top: ${
        document.getElementById("deck_lists").lastElementChild.firstElementChild
          .children[2].textContent
      } by ${
        document.getElementById("deck_lists").lastElementChild.firstElementChild
          .children[1].ENTITY_NODE
      }`,
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: (
        document.getElementById("deck_lists").lastElementChild.firstElementChild
          .children[2].firstElementChild as HTMLLinkElement
      ).href
    });
  } else if (document.location.pathname === "/top_decks") {
    presence.setActivity({
      details: "Looking at Top decks",
      state: `Current Meta: ${document
        .getElementsByClassName("sortable")[0]
        .children[1].firstElementChild.children[1].textContent.replace(
          "Most Used Cards",
          ""
        )}`,
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "looking"
    });
  } else if (document.location.pathname === "/top_cards") {
    presence.setActivity({
      details: "Looking at Top Cards",
      state: `Top Card: ${
        document.getElementsByClassName("sortable")[0].children[1]
          .firstElementChild.children[2].textContent
      } Price: ${
        document.getElementsByClassName("sortable")[0].children[1]
          .firstElementChild.children[4].textContent
      }`,
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "looking"
    });
  } else if (document.location.pathname === "/new_deck") {
    deck = (document.getElementsByName("deck_name")[0] as HTMLInputElement)
      .value;
    presence.setActivity({
      details: "Building Deck",
      state: `Editing: ${deck}`,
      largeImageKey: "banner",
      smallImageKey: "icon",
      smallImageText: "creating deck"
    });
  } else if (document.location.pathname.includes("/deck")) {
    if (/\d/.test("/deck/8205")) {
      deck = document.getElementsByClassName("large-12 columns panel")[0]
        .firstElementChild.textContent;
      const [, value] = document
        .getElementsByClassName("large-12 columns panel")[1]
        .children[1].textContent.replace("\n", ":")
        .split(":");
      presence.setActivity({
        details: `Viewing deck: ${deck} (archetype: ${
          document.getElementsByClassName("large-12 columns panel")[0]
            .children[1].children[10].textContent
        })`,
        state: `by: ${
          document.getElementsByClassName("large-12 columns panel")[0]
            .children[1].children[1].textContent
        }, price: ${value}`,
        largeImageKey: "banner",
        smallImageKey: "icon",
        smallImageText: document.location.href
      });
    }
  }
});
