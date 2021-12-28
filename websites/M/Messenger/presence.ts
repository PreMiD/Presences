const presence = new Presence({
    clientId: "630896385889271819"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let user: HTMLElement | Element | string, typing: HTMLElement | Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname.includes("/groupcall/")) {
    // Facebook changed pathname to "/groupcall/"
    presenceData.largeImageKey = "messenger";
    // HTMLDivElement changes id every reload so specifying ElementId will break presence
    user = document.querySelector(
      "body > div > div > div > div.tqqih7rk.ly4sbmxm > div > div > div.g2121wdl.m0q0jmkx.r30xiam5.alrytcbg.hp5uecnq > div > div:nth-child(5) > div > div > div > div > div.f5zavhip.m0q0jmkx.alrytcbg.ehi1kzmu.qrcazxqi > div > div > div.cvby54pj.r30xiam5.alrytcbg > div > div.ocjcko58.t7elcel3.foed1vyy.m0270gek.ak9allyy > h1"
    );
    if (!user || !(user as HTMLElement).textContent) {
      presenceData.details = "In a video call with:";
      user = "user not found.";
      // presenceData.details = "In videocall with someone";
      presenceData.smallImageKey = "videocall";
    } else {
      presenceData.details = "In call with:";
      user = (user as HTMLElement).textContent;
      // presenceData.details = "In call with someone";
      presenceData.smallImageKey = "call";
    }
    (await presence.getSetting<boolean>("call"))
      ? (presenceData.state = user)
      : (presenceData.state = "(Hidden in presence settings.)");
  } else if (document.location.pathname.includes("/t/")) {
    presenceData.largeImageKey = "messenger";
    // HTMLDivElement changes id every reload so specifying ElementId will break presence
    user = document.querySelector(
      "body > div > div > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.pfnyh3mw.jifvfom9.gs1a9yip.owycx6da.btwxx1t3.j83agx80.buofh1pr.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.cbu4d94t.d2edcug0.hpfvmrgz.rj1gh0hx.buofh1pr.g5gj957u.j83agx80.dp1hu0rb > div > div.du4w35lb.rq0escxv.j83agx80.cbu4d94t.d2edcug0.d8ncny3e.buofh1pr.g5gj957u.tgvbjcpo.ni8dbmo4.stjgntxs.l9j0dhe7.nred35xi.gitj76qy.jq4qci2q > div > div > div > div.rq0escxv.du4w35lb.d2edcug0.hpfvmrgz.rj1gh0hx.buofh1pr.g5gj957u.j83agx80.cbu4d94t.l9j0dhe7.ni8dbmo4.stjgntxs > div.t6p9ggj4.tkr6xdv7 > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.d2edcug0.hpfvmrgz.rj1gh0hx.buofh1pr.g5gj957u.p8fzw8mz.pcp91wgn.iuny7tx3.ipjc6fyt > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.d2edcug0.hpfvmrgz.rj1gh0hx.buofh1pr.g5gj957u.p8fzw8mz.pcp91wgn.iuny7tx3.ipjc6fyt > div > div.d2edcug0.j83agx80.bp9cbjyn.aahdfvyu.bi6gxh9e > h2 > span > span"
    );
    typing = document.querySelector(
      "body > div > div > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.pfnyh3mw.jifvfom9.gs1a9yip.owycx6da.btwxx1t3.j83agx80.buofh1pr.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.cbu4d94t.d2edcug0.hpfvmrgz.rj1gh0hx.buofh1pr.g5gj957u.j83agx80.dp1hu0rb > div > div > div > div > div > div.rq0escxv.du4w35lb.d2edcug0.hpfvmrgz.rj1gh0hx.buofh1pr.g5gj957u.j83agx80.cbu4d94t.l9j0dhe7.ni8dbmo4.stjgntxs > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div > div.ntk0jbrt.pfnyh3mw > div > form > div > div.j83agx80.l9j0dhe7.aovydwv3.ni8dbmo4.stjgntxs.nred35xi.n8tt0mok.hyh9befq > div.aovydwv3.j83agx80.buofh1pr.ni8dbmo4.cxgpxx05.sj5x9vvc.qio8uep8.hzruof5a.l9j0dhe7 > div.e5nlhep0.mrt03zmi.ecm0bbzt.h4z51re5.gvyehdmr.mu0vl6fp.msuhji6j.iqy7zqfr.rj1gh0hx.cbu4d94t.buofh1pr.j83agx80.ni8dbmo4.ll8tlv6m.b3i9ofy5.oo9gr5id.flx89l3n.dpja2al7.orhb3f3m.h905i5nu.jinzq4gt.emzo65vh.qiw3t3sk > div > div > div.rq0escxv.a8c37x1j.datstx6m.k4urcfbm > div > div > div > div > div > div > span > span"
    );
    if (typing === null) {
      presenceData.details = "Reading messages from:";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = "Writing to:";
      presenceData.smallImageKey = "writing";
    }
    (await presence.getSetting<boolean>("message"))
      ? (presenceData.state = user.textContent)
      : (presenceData.state = "(Hidden in presence settings.)");
  } else if (document.location.pathname.includes("/new")) {
    presenceData.largeImageKey = "messenger";

    presenceData.details = "Composing a new message";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.largeImageKey = "messenger";

    presenceData.details = "Viewing the about page";
  }

  presence.setActivity(presenceData);
});
