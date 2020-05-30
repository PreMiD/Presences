const presence = new Presence({
  clientId: "661198037175238665"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "reading",
    smallImageText: "Reading Node.js Doc's",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname == "nodejs.org") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Viewing At Home Page";
    if (document.location.pathname.includes("/about")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "About Node.js";
    } else if (document.location.pathname.includes("/download")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js Downloads`;
    } else if (document.location.pathname.includes("/docs")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = "About Docs";
    } else if (document.location.pathname.includes("/api")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = "Node.js API";
    } else if (document.location.pathname.includes("/api/all.html")) { 
      presenceData.details = `Viewing Page:`;
      presenceData.state = "Node.js API ALL MODULES";
    } else if (document.location.pathname.includes("/get-involved")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Get Involved`;
    } else if (document.location.pathname.includes("/security")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Security`;
    } else if (document.location.pathname.includes("/blog")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js News`;
    }
    
    // API MODULES 
    if(document.location.pathname.includes("/api/assert.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Assert`;
    } else if(document.location.pathname.includes("/api/async_hooks.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Async Hooks`;
    } else if(document.location.pathname.includes("/api/buffer.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Buffer`;
    } else if(document.location.pathname.includes("/api/addons.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module C++ Addons`;
    } else if(document.location.pathname.includes("/api/n-api.html")) { 
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module N-API`;
    } else if(document.location.pathname.includes("/api/embedding.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module C++ Embedder API`;
    } else if(document.location.pathname.includes("/api/child_process.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Child Processes`;
    } else if(document.location.pathname.includes("/api/cluster.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Cluster`;
    } else if(document.location.pathname.includes("/api/cli.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Command Line Options`;
    } else if(document.location.pathname.includes("/api/console.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Console`;
    } else if(document.location.pathname.includes("/api/crypto.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Crypto`;
    } else if(document.location.pathname.includes("/api/debugger.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Debugger`;
    } else if(document.location.pathname.includes("/api/deprecations.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Deprecated APIs`;
    } else if(document.location.pathname.includes("/api/dns.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module DNS`;
    } else if(document.location.pathname.includes("/api/domain.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Domain`;
    } else if(document.location.pathname.includes("/api/esm.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module ECMAScript Modules`;
    } else if(document.location.pathname.includes("/api/errors.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Errors`;
    } else if(document.location.pathname.includes("/api/events.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Events`;
    } else if(document.location.pathname.includes("/api/fs.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module File System (fs)`;
    } else if(document.location.pathname.includes("/api/globals.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Globals`;
    } else if(document.location.pathname.includes("/api/http.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module HTTP`;
    } else if(document.location.pathname.includes("/api/http2.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module HTTP2`;
    } else if(document.location.pathname.includes("/api/https.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module HTTPS`;
    } else if(document.location.pathname.includes("/api/inspector.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Inspector`;
    } else if(document.location.pathname.includes("/api/intl.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Internationalization`;
    } else if(document.location.pathname.includes("/api/modules.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Modules`;
    } else if(document.location.pathname.includes("/api/net.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Net`;
    } else if(document.location.pathname.includes("/api/os.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module OS`;
    } else if(document.location.pathname.includes("/api/path.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Path`;
    } else if(document.location.pathname.includes("/api/perf_hooks.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Performance Hooks`;
    } else if(document.location.pathname.includes("/api/policy.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Policies`;
    } else if(document.location.pathname.includes("/api/process.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Process`;
    } else if(document.location.pathname.includes("/api/punycode.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Punycode`;
    } else if(document.location.pathname.includes("/api/querystring.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Query Strings`;
    } else if(document.location.pathname.includes("/api/readline.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Readline`;
    } else if(document.location.pathname.includes("/api/repl.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module REPL`;
    } else if(document.location.pathname.includes("/api/report.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Report`;
    } else if(document.location.pathname.includes("/api/stream.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Stream`;
    } else if(document.location.pathname.includes("/api/string_decoder.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module String Decoder`;
    } else if(document.location.pathname.includes("/api/timers.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Timers`;
    } else if(document.location.pathname.includes("/api/tls.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module TLS/SSL`;
    } else if(document.location.pathname.includes("/api/tracing.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Trace Events`;
    } else if(document.location.pathname.includes("/api/tty.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module TTY`;
    } else if(document.location.pathname.includes("/api/dgram.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module UDP/Datagram`;
    } else if(document.location.pathname.includes("/api/url.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module URL`;
    } else if(document.location.pathname.includes("/api/util.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Utilities`;
    } else if(document.location.pathname.includes("/api/v8.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module V8`;
    } else if(document.location.pathname.includes("/api/vm.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module VM`;
    } else if(document.location.pathname.includes("/api/wasi.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module WASI`;
    } else if(document.location.pathname.includes("/api/worker_threads.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module Worker Threads`;
    } else if(document.location.pathname.includes("/api/zlib.html")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Node.js API Module ZLIB`;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
