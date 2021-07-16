const presence = new Presence({
    clientId: "859781231351693312"
  }),
  timer = Math.floor(Date.now() / 1000),
  // import $ from "jquery"

  characterList = [
    "amber",
    "barbara",
    "beidou",
    "bennett",
    "chongyun",
    "diluc",
    "diona",
    "eula",
    "fischl",
    "ganyu",
    "hu_tao",
    "jean",
    "kaeya",
    "kaedehara_kazuha",
    "keqing",
    "klee",
    "lisa",
    "mona",
    "ningguang",
    "noelle",
    "qiqi",
    "razor",
    "rosaria",
    "sucrose",
    "tartaglia",
    "traveler_anemo",
    "traveler_geo",
    "venti",
    "xiangling",
    "xiao",
    "xingqiu",
    "xinyan",
    "yanfei",
    "zhongli",
    "albedo"
  ],
  pathname = document.URL,
  character = pathname.match(/\w+/gi).pop(),
  validCharacter = characterList.includes(character);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: timer
    },
    // {hostname} = document.location,
    { pathname } = window.location;

  let stateText: string;

  if (pathname === "/") presenceData.details = "Viewing homepage";

  if (pathname.includes("/characters") || pathname.includes("/characters/")) {
    presenceData.details = "Viewing the character list";
    if (validCharacter) {
      const string = document.URL,
        original = string
          .match(/(\/\w+)/gi)
          .pop()
          .substr(1);
      if (original === "traveler_anemo") stateText = "Anemo Traveler";
      else if (original === "traveler_geo") stateText = "Geo Traveler";
      else if (original === "kaedehara_kazuha") stateText = "Kaedehara Kazuha";
      else if (original === "hu_tao") stateText = "Hu Tao";
      else stateText = original.charAt(0).toUpperCase() + original.slice(1);

      presenceData.details = "Viewing the character details:";
      presenceData.state = stateText;
    }
  }
  if (
    pathname.includes("/wish/character-event") ||
    pathname.includes("/wish/character-event/")
  ) {
    presenceData.details = "Viewing at the Wish Counter";
    presenceData.state = "Wish Counter: Character Event";
  } else if (
    pathname.includes("/wish/weapon-event") ||
    pathname.includes("/wish/weapon-event/")
  ) {
    presenceData.details = "Viewing at the Wish Counter";
    presenceData.state = "Wish Counter: Weapon Event";
  } else if (
    pathname.includes("/wish/standard") ||
    pathname.includes("/wish/standar/")
  ) {
    presenceData.details = "Viewing at the Wish Counter";
    presenceData.state = "Wish Counter: Standard Banner";
  } else if (
    pathname.includes("/wish/beginners") ||
    pathname.includes("/wish/beginners/")
  ) {
    presenceData.details = "Viewing at the Wish Counter";
    presenceData.state = "Wish Counter: Beginners' Wish";
  } else if (
    pathname.includes("/wish/tally") ||
    pathname.includes("/wish/tally/")
  )
    presenceData.details = "🌏 Global Wish Tally";
  else if (pathname.startsWith("/wish") || pathname.startsWith("/wish/")) {
    const ww = document.querySelector(
        "#sapper > main > div > div.grid.gap-4.grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-3.max-w-screen-xl > div:nth-child(6) > div.bg-item.rounded-xl.p-4.flex.items-center.w-full.text-white"
      ),
      [, , , number] = ww.textContent.split(" ");

    presenceData.details = "Viewing at the Wish Counter";
    presenceData.state = `Wishes Worth: ✧ ${number}`;
  } else if (
    pathname.includes("/calculator") ||
    pathname.includes("/calculator/")
  )
    presenceData.details = "Using the calculator";
  else if (pathname.includes("/todo") || pathname.includes("/todo/"))
    presenceData.details = "Viewing at Todo list";
  else if (pathname.includes("/items") || pathname.includes("/items/")) {
    presenceData.details = "Viewing at the Database";
    presenceData.state = "Items";
  } else if (
    pathname.includes("/achievement") ||
    pathname.includes("/achievement/")
  ) {
    presenceData.details = "Viewing at the Database";
    presenceData.state = "Achievements";
  } else if (
    pathname.includes("/reminder") ||
    pathname.includes("/reminder/")
  ) {
    presenceData.details = "Viewing at the Database";
    presenceData.state = "Reminder";
  } else if (
    pathname.includes("/furnishing") ||
    pathname.includes("/furnishing/")
  ) {
    presenceData.details = "Viewing at the Database";
    presenceData.state = "Furnishing";
    if (
      pathname.includes("/furnishing/inventory") ||
      pathname.includes("/furnishing/inventory/")
    ) {
      presenceData.details = "Viewing at the Database";
      presenceData.state = "Looking at Furnishing Inventory";
    } else if (
      pathname.includes("/furnishing/list") ||
      pathname.includes("/furnishing/list/")
    ) {
      presenceData.details = "Viewing at the Database";
      presenceData.state = "Looking at the Furnishing List";
    }
  } else if (pathname.includes("/weapons") || pathname.includes("/weapons/")) {
    presenceData.details = "Viewing at the Database";
    presenceData.state = "Weapons";
  } else if (
    pathname.includes("/timeline") ||
    pathname.includes("/timeline/")
  ) {
    const servertime = document.querySelector(
        "#sapper > main > div > div.px-4.md\\:px-8.text-white.select-none.svelte-15n1215 > label"
      ),
      finalText = servertime.textContent.match(/(\w(\s+)?)+/gi).pop();

    presenceData.details = "Viewing at the Timeline";
    presenceData.state = `Time of ${finalText}`;
  } else if (pathname.includes("/settings") || pathname.includes("/settings/"))
    presenceData.details = "Settings";
  else if (
    pathname.includes("/privacy-policy") ||
    pathname.includes("/privacy-policy/")
  ) {
    presenceData.details = "Reading the Privacy Policy";
    presenceData.smallImageKey = "smoll";
    presenceData.smallImageText = "Reading";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
