import { readFile } from "fs/promises";
import { globby } from "globby";
export default async function getPresences() {
    const [presences, versionedPresences] = await Promise.all([
        globby("websites/*/*/metadata.json"),
        globby("websites/*/*/v*/metadata.json"),
    ]);
    return (await Promise.all([
        ...presences.map(async (path) => {
            const metadata = JSON.parse(await readFile(path, "utf-8"));
            return {
                metadata,
                versioned: false,
                path: path.replace("/metadata.json", ""),
            };
        }),
        ...versionedPresences.map(async (path) => {
            const metadata = JSON.parse(await readFile(path, "utf-8"));
            return {
                metadata,
                versioned: true,
                path: path.replace("/metadata.json", ""),
            };
        }),
    ])).sort((a, b) => {
        if (a.metadata.service === b.metadata.service)
            return a.metadata.apiVersion - b.metadata.apiVersion;
        return a.metadata.service.localeCompare(b.metadata.service);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJlc2VuY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy9nZXRQcmVzZW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxVQUFVLFlBQVk7SUFDekMsTUFBTSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN6RCxNQUFNLENBQUMsNEJBQTRCLENBQUM7UUFDcEMsTUFBTSxDQUFDLCtCQUErQixDQUFDO0tBQ3ZDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FDTixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDakIsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsRUFBRTtZQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU87Z0JBQ04sUUFBUTtnQkFDUixTQUFTLEVBQUUsS0FBSztnQkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO2FBQ3hDLENBQUM7UUFDSCxDQUFDLENBQUM7UUFDRixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEVBQUU7WUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzRCxPQUFPO2dCQUNOLFFBQVE7Z0JBQ1IsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO2FBQ3hDLENBQUM7UUFDSCxDQUFDLENBQUM7S0FDRixDQUFDLENBQ0YsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDZixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTztZQUM1QyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDIn0=