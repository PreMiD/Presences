var presence = new Presence({
    clientId: "685611188306051093"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var searchItems = {
    arch: "architecture",
    edition: "offering",
    os: "operating_system",
    page: "page",
    query: "q",
    tab: "tab",
    type: "type"
};
const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
var match;
presence.on("UpdateData", async () => {
    var url, params, selector, arch, owner, name, page, tab;
    const presenceData = {
        details: "Unknown page",
        largeImageKey: "logo"
    };
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
            type = (type && decodeURIComponent(type)) || `image`;
            var edition = params.get(searchItems.edition);
            edition = (edition && decodeURIComponent(edition)) || ``;
            var os = params.get(searchItems.os);
            os = (os && decodeURIComponent(os)) || null;
            arch = params.get(searchItems.arch);
            arch = (arch && decodeURIComponent(arch)) || null;
            presenceData.details = `Searching for${query ? `: ${query}` : ` ${edition} ${type}s`}`;
            if (query && edition)
                presenceData.state = `${capitalize(edition)} ${type}s`;
            if (os || arch)
                presenceData.state = `${os ? `${capitalize(os)} ` : ``}${arch ? arch.toUpperCase() : ""}`;
        }
        else if (document.location.pathname.match(/^\/orgs$/)) {
            presenceData.details = `Browsing organizations`;
        }
        else if ((match = document.location.pathname.match(/^\/orgs\/([^/]+)(?:\/([^/]+))?/))) {
            name = match[1];
            tab = match[2];
            tab = tab || `members`;
            presenceData.details = `On org ${tab}page`;
            presenceData.state = `${name}`;
        }
        else if ((match = document.location.pathname.match(/^\/_\/([^?]+)/))) {
            url = new URL(document.location.href);
            params = url.searchParams;
            name = match[1];
            tab = params.get(searchItems.tab);
            presenceData.details = `On image ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if ((match = document.location.pathname.match(/^\/r\/([^/]+)\/([^/]+)(?:\/([^?]+))?/))) {
            url = new URL(document.location.href);
            params = url.searchParams;
            owner = match[1];
            name = match[2];
            tab = match[3];
            page = params.get(searchItems.page);
            presenceData.details = `On image ${tab ? tab : ``} page${page ? ` ${page}` : ``}`;
            presenceData.state = `${owner}/${name}`;
        }
        else if ((match = document.location.pathname.match(/^\/layers\/([^/]+)\/([^/]+)\/([^/]+)/))) {
            url = new URL(document.location.href);
            params = url.searchParams;
            var context = params.get("context");
            if (context && context == "repo") {
                presenceData.details = `On personal repository`;
                presenceData.state = `Image history`;
            }
            else {
                (owner = match[1]), (name = match[2]);
                var tag = match[3];
                selector = document.querySelector(".Select-value") || null;
                arch = (selector && selector.textContent) || null;
                presenceData.details = `On image history`;
                presenceData.state = `${owner}/${name}:${tag} ${arch ? arch : ``}`;
            }
        }
        else if ((match = document.location.pathname.match(/^\/u\/([^/]+)(?:\/([^/]+))?/))) {
            var user = match[1];
            tab = match[2] || `repositories`;
            presenceData.details = `On profile ${tab} page`;
            presenceData.state = user;
        }
        else if (document.location.pathname.match(/^\/repository\/create/)) {
            presenceData.details = `Creating repository`;
        }
        else if ((match = document.location.pathname.match(/^\/repository(?:\/([^/?]+))+/))) {
            url = new URL(document.location.href);
            params = url.searchParams;
            presenceData.details = `On personal repository`;
            tab = match[1];
            page = params.get(searchItems.page);
            selector = document.querySelector("#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a");
            var breadcrum = (selector && selector.textContent) || null;
            if (breadcrum && breadcrum.match(tab)) {
                tab = `general`;
            }
            else if (document.location.pathname.match(/\/builds\//)) {
                tab = `builds`;
            }
            presenceData.state = `${capitalize(tab)}${page ? ` ${page}` : ``}`;
        }
        else if ((match = document.location.pathname.match(/^\/support\/(?:(doc)?(contact)?)/))) {
            var doc = match[1] && true;
            var contact = match[2] && true;
            presenceData.details = `Reading FAQ`;
            if (doc) {
                selector =
                    document.querySelector("#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span") || null;
                presenceData.state = (selector && selector.textContent) || null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBVyxHQUFHO0lBQ2hCLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxVQUFVO0lBQ25CLEVBQUUsRUFBRSxrQkFBa0I7SUFDdEIsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsR0FBRztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsSUFBSSxFQUFFLE1BQU07Q0FDYixDQUFDO0FBTUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFTLEVBQVUsRUFBRTtJQUN2QyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUM7QUFFRixJQUFJLEtBQW9CLENBQUM7QUFFekIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxHQUFRLEVBQ1YsTUFBdUIsRUFDdkIsUUFBYyxFQUNkLElBQVksRUFDWixLQUFhLEVBQ2IsSUFBWSxFQUNaLElBQVksRUFDWixHQUFXLENBQUM7SUFFZCxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGNBQWM7UUFDdkIsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksZ0JBQWdCLEVBQUU7UUFDOUMsWUFBWSxDQUFDLGNBQWMsR0FB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