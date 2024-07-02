import { readFile } from "fs/promises";
import { globby } from "globby";
export default async function isFirstTimeAuthor(author) {
    for (const m of await globby("websites/*/*/metadata.json")) {
        const { author: { id }, } = JSON.parse(await readFile(m, "utf-8"));
        if (author !== id)
            continue;
        return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNGaXJzdFRpbWVBdXRob3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL2lzRmlyc3RUaW1lQXV0aG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxNQUFjO0lBQzdELEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxNQUFNLENBQUMsNEJBQTRCLENBQUMsRUFBRTtRQUMzRCxNQUFNLEVBQ0wsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQ2QsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksTUFBTSxLQUFLLEVBQUU7WUFBRSxTQUFTO1FBRTVCLE9BQU8sS0FBSyxDQUFDO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUMifQ==