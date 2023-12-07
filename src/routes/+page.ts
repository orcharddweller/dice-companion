export const prerender = true;

import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		meta: {
			title: `Dweller's Dice Companion`,
			description: `This tool will give you an advantage 🎲 when learning dice rolls in Baldur's Gate 3 and D&D 5E.`,
			keywords: [
				"baldur's gate 3",
				'bg3',
				'd&d',
				'dice',
				'orchard dweller',
				'dice calculator',
				'dice odds',
				'dice probabilities',
				'probability calculator'
			]
		}
	};
}) satisfies PageLoad;
