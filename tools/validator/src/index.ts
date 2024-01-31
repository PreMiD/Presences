import { object, safeParseAsync, string } from "valibot";

export async function validate(input: unknown) {
	const { success, issues, output } = await safeParseAsync(
		object({
			foo: string(),
		}),
		input
	);

	if (!success) {
		console.log("Issues:", issues);
		return false;
	}

	console.log("Output:", output);
	return true;
}

export default validate;
