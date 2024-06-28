export const rules = [
	[
		/^sideways-lr$/,
		(match, { symbols }) => {
			return [
				{ "writing-mode": "sideways-lr" },
				{
					[symbols.parent]: "@supports (not (writing-mode: sideways-lr))",
					"writing-mode": "vertical-rl",
					transform: "rotate(-180deg)",
				},
			];
		},
		{ layer: "components" },
	],
];
