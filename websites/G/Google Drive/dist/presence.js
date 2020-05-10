const presence = new Presence({
    clientId: "630494559956107285"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "drivelogo"
    }, path = document.location.pathname.toLowerCase();
    if (path.startsWith("/drive/folders")) {
        presenceData.details = "Inside folder :";
        presenceData.state = document.title.replace("- Google Drive", "");
    }
    else if (path.startsWith("/drive/computer")) {
        presenceData.state = "Viewing linked computers";
    }
    else if (path.startsWith("/drive/shared-with-me")) {
        presenceData.state = "Viewing shared files";
    }
    else if (path.startsWith("/drive/recent")) {
        presenceData.state = "Looking through recently updated files";
    }
    else if (path.startsWith("/drive/starred")) {
        presenceData.state = "Looking through starred files";
    }
    else if (path.startsWith("/drive/trash")) {
        presenceData.state = "Viewing previously deleted files";
    }
    else if (path.startsWith("/drive/backups")) {
        presenceData.state = "Going through backups";
    }
    else if (path.startsWith("/drive/quota")) {
        presenceData.state = "Viewing storage quota";
    }
    else if (path.startsWith("/file/")) {
        const main = document.title.split("."), fileName = main.length == 2 ? main[0] : main.slice(0, -1).join("").toString(), fileExtension = main.slice(-1).toString().replace("- Google Drive", "");
        presenceData.details = `Viewing a file of type ${fileExtension.toUpperCase()} :`;
        presenceData.state = fileName;
    }
    else {
        presenceData.state = "Browsing...";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFdBQVc7S0FDM0IsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFbEQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ25FO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQztLQUNqRDtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1FBQ25ELFlBQVksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7S0FDN0M7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyx3Q0FBd0MsQ0FBQztLQUMvRDtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsK0JBQStCLENBQUM7S0FDdEQ7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxrQ0FBa0MsQ0FBQztLQUN6RDtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7S0FDOUM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQztLQUM5QztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDcEMsUUFBUSxHQUNOLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUNwRSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUxRSxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQztRQUNqRixZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztLQUMvQjtTQUFNO1FBQ0wsWUFBWSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7S0FDcEM7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=