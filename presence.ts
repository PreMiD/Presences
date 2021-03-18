var presence = new Presence({
    clientId: "820332677177671682"
  });
  
  const time = Math.floor(Date.now() / 1000);
  presence.on("UpdateData", async () => {

  
    // Fotos
    if (document.location.pathname.startsWith("/")) {
      const presenceData: PresenceData = {
        details: "Photos",
        state: "Viewing your photos",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/photo/")) {
      const presenceData: PresenceData = {
        details: "Photos",
        state: "Looking at a photo...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);


    // Explorar.
    } else if (document.location.pathname.startsWith("/explore")) {
      const presenceData: PresenceData = {
        details: "Exploring...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/people")) {
      const presenceData: PresenceData = {
        details: "Explore",
        state: "Viewing the people section",
        largeImageKey: "photos",
        smallImageKey: "personas",
        startTimestamp: time
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/things")) {
        const presenceData: PresenceData = {
          details: "Explore",
          state: "Viewing the things section",
          largeImageKey: "photos",
          startTimestamp: time
        };
    presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search/")) {
      const presenceData: PresenceData = {
        details: "Explore",
        state: "Searching...",
        largeImageKey: "photos"
      };
    presence.setActivity(presenceData);
    


    // Página de compartidos
    } else if (document.location.pathname.startsWith("/sharing")) {
    const presenceData: PresenceData = {
      details: "Shared",
      state: "Reviewing shared items...",
      largeImageKey: "photos",
      smallImageKey: "compartir",
      startTimestamp: time
    };
    presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/share/")) {
    const presenceData: PresenceData = {
      details: "Shared",
      state: "Reviewing a shared item...",
      largeImageKey: "photos",
      smallImageKey: "compartir",
      startTimestamp: time
    };
    presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/direct/")) {
    const presenceData: PresenceData = {
      details: "Shared",
      state: "Reviewing direct messages...",
      largeImageKey: "photos",
      startTimestamp: time
    };
    presence.setActivity(presenceData);

    // Tienda de impresión
    } else if (document.location.pathname.startsWith("/printstore")) {
    const presenceData: PresenceData = {
      details: "Print Store",
      state: "Looking at the print shop...",
      largeImageKey: "photos",
      startTimestamp: time,
      buttons: [
        {
                label: "View Shop",
                url: "https://photos.google.com/printstore"
            }
        ]
    };
    presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/photobooks")) {
    const presenceData: PresenceData = {
      details: "Print Store",
      state: "Reading about the photo book...",
      largeImageKey: "photos",
      startTimestamp: time,
      buttons: [
        {
                label: "View",
                url: "https://photos.google.com/photobooks"
            }
        ]
    };
    presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/retailprint")) {
    const presenceData: PresenceData = {
      details: "Print Store",
      state: "Reading about the retail print...",
      largeImageKey: "photos",
      startTimestamp: time,
      buttons: [
        {
                label: "View",
                url: "https://photos.google.com/retailprint"
            }
        ]
    }
    presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/printseries")) {
    const presenceData: PresenceData = {
      details: "Print Store",
      state: "Reading about the premium printing service...",
      largeImageKey: "photos",
      startTimestamp: time,
      buttons: [
        {
                label: "View",
                url: "https://photos.google.com/printseries"
            }
        ]
    };
    presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/canvas")) {
    const presenceData: PresenceData = {
      details: "Print Store",
      state: "Reading about prints on canvas...",
      largeImageKey: "photos",
      startTimestamp: time,
      buttons: [
        {
                label: "View",
                url: "https://photos.google.com/canvas"
            }
        ]
    };
    presence.setActivity(presenceData);



    // Álbumes
    } else if (document.location.pathname.startsWith("/albums")) {
      const presenceData: PresenceData = {
        details: "Albums",
        state: "Looking at their albums...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/album/")) {
      const presenceData: PresenceData = {
        details: "Albums",
        state: "Looking at an album...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);


    // Página de utilidades.
    } else if (document.location.pathname.startsWith("/managelibrary")) {
      const presenceData: PresenceData = {
        details: "Utilities",
        state: "Managing your library...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.startsWith("/movies/create")) {
      const presenceData: PresenceData = {
        details: "Utilities",
        state: "Creating a movie ...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);


    // Archivo.
    } else if (document.location.pathname.startsWith("/archive")) {
      const presenceData: PresenceData = {
        details: "Archive",
        state: "Looking at his files...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/archive/photo/")) {
      const presenceData: PresenceData = {
        details: "Archive",
        state: "Reviewing a file ...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);


    // Papelera
    } else if (document.location.pathname.startsWith("/trash")) {
      const presenceData: PresenceData = {
        details: "Paper bin",
        state: "Checking the trash...",
        largeImageKey: "photos",
        startTimestamp: time
      };
      presence.setActivity(presenceData);


    // Configuración
    } else if (document.location.pathname.startsWith("/settings")) {
        const presenceData: PresenceData = {
          details: "Settings",
          state: "Checking your settings...",
          largeImageKey: "photos",
          startTimestamp: time
        };
        presence.setActivity(presenceData);
      } else if (document.location.pathname.startsWith("/unsupportedvideos")) {
        const presenceData: PresenceData = {
          details: "Settings",
          state: "Watching the unsupported videos...",
          largeImageKey: "photos",
          startTimestamp: time
        };
        presence.setActivity(presenceData);

    // Actividad
  } else if (document.location.pathname.startsWith("/activities/photos_comments")) {
    const presenceData: PresenceData = {
      details: "Activity Register",
      state: "Looking at the comments...",
      largeImageKey: "photos",
      startTimestamp: time
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/activities/photos_messages")) {
    const presenceData: PresenceData = {
      details: "Activity Register",
      state: "Looking at the messages...",
      largeImageKey: "photos",
      startTimestamp: time
    };
    presence.setActivity(presenceData);
  } else (document.location.pathname.startsWith("/activities/photos_likes"))
    const presenceData: PresenceData = {
      details: "Activity Register",
      state: "Checking your likes...",
      largeImageKey: "photos",
      startTimestamp: time
    };
    presence.setActivity(presenceData);
  });
  
