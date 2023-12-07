import type { Action } from 'svelte/action';
export function assertIsNode(e: EventTarget | null): asserts e is Node {
	if (!e || !('nodeType' in e)) {
		throw new Error(`Node expected`);
	}
}

export const clickOutside: Action<HTMLElement, undefined, { 'on:outclick': () => void }> = (
	node
) => {
	const handleClick = (event: MouseEvent) => {
		assertIsNode(event.target);

		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
