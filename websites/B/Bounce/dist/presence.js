const presence = new Presence({ clientId: "545248528750870530" });
let sartist, strack, slisteners, sdj;
async function newStats() {
    const data = await window
        .fetch("https://panelapi.boun.cc/v1/premidStats")
        .then((res) => res.json());
    strack = data.song.track;
    sartist = data.song.artist;
    sdj = data.presenter.name;
    slisteners = data.listeners.unique;
}
setInterval(newStats, 10000);
newStats();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDbEUsSUFBSSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUM7QUFFckMsS0FBSyxVQUFVLFFBQVE7SUFDckIsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNO1NBQ3RCLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQztTQUNoRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN6QixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQzFCLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNyQyxDQUFDO0FBRUQsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM3QixRQUFRLEVBQUUsQ0FBQztBQUVYLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFlBQVk7UUFDM0IsT0FBTyxFQUFFLGdCQUFnQixVQUFVLFlBQVk7UUFDL0MsS0FBSyxFQUFFLEdBQUcsTUFBTSxJQUFJLFNBQVMsTUFBTSxPQUFPLElBQUksU0FBUyxFQUFFO1FBQ3pELGNBQWMsRUFBRSxHQUFHLEdBQUcsSUFBSSxTQUFTLFdBQVc7UUFDOUMsY0FBYyxFQUFFLEtBQUs7S0FDdEIsQ0FBQztJQUNGLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUNwQixZQUFZLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztLQUMzQztTQUFNO1FBQ0wsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO0tBQ3BDO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9