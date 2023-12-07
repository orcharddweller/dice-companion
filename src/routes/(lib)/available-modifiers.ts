import type { Modifier } from './types';

export const availableModifiers: (Modifier & { reasons: string[] })[] = [
	{
		type: 'constant',
		value: 1,
		positive: true,
		reasons: ['Lucky Charm', 'Minor Blessing', 'Tailwind Gust']
	},
	{
		type: 'constant',
		value: 2,
		positive: true,
		reasons: ['Helpful Sprite', 'Favorable Omen', 'Sudden Insight']
	},
	{
		type: 'constant',
		value: 3,
		positive: true,
		reasons: ['Potent Talisman', 'Divine Favor', 'Brilliant Tactic']
	},
	{
		type: 'constant',
		value: 4,
		positive: true,
		reasons: ["Hero's Inspiration", 'Magic Surge', 'Clever Ruse']
	},
	{
		type: 'constant',
		value: 5,
		positive: true,
		reasons: ["Dragon's Blessing", 'Star Alignment', 'Epic Epiphany']
	},
	{
		type: 'constant',
		value: 1,
		positive: false,
		reasons: ['Tripped Stone', 'Mild Curse', 'Unlucky Break']
	},
	{
		type: 'constant',
		value: 2,
		positive: false,
		reasons: ['Stubbed Toe', 'Pesky Ghost', 'Tactical Blunder']
	},
	{
		type: 'constant',
		value: 3,
		positive: false,
		reasons: ['Cursed Amulet', 'Divine Test', 'Tricky Riddle']
	},
	{
		type: 'constant',
		value: 4,
		positive: false,
		reasons: ["Monster's Roar", 'Magic Backfire', 'Bad Distraction']
	},
	{
		type: 'constant',
		value: 5,
		positive: false,
		reasons: ["Dragon's Curse", 'Star Misalignment', 'Epic Misstep']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 4 },
		positive: true,
		reasons: ["Pixie's Mischief", "Fortune's Smile", 'Sudden Tailwind']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 6 },
		positive: true,
		reasons: ['Fairy Dust', 'Lucky Starfall', 'Wise Old Owl']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 8 },
		positive: true,
		reasons: ["Elf's Whimsy", 'Divine Wind', 'Inspired Maneuver']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 10 },
		positive: true,
		reasons: ['Winged Pegasus', 'Magic Overflow', 'Cunning Gambit']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 12 },
		positive: true,
		reasons: ['Lucky Dragonfly', 'Celestial Favor', 'Genius Stratagem']
	},

	{
		type: 'random',
		dice: { n: 1, sides: 4 },
		positive: false,
		reasons: ['Goblin Prank', "Misfortune's Gaze", 'Surprise Gust']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 6 },
		positive: false,
		reasons: ['Toadstool Spores', 'Fallen Star', 'Clueless Sparrow']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 8 },
		positive: false,
		reasons: ["Imp's Joke", 'Divine Test', 'Confused Strategy']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 10 },
		positive: false,
		reasons: ['Wild Minotaur', 'Magic Short-circuit', 'Failed Feint']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 12 },
		positive: false,
		reasons: ['Unlucky Black Cat', 'Celestial Challenge', 'Botched Plan']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 20 },
		positive: true,
		reasons: ['Rainbow Unicorn', 'Cosmic Dance', 'Legendary Wisdom']
	},
	{
		type: 'random',
		dice: { n: 1, sides: 20 },
		positive: false,
		reasons: ['Charging Rhino', 'Cosmic Mishap', 'Legendary Blunder']
	}
];
