import bagua, { definitions, lineInfo } from "./definitions";
import Hexagram from "./components/Hexagram";

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getRandomLineNumbersArray() {
	let result = [];
	for (let i = 0; i < 6; i++) {
		result.push(getRandomInt(4) + 6);
	}
	return result;
}

function getLineNumbersStringFromArray(array) {
	let result = "";
	array?.map((num) => (result += num));
	return result;
}

function getBagua(lines) {
	let boolArr;
	for (const key of Object.keys(bagua)) {
		boolArr = bagua[key]["yang booleans"];
		for (let i = 0; i < boolArr.length; i++) {
			if (lines[i] !== boolArr[i]) {
				break;
			}
			if (i === 2) {
				return key;
			}
		}
	}
}

function convertLinesToBooleanArray(lines) {
	let holder = [];
	for (const line of lines) {
		holder.push(lineInfo[line].isYang);
	}
	return holder;
}

function changeLines(lines) {
	let result = [];
	for (const line of lines) {
		result.push(line === 9 ? 8 : line === 6 ? 7 : line);
	}
	return result;
}

function getChangingLines(lines) {
	let result = [];
	for (let i = 0; i < lines.length; i++) {
		if (lines[i] === 9 || lines[i] === 6) {
			result.push(-1 * i + 6);
		}
	}
	return result;
}

function getDefinition(hexagram, changingLines) {
	const definition = definitions[hexagram];
	let result = {},
		keys = ["number", "title"];
	if (changingLines.length === 0 || changingLines.length > 3) {
		keys.push("definition");
	} else {
		result["changing"] = {};
		for (const index of changingLines) {
			result["changing"][index] = definition[index];
		}
	}
	for (const key of keys) {
		result[key] = definition[key];
	}
	return result;
}

function getReading(array) {
	const castLinesArray = array,
		changingLines = getChangingLines(castLinesArray),
		topLines1 = castLinesArray.slice(0, 3),
		bottomLines1 = castLinesArray.slice(3),
		top1 = getBagua(convertLinesToBooleanArray(topLines1)),
		bottom1 = getBagua(convertLinesToBooleanArray(bottomLines1)),
		topLines2 = changeLines(topLines1),
		bottomLines2 = changeLines(bottomLines1),
		top2 = getBagua(convertLinesToBooleanArray(topLines2)),
		bottom2 = getBagua(convertLinesToBooleanArray(bottomLines2)),
		result = {
			castLinesArray: castLinesArray,
			changingLines: changingLines,
			top1: top1,
			bottom1: bottom1,
			topLines1: topLines1,
			bottomLines1: bottomLines1,
			hexagram1: (
				<Hexagram
					top={top1}
					bottom={bottom1}
					topLines={topLines1}
					bottomLines={bottomLines1}
					castLinesArray={castLinesArray}
				/>
			),
			hexagram2: (
				<Hexagram
					top={top2}
					bottom={bottom2}
					topLines={topLines2}
					bottomLines={bottomLines2}
					castLinesArray={castLinesArray}
				/>
			),
		};
	const hexagram1Key = top1 + "/" + bottom1,
		hexagram2Key = top2 + "/" + bottom2;
	result["definition1"] = getDefinition(hexagram1Key, changingLines);
	result["definition2"] = getDefinition(hexagram2Key, []);
	return result;
}

export default getReading;
export { getRandomLineNumbersArray, getLineNumbersStringFromArray };
