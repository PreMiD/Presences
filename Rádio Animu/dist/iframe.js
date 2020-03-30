var iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.querySelector("#playpause") !== null &&
        document.querySelector("#playpause").className == "playing") {
        iframe.send({
            iframe_radio: {
                artist: document.querySelector(".status").textContent.split(" - ")[0],
                title: document.querySelector(".status").textContent.split(" - ")[1],
                playing: true
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbEMsSUFDQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUk7UUFDN0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUMxRDtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDWCxZQUFZLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxPQUFPLEVBQUUsSUFBSTthQUNiO1NBQ0QsQ0FBQyxDQUFDO0tBQ0g7QUFDRixDQUFDLENBQUMsQ0FBQyJ9