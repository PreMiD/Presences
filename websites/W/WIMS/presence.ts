const presence = new Presence({
  clientId: "656959119118565406"
});

// Redirect to iframe source, to prevent loss of progress
if (document.getElementsByTagName("frame")[1]) {
  if (document.baseURI !== document.getElementsByTagName("frame")[1].src)
    window.location.replace(document.getElementsByTagName("frame")[1].src);
}

// Check whether loggedout
let loggedout = false;
if (
  (document.baseURI.match(/module=adm/) &&
    document.baseURI.match(/(type=|classes)/)) ||
  (document.getElementsByClassName("menuitem")[1] as HTMLElement)
    .textContent === ""
)
  loggedout = true;

let Classname: string,
  Worksheet = "...",
  WSNo: string,
  EXNo: string,
  Exercise: string,
  timestamp: number,
  timeleft: number;

// In Worksheet
if (!loggedout) {
  // Set Class
  // if (document.querySelector(".wimscenter"))
  if (document.querySelector(".wims_subclasses")) {
    [, Classname] = (
      document.querySelector(".wimscenter") as HTMLElement
    ).textContent.split("\n");
  } else if (document.querySelectorAll("td.small")[1]) {
    Classname = `${
      (
        document.querySelectorAll("td.small")[1] as HTMLElement
      ).textContent.split(" ")[0]
    } `;
  } else {
    Classname = `${
      (document.querySelector(".wimscenter") as HTMLElement).textContent.split(
        "\n"
      )[0]
    } `;
  }

  // Set Worksheet
  if (document.baseURI.match(/sh=/)) {
    WSNo = document.baseURI.match(/sh=(.?.?)/)[1].replace(/&|#/g, "");
    Worksheet = `- ${
      document.getElementsByClassName("text_item ")[1].innerHTML
    }${WSNo}`;
    Exercise = "...";
  } else if (document.baseURI.match(/(worksheet=|reply)/)) {
    // In Exercise
    // Set Worksheet
    WSNo = (document.querySelector(".sheet") as HTMLAnchorElement).href
      .match(/sh=(.?.?)/)[1]
      .replace(/&|#/g, "");
    Worksheet = `- ${
      (document.querySelector(".sheet") as HTMLElement).textContent
    } ${WSNo}`;
    Classname = `${
      (
        document.querySelectorAll("td.small")[2] as HTMLElement
      ).textContent.split(" ")[0]
    } `;

    // Set Exercise
    if (document.querySelector(".main_body .titre")) {
      if (
        document.querySelector(".main_body .titre") &&
        document.getElementsByTagName("kbd")[1] &&
        !document.querySelector(".answer")
      ) {
        [EXNo] = document
          .getElementsByTagName("kbd")[1]
          .textContent.match(/\d+/);
        Exercise = `${(
          document.querySelector(".sheet") as HTMLAnchorElement
        ).href
          .match(/#ex(.?.?)/)[1]
          .replace(/&|#/g, "")}.${EXNo}: ${
          (document.querySelector(".main_body .titre") as HTMLElement)
            .textContent
        }`;
      } else {
        Exercise = (document.querySelector(".main_body .titre") as HTMLElement)
          .textContent;
      } // Results page, so no EXNo
    }
    if (document.querySelector(".oeftitle")) {
      if (
        document.querySelector(".oeftitle") &&
        document.getElementsByTagName("kbd")[1] &&
        !document.querySelector(".oefanswer")
      ) {
        [EXNo] = document
          .getElementsByTagName("kbd")[1]
          .textContent.match(/\d+/);
        Exercise = `${
          (document.querySelector(".oeftitle") as HTMLElement).textContent
        }: ${EXNo}`;
      } else {
        Exercise = (document.querySelector(".oeftitle") as HTMLElement)
          .textContent;
      }
    }
    if (EXNo > "1") {
      // If exercise >1 get last time
      timestamp = parseInt(sessionStorage.getItem("TimeStampStorage"));
    } else if (
      document.querySelector(".answer") ||
      document.querySelector(".oefanswer")
    ) {
      // If answer page hide time
      timestamp = 0;
    } else timestamp = Date.now(); // Else reset time
  } else if (document.baseURI.match(/(exam=)/)) {
    // In Exam
    Worksheet = "";
    Exercise = (document.querySelector("h1.wims_title font") as HTMLElement)
      .textContent;
    timeleft =
      Date.now() +
      (parseInt(
        (
          document.querySelector("p#exam_clock") as HTMLElement
        ).textContent.split(":")[1]
      ) *
        60 +
        parseInt(
          (
            document.querySelector("p#exam_clock") as HTMLElement
          ).textContent.split(":")[2]
        )) *
        1000;
  }
}

presence.on("UpdateData", async () => {
  if (loggedout) presence.setActivity();
  else {
    presence.setActivity({
      details: Classname + Worksheet,
      state: Exercise,
      startTimestamp: timestamp,
      endTimestamp: timeleft,
      largeImageKey: "wims_lg"
    });
  }
  if (EXNo) sessionStorage.setItem("TimeStampStorage", timestamp.toString());
});
