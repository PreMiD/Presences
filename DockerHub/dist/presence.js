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
var language;
var match;
presence.on("UpdateData", async () => {
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
            type = (type && decodeURIComponent(type)) || `image`;
            var edition = params.get(searchItems.edition);
            edition = (edition && decodeURIComponent(edition)) || ``;
            var os = params.get(searchItems.os);
            os = (os && decodeURIComponent(os)) || null;
            var arch = params.get(searchItems.arch);
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
        else if ((match = document.location.pathname.match(/^\/orgs\/([^\/]+)(?:\/([^\/]+))?/))) {
            var name = match[1];
            var tab = match[2];
            tab = tab || `members`;
            presenceData.details = `On org ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if ((match = document.location.pathname.match(/^\/_\/([^?]+)/))) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            var name = match[1];
            var tab = params.get(searchItems.tab);
            presenceData.details = `On image ${tab ? `${tab} ` : ``}page`;
            presenceData.state = `${name}`;
        }
        else if ((match = document.location.pathname.match(/^\/r\/([^\/]+)\/([^\/]+)(?:\/([^?]+))?/))) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            var owner = match[1];
            var name = match[2];
            var tab = match[3];
            var page = params.get(searchItems.page);
            presenceData.details = `On image ${tab ? tab : ``} page${page ? ` ${page}` : ``}`;
            presenceData.state = `${owner}/${name}`;
        }
        else if ((match = document.location.pathname.match(/^\/layers\/([^\/]+)\/([^\/]+)\/([^\/]+)/))) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            var context = params.get("context");
            if (context && context == "repo") {
                presenceData.details = `On personal repository`;
                presenceData.state = `Image history`;
            }
            else {
                var owner = match[1], name = match[2], tag = match[3];
                var selector = document.querySelector(".Select-value") || null;
                var arch = (selector && selector.textContent) || null;
                presenceData.details = `On image history`;
                presenceData.state = `${owner}/${name}:${tag} ${arch ? arch : ``}`;
            }
        }
        else if ((match = document.location.pathname.match(/^\/u\/([^\/]+)(?:\/([^\/]+))?/))) {
            var user = match[1];
            var tab = match[2] || `repositories`;
            presenceData.details = `On profile ${tab} page`;
            presenceData.state = user;
        }
        else if (document.location.pathname.match(/^\/repository\/create/)) {
            presenceData.details = `Creating repository`;
        }
        else if ((match = document.location.pathname.match(/^\/repository(?:\/([^\/?]+))+/))) {
            var url = new URL(document.location.href);
            var params = url.searchParams;
            presenceData.details = `On personal repository`;
            var tab = match[1];
            var page = params.get(searchItems.page);
            var selector = document.querySelector("#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a");
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
                var selector = document.querySelector("#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span") || null;
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
function PMD_error(message) {
    var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBVyxHQUFHO0lBQ2pCLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxVQUFVO0lBQ25CLEVBQUUsRUFBRSxrQkFBa0I7SUFDdEIsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsR0FBRztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsSUFBSSxFQUFFLE1BQU07Q0FDWixDQUFDO0FBRUYsSUFBSSxRQUFnQixDQUFDO0FBQ3JCLElBQUksS0FBb0IsQ0FBQztBQUV6QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsT0FBTyxFQUFFLFNBQVM7UUFDbEIsYUFBYSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUVGLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUVyQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLGdCQUFnQixFQUFFO1FBQy9DLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztTQUNsRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGFB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