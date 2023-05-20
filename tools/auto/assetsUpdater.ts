import actions from "@actions/core";
import chalk from "chalk";
import { getDiff } from "../util.js";
import AssetsManager from "../classes/AssetsManager.js";

if (!getDiff().length && !getDiff("removed").length) {
	actions.info(chalk.green("No Presences changed, exiting..."));
	process.exit();
}

const changedPresenceFolders = getDiff(),
	deletedPresenceFolders = getDiff("removed");

if (changedPresenceFolders.length) {
	for (const folder of changedPresenceFolders) {
		const assetsManager = new AssetsManager(folder),
			{ toBeUploaded, toBeMoved, toBeDeleted } =
				await assetsManager.getAssetsChanges();

		if (!toBeUploaded.size && !toBeMoved.size && !toBeDeleted.size) {
			actions.info(chalk.green(`No assets changes for ${folder}, skipping...`));
			continue;
		}

		if (toBeDeleted.size) {
			actions.info(
				chalk.green(`Deleting ${toBeDeleted.size} asset(s) for ${folder}...`)
			);
			await assetsManager.deleteAssets(toBeDeleted);
		}

		if (toBeMoved.size) {
			actions.info(
				chalk.green(`Moving ${toBeMoved.size} asset(s) for ${folder}...`)
			);
			await assetsManager.uploadAssets(toBeMoved);
		}

		if (toBeUploaded.size) {
			actions.info(
				chalk.green(`Uploading ${toBeUploaded.size} asset(s) for ${folder}...`)
			);
			await assetsManager.uploadAssets(toBeUploaded);
		}
	}
}

if (deletedPresenceFolders.length) {
	for (const folder of deletedPresenceFolders) {
		const assetsManager = new AssetsManager(folder),
			allAssets = assetsManager.allAssets,
			assets = [
				allAssets.logo,
				allAssets.thumbnail,
				...allAssets.assets,
			].filter(asset => asset.startsWith(assetsManager.assetBaseUrl));

		if (!assets.length) {
			actions.info(
				chalk.green(`No assets to delete for ${folder}, skipping...`)
			);
			continue;
		}

		actions.info(
			chalk.green(`Deleting ${assets.length} asset(s) for ${folder}...`)
		);
		await assetsManager.deleteAssets(assets);
	}
}
