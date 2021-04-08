const presence = new Presence({
    clientId: "829669440836468758"
  });
  
  let roomCount: number,
    browsingStamp: number,
    scheduledRoomCount: number,
    pathname: string;
  
  async function getStatistics() {
    async function fetchAsync(url: string) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  
    const data = await fetchAsync(
      "https://api.dogehouse.xyz/v1/statistics?presence"
    );
    roomCount = data.totalRooms || 0;
    scheduledRoomCount = data.totalScheduledRooms || 0;
  }
  
  getStatistics();
  setInterval(getStatistics, 10000);
  browsingStamp = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", async () => {
    pathname = document.location.pathname;
  
    const presenceData: PresenceData = {
      largeImageKey: "dogehouse_logo",
      smallImageKey: "",
      smallImageText: "dogehouse.tv",
      details: "Other",
      state: "Other"
    };
  
    const room = document.getElementsByClassName(
      "text-2xl truncate max-w-lg text-center px-2"
    )[0];
  
    let roomName;
  
    if (room) {
      roomName = room.innerHTML;
    }
  
    if (pathname.includes("/room")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.buttons = [
        {
          label: "Join Room",
          url: "https://dogehouse.tv/room/" + pathname.slice(6)
        }
      ];
      let muted = true;
      let group: any = document.getElementsByClassName(
        "w-full grid gap-5 mb-24"
      )[0];
      let roomPosition = "Speaking";
      if (group !== undefined) {
        const username: string = document
          .getElementsByClassName("ml-auto pr-2")[0]
          .children[0].getAttribute("title");
        for (let i = 0; i < group.children.length; i++) {
          if (group.children[i].innerText.trim() == username) {
            if (
              document.getElementsByClassName(
                "col-span-full text-xl ml-2.5 text-white"
              )[1] !== undefined
            ) {
              const child: any = document.getElementsByClassName(
                "col-span-full text-xl ml-2.5 text-white"
              )[1];
              const index: number = Array.prototype.indexOf.call(
                child.parentNode.children,
                child
              );
              if (i > index) {
                roomPosition = "Listening";
              }
            }
  
            if (roomPosition !== "Listening") {
              if (group.children[i].children[0].children.length == 1)
                muted = false;
              if (muted) {
                presenceData.smallImageKey = "mic_off";
                presenceData.smallImageText = "Muted";
              } else {
                presenceData.smallImageText = "Unmuted";
                presenceData.smallImageKey = "mic_on";
              }
            } else {
              presenceData.smallImageText = "";
              presenceData.smallImageKey = "";
            }
          }
        }
      }
  
      let speakerCount = 0;
      let listenerCount = 0;
      group = document.getElementsByClassName(
        "col-span-full text-xl ml-2.5 text-white"
      );
      if (group.length !== 0) {
        speakerCount += parseInt(
          group[0].innerText.slice(
            group[0].innerText.indexOf("(") + 1,
            group[0].innerText.indexOf(")")
          )
        );
        if (group[1] !== undefined) {
          listenerCount += parseInt(
            group[1].innerText.slice(
              group[1].innerText.indexOf("(") + 1,
              group[1].innerText.indexOf(")")
            )
          );
        }
        if (group[2] !== undefined) {
          listenerCount += parseInt(
            group[2].innerText.slice(
              group[2].innerText.indexOf("(") + 1,
              group[2].innerText.indexOf(")")
            )
          );
        }
      }
      presenceData.details = `${await roomPosition} (${await speakerCount} | ${await listenerCount})`;
      presenceData.state = `In ${await roomName}`;
    } else if (pathname.includes("/scheduled-rooms")) {
      presenceData.details = "Scheduled Rooms";
      presenceData.state = `Viewing ${await scheduledRoomCount} Rooms`;
    } else if (pathname.includes("/me")) {
      presenceData.details = "User Settings";
      presenceData.state = `Editing Profile`;
    } else if (pathname.includes("/invite")) {
      presenceData.details = "Invite Others";
      presenceData.state = `Inviting People`;
    } else if (pathname.includes("/following-online")) {
      presenceData.details = "Following Online";
      presenceData.state = `Checking followers`;
    } else if (pathname.includes("/voice-settings")) {
      presenceData.details = "User Settings";
      presenceData.state = `Editing Voice Settings`;
    } else if (pathname.includes("/sound-effect-settings")) {
      presenceData.details = "User Settings";
      presenceData.state = `Editing Sound Settings`;
    } else if (pathname.includes("/user")) {
      let username = document.getElementsByClassName("font-mono")[0];
      const profileName = username.innerHTML;
      presenceData.details = "User Profile";
      presenceData.state = `Viewing ${await profileName}`;
      presenceData.buttons = [
        {
          label: "Visit Profile",
          url: "https://dogehouse.tv/user/" + pathname.slice(6)
        }
      ];
    } else if (pathname.includes("/")) {
      browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Rooms";
      presenceData.state = `${await roomCount} Public Rooms`;
    }
  
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  });