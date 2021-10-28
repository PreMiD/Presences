let presence = new Presence({
  clientId: "884153055795372052"
})

let past: number;
const browsingStamp = Math.floor(Date.now() / 1000);

let toydata: any;

function setdata(data: any) {
  if (data == {}){
    alert("Wrong toy connection, Please make your lovense connect app and your computer both on same network.")
  }
  const url = Object.keys(data)[0];
  let toyx = Object.keys(data[url]["toys"])[0];
  localStorage.setItem(`toytype`,` ${data[url]["toys"][toyx]["name"]}`)
  localStorage.setItem(`toynickname`,` ${data[url]["toys"][toyx]["nickName"]}`)
  localStorage.setItem(`battery`,` ${data[url]["toys"][toyx]["battery"]}`)
  localStorage.setItem("url", `https://${url}:${data[url]["httpsPort"]}`);
}

function vibrate(lp: number, level: number) {
  fetch(`${localStorage.getItem("url")}/AVibrate?v=${level}&sec=${lp}`)
}
const add_html = `
<head>
    <style>
        .xinput {
  background:transparent ;
  border:1px solid black ;
  color: white;
  border-radius: 10px;
  outline: none;
  -webkit-appearance: none;
}
.chip {
  padding: 5px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  color: lightgreen;
  font-family: Impact, Haettenschweiler, 'Arial Narrow ', sans-serif;
}
    </style>
</head>

<div class="chrome">
    <details>
    <summary style="border:1px solid white;color:white">Vibration Control</summary>
    <p>
    <p id = "toydetails"></p>
    <table>
        <tr>
            <td>LP reduced per sec </td>
            <td><input class="xinput" id="myinputLP" oninput="this.nextElementSibling.value = this.value" min="0" max="6000" type="number" value="200" /> &nbsp; <output class="chip" id="lpforsec">200</output></td>
        </tr>
        <tr>
            <td> Vibration strength</td>
            <td><input class="xinput" id="myinput" oninput="this.nextElementSibling.value = this.value*100/20" min="0" max="20" type="range" value="1" /> &nbsp; <output class="chip" id="vibrator-level">5</output>%</td>
        </tr>
    </table>
    like this app? <br> <img onclick="window.open('https://ko-fi.com/iamren','_blank')" src="https://www.pnglib.com/wp-content/uploads/2021/02/red-donate-logo_6023c11f91d6d.png" style="width: 75px;height: 25px;" alt="">
    </p>
    </details>
  </div>

` ;

let vibrator_count = 0 ;

fetch("https://api.lovense.com/api/lan/getToys").then(response => response.json())
  .then(data => setdata(data))

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "banner",
    startTimestamp: browsingStamp,
    
  };
  presenceData.details = "DuelingNexus";
  presenceData.state = "playing shadow game";
  if (document.location.pathname.startsWith("/game")) {

    if (document.getElementById("myinputLP") == undefined) {
      document.querySelector("#card-column").innerHTML += add_html;
      var xhd = localStorage.getItem("toytype")
      var phd = localStorage.getItem("toynickname")
      var yhd = localStorage.getItem("battery") 
      document.getElementById("toydetails").innerHTML ="Toy : "+ xhd + "( "+ phd + ") " + "<br>battery :" + yhd +"%" 
    }
    let lp = document.querySelector("#game-life-player").innerHTML;
    presenceData.details = `with ${lp} LP`;
    if (past > +lp) {
      var lp4sec = +document.getElementById("lpforsec").innerText ;
      var strength = +document.getElementById("vibrator-level").innerText * 20/100 ;

      console.log(`Lost ${past - (+lp)}`);
      vibrate( Math.ceil((past - (+lp))/lp4sec) , strength)
      vibrator_count+=1
    }
    past = parseInt(lp)
    presenceData.details = `Got striked ${vibrator_count} times.`;
    presence.setActivity(presenceData, true);
  }
  
});