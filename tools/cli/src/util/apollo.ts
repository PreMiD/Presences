import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
} from "@apollo/client/core/index.js";
import fetch from "cross-fetch";

export const apollo = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		fetch: fetch,
		uri: "https://api.premid.app/v3",
	}),
});
