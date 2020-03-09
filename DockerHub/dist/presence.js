var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "685611188306051093",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
var searchItems = {
    "query": "q",
    "type": "type",
    "edition": "offering",
    "arch": "architecture",
    "os": "operating_system"
};
var language;
var match;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "TODO",
        largeImageKey: "logo"
    };
    language = window.navigator.language;
    if (document.location.hostname == "hub.docker.com") {
        presenceData.startTimestamp = browsingStamp;
        if (document.URL.match(/hub.docker.com\/(repositories)?$/)) {
            presenceData.details = "Bowsing own repositories";
        }
        else if (document.URL.match(/hub.docker.com\/settings/)) {
            presenceData.details = `On settings page`;
        }
        else if (document.URL.match(/search\?.*/)) {
            var type = document.URL.match(`${searchItems['type']}=([^&]+)`);
            type = type && decodeURIComponent(type[1]) || `image`;
            var edition = document.URL.match(`${searchItems['edition']}=([^&]+)`);
            edition = edition && decodeURIComponent(edition[1]) || ``;
            var query = document.URL.match(`${searchItems['query']}=([^&]+)`);
            query = query && decodeURIComponent(query[1]) || null;
            var os = document.URL.match(`${searchItems['os']}=([^&]+)`);
            os = os && decodeURIComponent(os[1]) || null;
            var arch = document.URL.match(`${searchItems['arch']}=([^&]+)`);
            arch = arch && decodeURIComponent(arch[1]) || null;
            presenceData.details = `Searching for${(query ? `: ${query}` : ` ${edition} ${type}s`)}`;
            if (os || arch)
                presenceData.state = `${os ? `${capitalize(os)} ` : ``}${arch ? arch.toUpperCase() : ""}`;
        }
        else if (document.URL.match(/\/orgs$/)) {
            presenceData.details = `Browsing organizations`;
        }
        else if (match = document.URL.match(/\/orgs\/([^\/]+)(?:\/([^\/]+))?/)) {
            var name = match[1];
            var tab = match[2];
            tab = tab || `members`;
            presenceData.details = `On org ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if (match = document.URL.match(/\/_\/([^?]+)(?:\?tab=(.+))?/)) {
            var name = match[1];
            var tab = match[2];
            presenceData.details = `On image ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if (match = document.URL.match(/\/r\/([^\/]+)\/([^\/]+)(?:(?:\/([^?]+))(?:\?page=(.+))?)?/)) {
            var owner = match[1], name = match[2], tab = match[3], page = match[4];
            presenceData.details = `On image ${tab ? tab : ``} page${page ? ` ${page}` : ``}`;
            presenceData.state = `${owner}/${name}`;
        }
        else if (match = document.URL.match(/\/layers\/([^\/]+)\/([^\/]+)\/([^\/]+)/)) {
            var owner = match[1], name = match[2], tag = match[3], arch = null;
            arch = document.querySelector('.Select-value').textContent;
            presenceData.details = `On image history`;
            presenceData.state = `${owner}/${name}:${tag} ${arch}`;
        }
        else if (match = document.URL.match(/\/u\/([^\/]+)(?:\/([^\/]+))?/)) {
            var user = match[1];
            var tab = match[2] || `repositories`;
            presenceData.details = `On profile ${tab} page`;
            presenceData.state = user;
        }
        else if (document.URL.match(/repository\/create/)) {
            presenceData.details = `Creating repository`;
        }
        else if (match = document.URL.match(/repository(?:\/([^\/?]+))+(?:\?page=(\d+))?/)) {
            presenceData.details = `On personal repository`;
            var tab = match[1];
            var page = match[3] || null;
            var selector = document.querySelector('#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a');
            var breadcrum = selector && selector.textContent || null;
            if (breadcrum && breadcrum.match(tab)) {
                tab = `general`;
            }
            else if (document.URL.match(/\/builds\//)) {
                tab = `builds`;
            }
            presenceData.state = `${capitalize(tab)}${page ? ` ${page}` : ``}`;
        }
        else if (match = document.URL.match(/support\/(?:(doc)?(contact)?)/)) {
            presenceData.details = `Reading FAQ`;
            if (match[1]) {
                presenceData.state = document.querySelector('#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span').textContent;
            }
            else if (match[2]) {
                presenceData.details = `Contact page`;
            }
        }
        else if (document.URL.match(/hub.docker.com\/billing/)) {
            presenceData.details = `Checking billing info`;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
function PMD_error(message) {
    var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hELElBQUksV0FBVyxHQUFHO0lBQ2hCLE9BQU8sRUFBRSxHQUFHO0lBQ1osTUFBTSxFQUFFLE1BQU07SUFDZCxTQUFTLEVBQUUsVUFBVTtJQUNyQixNQUFNLEVBQUUsY0FBYztJQUN0QixJQUFJLEVBQUUsa0JBQWtCO0NBQ3pCLENBQUE7QUFDRCxJQUFJLFFBQWEsQ0FBQTtBQUNqQixJQUFJLEtBQVUsQ0FBQTtBQUVkLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsT0FBTyxFQUFFLE1BQU07UUFDZixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBR3JDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZ0JBQWdCLEVBQUU7UUFDbEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFNUMsSUFBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFO1lBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUE7U0FFbEQ7YUFBTSxJQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7WUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FB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