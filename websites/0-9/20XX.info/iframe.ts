const iframe = new iFrame();

interface InfoXXWindow {
  _premidData?: {
    page: string;
    component?: {
      $data: {
        server: {
          location: string;
        };
      };
    };
  };
}

iframe.on("UpdateData", async () => {
  const infoXX = window as InfoXXWindow;
  if (!infoXX._premidData) return;

  iframe.send({
    ...infoXX._premidData,
    server:
      infoXX._premidData.page === "serverpage"
        ? infoXX._premidData.component.$data.server.location
        : null
  });
});
