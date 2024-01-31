import type { FontAwesomeIcon, SemanticVersion, Snowflake, UUID } from "@presences/types";
import * as v from "valibot";

const uuid = v.string([v.uuid()]) as v.StringSchema<UUID>,
	snowflake = v.string([
		v.custom(id => {
			let valid = true;
			try {
				valid = typeof id === "string" && BigInt(id).toString() === id && id.length >= 18 && BigInt(id) <= BigInt("9223372036854775807");
			} catch {
				valid = false;
			}
			return valid;
		}, "This is not a valid Snowflake."),
	]) as v.StringSchema<Snowflake>,
	semver = v.string([
		v.custom(version => typeof version === "string" && /^\d+\.\d+\.\d+$/.test(version), "This is not a valid Semantic Version."),
	]) as v.StringSchema<SemanticVersion>,
	color = v.string([
		v.custom(
			color =>
				typeof color === "string" &&
				(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.test(color) ||
					/^rgb\((?:\d{1,3},\s?){2}\d{1,3}\)$/i.test(color) ||
					/^rgba\((?:\d{1,3},\s?){3}\d(\.\d+)?\)$/i.test(color) ||
					/^hsl\(\d{1,3}(?:,\s?\d{1,3}%){2}\)$/i.test(color) ||
					/^hsla\(\d{1,3}(?:,\s?\d{1,3}%){2},\s?\d(\.\d+)?\)$/i.test(color)),
			"This is not a valid color."
		),
	]),
	icon = v.string([
		v.custom(icon => typeof icon === "string" && /^((fas|far|fal|fad|fat|fab) fa-)[\da-z]+(-[\da-z]+)*$/.test(icon), "This is not a valid Font Awesome icon."),
	]) as v.StringSchema<FontAwesomeIcon>;
