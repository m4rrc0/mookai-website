function computeRanges(fluidConfig) {
	const minTypeScaleQuad = Math.sqrt(Math.sqrt(fluidConfig.minTypeScale));
	const maxTypeScaleQuad = Math.sqrt(Math.sqrt(fluidConfig.maxTypeScale));

	// let negRangesMin = new Array(fluidConfig.negativeSteps);
	// negRangesMin.map((v, i) => {
	// 	console.log(fluidConfig.minFontSize / fluidConfig.minTypeScale ** i);
	// 	return fluidConfig.minFontSize / fluidConfig.minTypeScale ** i;
	// });
	const negRangesMin = Array.from(Array(fluidConfig.negativeSteps * 4)).map((v, i, arr) => {
		const revI = arr.length - i;
		return Number(
			(fluidConfig.minFontSize / minTypeScaleQuad ** revI).toFixed(fluidConfig.rounding)
		);
	});
	const posRangesMin = Array.from(Array(fluidConfig.positiveSteps * 4)).map((v, i) => {
		return Number(
			(fluidConfig.minFontSize * minTypeScaleQuad ** (i + 1)).toFixed(fluidConfig.rounding)
		);
	});
	const negRangesMax = Array.from(Array(fluidConfig.negativeSteps * 4)).map((v, i, arr) => {
		const revI = arr.length - i;
		return Number(
			(fluidConfig.maxFontSize / maxTypeScaleQuad ** revI).toFixed(fluidConfig.rounding)
		);
	});
	const posRangesMax = Array.from(Array(fluidConfig.positiveSteps * 4)).map((v, i) => {
		return Number(
			(fluidConfig.maxFontSize * maxTypeScaleQuad ** (i + 1)).toFixed(fluidConfig.rounding)
		);
	});

	const rangePrefix = "s";
	const rangePlusfix = "+";
	// const decimalFix = ".";

	const rangesMins = negRangesMin.concat([fluidConfig.minFontSize], posRangesMin);
	const rangesMaxs = negRangesMax.concat([fluidConfig.maxFontSize], posRangesMax);
	const ranges = rangesMins.reduce((accu, current, i) => {
		const stepQuad = (i - fluidConfig.negativeSteps * 4) / 4;
		const isRoundStep = stepQuad % 1 == 0;
		// const stepQuadStr = stepQuad.toString().replace(".", decimalFix);
		const stepQuadStr = stepQuad.toString();
		const stepPlus1 = rangesMaxs[i + 4];
		const stepPlus2 = rangesMaxs[i + 8];
		const stepPlus3 = rangesMaxs[i + 12];

		const key = `${rangePrefix}${stepQuadStr}`;
		// console.log({ key });
		return {
			...accu,
			...{
				[key]: [rangesMins[i], rangesMaxs[i]],

				...(isRoundStep && stepPlus1
					? { [key + rangePlusfix + "1"]: [rangesMins[i], stepPlus1] }
					: {}),

				...(isRoundStep && stepPlus2
					? { [key + rangePlusfix + "2"]: [rangesMins[i], stepPlus2] }
					: {}),

				...(isRoundStep && stepPlus3
					? { [key + rangePlusfix + "3"]: [rangesMins[i], stepPlus3] }
					: {}),
			},
		};
	}, {});

	return ranges;
}

export default computeRanges;
