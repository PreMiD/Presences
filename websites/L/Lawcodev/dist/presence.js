const presence = new Presence({
    clientId: "651439039156715531"
});
presence.on("UpdateData", () => {
    const doc = document.location, path = doc.pathname, route = path.split("/"), browsingStamp = Math.floor(Date.now() / 1000), presenceData = {
        largeImageKey: "lawco",
        startTimestamp: browsingStamp
    };
    if (path === "/") {
        presenceData.details = "Navegando por la página principal...";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "login") {
        presenceData.details = "Entrando a la cuenta";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "logout") {
        presenceData.details = "Saliendo de la sesión";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "register") {
        presenceData.details = "Registrando una nueva cuenta";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "blogs") {
        presenceData.details = "Viendo los artículos";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "my-blogs") {
        presenceData.details = "Viendo sus artículos";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "read-blog") {
        presenceData.details = "Viendo un artículo";
        presenceData.state = `Artículo: ${document.querySelector("h1").innerHTML.length > 15
            ? document.querySelector("h1").innerHTML.slice(0, 15)
            : document.querySelector("h1").innerHTML}...`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "create-blog") {
        presenceData.details = "Creando un blog";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "messages") {
        presenceData.details = "Chateando";
        presenceData.state = `Con: ${document.querySelector(".list-group-item").childNodes[5].childNodes[0]
            .textContent}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "groups") {
        presenceData.details = "Viendo sus grupos";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "suggested-groups") {
        presenceData.details = "Viendo sugerencias de grupos";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "create-group") {
        presenceData.details = "Creando un grupo";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "pages") {
        presenceData.details = "Viendo las páginas";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "albums") {
        presenceData.details = "Viendo los álbumes";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "create-album") {
        presenceData.details = "Creando un álbum";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "post") {
        presenceData.details = "Viendo un post";
        presenceData.state = `De ${document.querySelector("b").innerHTML}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (route[1] === "setting") {
        presenceData.details = "Cambiando configuraciones";
        presenceData.state = `${route[2][0].toUpperCase().includes("-")
            ? `${route[2][0].toUpperCase().replace(/-+/g, " ") + route[2].slice(1)}`
            : `${route[2][0].toUpperCase() + route[2].slice(1)}`}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else {
        try {
            presenceData.details = "Viendo un usuario o página";
            presenceData.state = `${document.querySelectorAll(".title")[0].childNodes[1]
                .innerHTML}`;
            presenceData.startTimestamp = browsingStamp;
        }
        catch {
            presenceData.details = "Navegando espacialmente";
            presenceData.state = "404";
            presenceData.startTimestamp = browsingStamp;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUMzQixJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFDbkIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3ZCLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtRQUMzQixhQUFhLEVBQUUsT0FBTztRQUN0QixjQUFjLEVBQUUsYUFBYTtLQUM5QixDQUFDO0lBRUosSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ2hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0NBQXNDLENBQUM7UUFDOUQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7UUFDL0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztTQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUNoQyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQy9DLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxPQUFP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