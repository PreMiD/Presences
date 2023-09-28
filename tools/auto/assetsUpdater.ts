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
		const start = Date.now(),
			assetsManager = new AssetsManager(folder),
			{ toBeUploaded, toBeMoved, toBeDeleted } =
				await assetsManager.getAssetsChanges();

		if (!toBeUploaded.size && !toBeMoved.size && !toBeDeleted.size) {
			actions.info(
				chalk.green(
					`No assets changes for ${folder}, skipping... (took ${
						Date.now() - start
					}ms)`
				)
			);
			continue;
		}

		if (toBeDeleted.size) {
			actions.info(
				chalk.green(`Deleting ${toBeDeleted.size} asset(s) for ${folder}...`)
			);
			const errors = await assetsManager.deleteAssets(toBeDeleted);
			for (const error of errors) actions.error(error);
			if (errors.length) actions.setFailed("Failed to delete assets");
		}

		if (toBeMoved.size) {
			actions.info(
				chalk.green(`Moving ${toBeMoved.size} asset(s) for ${folder}...`)
			);
			const errors: string[] = [];
			errors.push(
				...(await assetsManager.uploadAssets(toBeMoved)),
				...(await assetsManager.deleteAssets([...toBeMoved.keys()]))
			);
			for (const error of errors) actions.error(error);
			if (errors.length) actions.setFailed("Failed to move assets");

			assetsManager.replaceInFiles(toBeMoved);
		}

		if (toBeUploaded.size) {
			actions.info(
				chalk.green(`Uploading ${toBeUploaded.size} asset(s) for ${folder}...`)
			);
			const errors = await assetsManager.uploadAssets(toBeUploaded);
			for (const error of errors) actions.error(error);
			if (errors.length) actions.setFailed("Failed to upload assets");

			assetsManager.replaceInFiles(toBeUploaded);
		}

		actions.info(
			chalk.green(`Done for ${folder}! (took ${Date.now() - start}ms)`)
		);
	}
}

if (deletedPresenceFolders.length) {
	for (const folder of deletedPresenceFolders) {
		const start = Date.now(),
			assetsManager = new AssetsManager(folder),
			allAssets = await assetsManager.getCdnAssets(),
			assets = [
				allAssets.logo,
				allAssets.thumbnail,
				allAssets.assets ? [...allAssets.assets.values()] : [],
			]
				.flat()
				.filter(
					(asset): asset is string =>
						!!asset && asset.startsWith(assetsManager.assetBaseUrl)
				);

		if (!assets.length) {
			actions.info(
				chalk.green(
					`No assets to delete for ${folder}, skipping... (took ${
						Date.now() - start
					}ms)`
				)
			);
			continue;
		}

		actions.info(
			chalk.green(`Deleting ${assets.length} asset(s) for ${folder}...`)
		);
		const errors = await assetsManager.deleteAssets(assets);
		for (const error of errors) actions.error(error);
		if (errors.length) actions.setFailed("Failed to delete assets");

		actions.info(
			chalk.green(`Done for ${folder}! (took ${Date.now() - start}ms)`)
		);
	}
}

actions.info(chalk.green("Done!"));
