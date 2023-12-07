import { randomChoice } from '../../(lib)/utils';

const initialHooks = [
	'Ever wondered how Astarion feels about BG3 dice rolls?',
	'Trying to tackle BG3 dice like facing a Mind Flayer?',
	'Navigating dice rolls tougher than traversing the Underdark?',
	'Feeling like a lost Githyanki with BG3 dice?',
	'Seeking answers like a Warlock seeking their Patron in BG3?',
	"Volo's tales got nothing on your BG3 dice woes?",
	'Battling dice mechanics harder than facing the Zhentarim?',
	'Lost in dice rolls like a rogue in the Shadows of BG3?',
	'Rolling dice tougher than persuading a Tiefling?',
	'Seeking clarity on dice like hunting for the Absolute?',
	'Got BG3 dice troubles as vast as the Sword Coast?',
	"Handling dice rolls as mysterious as Gale's past?",
	'In a duel with BG3 dice like facing off with Drow?',
	"Seeking a Druid's wisdom for those BG3 rolls?",
	"Navigating dice more confusing than Larian's plot twists?",
	"Trying to charm dice like Lae'zel charms a crowd?",
	'Dice mystery deeper than the murk of the Baldurian swamps?',
	'Tackling dice like braving a Faerûnian storm?',
	"Rolling dice feels like navigating the politics of Baldur's Gate?",
	"Ever felt like a Halfling in a Giant's world with BG3 dice?"
];

const problemResolutions = [
	"Dweller's Dice Companion has got your back.",
	"Turn to Dweller's Dice Companion for clarity.",
	"Dweller's Dice Companion is your beacon in the dice fog.",
	"Seek refuge in the wisdom of Dweller's Dice Companion.",
	"Let Dweller's Dice Companion be your guiding star.",
	"Experience dice enlightenment with Dweller's Dice Companion.",
	"Dweller's Dice Companion is your BG3 sage.",
	"Decipher dice intricacies with Dweller's Dice Companion.",
	"Master the roll with Dweller's Dice Companion.",
	"Dweller's Dice Companion, your trusted ally in the dice realm.",
	"Unravel dice riddles with Dweller's Dice Companion.",
	"Embark on a guided journey with Dweller's Dice Companion.",
	"Navigate the dice chaos with Dweller's Dice Companion.",
	"With Dweller's Dice Companion, every roll has a meaning.",
	"Unlock BG3's dice secrets with Dweller's Dice Companion.",
	"Dweller's Dice Companion: Your guide in the BG3 realm.",
	"Step confidently with Dweller's Dice Companion leading the way.",
	"Solve every dice enigma with Dweller's Dice Companion.",
	"Journey deeper into BG3 with Dweller's Dice Companion.",
	"Dice, unraveled. Thanks to Dweller's Dice Companion."
];

const exciters = [
	'🎲 Let Tymora favor your rolls!',
	'🚀 Soar higher than a Pegasus!',
	'🔥 Burn brighter than a Fireball spell!',
	'🌟 Shine like the blessing of Lathander!',
	"✨ May Mystra's magic guide you!",
	"🎮 Play with the might of a Beholder's gaze!",
	'💡 Illuminate the dice like the Light cantrip!',
	'🧙‍♂️ Channel the wisdom of Bhaal!',
	'🛡️ Stand tall like a stalwart Paladin!',
	"🔄 Reverse fortune like a Cleric's healing!",
	'💥 Strike like a lightning bolt from Talos!',
	'🏆 Win like a champion of Tempus!',
	'📖 Read dice like a Scroll of Wisdom!',
	'🕹️ Navigate rolls like a Ranger in the wilds!',
	"🌀 Tap into the vortex of Shar's might!",
	'🌠 Have Selûne light your dice path!',
	'🔮 Foresee rolls like a Divination wizard!',
	'⚔️ Slice through confusion like a Vorpal blade!',
	"🎉 Revel with the joy of a Bard's song!",
	'📱 Dive deep, guarded by the Helm!'
];

export const generateMessage = () =>
	randomChoice(initialHooks) +
	'\n' +
	randomChoice(problemResolutions) +
	'\n' +
	randomChoice(exciters);
