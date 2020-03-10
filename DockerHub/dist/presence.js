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
        details: "TODO",
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
            if (context && context == "explore") {
                var owner = match[1], name = match[2], tag = match[3];
                var selector = document.querySelector('.Select-value') || null;
                var arch = selector && selector.textContent || null;
                presenceData.details = `On image history`;
                presenceData.state = `${owner}/${name}:${tag} ${(arch ? arch : ``)}`;
            }
            else {
                presenceData.details = `On personal repository`;
                presenceData.state = `Image history`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFBO0FBQy9DLElBQUksV0FBVyxHQUFHO0lBQ2hCLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsTUFBTSxFQUFFLE1BQU07SUFDZCxPQUFPLEVBQUUsR0FBRztJQUNaLEtBQUssRUFBRSxLQUFLO0lBQ1osTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFBO0FBRUQsSUFBSSxRQUFnQixDQUFBO0FBQ3BCLElBQUksS0FBb0IsQ0FBQTtBQUV4QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFFbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLE9BQU8sRUFBRSxNQUFNO1FBQ2YsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQTtJQUVELFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQTtJQUVwQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLGdCQUFnQixFQUFFO1FBQzlDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBRTNDLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTtTQUVsRDthQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FB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