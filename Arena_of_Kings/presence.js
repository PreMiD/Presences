//! DO NOT REMOVE | USED FOR CHECKING IF ALREADY INJECTED
var PreMiD_Presence = true;

//* PreMiD events
window.addEventListener("PreMiD_UpdateData", updateData);

var data;

/**
 * Update Data when priorityTab focused
 */
async function updateData() {
  var presenceData = JSON.parse(
    `${(await getPageVariables(["PreMiD_PresenceData"])).PreMiD_PresenceData}`
  );

  if (presenceData == null || presenceData.data == undefined) return;

  data = {
    clientID: "555834227833307146",
    presenceData: presenceData.data,
    trayTitle: "",
    playback: true,
    service: "Arena of Kings"
  };

  //* Send data back to PreMiD
  var event = new CustomEvent("PreMiD_UpdatePresence", { detail: data });
  window.dispatchEvent(event);
}
