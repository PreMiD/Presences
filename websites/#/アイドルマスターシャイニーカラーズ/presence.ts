const presence = new Presence({
	clientId: "1103931016525127792",
});

const browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/ue8EatG.jpg",
		startTimestamp: browsingTimestamp,
	};

	const pathMap: Record<string, string> = {
		"/home": "ホーム画面",
		"/present": "プレゼント",
		"/shop": "ショップ",
		"/shop/skin": "衣装ショップ",
		"/shop/game_event": "イベントショップ",
		"/shop/money": "マニーショップ",
		"/shop/piece": "ピースショップ",
		"/shop/staff_item_point": "シールショップ",
		"/shop/trade": "リサイクルショップ",
		"/shop/monthly_passport": "283パスショップ",
		"/shop/shiny_passport": "シャイニーパスショップ",
		"/item": "アイテム一覧",
		"/album": "アルバムを閲覧中",
		"/homeDeck": "ホームユニットを編集中",
		"/comic": "4コマ漫画を閲覧中",
		"/profile": "プロフィールを閲覧中",
		"/gasha": "ガシャ",
		"/idolPortal": "アイドル",
		"/unit": "ユニット編成",
		"/training": "トレーニング",
		"/evolution": "特訓",
		"/exSkill": "Exスキル",
		"/idolRoad": "アイドルロード",
		"/idolList": "アイドル一覧",
		"/producerDesk": "Pデスク",
		"/producerLevel": "Pレベル",
		"/mission": "ミッションを閲覧中",
		"/workActivity": "営業",
		"/produceReady": "プロデュース準備中",
		"/produce": "プロデュース中",
		"/autoPlaySchedule": "オートスケジュール設定中",
		"/matchLiveTop": "マッチライブ",
		"/matchLiveReady": "マッチライブ準備中",
		"/matchLiveConcert": "マッチライブをプレイ中",
		"/fesTop": "フェス",
		"/fesReady": "フェス準備中",
		"/fesMatchConcert": "グレードフェスをプレイ中",
		"/jewelCounter": "フェザージュエルミッション",
		"/help": "ヘルプを閲覧中",
	};

	const { pathname } = window.location;

	presenceData.details = pathMap[pathname] || "シャニマスをプレイ中";
	if (pathname.includes("/idolAlbum/")) {
		const idolNumber = Number(pathname.split("/")[2]);
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
	}

	presence.setActivity(presenceData);
});

