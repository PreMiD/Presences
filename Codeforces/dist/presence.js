var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "639889063469645854"
}), startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "large_img",
        startTimestamp
    };
    const url = window.location.href;
    if (url.includes("/submit")) {
        presenceData.details = "Submitting code";
    }
    else if (url.includes("/contest/") || url.includes("/gym/") || url.includes("/problem/")) {
        var tokens = document.title.split("-");
        if (url.includes("/problem/")) {
            presenceData.details = "Problem " + document.getElementsByClassName("title")[0].innerText.replace(".", " -");
            var val = 0;
            if (url.includes("/group")) {
                val = 1;
            }
            tokens[1] = document.getElementsByTagName("th")[val].innerText;
        }
        else {
            presenceData.details = tokens[0].trim();
        }
        presenceData.state = tokens.join("-").replace(tokens[0] + "-", "").replace("- Codeforces", "");
    }
    else if (url.includes("/group/")) {
        presenceData.details = "Viewing " + document.title.replace(" - Codeforces", "");
        presenceData.state = document.getElementsByTagName("th")[0].innerText;
    }
    else if (url.includes("/problemset")) {
        presenceData.details = "Browsing Problemset";
        if (url.includes("?")) {
            presenceData.details = "Searching...";
            presenceData.smallImageKey = "search";
        }
    }
    else if (url.includes("/blog/entry/")) {
        const author = document.getElementsByClassName("info")[0].outerText.split(",")[0].substring(3);
        presenceData.state = author + "'s blog entry";
        presenceData.details = document.title.replace(" - Codeforces", "");
    }
    else if (url.includes("/profile/")) {
        presenceData.details = "Viewing someone's profile";
    }
    else {
        presenceData.state = "Browsing";
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFLLFFBQVEsR0FBYyxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFDRixjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDL0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsV0FBVztRQUMxQixjQUFjO0tBQ2pCLENBQUM7SUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVuQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQzNCO1FBQ0UsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQTtLQUN6QztTQUVJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQ3hGO1FBQ0UsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUM3QjtZQUNFLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUMxRyxJQUFJLEdBQUcsR0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQzFCO2dCQUNDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDVDtZQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ2hFO2FBRUQ7WUFDQSxZQUFZLENBQUMsT0FBTyxHQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QztRQUNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzVGO1NBRUksSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNoQztRQUNFLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUM5RSxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDdkU7U0FFSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQ3BDO1FBQ0UsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtRQUM1QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQ3JCO1lBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDdEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7U0FDdkM7S0FDQTtTQUVJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFDckM7UUFDRSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0YsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUMsZUFBZSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ25FO1NBRUksSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUNsQztRQUNFLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUE7S0FDbkQ7U0FHRDtRQUNFLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO0lBQ0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9