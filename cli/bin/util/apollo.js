import { ApolloClient, HttpLink, InMemoryCache, } from "@apollo/client/core/index.js";
import fetch from "cross-fetch";
export const apollo = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        fetch: fetch,
        uri: "https://api.premid.app/v3",
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBvbGxvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYXBvbGxvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTixZQUFZLEVBQ1osUUFBUSxFQUNSLGFBQWEsR0FDYixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQztBQUVoQyxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUM7SUFDdEMsS0FBSyxFQUFFLElBQUksYUFBYSxFQUFFO0lBQzFCLElBQUksRUFBRSxJQUFJLFFBQVEsQ0FBQztRQUNsQixLQUFLLEVBQUUsS0FBSztRQUNaLEdBQUcsRUFBRSwyQkFBMkI7S0FDaEMsQ0FBQztDQUNGLENBQUMsQ0FBQyJ9