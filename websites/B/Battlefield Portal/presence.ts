const presence = new Presence({
  clientId: "919182644296683520"
});
interface PlaygoundInfo {
  playgroundId?: string;
  type?: string;
  playgroundName?: string;
  playgroundDescription?: string;
}

async function getPlaygroundInfo(playgroundId: string): Promise<string> {
  const resp = await fetch(
    `https://api.gametools.network/bf2042/playground/?playgroundid=${playgroundId}`
  );
  if (!resp.ok) throw new Error("Failed");
  return resp.text();
}

let called = false,
  playgroundId: string = null;

const editingStamp = Math.floor(Date.now() / 1000),
  info: PlaygoundInfo = {};

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "img1"
    },
    [block, time, buttons, name, description] = await Promise.all([
      presence.getSetting<boolean>("block"),
      presence.getSetting<boolean>("time"),
      presence.getSetting<boolean>("buttons"),
      presence.getSetting<boolean>("name"),
      presence.getSetting<boolean>("desc")
    ]),
    url = document.URL;

  if (url.search("=") > 0) playgroundId = url.split("=").pop();

  if (
    document.cookie.match(new RegExp("(^| )sessionId=([^;]+)"))[1] &&
    playgroundId
  ) {
    info.playgroundId = playgroundId;
    if (document.readyState === "complete") {
      if (!called) {
        called = true;
        await getPlaygroundInfo(info.playgroundId).then(value => {
          const json = JSON.parse(value).validatedPlayground;
          if (!json) called = false;
          else {
            info.type = json.blueprintType;
            info.playgroundDescription = json.playgroundDescription;
            info.playgroundName = json.playgroundName;
            presence.info(JSON.stringify(info));
          }
        });
      }
    } else called = false;
  }
  if (info) {
    if (name) presenceData.details = `Making ${info.playgroundName}`;
    if (description) presenceData.state = info.playgroundDescription;
  }

  if (block) {
    /* eslint-disable no-eval */
    if (window.eval("_Blockly.selected")) {
      const type = window.eval("_Blockly.selected.type");
      let parentName: string = null,
        blockName: string = null;
      if (type !== "ruleBlock" && type !== "subroutineBlock") {
        // its a block inside a rule or a subroutine or outside of all blocks
        parentName = <string>(
          window.eval(
            'for(parent=_Blockly.selected.parentBlock_;parent&&"ruleBlock"!==parent.type&&"subroutineBlock"!==parent.type;)parent=parent.parentBlock_;parent&&parent.toString().split(" ")[1];'
          )
        );
        blockName = window.eval("_Blockly.selected.type");
        if (parentName) presenceData.state = `in ${parentName} on ${blockName}`;
        else presenceData.state = `on ${blockName}`;
      } else {
        parentName = window.eval('_Blockly.selected.toString().split(" ")[1];');
        presenceData.state = `on ${
          type === "ruleBlock" ? "RULE" : "SUB"
        } ${parentName}`;
      }
    } else presenceData.state = info.playgroundDescription;
    /* eslint-enable no-eval */
  }

  if (time) presenceData.startTimestamp = editingStamp;
  if (buttons) presenceData.buttons = [{ label: "View Experience", url }];
  presence.setActivity(presenceData);
});
