const presence = new Presence({
    clientId: "786770326234464256"
}), stamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const data: PresenceData = {
        startTimestamp: stamp
    }, paths = document.location.pathname.split('/');
    paths.splice(0, 1);

    if(!paths[1] || paths[1] === ""){
        data.largeImageKey = 'homepage';
        data.details = `Looking at the main page...`;

    } else if(paths[3] === 'JavaScript'){
        data.largeImageKey = 'javascript';

        if(paths[4]){
            paths.splice(0, 4);
            data.details = `JavaScript: Looking at ${paths[0]}`;
            if(paths[1]){
                paths.splice(0, 1);
                data.state = `Topic: ${paths.join(', ')}`;
            }
        } else {
            data.details = `Looking at JavaScript Technologie`;
        }

    } else if(paths[3] === 'HTML'){
        data.largeImageKey = 'html';

        if(paths[4]){
            paths.splice(0, 4);
            data.details = `HTML: Looking at ${paths[0]}`;
            if(paths[1]){
                paths.splice(0, 1);
                data.state = `Topic: ${paths.join(', ')}`;
            }
        } else {
            data.details = `Looking at HTML Technologie`;
        }
    } else if(paths[3] === 'CSS'){
        data.largeImageKey = 'css';

        if(paths[4]){
            paths.splice(0, 4);
            data.details = `CSS: Looking at ${paths[0]}`;
            if(paths[1]){
                paths.splice(0, 1);
                data.state = `Topic: ${paths.join(', ')}`;
            }
        } else {
            data.details = `Looking at CSS Technologie`;
        }
    } else if(paths[3] === 'MathML'){ 
        data.largeImageKey = 'mathml';
        
        if(paths[4]){
            paths.splice(0, 4);
            data.details = `MathML: Looking at ${paths[0]}`;
            if(paths[1]){
                paths.splice(0, 1);
                data.state = `Topic: ${paths.join(', ')}`;
            }
        } else {
            data.details = `Looking at MathML Technologie`;
        }
    } else if(!paths[3]){
        data.largeImageKey = 'homepage';
        data.details = `Looking at Web Technologies`;
    } else {
        data.largeImageKey = 'homepage';

        const tech = paths[3];

        if(paths[4]){
            paths.splice(0, 4);
            data.details = `${tech}: Looking at ${paths[0]}`;
            if(paths[1]){
                paths.splice(0, 1);
                data.state = `Topic: ${paths.join(', ')}`;
            }
        } else {
            data.details = `Looking at ${tech}`;
        }
    }

    presence.setActivity(data);
});