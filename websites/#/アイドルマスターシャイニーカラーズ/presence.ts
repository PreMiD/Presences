const presence = new Presence({
  clientId: "1103931016525127792",
}),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "https://i.imgur.com/YfaIAPE.png",
    startTimestamp: browsingTimestamp,
  };

  const { pathname } = document.location;

  if (pathname === "/home") {
    presenceData.details = "ホーム画面";
  } else if (pathname === "/present") {
    presenceData.details = "プレゼント";
  } else if (pathname === "/shop") {
    presenceData.details = "ショップ";
  } else if (pathname === "/shop/skin") {
    presenceData.details = "衣装ショップ";
  } else if (pathname === "/shop/game_event") {
    presenceData.details = "イベントショップ";
  } else if (pathname === "/shop/money") {
    presenceData.details = "マニーショップ";
  } else if (pathname === "/shop/piece") {
    presenceData.details = "ピースショップ";
  } else if (pathname === "/shop/staff_item_point") {
    presenceData.details = "シールショップ";
  } else if (pathname === "/shop/trade") {
    presenceData.details = "リサイクルショップ";
  } else if (pathname === "/shop/monthly_passport") {
    presenceData.details = "283パスショップ";
  } else if (pathname === "/shop/shiny_passport") {
    presenceData.details = "シャイニーパスショップ";
  } else if (pathname === "/item") {
    presenceData.details = "アイテム一覧";
  } else if (pathname === "/album") {
    presenceData.details = "アルバムを閲覧中";
  } else if (pathname.includes("/idolAlbum/")) {
    const idolNumber = Number(pathname.split("/")[2])
    const idolNames = [
      "真乃",
      "灯織",
      "めぐる",
      "恋鐘",
      "摩美々",
      "咲耶",
      "結華",
      "霧子",
      "果穂",
      "智代子",
      "樹里",
      "凛世",
      "夏葉",
      "甘奈",
      "甜花",
      "千雪",
      "あさひ",
      "冬優子",
      "愛依",
      "透",
      "円香",
      "小糸",
      "雛菜",
      "にちか",
      "美琴",
      "ルカ",
    ];
    presenceData.details = `${idolNames[idolNumber - 1]}のアルバムを閲覧中`;
  } else if (pathname === "/homeDeck") {
    presenceData.details = "ホームユニットを編集中";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (pathname === "/comic") {
    presenceData.details = "4コマ漫画を閲覧中";
  } else if (pathname === "/profile") {
    presenceData.details = "プロフィールを閲覧中";
  } else if (pathname === "/gasha") {
    presenceData.details = "ガシャ";
  } else if (pathname === "/idolPortal") {
    presenceData.details = "アイドル";
  } else if (pathname === "/unit") {
    presenceData.details = "ユニット編成";
  } else if (pathname === "/training") {
    presenceData.details = "トレーニング";
  } else if (pathname === "/evolution") {
    presenceData.details = "特訓";
  } else if (pathname === "/exSkill") {
    presenceData.details = "Exスキル";
  } else if (pathname === "/idolRoad") {
    presenceData.details = "アイドルロード";
  } else if (pathname === "/idolList") {
    presenceData.details = "アイドル一覧";
  } else if (pathname === "/producerDesk") {
    presenceData.details = "Pデスク";
  } else if (pathname === "/producerLevel") {
    presenceData.details = "Pレベル";
  } else if (pathname === "/mission") {
    presenceData.details = "ミッションを閲覧中";
  } else if (pathname === "/workActivity") {
    presenceData.details = "営業";
  } else if (pathname === "/produceReady") {
    presenceData.details = "プロデュース準備中";
  } else if (pathname === "/produce") {
    presenceData.details = "プロデュース中";
  } else if (pathname === "/autoPlaySchedule") {
    presenceData.details = "オートスケジュール設定中";
  } else if (pathname === "/matchLiveTop") {
    presenceData.details = "マッチライブ";
  } else if (pathname.includes("/matchLiveStageSelect/")) {
    presenceData.details = "マッチライブ選択中";
  } else if (pathname === "/matchLiveReady") {
    presenceData.details = "マッチライブ準備中";
  } else if (pathname === "/matchLiveConcert") {
    presenceData.details = "マッチライブをプレイ中";
  } else if (pathname === "/fesTop") {
    presenceData.details = "フェス";
  } else if (pathname === "/fesConcert") {
    presenceData.details = "フェスリハーサルをプレイ中";
  } else if (pathname === "/fesReady") {
    presenceData.details = "フェス準備中";
  } else if (pathname === "/fesMatchConcert") {
    presenceData.details = "グレードフェスをプレイ中";
  } else if (pathname === "/jewelCounter") {
    presenceData.details = "フェザージュエルミッション";
  } else if (pathname === "/help") {
    presenceData.details = "ヘルプを閲覧中";
  } else {
    presenceData.details = "シャニマスをプレイ中";
  }

  presence.setActivity(presenceData);
});
