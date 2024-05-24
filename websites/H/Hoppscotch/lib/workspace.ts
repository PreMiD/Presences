type Workspace =
	| { kind: "Personal" }
	| { kind: "Team"; name: string }
	| { kind: "Error" };

const getWorkspace = (): Workspace => {
	// eslint-disable-next-line no-one-time-vars/no-one-time-vars
	const personalWorkspaceIcon = document.querySelector(
		'svg:has(circle[cx="12"][cy="7"]'
	);

	if (personalWorkspaceIcon) return { kind: "Personal" };

	const teamWorkspace = document.querySelector(
		'svg:has(path[d="M22 21v-2a4 4 0 0 0-3-3.87m-3-12a4 4 0 0 1 0 7.75"])+div'
	);

	if (teamWorkspace?.textContent)
		return { kind: "Team", name: teamWorkspace.textContent };
	else return { kind: "Error" };
};

export const getWorkspaceName = (): string => {
	const workspace = getWorkspace();

	if (workspace.kind === "Personal") return "📂 | Personal Workspace";

	if (workspace.kind === "Team") return `📂 | ${workspace.name}`;

	return "📂 | Unknown workspace";
};
