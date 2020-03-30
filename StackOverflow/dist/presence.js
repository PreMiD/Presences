var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "610123745033584651",
    
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, pageNumber, jobPageNumber, usersortagsPageNumber, allPages, lastPage, jobLastPage, questionsLastPage;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    title = document.querySelector("div#question-header h1 a");
    pageNumber = document.querySelector("div.pager.fl span.page-numbers.current");
    usersortagsPageNumber = document.querySelector("div.pager.fr span.page-numbers.current");
    jobPageNumber = document.querySelector("div:nth-child(1) > div > a.job-link.selected");
    allPages = document.querySelectorAll("div.pager.fr a");
    jobLastPage = document.querySelectorAll("div.pagination a");
    questionsLastPage = document.querySelectorAll("div.pager.fl a");
    if (document.location.pathname.includes("/users") ||
        document.location.pathname.includes("/tags")) {
        lastPage = allPages[allPages.length - 2].innerText;
    }
    else if (document.location.pathname.includes("/jobs")) {
        lastPage = jobLastPage[jobLastPage.length - 2].innerText;
    }
    else if (document.location.pathname == "/questions") {
        lastPage = questionsLastPage[questionsLastPage.length - 2].innerText;
    }
    if (title && document.location.pathname.includes("/questions/")) {
        presenceData.details = "Reading a question.";
        presenceData.state = title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else {
        if (document.location.pathname == "/") {
            presenceData.state = "Main Page | Home";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.details;
        }
        else if (document.location.pathname == "/questions" &&
            pageNumber.innerText.length > 0) {
            var lastPageNumber = +lastPage;
            var lastquestionsPageNumber = +pageNumber.innerText;
            if (lastquestionsPageNumber > lastPageNumber) {
                console.log(lastPageNumber + " --- " + lastquestionsPageNumber);
                lastPage = pageNumber.innerText;
            }
            presenceData.details = "Browsing all the questions.";
            presenceData.state = "Current page: " + pageNumber.innerText + "/" + lastPage;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == "/jobs") {
            let lastPageNumber = +lastPage;
            var lastjobPageNumber = +jobPageNumber.innerText;
            if (lastjobPageNumber > lastPageNumber) {
                console.log(lastPageNumber + " --- " + lastjobPageNumber);
                lastPage = jobPageNumber.innerText;
            }
            presenceData.details = "Browsing jobs.";
            presenceData.state =
                "Current page: " + jobPageNumber.innerText + "/" + lastPage;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == "/users") {
            let lastPageNumber = +lastPage;
            var lastusersortagsPageNumber = +usersortagsPageNumber.innerText;
            if (lastusersortagsPageNumber > lastPageNumber) {
                console.log(lastPageNumber + " --- " + lastusersortagsPageNumber);
                lastPage = usersortagsPageNumber.innerText;
            }
            presenceData.details = "Browsing users.";
            presenceData.state =
                "Current page: " + usersortagsPageNumber.innerText + "/" + lastPage;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == "/tags") {
            let lastPageNumber = +lastPage;
            let lastusersortagsPageNumber = +usersortagsPageNumber.innerText;
            if (lastusersortagsPageNumber > lastPageNumber) {
                console.log(lastPageNumber + " --- " + lastusersortagsPageNumber);
                lastPage = usersortagsPageNumber.innerText;
            }
            presenceData.details = "Browsing tags.";
            presenceData.state =
                "Current page: " + usersortagsPageNumber.innerText + "/" + lastPage;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLEtBQVUsRUFDYixVQUFlLEVBQ2YsYUFBa0IsRUFDbEIscUJBQTBCLEVBQzFCLFFBQWEsRUFDYixRQUFhLEVBQ2IsV0FBZ0IsRUFDaEIsaUJBQXNCLENBQUM7QUFFeEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsSUFBSTtLQUNuQixDQUFDO0lBRUYsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUUzRCxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBRTlFLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdDLHdDQUF3QyxDQUN4QyxDQUFDO0lBRUYsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3JDLDhDQUE4QyxDQUM5QyxDQUFDO0lBRUYsUUFBUSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXZELFdBQVcsR0FBRyxRQUFRLENBQUMsZ0JBQWdC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