const presence = new Presence({
  clientId: "821433038335377418"
});
(async function () {
  const strings = await presence.getStrings({
      play: "presence.playback.playing",
      pause: "presence.playback.paused",
      live: "presence.activity.live",
      search: "presence.activity.searching",
    });
    showName: 
    function capitalize(text: string): string {
      text = text.toLowerCase();
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  
    let title: string;
    let seasonEpi: string;
    let movTitle: string;

    let elapsed: number = undefined,
      oldUrl: string = undefined,
      // header, 
      item;
  
    presence.on("UpdateData", async () => {
       
     
      let video: HTMLVideoElement = null,
        details = undefined,
        state = undefined,
        smallImageKey = undefined,
        smallImageText = undefined,
        startTimestamp = undefined,
        endTimestamp = undefined;
  
      const href = window.location.href,
        path = window.location.pathname;
          
      if (href !== oldUrl) {
        oldUrl = href;
        elapsed = Math.floor(Date.now() / 1000);
      }
      //var pageStuff = path.includes

      state = undefined;
      
  
      if (path.includes("/home")) {
        
        details = "Browsing:";
        state = "Home Page";
        startTimestamp = elapsed;
      
      } else if (path.includes("/shows") && document.querySelector(".subnav__items--tuneInfo") == null) {
        
        details = "Browsing:"
        state = "Viewing Shows"
        startTimestamp = elapsed;
      
      } else if (path.includes("/shows") && document.querySelector("video") == null && document.querySelector(".subnav__items--tuneInfo") && !path.includes("/video")) {
        
        title = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).name
        
        if (title) {
          state = title
          details = "Viewing Series:"
        } 
      } else if (document.querySelector("video") == null && path.includes("/movies")) {
      
        state = "Viewing Movies"
        details = "Browsing:"  
        
        
      } else if (path.includes("/network")) {
        const brand: HTMLImageElement = document.querySelector(
          ".SimpleModalNav__brandImage"
        );
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Network";
        if (brand) {
          state = brand.alt;
          if (item) {
            state = state + `'s ${item.textContent}`;
          }
        }
      } else if (path.includes("/sports_episode")) {
        //title = document.querySelector(".Masthead__title");
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Sports Episode";
        if (title) {
          //state = title.textContent;
          if (item) {
            state = state + `'s ${item.textContent}`;
          }
        }
      } else if (path.includes("/sports_team")) {
        //title = document.querySelector(".Masthead__title");
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Sports Team";
        if (title) {
          state = title//.textContent;
          if (item) {
            state = state + `'s ${item.textContent}`;
          }
        }
      } else if (path.includes("/search")) {
        const input: HTMLInputElement = document.querySelector(
          ".cu-search-input"
        );
        details = "Searching";
        smallImageKey = "search";
        smallImageText = strings.search;
        if (input && input.value.length > 0) {
          state = input.value;
        }
      } else if (path.includes("/live")) {
        const category = document.querySelector(
          ".LiveGuide__filter-item--selected"
        );
       // title = document.querySelector(".ModalHeader__showname");
        details = "Viewing Live";
        if (category) {
          state = capitalize(category.textContent);
          if (title) {
            state = state + ` (${title/*.textContent*/})`;
          }
        }
      } else if (path.includes("/my-stuff")) {
        details = "Viewing My Stuff";
      } else if (path.includes("/manage-dvr")) {
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing My DVR";
        if (item) {
          state = capitalize(item.textContent);
        }
      } else if (path.includes("/video") || path.includes("/movies")) {
        video = document.querySelector("video");
        if (video) {
          if (path.includes("/movies")) {
            movTitle = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).name
          } else if (path.includes("/video")) {
            title = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).partOfSeries.name
            seasonEpi = "S" + JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).partOfSeason.seasonNumber + ":" +
                        "E" + JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).episodeNumber + " " +
                        JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).name
          }
          
          const content = seasonEpi,
            timestamps = presence.getTimestamps(
              Math.floor(video.currentTime),
              Math.floor(video.duration)
            ),
            live = timestamps[1] === Infinity;
          details = "Watching Movie";
              if(movTitle) {
                state = movTitle
                details = details
              }

          
          if (title) {
            details = title;
          }
          if (content) {
            state = content;
          }
          smallImageKey = live ? "live" : video.paused ? "pause" : "play";
          smallImageText = live
            ? strings.live
            : video.paused
            ? strings.pause
            : strings.play;
          startTimestamp = live ? elapsed : timestamps[0];
          endTimestamp = live ? undefined : timestamps[1];
          if (video.paused) {
            startTimestamp = undefined;
            endTimestamp = undefined;
          }
        } 
      }
    
  
      const data: PresenceData = {
        details: details,
        state: state,
        largeImageKey: "logo",
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
      };
      presence.setActivity(data, video ? !video.paused : true);
      presence.setTrayTitle(details);
    });
  })()