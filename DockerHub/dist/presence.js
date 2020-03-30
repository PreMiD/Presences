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
    
});
var browsingStamp = Math.floor(Date.now() / 1000);
var searchItems = {
    "arch": "architecture",
    "edition": "offering",
    "os": "operating_system",
    "page": "page",
    "query": "q",
    "tab": "tab",
    "type": "type"
};
var language;
var match;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "MISSING",
        largeImageKey: "logo"
    };
    language = window.navigator.language;
    if (document.location.host == "hub.docker.com") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.match(/^\/(repositories)?$/)) {
            presenceData.details = "Bowsing own repositories";
        }
        else if (document.location.pathname.match(/^\/settings/)) {
            presenceData.details = `On settings page`;
        }
        else if (document.location.pathname.match(/^\/search/)) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            var query = params.get(searchItems.query);
            var type = params.get(searchItems.type);
            type = type && decodeURIComponent(type) || `image`;
            var edition = params.get(searchItems.edition);
            edition = edition && decodeURIComponent(edition) || ``;
            var os = params.get(searchItems.os);
            os = os && decodeURIComponent(os) || null;
            var arch = params.get(searchItems.arch);
            arch = arch && decodeURIComponent(arch) || null;
            presenceData.details = `Searching for${(query ? `: ${query}` : ` ${edition} ${type}s`)}`;
            if (query && edition)
                presenceData.state = `${capitalize(edition)} ${type}s`;
            if (os || arch)
                presenceData.state = `${os ? `${capitalize(os)} ` : ``}${arch ? arch.toUpperCase() : ""}`;
        }
        else if (document.location.pathname.match(/^\/orgs$/)) {
            presenceData.details = `Browsing organizations`;
        }
        else if (match = document.location.pathname.match(/^\/orgs\/([^\/]+)(?:\/([^\/]+))?/)) {
            var name = match[1];
            var tab = match[2];
            tab = tab || `members`;
            presenceData.details = `On org ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if (match = document.location.pathname.match(/^\/_\/([^?]+)/)) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            var name = match[1];
            var tab = params.get(searchItems.tab);
            presenceData.details = `On image ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if (match = document.location.pathname.match(/^\/r\/([^\/]+)\/([^\/]+)(?:\/([^?]+))?/)) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            var owner = match[1];
            var name = match[2];
            var tab = match[3];
            var page = params.get(searchItems.page);
            presenceData.details = `On image ${tab ? tab : ``} page${page ? ` ${page}` : ``}`;
            presenceData.state = `${owner}/${name}`;
        }
        else if (match = document.location.pathname.match(/^\/layers\/([^\/]+)\/([^\/]+)\/([^\/]+)/)) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            var context = params.get("context");
            if (context && context == "repo") {
                presenceData.details = `On personal repository`;
                presenceData.state = `Image history`;
            }
            else {
                var owner = match[1], name = match[2], tag = match[3];
                var selector = document.querySelector('.Select-value') || null;
                var arch = selector && selector.textContent || null;
                presenceData.details = `On image history`;
                presenceData.state = `${owner}/${name}:${tag} ${(arch ? arch : ``)}`;
            }
        }
        else if (match = document.location.pathname.match(/^\/u\/([^\/]+)(?:\/([^\/]+))?/)) {
            var user = match[1];
            var tab = match[2] || `repositories`;
            presenceData.details = `On profile ${tab} page`;
            presenceData.state = user;
        }
        else if (document.location.pathname.match(/^\/repository\/create/)) {
            presenceData.details = `Creating repository`;
        }
        else if (match = document.location.pathname.match(/^\/repository(?:\/([^\/?]+))+/)) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            presenceData.details = `On personal repository`;
            var tab = match[1];
            var page = params.get(searchItems.page);
            var selector = document.querySelector('#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a');
            var breadcrum = selector && selector.textContent || null;
            if (breadcrum && breadcrum.match(tab)) {
                tab = `general`;
            }
            else if (document.location.pathname.match(/\/builds\//)) {
                tab = `builds`;
            }
            presenceData.state = `${capitalize(tab)}${page ? ` ${page}` : ``}`;
        }
        else if (match = document.location.pathname.match(/^\/support\/(?:(doc)?(contact)?)/)) {
            var doc = match[1] && true;
            var contact = match[2] && true;
            presenceData.details = `Reading FAQ`;
            if (doc) {
                var selector = document.querySelector('#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span') || null;
                presenceData.state = selector && selector.textContent || null;
            }
            else if (contact) {
                presenceData.details = `Contact page`;
            }
        }
        else if (document.location.pathname.match(/^\/billing/)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFBO0FBQy9DLElBQUksV0FBVyxHQUFHO0lBQ2hCLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsTUFBTSxFQUFFLE1BQU07SUFDZCxPQUFPLEVBQUUsR0FBRztJQUNaLEtBQUssRUFBRSxLQUFLO0lBQ1osTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFBO0FBRUQsSUFBSSxRQUFnQixDQUFBO0FBQ3BCLElBQUksS0FBb0IsQ0FBQTtBQUV4QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFFbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUE7SUFFRCxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUE7SUFFcEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxnQkFBZ0IsRUFBRTtRQUM5QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUUzQyxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUE7U0FFbEQ7YUFBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENB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