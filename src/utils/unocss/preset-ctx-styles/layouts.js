export const rules = [
	[
		// Matches "box" and "box>modifiers..."
		// /^box(?![a-zA-Z-:_])>?([\w->]+)?$/, // Less specific version
		/^box(?:$|>no-border)+$/,
		([match], { symbols }) => {
			const modifiers = match?.split(">").slice(1);

			const isNoBorder = modifiers?.includes("no-border");

			return [
				{ display: "block" },
				{
					padding: "var(--padding-box, 1rem)",
					border: "var(--border-width-box, 1px) var(--border-style-box, solid)",
				},
				{
					// For high contrast mode if no border
					[symbols.selector]: (selector) =>
						`:where(${selector}.no-border), :where(${selector}.border-0)`,
					border: "none",
					outline: "var(--border-width-box) solid transparent",
					"outline-offset": "calc(var(--border-width-box) * -1)",
				},
				...(isNoBorder
					? [
							{
								content: "''", // hack to force rule to not be merged because it messes up the rules order and the cascade
								border: "none",
								outline: "var(--border-width-box) solid transparent",
								"outline-offset": "calc(var(--border-width-box) * -1)",
							},
						]
					: []),
			];
		},
		{ layer: "layouts" },
	],
	[
		// /^stack-?([-\w]+)?$/,
		/^stack(?:$|>recursive|>horizontal|>split-after-.+)+$/i,
		([match], { symbols }) => {
			const modifiers = match?.split(">").slice(1);

			const isRecursive = modifiers?.includes("recursive");
			const isHorizontal = modifiers?.includes("horizontal");
			// NOTE: I never use the "stop" modifier. Should I keep it?
			// const isStop = modifiers?.includes("stop");
			// check if there is a "splitafterX" string in the modifiers array and extract X which is an integer
			const splitAfterIndex = modifiers?.findIndex((mod) => /^split-after-/i.test(mod));

			const splitAfter =
				splitAfterIndex > -1 ? parseInt(modifiers?.[splitAfterIndex].slice(12)) : undefined;

			const flexDirection = isHorizontal ? "row" : "column";
			const logicalDir = isHorizontal ? "inline" : "block";
			const recursiveSelector = isRecursive ? "*" : "> *";

			// console.log(match, splitAfter);

			return [
				// Setup
				{ display: "flex" },
				{ "flex-direction": flexDirection },
				{ "justify-content": "flex-start" },
				...(isHorizontal ? [{ "align-items": "center" }] : []),
				{
					// TODO: check if needed when horizontal
					[symbols.selector]: (selector) => `:where(${selector}:only-child)`,
					// 	block-size: 100%;
					[logicalDir + "-size"]: "100%",
				},
				// Margins
				{
					[symbols.selector]: (selector) => `:where(${selector} ${recursiveSelector})`,
					// 	margin-block: 0;
					["margin-" + logicalDir + "-start"]: 0,
				},
				{
					[symbols.selector]: (selector) => `:where(${selector} ${recursiveSelector}:not(.split))`,
					// 	margin-block: 0;
					["margin-" + logicalDir + "-end"]: 0,
				},
				{
					[symbols.selector]: (selector) => `:where(${selector} ${recursiveSelector} + *):not(x)`,
					// Set it to 0 by default as we might want to set a gap instead
					// 	margin-block-start: 1em;
					["margin-" + logicalDir + "-start"]: "var(--gap-stack, 0)",
				},
				// split after
				{
					[symbols.selector]: (selector) => `:where(${selector} > .split)`,
					["margin-" + logicalDir + "-end"]: "auto",
				},
				...(splitAfterIndex > -1
					? [
							{
								[symbols.selector]: (selector) =>
									`:where(${selector} > :nth-child(${splitAfter})):not(x)`, // increase specificity to 0,0,1 to be sure to override previous rules
								// content: "''", // hack to force rule to not be merged because it messes up the rules order and the cascade
								["margin-" + logicalDir + "-end"]: "auto",
							},
						]
					: [{}]),
			];
		},
		{ layer: "layouts" },
	],
	[
		// /^center-?([-\w]+)?$/,
		/^center(?:$|>intrinsic)+$/,
		([match], { symbols }) => {
			// const modifiers = modifsRaw?.split("-");
			const modifiers = match?.split(">").slice(1);

			const isIntrinsic = modifiers?.includes("intrinsic");

			return [
				// Setup
				// { "--center-gutters": "var(--padding, calc(var(--gap, 1em) / 2))" },
				{ display: "block" },
				{ "box-sizing": "content-box" },
				{ "margin-inline": "auto" },
				{ "max-inline-size": "var(--center-max-width, 60ch)" },
				{ "padding-inline": "var(--center-gutters)" },
				...(isIntrinsic
					? [{ display: "flex" }, { "flex-direction": "column" }, { "align-items": "center" }]
					: []),
			];
		},
		{ layer: "layouts" },
	],
	[
		/^cluster$/,
		([match], { symbols }) => {
			return [{ display: "flex" }, { "flex-wrap": "wrap" }];
		},
		{ layer: "layouts" },
	],
	[
		/^with-sidebar(?:$|>right)+$/,
		([match], { symbols }) => {
			const modifiers = match?.split(">").slice(1);

			const isRight = modifiers?.includes("right");
			const childMain = isRight ? "first" : "last";
			const childSidebar = isRight ? "last" : "first";

			return [
				{ display: "flex" },
				{ "flex-wrap": "wrap" },
				// Main child
				{
					[symbols.selector]: (selector) => `:where(${selector} > :${childMain}-child)`,
					"flex-basis": "0",
					"flex-grow": "999",
					"min-inline-size": "var(--content-min, 50%)",
				},
				// Sidebar child
				{
					[symbols.selector]: (selector) => `:where(${selector} > :${childSidebar}-child)`,
					"flex-basis": "var(--sidebar-width)",
					"flex-grow": 1,
				},
			];
		},
		{ layer: "layouts" },
	],
	[
		/^switcher(?:$|>limit-.+)+$/,
		([match], { symbols }) => {
			const modifiers = match?.split(">").slice(1);

			const limitIndex = modifiers?.findIndex((mod) => /^limit/i.test(mod));
			const limit = limitIndex > -1 ? parseInt(modifiers?.[limitIndex].slice(6)) : -1;

			return [
				{ display: "flex" },
				{ "flex-wrap": "wrap" },
				{
					[symbols.selector]: (selector) => `:where(${selector} > *)`,
					"flex-grow": "var(--switcher-grow, 1)" /* Should probably stay at 1 */,
					// /* TODO: is 30rem a good default? / Might use ch if we know the text length of all list elements */
					"flex-basis": "calc((var(--switcher-width-wrap, 30rem) - 100%) * 999)",
					// For reference: But I probably don't care about the gap
					// "flex-basis": "calc((var(--switcher-width-wrap, 20rem) - (100% - var(--gap))) * 999)",
				},
				...(limit > -1
					? [
							{
								[symbols.selector]: (selector) =>
									`:where(${selector} > :nth-last-child(n+${limit + 1})):not(x),
									:where(${selector} > :nth-last-child(n+${limit + 1}) ~ *):not(x)`,
								"flex-basis": "100%",
							},
						]
					: []),
			];
		},
		{ layer: "layouts" },
	],
	[
		/^cover(?:$|>center-.+)+$/,
		([match], { symbols }) => {
			const modifiers = match?.split(">").slice(1);

			const centerIndex = modifiers?.findIndex((mod) => /^center/i.test(mod));
			const centerSelector = centerIndex > -1 ? modifiers?.[centerIndex].slice(7) : undefined;

			return [
				// { "--gap-cover": "var(--gap, 1em)" },
				{ padding: "var(--gap-cover)" },
				{ display: "flex" },
				{ "flex-direction": "column" },
				{ "min-block-size": "var(--cover-min-height, 100vh)" },
				{
					[symbols.selector]: (selector) => `:where(${selector} > *)`,
					"margin-block": "var(--gap-cover)",
				},
				{
					[symbols.selector]: (selector) =>
						`:where(${selector} > :first-child:not(.centered)):not(x)`,
					"margin-block-start": 0,
				},
				{
					[symbols.selector]: (selector) =>
						`:where(${selector} > :last-child:not(.centered)):not(x)`,
					"margin-block-end": 0,
				},
				...(centerIndex > -1
					? [
							{
								[symbols.selector]: (selector) => `:where(${selector} > ${centerSelector}):not(x)`,
								"margin-block": "auto",
							},
						]
					: [
							{
								[symbols.selector]: (selector) => `:where(${selector} > .centered):not(x)`,
								"margin-block": "auto",
							},
						]),
			];
		},
		{ layer: "layouts" },
	],
	[
		/^grid-auto$/,
		([match], { symbols }) => {
			return [
				// { "--grid-min": "15ch" },
				// { "--gap-grid": "1rem" },
				{ display: "grid" },
				{ "grid-gap": "var(--gap-grid)" },
				// min() with 100% prevents overflow in extra narrow spaces
				{
					"grid-template-columns":
						"repeat(auto-fit, minmax(min(100%, var(--grid-min, 15ch)), 1fr))",
				},
			];
		},
		{ layer: "layouts" },
	],
	[
		/^frame(?:$|>child-.+)+$/,
		([match], { symbols }) => {
			const modifiers = match?.split(">").slice(1);

			const childIndex = modifiers?.findIndex((mod) => /^child/i.test(mod));
			const childSelector = childIndex > -1 ? modifiers?.[childIndex].slice(6) : "iframe";

			return [
				{ "aspect-ratio": "var(--aspect-ratio, 16/9)" },
				{ overflow: "hidden" },
				{ display: "flex" },
				{ "justify-content": "center" },
				{ "align-items": "center" },
				{
					[symbols.selector]: (selector) =>
						`:where(${selector} img), :where(${selector} video), :where(${selector} ${childSelector})`,
					"inline-size": "100%",
					"block-size": "100%",
					"object-fit": "var(--object-fit-frame, cover)",
				},
			];
		},
		{ layer: "layouts" },
	],
	// TODO: reel
	// TODO: Imposter
	// TODO: Icon
	// TODO: Container

	// Other classic layouts ?
];
