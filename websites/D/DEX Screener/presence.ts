// functions
interface DexTokenInfo {
	name: string;
	symbol: string;
	price: number;
	chainId: string;
	thumbnail: string;
	marketCap: number;
	chainSymbol: string;
}

async function getTokenInfo(
	tokenAddress: string,
	chainId: string
): Promise<DexTokenInfo | null> {
	const fetchTokenInfo = async () => {
		let response = await fetch(
			`https://api.dexscreener.com/latest/dex/pairs/${chainId}/${tokenAddress}`
		),
		 data = await response.json();
		// Token have 2 addresses, "pair" and "token"
		if (!data.pairs || data.pairs.length === 0) {
			response = await fetch(
				`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
			);
			data = await response.json();
			if (data && data.pairs) {
				const tokenInfo: DexTokenInfo = {
					name: data.pairs[0].baseToken.name,
					symbol: data.pairs[0].baseToken.symbol,
					price: data.pairs[0].priceUsd,
					chainId: data.pairs[0].chainId,
					thumbnail: data.pairs[0].info.imageUrl,
					marketCap: data.pairs[0].marketCap,
					chainSymbol: data.pairs[0].quoteToken.symbol,
				};
				return tokenInfo;
			}
			return null;
		}

		if (data && data.pairs) {
			const tokenInfo: DexTokenInfo = {
				name: data.pairs[0].baseToken.name,
				symbol: data.pairs[0].baseToken.symbol,
				price: data.pairs[0].priceUsd,
				chainId: data.pairs[0].chainId,
				thumbnail: data.pairs[0].info.imageUrl,
				marketCap: data.pairs[0].marketCap,
				chainSymbol: data.pairs[0].quoteToken.symbol,
			};
			return tokenInfo;
		}
		return null;
	};
	setInterval(fetchTokenInfo, 30000);
	return fetchTokenInfo();
}

function formatMarketCap(marketCap: number): string {
	if (marketCap >= 1_000_000) 
		return `${(marketCap / 1_000_000).toFixed(1)}M`;
	 else if (marketCap >= 1_000) 
		return `${(marketCap / 1_000).toFixed(1)}K`;
	 else 
		return marketCap.toString();
	
}

function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
// end function

// PRESENCEDECLARATION
const presence = new Presence({
		clientId: "1326168769403289683",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/LWNN5i1.jpeg",
}
// end PRESENCEDECLARATION
const chainLogo = {
	// i added this assets because these logo is not in .png while get from website
	ethereum: "https://i.imgur.com/u2u5w93.jpeg",
	bsc: "https://i.imgur.com/Eaa2uog.jpeg",
	solana: "https://i.imgur.com/RUJenzh.jpeg",
	base: "https://i.imgur.com/yMUaMZq.jpeg",
	sui: "https://i.imgur.com/1U8Kuh0.jpeg",
	aptos: "https://i.imgur.com/M2PnsZo.jpeg",
	arbitrum: "https://i.imgur.com/C8y29U6.jpeg",
	avalanche: "https://i.imgur.com/yApPGyO.jpeg",
	cronos: "https://i.imgur.com/K9HSwqr.jpeg",
	fantom: "https://i.imgur.com/2h7g96v.jpeg",
	hyperliquid: "https://i.imgur.com/1YmOCAI.jpeg",
	ink: "https://i.imgur.com/tvhGF3x.jpeg",
	linea: "https://i.imgur.com/4kxwQYb.jpeg",
	optimism: "https://i.imgur.com/NkMIdoE.jpeg",
	osmosis: "https://i.imgur.com/7XyInA2.jpeg",
	polygon: "https://i.imgur.com/OAj35XY.jpeg",
	zksync: "https://i.imgur.com/su2f6QM.jpeg",
};

// presence call
presence.on("UpdateData", async () => {
	let details: string | undefined,
		state: string | undefined,
		presenceData: PresenceData,
		tokenInfo: DexTokenInfo | null = null,
		urlToken: string | undefined;

	
	const path = document.location.pathname;
	switch (true) {
		case path === "/":
			details = "Home Page";
			state = "Exploring";
			break;
		case path.startsWith("/watchlist"):
			details = "Watchlist";
			break;
		case path.startsWith("/multicharts"):
			details = "Looking at Multi Charts";
			break;
		case path.startsWith("/new-pairs"):
			details = "New Pairs";
			state = "Exploring";
			break;
		case path.startsWith("/gainers"):
			details = "Gainers and Losers";
			state = "Exploring";
			break;
		case path.startsWith("/portfolio"):
			details = "Looking at Portfolio";
			break;
		case path.startsWith("/moonshot"):
			details = "Moonshot";
			state = "Exploring";
			break;
		default: {
			const pathParts = path.split("/");
			if (pathParts.length === 2) {
				
				details = `Viewing ${capitalize(pathParts[1])} tokens`;
				const smallImageKey =
					new Map(Object.entries(chainLogo)).get(pathParts[1]) ||
					`https://dd.dexscreener.com/ds-data/chains/${pathParts[1]}.png`;
				presenceData = {
					details,
					largeImageKey: Assets.Logo,
					smallImageKey,
					startTimestamp: browsingTimestamp,
				};
				presence.setActivity(presenceData);
				return;
			} else if (pathParts.length >= 3) {
				const chainId = pathParts[1],
				 tokenAddress = pathParts[2];
				tokenInfo = await getTokenInfo(
					decodeURIComponent(tokenAddress),
					chainId
				);

				if (tokenInfo) {
					
					urlToken = `https://dexscreener.com/${chainId}/${tokenAddress}`;
					details = `(${tokenInfo.symbol}/${tokenInfo.chainSymbol}) ${tokenInfo.name}`;
					state = `$${tokenInfo.price} - MC: $${formatMarketCap(tokenInfo.marketCap)}`;
					presenceData = {
						details,
						state,
						largeImageKey: Assets.Logo,
						smallImageKey: tokenInfo.thumbnail,
						startTimestamp: browsingTimestamp,
						buttons: [
							{
								label: "View Token",
								url: urlToken || "https://dexscreener.com/",
							},
						],
					};
					presence.setActivity(presenceData);
					return;
				}
			}
		}
	}

	if (details) {
		presenceData = {
			details,
			state,
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		};
		presence.setActivity(presenceData);
	}
});
// end presence call