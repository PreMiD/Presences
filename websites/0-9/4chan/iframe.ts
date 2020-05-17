const iframe = new iFrame();
iframe.on("UpdateData", () => {
  if (
    document.location.hostname == "www.4chan.org" ||
    document.location.hostname == "boards.4chan.org" ||
    document.location.hostname == "www.4channel.org" ||
    (document.location.hostname == "boards.4channel.org" &&
      !document.location.pathname.startsWith("/frames_navigation"))
  ) {
    var pathname = document.location.pathname;
    var query1 = document.querySelector("div.boardBanner>div.boardTitle");
    var query2 = document.querySelector("div.boxbar>h2");
    var query3 = document.querySelector("div.pagelist>div.pages");
    var query4 = document.querySelector("div.pagelist>div.pages>strong");
    var query5 = document.querySelector("table#postForm");
    var query6 = document.querySelector("#togglePostFormLink");
    var query7 = document.querySelector("div#quickReply");
    iframe.send({
      pathnameA: pathname,
      queryA: query1 ? query1.textContent : false,
      queryB: query2 ? query2.textContent : false,
      queryC: query3 ? query3.lastElementChild.textContent : false,
      queryD: query4 ? query4.textContent : false,
      queryE: query5 ? true : false,
      queryF: query6 ? query6.hasAttribute("style") : false,
      queryG: query7 ? true : false
    });
  }
});
