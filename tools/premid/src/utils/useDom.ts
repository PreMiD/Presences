/* eslint-disable unicorn/filename-case */
export function useDom() {
	const { href, pathname, search, hash, host, hostname, origin, port, protocol } = document.location;
	return {
		$: document.querySelector.bind(document),
		$$: document.querySelectorAll.bind(document),
		$class: document.getElementsByClassName.bind(document),
		$id: document.getElementById.bind(document),
		$name: document.getElementsByName.bind(document),
		$tag: document.getElementsByTagName.bind(document),
		body: document.body,
		hash,
		host,
		hostname,
		href,
		origin,
		pathname,
		port,
		protocol,
		search: new URLSearchParams(search),
		searchRaw: search,
		title: document.title,
	};
}
