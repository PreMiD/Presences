// This is required to retrieve the values from the Tetris game
// The scores and other information is stored deep within a global
// object, so we need to traverse the object to find the values.
// Current methods for reading global variables are not sufficient.
const customJavaScript = `{
    const searchingFor = new Set([
      "mLinesValueView",
      "mScoreValueView",
      "mLevelValueView"
    ]);

    const values = {};

    function recursiveSearch(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (searchingFor.has(key)) {
            values[key] = obj[key];
          }
          if (obj[key] && (typeof obj[key] == "object")) {
            recursiveSearch(obj[key]);
          }
        }
      }
    }

    setInterval(() => {
      recursiveSearch(window.mmBPSApp);
      document.getElementById("PreMiD-tetris-presence-output").value = JSON.stringify({
        lines: values.mLinesValueView.mText,
        score: values.mScoreValueView.mText,
        level: values.mLevelValueView.mText,
      });
    }, 2000);

  }`,
  template = document.createElement("template"),
  script = document.createElement("script"),
  output = document.createElement("textarea");

output.id = "PreMiD-tetris-presence-output";
output.style.display = "none";
script.id = "PreMiD-tetris-presence-script";
script.textContent = customJavaScript;
template.append(script, output);
document.head.append(template.cloneNode(true));

const iframe = new iFrame();

iframe.on("UpdateData", () => {
  try {
    const output = document.querySelector<HTMLTextAreaElement>("#PreMiD-tetris-presence-output"),
      data = JSON.parse(output.value);
    iframe.send(data);
  } catch {/* ignore */}
});
