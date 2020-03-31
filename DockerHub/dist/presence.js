var presence = new Presence({
    clientId: "685611188306051093"
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
presence.on("UpdateData", async () => {
    var url, params, selector, arch, owner, name, page, tab;
    let presenceData = {
        details: "Unknown page",
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
            url = new URL(document.location.href);
            params = url.searchParams;
            var query = params.get(searchItems.query);
            var type = params.get(searchItems.type);
            type = type && decodeURIComponent(type) || `image`;
            var edition = params.get(searchItems.edition);
            edition = edition && decodeURIComponent(edition) || ``;
            var os = params.get(searchItems.os);
            os = os && decodeURIComponent(os) || null;
            arch = params.get(searchItems.arch);
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
            name = match[1];
            tab = match[2];
            tab = tab || `members`;
            presenceData.details = `On org ${tab}page`;
            presenceData.state = `${name}`;
        }
        else if (match = document.location.pathname.match(/^\/_\/([^?]+)/)) {
            url = new URL(document.location.href);
            params = url.searchParams;
            name = match[1];
            tab = params.get(searchItems.tab);
            presenceData.details = `On image ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if (match = document.location.pathname.match(/^\/r\/([^\/]+)\/([^\/]+)(?:\/([^?]+))?/)) {
            url = new URL(document.location.href);
            params = url.searchParams;
            owner = match[1];
            name = match[2];
            tab = match[3];
            page = params.get(searchItems.page);
            presenceData.details = `On image ${tab ? tab : ``} page${page ? ` ${page}` : ``}`;
            presenceData.state = `${owner}/${name}`;
        }
        else if (match = document.location.pathname.match(/^\/layers\/([^\/]+)\/([^\/]+)\/([^\/]+)/)) {
            url = new URL(document.location.href);
            params = url.searchParams;
            var context = params.get("context");
            if (context && context == "repo") {
                presenceData.details = `On personal repository`;
                presenceData.state = `Image history`;
            }
            else {
                owner = match[1], name = match[2];
                var tag = match[3];
                selector = document.querySelector('.Select-value') || null;
                arch = selector && selector.textContent || null;
                presenceData.details = `On image history`;
                presenceData.state = `${owner}/${name}:${tag} ${(arch ? arch : ``)}`;
            }
        }
        else if (match = document.location.pathname.match(/^\/u\/([^\/]+)(?:\/([^\/]+))?/)) {
            var user = match[1];
            tab = match[2] || `repositories`;
            presenceData.details = `On profile ${tab} page`;
            presenceData.state = user;
        }
        else if (document.location.pathname.match(/^\/repository\/create/)) {
            presenceData.details = `Creating repository`;
        }
        else if (match = document.location.pathname.match(/^\/repository(?:\/([^\/?]+))+/)) {
            url = new URL(document.location.href);
            params = url.searchParams;
            presenceData.details = `On personal repository`;
            tab = match[1];
            page = params.get(searchItems.page);
            selector = document.querySelector('#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a');
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
                selector = document.querySelector('#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span') || null;
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
});
function PMD_error(message) {
    var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFBO0FBQy9DLElBQUksV0FBVyxHQUFHO0lBQ2hCLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsTUFBTSxFQUFFLE1BQU07SUFDZCxPQUFPLEVBQUUsR0FBRztJQUNaLEtBQUssRUFBRSxLQUFLO0lBQ1osTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFBO0FBRUQsSUFBSSxRQUFnQixDQUFBO0FBQ3BCLElBQUksS0FBb0IsQ0FBQTtBQUV4QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEdBQVEsRUFBRSxNQUF1QixFQUFFLFFBQWMsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsR0FBVyxDQUFBO0lBRTNILElBQUksWUFBWSxHQUFpQjtRQUMvQixPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFBO0lBRUQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFBO0lBRXBDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksZ0JBQWdCLEVBQUU7UUFDOUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFFM0MsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUMx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