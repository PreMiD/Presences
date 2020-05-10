const presence = new Presence({
    clientId: "703447484025798717"
});
const elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const path = window.location.pathname;
    const presenceData = {
        largeImageKey: "honeygain",
        details: "Browsing Honeygain",
        startTimestamp: elapsed
    };
    if (document.location.hostname == "www.honeygain.com") {
        if (document.getElementById("comp-jvf30y3iinlineContent")) {
            presenceData.details = "Reading Privacy Policy";
        }
        else if (document.getElementById("comp-jvf2al4einlineContent")) {
            presenceData.details = "Reading Terms of Use";
        }
        else if (path == "/") {
            const estEarningsPos = document
                .getElementById("comp-jv3eiz6p")
                .getBoundingClientRect();
            const whatIsHGPos = document
                .getElementById("comp-jv0xq201")
                .getBoundingClientRect();
            const howItWorksPos = document
                .getElementById("comp-jvgnw4tj")
                .getBoundingClientRect();
            if (estEarningsPos.top < window.innerHeight &&
                estEarningsPos.bottom >= 0) {
                presenceData.details = "Estimating Earnings";
            }
            if (whatIsHGPos.top < window.innerHeight && whatIsHGPos.bottom >= 0) {
                presenceData.details = "Reading What is Honeygain";
            }
            if (howItWorksPos.top < window.innerHeight && howItWorksPos.bottom >= 0) {
                presenceData.details = "Reading How It Works";
            }
        }
        else if (path.includes("/faq")) {
            presenceData.details = "Reading FAQ";
        }
        else if (path.includes("/contact-us")) {
            presenceData.details = "Seeking Help From Honeygain";
        }
        else if (path.includes("/download")) {
            presenceData.details = "Downloading Honeygain";
        }
    }
    else {
        if (path == "/") {
            presenceData.details = "Viewing Dashboard";
            presenceData.state =
                "Balance: " +
                    document
                        .getElementsByClassName("sc-dnqmqq kpUaxq")[0]
                        .textContent.split("Equals to ")[1];
            presenceData.state +=
                ", Gathered Today: " +
                    document
                        .getElementsByClassName("sc-dnqmqq kpUaxq")[1]
                        .textContent.split("Equals to ")[1];
        }
        else if (path.includes("/transactions")) {
            presenceData.details = "Viewing Transaction History";
            presenceData.state =
                "Balance: " +
                    document
                        .getElementsByClassName("sc-dnqmqq kpUaxq")[1]
                        .textContent.split("Equals to ")[1];
        }
        else if (path.includes("/referrals")) {
            presenceData.details = "Viewing Referrals";
            presenceData.state =
                "Referral Code: " +
                    document.getElementsByClassName("sc-RefOD izklIM sc-bwCtUz gqfLZQ")[0].value.split("https://r.honeygain.money/")[1];
        }
        else if (path.includes("/faq")) {
            presenceData.details = "Viewing FAQ";
        }
        else if (path.includes("/profile")) {
            presenceData.details = "Viewing Profile settings";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTlDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUN0QyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7UUFDMUIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixjQUFjLEVBQUUsT0FBTztLQUN4QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsRUFBRTtRQUNyRCxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsNEJBQTRCLENBQUMsRUFBRTtZQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1NBQ2pEO2FBQU0sSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7WUFDaEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUMvQzthQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUN0QixNQUFNLGNBQWMsR0FBRyxRQUFRO2lCQUM1QixjQUFjLENBQUMsZUFBZSxDQUFDO2lCQUMvQixxQkFBcUIsRUFBRSxDQUFDO1lBQzNCLE1BQU0sV0FBVyxHQUFHLFFBQVE7aUJBQ3pCLGNBQWMsQ0FBQyxlQUFlLENBQUM7aUJBQy9CLHFCQUFxQixFQUFFLENBQUM7WUFDM0IsTUFBTSxhQUFhLEdBQUcsUUFBUTtpQkFD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