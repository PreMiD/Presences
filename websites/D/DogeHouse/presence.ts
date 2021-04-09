const presence = new Presence({
    clientId: "829669440836468758"
  });
  
  let roomCount: number,
    browsingStamp: number,
    scheduledRoomCount: number,
    pathname: string;
  
  async function getStatistics() {
    async function fetchAsync(url: string) {
      const response = await fetch(url), data = await response.json();
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
    }, room = document.getElementsByClassName(
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
      const group: Element = document.getElementsByClassName(
        "w-full grid gap-5 mb-24"
      )[0];
      let muted = true, roomPosition = "Speaking";
      if (group !== undefined) {
        const username: string = document
          .getElementsByClassName("ml-auto pr-2")[0]
          .children[0].getAttribute("title");
        for (let i = 0; i < group.children.length; i++) {
          if (group.children[i].innerHTML.trim() == username) {
            if (
              document.getElementsByClassName(
                "col-span-full text-xl ml-2.5 text-white"
              )[1] !== undefined
            ) {
              const child: Element = document.getElementsByClassName(
                "col-span-full text-xl ml-2.5 text-white"
              )[1], index: number = Array.prototype.indexOf.call(
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
  
      let speakerCount = 0, listenerCount = 0;
      const group2 = document.getElementsByClassName(
        "col-span-full text-xl ml-2.5 text-white"
      );
      if (group2.length !== 0) {
        speakerCount += parseInt(
          group2[0].innerHTML.slice(
            group2[0].innerHTML.indexOf("(") + 1,
            group2[0].innerHTML.indexOf(")")
          )
        );
        if (group2[1] !== undefined) {
          listenerCount += parseInt(
            group2[1].innerHTML.slice(
              group2[1].innerHTML.indexOf("(") + 1,
              group2[1].innerHTML.indexOf(")")
            )
          );
        }
        if (group2[2] !== undefined) {
          listenerCount += parseInt(
            group2[2].innerHTML.slice(
              group2[2].innerHTML.indexOf("(") + 1,
              group2[2].innerHTML.indexOf(")")
            )
          );
        }
      }
      presenceData.details = `${roomPosition} (${speakerCount} | ${listenerCount})`;
      presenceData.state = `In ${roomName}`;
    } else if (pathname.includes("/scheduled-rooms")) {
      presenceData.details = "Scheduled Rooms";
      presenceData.state = `Viewing ${scheduledRoomCount} Rooms`;
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
      const username = document.getElementsByClassName("font-mono")[0], profileName = username.innerHTML;
      presenceData.details = "User Profile";
      presenceData.state = `Viewing ${profileName}`;
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
      presenceData.state = `${roomCount} Public Rooms`;
    }
  
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  });