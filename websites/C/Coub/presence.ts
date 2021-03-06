const presence = new Presence({
  clientId: "760186916213227520"
});

// Variables
let Routes: string[], Queries;

presence.on("UpdateData", async () => {
  // Presence Data
  const data: PresenceData = {
    largeImageKey: "coub_large"
  };

  // Setup Routes & Query
  Routes = document.location.href
    .replace(document.location.search, "")
    .split("/")
    .splice(3);
  Queries = Object.fromEntries(
    document.location.search
      .slice(1)
      .split("&")
      .map((k, i, a) => {
        const item: string[] = k.replace(/\[(.*?)\]+/g, "").split("="),
          Keys = a
            .map((i) => i.replace(/\[(.*?)\]+/g, "").split("="))
            .filter((i) => i[0] === item[0]),
          Values = Keys.map((i) => i[1]);
        i;

        if (Keys.length === 1) return item;
        else return [item[0], Values];
      })
  );

  // Web Pages
  if (!Routes[0] || Routes[0] === "hot") {
    // First page - Hot
    data.details = "Hot";
    data.state = "Watching coubs...";
  } else if (Routes[0] === "rising") {
    // Rising Coubs
    data.details = "Rising";
    data.state = "Watching coubs...";
  } else if (Routes[0] === "fresh") {
    // Fresh Coubs
    data.details = "Fresh";
    data.state = "Watching coubs...";
  } else if (Routes[0] === "feed") {
    // Feed page
    data.details = "Feed";
    data.state = "Watching coubs...";
  } else if (Routes[0] === "stories") {
    // Stories page

    if (!Routes[1]) {
      data.details = "Stories feed";
      data.state = "Watching mashups...";
    } else if (Routes[1] === "new") {
      data.details = "Stories";
      data.state =
        "Creating by " +
        document.querySelector(
          ".story-form__stamp .story-form__channels-dropdown button span"
        ).textContent;
    } else {
      data.details = "Stories";
      data.state = document.querySelector(".story__header h1").textContent;
    }
  } else if (Routes[0] === "random") {
    // Random page

    if (!Routes[1]) {
      data.details = "Random";
      data.state = "Watching popular coubs...";
    } else if (Routes[1] === "top") {
      data.details = "Random";
      data.state = "Watching top coubs...";
    }
  } else if (Routes[0] === "promote") {
    data.details = "Promoted Coubs";
    data.state =
      "Spent: " +
      document.querySelector(".promoted-coubs__summary div:nth-child(5) span")
        .textContent +
      " | Views: " +
      document.querySelector(".promoted-coubs__summary div:nth-child(1) span")
        .textContent;
  } else if (Routes[0] === "chat") {
    // Chat page
    data.details = "Chat";

    const user = document.querySelector(
      ".sc-jAaTju.eNyegn a .sc-hSdWYo.eioDHx .sc-eHgmQL.hoWqal"
    );
    data.state = user ? "Chatting with " + user.textContent : "Chatting...";
  } else if (Routes[0] === "create") {
    // Create new coub
    data.details = "Creating new coub...";
  } else if (Routes[0] === "featured") {
    // Featured page

    if (Routes[1] === "coubs") {
      data.details = "Featured coubs";

      if (!Routes[2] || Routes[2] === "recent") {
        data.state = "Watching recent coubs...";
      } else if (Routes[2] === "top_of_the_month") {
        data.state = "Watching top coubs of the month...";
      } else if (Routes[2] === "undervalued") {
        data.state = "Watching undervalued coubs...";
      }
    } else if (Routes[1] === "channels") {
      data.details = "Featured channels";
      data.state = "Watching channels...";
    } else if (Routes[1] === "stories") {
      data.details = "Featured stories";

      if (!Routes[2] || Routes[2] === "recent") {
        data.state = "Watching recent stories...";
      } else if (Routes[2] === "likes") {
        data.state = "Watching top stories...";
      }
    }
  } else if (Routes[0] === "weekly") {
    data.details = "Best weekly coubs";
    data.state = document.querySelector(
      ".weekly__menu .page-menu__item.-active"
    ).textContent;
  } else if (Routes[0] === "royal.coubs") {
    data.details = "Coub Picks";

    if (!Routes[1]) {
      data.state = "Watching coubs...";
    } else if (Routes[1] === "coubs") {
      data.state = "Watching coubs...";
    } else if (Routes[1] === "reposts") {
      data.state = "Watching coubs...";
    } else if (Routes[1] === "stories") {
      data.state = "Watching coubs...";
    }
  } else if (Routes[0] === "best") {
    data.details = "Best coubs " + Routes[1];

    if (!Routes[2]) {
      data.state = "Most popular";
    } else if (Routes[2] === "memes") {
      data.state = "Best memes";
    } else if (Routes[2] === "hidden-gems") {
      data.state = "Hidden gems";
    }
  } else if (Routes[0] === "likes") {
    data.details = "My likes";

    if (!Routes[1] || Routes[1] === "recent") {
      data.state = "Recent coubs";
    } else if (Routes[1] === "top") {
      data.state = "Top coubs";
    } else if (Routes[1] === "views") {
      data.state = "Views count coubs";
    } else if (Routes[1] === "oldest") {
      data.state = "Oldest coubs";
    }
  } else if (Routes[0] === "bookmarks") {
    data.details = "Bookmarks";

    if (!Routes[1] || Routes[1] === "recent") {
      data.state = "Recent coubs";
    } else if (Routes[1] === "top") {
      data.state = "Top coubs";
    } else if (Routes[1] === "views") {
      data.state = "Views count coubs";
    } else if (Routes[1] === "oldest") {
      data.state = "Oldest coubs";
    }
  } else if (Routes[0] === "view") {
    if (Routes[1]) {
      data.details = document.querySelector(
        ".coub__description .description__info h5.description__title"
      ).textContent;
      data.state = document.querySelector(
        ".coub__description .description__info .description__stamp"
      ).textContent;
    }
  } else if (Routes[0] === "friends") {
    // Friends page - useless page
    data.details = "Friends";
  } else if (Routes[0] === "account") {
    // Account page - wotk in progress
    data.details = "My account";
  } else if (Routes[0] === "search") {
    // Search page
    data.details = "Search: " + Queries.q.replace(/\W\d+/g, " ");

    if (!Routes[1] || Routes[1] === "recent") {
      data.state = "Relevance coubs";
    } else if (Routes[1] === "likes") {
      data.state = "Top coubs";
    } else if (Routes[1] === "views") {
      data.state = "Views count";
    } else if (Routes[1] === "fresh") {
      data.state = "Most recent";
    } else if (Routes[1] === "channels") {
      data.state = "Channels";
    }
  } else if (Routes[0] === "community") {
    // Search page
    data.details =
      "Community: " +
      document.querySelector(".hot__community .title h2").textContent;

    if (Routes[1] === "featured") {
      // Featured community
      data.state =
        document.querySelector(".featured__menu .-active.page-menu__item")
          .textContent + " coubs";
    } else {
      if (!Routes[2]) {
        data.state = "Hot coubs";
      } else if (Routes[2] === "rising") {
        data.state = "Rising coubs";
      } else if (Routes[2] === "fresh") {
        data.state = "Fresh coubs";
      } else if (Routes[2] === "top") {
        data.state = "Top coubs";
      } else if (Routes[2] === "views") {
        data.state = "Views count coubs";
      } else if (Routes[2] === "random") {
        data.state = "Random coubs";
      }
    }
  } else {
    data.details =
      "Channel: " +
      document.querySelector(".channel .channel__description h1").textContent;

    if (Routes[1] === "edit") {
      data.state = "Edit channel";
    } else {
      data.state = document.querySelector(
        ".profile__menu .page-menu__item.-active"
      ).textContent;
    }
  }

  presence.setActivity(data, true);
});
