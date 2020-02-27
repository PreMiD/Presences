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
    clientId: "634299110782140416"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "hepboat"
    };
    if (document.location.pathname.startsWith("/guilds/")) {
        var pageTitle = document.querySelector(".panel-heading").textContent;
        if (pageTitle.startsWith(" Guild Weekly Message Throughput")) {
            var pageTitle = "Guild Stats";
        }
        else if (pageTitle.startsWith(" Guild Banner")) {
            var pageTitle = "Guild Info";
        }
        var guildName = document.querySelector("#side-menu > li.active-guild.active > a > div");
        data.details = pageTitle;
        if (guildName) {
            data.state = guildName.getAttribute("data-original-title");
        }
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else {
        data.details = "Dashboard";
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxJQUFJLElBQUksR0FBaUI7UUFDckIsYUFBYSxFQUFFLFNBQVM7S0FDM0IsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25ELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDckUsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzlDLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQztTQUNoQztRQUVELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLCtDQUErQyxDQUNsRCxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7U0FBTTtRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7QUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=