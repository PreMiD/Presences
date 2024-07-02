import { gql } from "@apollo/client/core/index.js";

import { apollo } from "../util/apollo.js";

export default async function getDiscordUser(id: string) {
	const user = await apollo.query<{
		discordUsers: ({ username?: string } | null)[];
	}>({
		query: gql`
			query getUser($id: String) {
				discordUsers(userId: $id) {
					username
				}
			}
		`,
		variables: { id },
	});

	return user.data.discordUsers[0];
}
