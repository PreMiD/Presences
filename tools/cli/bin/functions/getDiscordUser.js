import { gql } from "@apollo/client/core/index.js";
import { apollo } from "../util/apollo.js";
export default async function getDiscordUser(id) {
    const user = await apollo.query({
        query: gql `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGlzY29yZFVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL2dldERpc2NvcmRVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFVBQVUsY0FBYyxDQUFDLEVBQVU7SUFDdEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUU1QjtRQUNGLEtBQUssRUFBRSxHQUFHLENBQUE7Ozs7OztHQU1UO1FBQ0QsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFO0tBQ2pCLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9