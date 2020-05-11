var presence = new Presence({
    clientId: "610123745033584651"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, pageNumber, jobPageNumber, usersortagsPageNumber, allPages, lastPage, jobLastPage, questionsLastPage;
presence.on("UpdateData", async () => {
    const presenceData = {
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
            presenceData.state =
                "Current page: " + pageNumber.innerText + "/" + lastPage;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == "/jobs") {
            const lastPageNumber = +lastPage;
            const lastjobPageNumber = +jobPageNumber.innerText;
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
            const lastPageNumber = +lastPage;
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
            const lastPageNumber = +lastPage;
            const lastusersortagsPageNumber = +usersortagsPageNumber.innerText;
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksS0FBVSxFQUNaLFVBQWUsRUFDZixhQUFrQixFQUNsQixxQkFBMEIsRUFDMUIsUUFBYSxFQUNiLFFBQWEsRUFDYixXQUFnQixFQUNoQixpQkFBc0IsQ0FBQztBQUV6QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGNBQWM7UUFDdkIsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFFM0QsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUU5RSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qyx3Q0FBd0MsQ0FDekMsQ0FBQztJQUVGLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyw4Q0FBOEMsQ0FDL0MsQ0FBQztJQUVGLFFBQVEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUV2RCxXQUFXLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFNUQsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFaEUsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEs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