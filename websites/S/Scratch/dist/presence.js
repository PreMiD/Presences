const presence = new Presence({
    clientId: "630778865643552779"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "scratchlogo"
    };
    if (window.location.href.toLowerCase().includes("scratch.mit.edu")) {
        if (window.location.pathname === "") {
            presenceData.details = "Community:";
            presenceData.state = "Viewing public projects";
        }
        if (window.location.pathname === "/") {
            presenceData.details = "Community:";
            presenceData.state = "Viewing public projects";
        }
        if (window.location.pathname.toLowerCase().includes("/projects/editor")) {
            presenceData.details = "Editing a project:";
            if (window.location.pathname
                .toLowerCase()
                .includes("/projects/editor/?tutorial=getstarted")) {
                presenceData.state = "Tutorial";
            }
            else if (window.location.pathname
                .toLowerCase()
                .includes("/projects/editor/?tutorial=all")) {
                presenceData.details = "Viewing projects:";
                presenceData.state = "Tutorials";
            }
            else if (window.location.pathname
                .toLowerCase()
                .includes("/projects/editor?tutorial=all")) {
                presenceData.details = "Viewing projects:";
                presenceData.state = "Tutorials";
            }
        }
        else if (window.location.pathname.toLowerCase().includes("/explore")) {
            if (window.location.pathname.toLowerCase().includes("/explore/projects")) {
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/projects/all")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Projects - All";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/projects/animations")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Projects - Animations";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/projects/art")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Projects - Art";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/projects/games")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Projects - Games";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/projects/music")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Projects - Music";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/projects/stories")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Projects - Stories";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/projects/tutorials")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Projects - Tutorials";
                }
            }
            if (window.location.pathname.toLowerCase().includes("/explore/studios")) {
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/studios/all")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Studios - All";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/studios/animations")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Studios - Animations";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/studios/art")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Studios - Art";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/studios/games")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Studios - Games";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/studios/music")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Studios - Music";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/studios/stories")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Studios - Stories";
                }
                if (window.location.pathname
                    .toLowerCase()
                    .includes("/explore/studios/tutorials")) {
                    presenceData.details = "Explore:";
                    presenceData.state = "Studios - Tutorials";
                }
            }
        }
        else if (window.location.pathname.toLowerCase().includes("/ideas")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Ideas";
        }
        else if (window.location.pathname.toLowerCase().includes("/starter-projects")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Starter Projects";
        }
        else if (window.location.pathname.toLowerCase().includes("/parents")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Parents";
        }
        else if (window.location.pathname.toLowerCase().includes("/educators")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Educators";
        }
        else if (window.location.pathname.toLowerCase().includes("/developers")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Developers";
        }
        else if (window.location.pathname.toLowerCase().includes("/credits")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Credits";
        }
        else if (window.location.pathname.toLowerCase().includes("/jobs")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Jobs";
        }
        else if (window.location.pathname.toLowerCase().includes("/community_guidelines")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Community Guidelines";
        }
        else if (window.location.pathname.toLowerCase().includes("/discuss")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Discussion";
        }
        else if (window.location.pathname.toLowerCase().includes("/statistics")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Statistics";
        }
        else if (window.location.pathname.toLowerCase().includes("/info/faq")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Help, Info & FAQ";
        }
        else if (window.location.pathname.toLowerCase().includes("/download")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Download offline editor";
        }
        else if (window.location.pathname.toLowerCase().includes("/contact-us")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Contact us";
        }
        else if (window.location.pathname.toLowerCase().includes("/store")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Store";
        }
        else if (window.location.pathname.toLowerCase().includes("/terms_of_use")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Terms and conditions";
        }
        else if (window.location.pathname.toLowerCase().includes("/privacy_policy")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Privacy Policy";
        }
        else if (window.location.pathname.toLowerCase().includes("/dmca")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "DMCA";
        }
        else if (window.location.pathname.toLowerCase().includes("/conference")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Scratch Conference";
        }
    }
    else {
        presenceData.details = "Viewing A Page:";
        presenceData.state = document.title
            .replace("Scratch - ", "")
            .replace(" - Scratch", "")
            .replace("Scratch", "");
    }
    if (window.location.hostname.toLowerCase().includes("scratchfoundation.org")) {
        if (window.location.pathname.toLowerCase().includes("/media-kit")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Press";
        }
        else {
            presenceData.details = "Viewing page:";
            presenceData.state = "Scratch Foundation";
        }
    }
    if (window.location.hostname.toLowerCase().includes("scratch-wiki.info")) {
        presenceData.details = "Viewing page:";
        presenceData.state = "Wiki";
    }
    if (window.location.hostname.toLowerCase().includes("scratchjr.org")) {
        presenceData.details = "Viewing page:";
        presenceData.state = "Scratch JR";
    }
    if (window.location.hostname.toLowerCase().includes("donationpay.org")) {
        if (window.location.pathname.toLowerCase().includes("/scratchfoundation")) {
            presenceData.details = "Viewing page:";
            presenceData.state = "Donate";
        }
    }
    if (window.location.hostname.toLowerCase().includes("scratched.gse.harvard.edu")) {
        presenceData.details = "Viewing page:";
        presenceData.state = "Scratch ED";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLGFBQWE7S0FDN0IsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDbEUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFDbkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7WUFDcEMsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztTQUNoRDtRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcseUJBQXlCLENBQUM7U0FDaEQ7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3ZFLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsSUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVE7aUJBQ3JCLFdBQVcsRUFBRTtpQkFDYixRQUFRLENBQUMsdUNBQXVDLENBQUMsRUFDcEQ7Z0JBQ0EsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7YUFDakM7aUJBQU0sSUFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLFFB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