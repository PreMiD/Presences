import { Client, User } from "discord-rpc";

export let user: User | undefined;

export default function getDiscordAppUser() {
	return new Promise<User | undefined>(async res => {
		if (user) return res(user);

		const client = new Client({ transport: "ipc" });

		const t = setTimeout(() => {
			if (user) return res(user);

			client.destroy().catch(() => {});
			res(undefined);
		}, 500);

		try {
			await client.login({ clientId: "503557087041683458" });
			clearTimeout(t);
			await client.destroy();
		} catch {}

		user = client.user;

		res(client.user);
	});
}
