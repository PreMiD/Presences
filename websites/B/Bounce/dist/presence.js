const presence = new Presence({ clientId: "545248528750870530" });
let sartist, strack, slisteners, sdj;
setInterval(newStats, 10000);
newStats();
async function newStats() {
    let data = await window
        .fetch("https://panelapi.boun.cc/v1/premidStats")
        .then((res) => res.json());
    strack = data.song.track;
    sartist = data.song.artist;
    sdj = data.presenter.name;
    slisteners = data.listeners.unique;
}
const stamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "bouncelogo",
        details: `Streaming to ${slisteners} listeners`,
        state: `${strack || "Loading"} - ${sartist || "Loading"}`,
        smallImageText: `${sdj || "Loading"} is live!`,
        startTimestamp: stamp
    };
    if (sdj !== "AutoDJ") {
        presenceData.smallImageKey = "bouncelive";
    }
    else {
        delete presenceData.smallImageText;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDbEUsSUFBSSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUM7QUFDckMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM3QixRQUFRLEVBQUUsQ0FBQztBQUVYLEtBQUssVUFBVSxRQUFRO0lBQ3JCLElBQUksSUFBSSxHQUFHLE1BQU0sTUFBTTtTQUNwQixLQUFLLENBQUMseUNBQXlDLENBQUM7U0FDaEQsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3QixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzNCLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUMxQixVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFDckMsQ0FBQztBQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFlBQVk7UUFDM0IsT0FBTyxFQUFFLGdCQUFnQixVQUFVLFlBQVk7UUFDL0MsS0FBSyxFQUFFLEdBQUcsTUFBTSxJQUFJLFNBQVMsTUFBTSxPQUFPLElBQUksU0FBUyxFQUFFO1FBQ3pELGNBQWMsRUFBRSxHQUFHLEdBQUcsSUFBSSxTQUFTLFdBQVc7UUFDOUMsY0FBYyxFQUFFLEtBQUs7S0FDdEIsQ0FBQztJQUNGLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUNwQixZQUFZLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztLQUMzQztTQUFNO1FBQ0wsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO0tBQ3BDO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9