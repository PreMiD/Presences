import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { createReadStream, createWriteStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { promisify } from "node:util";

import got from "got";
import glob from "glob";
import FormData from "form-data";
import sharp from "sharp";
import { lookup as mimeLookup } from "mime-types";

import { Metadata } from "./PresenceCompiler";
import { getFolderLetter } from "../util.js";

const require = createRequire(import.meta.url),
	rootPath = resolve(fileURLToPath(new URL(".", import.meta.url)), "../.."),
	cdnBase = "https://cdn.rcd.gg",
	globAsync = promisify(glob);

export default class AssetsManager {
	cwd: string;

	constructor(
		public service: string,
		public options?: {
			cwd?: string;
		}
	) {
		this.cwd = options?.cwd ?? rootPath;
	}

	get assetBaseUrl() {
		return `${cdnBase}/PreMiD/${encodeURI(
			this.presenceFolder.replace(`${this.cwd}/`, "")
		).replace("#", "%23")}/assets`;
	}

	get presenceFolder() {
		//TODO Detect if the presence is a website or a program without using glob since the file may not exist anymore at this point
		const type: "websites" | "programs" = "websites";
		return `${this.cwd}/${type}/${getFolderLetter(this.service)}/${
			this.service
		}`;
	}

	getFileExtension(url: string) {
		return extname(new URL(url).pathname);
	}

	async allTsFiles() {
		return (
			await globAsync(`{websites,programs}/**/${this.service}/**/*.ts`, {
				absolute: true,
			})
		).filter(file => !file.endsWith(".d.ts"));
	}

	get metadata(): Metadata {
		return require(resolve(this.presenceFolder, "metadata.json"));
	}

	/**
	 * Gets all assets used in the presence
	 *
	 * Includes the logo, thumbnail, and all other assets used in the presence
	 *
	 * @note Includes both assets uploaded to the cdn, and assets that are not uploaded to the cdn
	 *
	 * @returns A list of all assets used in the presence
	 */
	async allAssets(): Promise<{
		logo: string;
		thumbnail: string;
		assets: Set<string>;
	}> {
		const assets = new Set<string>(),
			{ logo, thumbnail } = this.metadata,
			files = await this.allTsFiles();

		await Promise.all(
			files.map(async tsfile => {
				const file = await readFile(tsfile, "utf8");

				//* A regex to match all image urls in the file
				const regex =
					/(?<=["'`])(https?:\/\/.*?\.(?:png|jpg|jpeg|gif|webp)(?:[?][^'"`]+)?)(?=["'`])/g;
				let match: RegExpExecArray | null;

				while ((match = regex.exec(file)) !== null) {
					//* If the url contains a template literal, skip it
					if (match[1].includes(`\${`)) continue;

					//* Regex to check if the url contains + " or + ' or + `
					const regex2 = /(?<=\+ )["'`].*?["'`]/g;
					if (regex2.test(match[1])) continue;

					if (match[1] === logo || match[1] === thumbnail) continue;

					assets.add(match[1]);
				}
			})
		);

		return {
			logo,
			thumbnail,
			assets,
		};
	}

	/**
	 * The assets should be uploaded to the following urls:
	 * - logo: getAssetBaseUrl()/logo.<extension>
	 * - thumbnail: getAssetBaseUrl()/thumbnail.<extension>
	 * - all other assets: getAssetBaseUrl()/<index>.<extension>
	 *
	 * The indexes should be kept in order, so if there are 3 assets, they should be uploaded to:
	 * - getAssetBaseUrl()/0.<extension>
	 * - getAssetBaseUrl()/1.<extension>
	 * - getAssetBaseUrl()/2.<extension>
	 *
	 * Any no longer used assets will be added to the toBeDeleted set
	 * Any assets that have been uploaded already but will now be moved to a different index will be added to the toBeMoved map
	 * Any assets that have not been uploaded yet will be added to the toBeUploaded map
	 */
	async getAssetsChanges(): Promise<{
		toBeUploaded: Map<string, string>;
		toBeMoved: Map<string, string>;
		toBeDeleted: Set<string>;
	}> {
		const [assets, cdnAssets] = await Promise.all([
				this.allAssets(),
				this.getCdnAssets(),
			]),
			result = {
				toBeUploaded: new Map<string, string>(),
				toBeMoved: new Map<string, string>(),
				toBeDeleted: new Set<string>(),
			};

		if (!cdnAssets.logo) {
			const newLogo = `${this.assetBaseUrl}/logo${this.getFileExtension(
				assets.logo
			)}`;
			result.toBeUploaded.set(assets.logo, newLogo);
		} else if (assets.logo !== cdnAssets.logo) {
			const newLogo = `${this.assetBaseUrl}/logo${this.getFileExtension(
				assets.logo
			)}`;

			//* If the logo has a different extension, delete the old logo
			if (!this.canBePut(cdnAssets.logo, newLogo))
				result.toBeDeleted.add(cdnAssets.logo);

			result.toBeUploaded.set(assets.logo, newLogo);
		}

		if (!cdnAssets.thumbnail) {
			const newThumbnail = `${
				this.assetBaseUrl
			}/thumbnail${this.getFileExtension(assets.thumbnail)}`;
			result.toBeUploaded.set(assets.thumbnail, newThumbnail);
		} else if (assets.thumbnail !== cdnAssets.thumbnail) {
			const newThumbnail = `${
				this.assetBaseUrl
			}/thumbnail${this.getFileExtension(assets.thumbnail)}`;

			//* If the thumbnail has a different extension, delete the old thumbnail
			if (!this.canBePut(cdnAssets.thumbnail, newThumbnail))
				result.toBeDeleted.add(cdnAssets.thumbnail);

			result.toBeUploaded.set(assets.thumbnail, newThumbnail);
		}

		const cdnAssetsInUse = new Map<number, string>(),
			usedIndexes = new Set<number>();
		if (cdnAssets.assets) {
			for (const [index, asset] of cdnAssets.assets) {
				if (assets.assets.has(asset)) {
					cdnAssetsInUse.set(index, asset);
					usedIndexes.add(index);
				} else result.toBeDeleted.add(asset);
			}
		}

		const newAssets = new Set<string>();
		for (const asset of assets.assets)
			if (!asset.startsWith(cdnBase)) newAssets.add(asset);

		let index = 0;
		for (const asset of newAssets) {
			while (usedIndexes.has(index)) index++;
			const newAsset = `${this.assetBaseUrl}/${index}${this.getFileExtension(
				asset
			)}`;
			result.toBeUploaded.set(asset, newAsset);
			usedIndexes.add(index);
			index++;
		}

		const missingIndexes = this.findMissing([...usedIndexes]);
		if (missingIndexes.length) {
			const cdnAssetsInUseArray = [...cdnAssetsInUse].sort(([a], [b]) => b - a);
			for (const index of missingIndexes) {
				const last = cdnAssetsInUseArray.pop();
				if (!last) break;
				const [_, asset] = last,
					newAsset = `${this.assetBaseUrl}/${index}${this.getFileExtension(
						asset
					)}`;
				result.toBeMoved.set(asset, newAsset);
			}
		}

		return result;
	}

	async getCdnAssets(): Promise<{
		logo: string | false;
		thumbnail: string | false;
		assets: Map<number, string> | false;
	}> {
		const assets = new Map<number, string>();
		let assetFound = true,
			index = 0;
		while (assetFound) {
			const asset = await this.doesAssetExistAnyExtension(
				`${this.assetBaseUrl}/${index}`
			);
			if (asset) {
				assets.set(index, asset);
				index++;
			} else {
				assetFound = false;
			}
		}

		const [logo, thumbnail] = await Promise.all([
			this.doesAssetExistAnyExtension(`${this.assetBaseUrl}/logo`),
			this.doesAssetExistAnyExtension(`${this.assetBaseUrl}/thumbnail`),
		]);

		return {
			logo,
			thumbnail,
			assets: assets.size ? assets : false,
		};
	}

	canBePut(oldUrl: string, newUrl: string): boolean {
		return this.getFileExtension(oldUrl) === this.getFileExtension(newUrl);
	}

	async doesAssetExist(url: string): Promise<boolean> {
		return got
			.head(url)
			.then(() => true)
			.catch(() => false);
	}

	async doesAssetExistAnyExtension(url: string): Promise<string | false> {
		const extensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
		for (const extension of extensions) {
			const newUrl = `${url}${extension}`;
			if (await this.doesAssetExist(newUrl)) return newUrl;
		}
		return false;
	}

	async uploadAssets(assets: Map<string, string>) {
		let errors: string[] = [];
		await Promise.all(
			[...assets.entries()].map(async ([url, newUrl]) => {
				const extension = this.getFileExtension(url),
					mimeType = mimeLookup(extension);

				if (!mimeType || !mimeType.startsWith("image/")) {
					errors.push(
						`Tried to upload an asset with an invalid extension: ${url}`
					);
					return;
				}

				const random = Math.random().toString(36).substring(2, 15),
					filename = `premid-assetmanager-${random}${extension}`,
					fileLocation = join(tmpdir(), filename);

				let finalFileLocation = fileLocation;

				try {
					const stream = got.stream(url);
					await pipeline(stream, createWriteStream(fileLocation));
					if (stream.response?.url.split("/")[3].split(".")[0] === "removed") {
						errors.push(`Asset ${url} was removed from the server`);
						return;
					}
				} catch (error) {
					errors.push(`Error while downloading asset ${url}: ${error.message}`);
					return;
				}

				if (!newUrl.includes("thumbnail")) {
					const file = sharp(fileLocation),
						metadata = await file.metadata();

					if (metadata.width !== 512 || metadata.height !== 512) {
						try {
							const newFileLocation = join(tmpdir(), `resized-${filename}`);
							await file
								.resize(512, 512, {
									fit: "contain",
									background: { r: 0, g: 0, b: 0, alpha: 0 },
								})
								.toFile(newFileLocation);
							finalFileLocation = newFileLocation;
						} catch (error) {
							errors.push(
								`Error while resizing asset ${url}: ${error.message}`
							);
							return;
						}
					}
				}

				const form = new FormData();
				form.append("file", createReadStream(finalFileLocation), {
					filename,
					contentType: mimeType,
				});

				try {
					//* If the asset already exists, make a put request instead of a post request
					if (await this.doesAssetExist(newUrl)) {
						await got.put(newUrl, {
							body: form,
							headers: {
								...form.getHeaders(),
								Authorization: process.env.CDN_TOKEN,
							},
							retry: {
								limit: 0,
							},
						});
					} else {
						await got.post(newUrl, {
							body: form,
							headers: {
								...form.getHeaders(),
								Authorization: process.env.CDN_TOKEN,
							},
							retry: {
								limit: 0,
							},
						});
					}
				} catch (error) {
					errors.push(
						`Failed to upload asset ${url} to ${newUrl} (${
							"request" in error ? error.request.method : ""
						}): ${"message" in error ? error.message : error.toString()}`
					);
				}
			})
		);
		return errors;
	}

	async deleteAssets(assets: string[] | Set<string>) {
		let errors: string[] = [];
		await Promise.all(
			[...assets].map(async asset => {
				try {
					if (!(await this.doesAssetExist(asset))) return;
					await got.delete(asset, {
						headers: {
							Authorization: process.env.CDN_TOKEN,
						},
					});
				} catch (error) {
					errors.push(
						`Failed to delete asset ${asset}: ${
							"message" in error ? error.message : error.toString()
						}`
					);
				}
			})
		);
		return errors;
	}

	findMissing(numbers: number[]) {
		numbers.push(-1); //? Make sure there is at least one number in the array
		const max = Math.max(...numbers),
			min = Math.min(...numbers),
			missing = [];

		for (let i = min; i <= max; i++) if (!numbers.includes(i)) missing.push(i);

		return missing;
	}

	async replaceInFiles(replacements: Map<string, string>) {
		const allFiles = await this.allTsFiles();
		await Promise.all(
			allFiles.map(async tsfile => {
				let file = await readFile(tsfile, "utf8"),
					changed = false;

				for (const [oldUrl, newUrl] of replacements) {
					if (!file.includes(oldUrl)) continue;
					file = file.replaceAll(oldUrl, newUrl);
					changed = true;
				}

				if (changed) {
					await writeFile(tsfile, file, {
						encoding: "utf8",
					});
				}
			})
		);

		let metadata = await readFile(
				resolve(this.presenceFolder, "metadata.json"),
				"utf8"
			),
			changed = false;

		for (const [oldUrl, newUrl] of replacements) {
			if (!metadata.includes(oldUrl)) continue;
			metadata = metadata.replaceAll(oldUrl, newUrl);
			changed = true;
		}

		if (changed) {
			await writeFile(resolve(this.presenceFolder, "metadata.json"), metadata, {
				encoding: "utf8",
			});
		}
	}
}
