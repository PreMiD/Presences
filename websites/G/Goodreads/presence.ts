const presence = new Presence({clientId: "867525909204566056"});

let author: any;
let book: any;
let user: any;


presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "goodreads",
    details: "Browsing Goodreads",
    startTimestamp: Math.floor(Date.now() / 1000)
  };


  if (document.location.pathname == "/home" ||
      document.location.pathname == "/" ) {
    presenceData.details = "Browsing homepage";
  } else if (document.location.pathname == "/book") {
    presenceData.details = "Browsing books";
  } else if (document.location.pathname.includes("/book/show/")){
    // beta layout conditional
    presenceData.details = "Browsing a book:";
    if (document.getElementById("bookTitle") == null){
      book = document.querySelector("h1");
      author = document.querySelector(".ContributorLink__name");
      presenceData.state = `${book.innerText} | by: ${author.innerText}`;
    } else{
      book = document.getElementById("bookTitle");
      author = document.querySelector(".authorName");
      presenceData.state = `${book.innerText} | by: ${author.innerText}`;
    };
  } else if (document.location.pathname.includes("/series")){
    book = document.querySelector("h1");
    if (book.innerText == "Series"){
      presenceData.details = "Viewing all book series on Goodreads"
    } else {
      presenceData.details = "Viewing a book series:";
      presenceData.state = book.innerText;
    };
  } else if (document.location.pathname.includes("/user/show/")){
    presenceData.details = "Browsing a profile: "
    user = document.querySelector("#profileNameTopHeading");
    if(user.innerHTML.includes("smallText")){
      let trash: any = document.querySelector("#profileNameTopHeading a");
      presenceData.state = user.innerText.replace(trash.innerText, "");
    } else {presenceData.state = user.innerText;};
  } else if (document.location.pathname.includes("/author/show/")) {
    presenceData.details = "Viewing an author:";
    author = document.querySelector(".authorName span"); 
    presenceData.state = author.innerText;
  } else if (document.location.pathname.includes("/group/show/")){
    presenceData.details = "Viewing a group:";
    let group: any = document.querySelector("h1");
    presenceData.state = group.innerText;
  } else if (document.location.pathname.includes("/topic")){
    presenceData.details = "Browsing discussions";
  } else if (document.location.pathname.includes("/review/edit/")){
    presenceData.details = "Writing a book review...";
    book = document.querySelector("a.bookTitle");
    presenceData.smallImageKey = "writing";
    presenceData.smallImageText = book.innerText;
  } else if(document.location.pathname.includes("/review/list/")){
    presenceData.details = "Browsing bookshelves";
  } else if (document.location.pathname.includes("/review/show")){
    presenceData.details = "Reading a review...";
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "On Goodreads";
  } else if(document.location.pathname.includes("/recommendations")){
    presenceData.details = "Browsing recommendations";
  } else if(document.location.pathname.includes("/challenges") ||
  document.location.pathname.includes("/user_challenges")){
    presenceData.details = "Viewing reading challenge";
  } else if(document.location.pathname.includes("/quotes")){
    presenceData.details = "Browsing quotes";
  } else if(document.location.pathname.includes("/search")){
    presenceData.details = "Searching for a book...";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "On Goodreads";
  };
  presence.setActivity(presenceData);
});
