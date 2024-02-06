import type { MergeText } from "../utils.js";

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
		head: document.head,
		host,
		hostname,
		href,
		/**
		 * Remove an event listener from the document or window
		 */
		off: <K extends MergeText<"window.", keyof WindowEventMap> | MergeText<"document.", keyof DocumentEventMap>>(
			key: K,
			listener: EventListenerOrEventListenerObject,
			options?: boolean | EventListenerOptions
		) => {
			const [target, event] = key.split(".") as ["window" | "document", string];
			target === "document" ? document.removeEventListener(event, listener, options) : window.removeEventListener(event, listener, options);
		},
		/**
		 * Add an event listener to the document or window
		 */
		on: <K extends MergeText<"window.", keyof WindowEventMap> | MergeText<"document.", keyof DocumentEventMap>>(
			key: K,
			listener: EventListenerOrEventListenerObject,
			options?: boolean | AddEventListenerOptions
		) => {
			const [target, event] = key.split(".") as ["window" | "document", string];
			target === "document" ? document.addEventListener(event, listener, options) : window.addEventListener(event, listener, options);
		},
		origin,
		pathname,
		port,
		protocol,
		readyState: document.readyState,
		search: new URLSearchParams(search),
		searchRaw: search,
		title: document.title,
	};
}
