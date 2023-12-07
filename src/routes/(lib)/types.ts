export type Dice = {
	n: number;
	sides: number;
};

export type Modifier =
	| {
			type: 'constant';
			positive: boolean;
			value: number;
	  }
	| {
			type: 'random';
			positive: boolean;
			dice: Dice;
	  };

export type Range = {
	from: number;
	to: number;
};

export type DistributionPmf = {
	type: 'pmf';
	min: number;
	values: number[];
};

export type DistributionCdf = {
	type: 'cdf';
	min: number;
	values: number[];
};

export type RawRoll = {
	id: number;
	result1: number;
	result2: number;
	bonus: number;
};

export type Roll = {
	id: number;
	result: number;
	bonus: number;
};

export type Tab = 'main' | 'results' | 'stats';
