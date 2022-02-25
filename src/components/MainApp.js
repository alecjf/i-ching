import "../css/main-app.css";
import { useEffect } from "react";
import bagua, { lineInfo } from "../definitions";
import getReading, {
	getRandomLineNumbersArray,
	getLineNumbersStringFromArray,
} from "../reading";
import fhLogo from "../images/fern-haus-site-logo.png";

const MainApp = (props) => {
	function getCastLinesArray() {
		const urlParams = new URLSearchParams(window.location.search),
			myParam = urlParams.get("casting");
		if (!myParam || myParam.length !== 6) {
			return null;
		}
		let parsed,
			result = [];
		for (const digit of myParam) {
			parsed = +digit;
			if (6 <= parsed && parsed <= 9) {
				result.push(parsed);
			} else {
				return null;
			}
		}
		return result;
	}

	const castLinesArray = getCastLinesArray(),
		state = castLinesArray ? getReading(getCastLinesArray(), false) : null,
		baguaParam = new URLSearchParams(window.location.search).get("bagua");

	// for external links that have baguaParam, go straight to #bagua-info
	useEffect(() => {
		if (baguaParam) {
			window.scrollTo(
				0,
				document.getElementById("bagua-info")?.offsetTop
			);
		}
	});

	function formatDefinition(definition, doNotShowHeader) {
		return (
			<div className="definition-container">
				<div className="title">
					<h2>
						{definition.number}. {definition.title}
					</h2>
				</div>
				{definition.definition && (
					<div className="definition">{definition.definition}</div>
				)}
				{!doNotShowHeader && (
					<div className="header-footer header">
						{state.changingLines.length} CHANGING LINE
						{state.changingLines.length !== 1 && "S"}
					</div>
				)}
				{definition.changing && (
					<table id="changing-lines-table">
						<thead>
							<tr>
								<th>line #</th>
								<th>type</th>
								<th>definition</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(definition.changing).map((key) => {
								const lineIndex = (key - 6) * -1,
									lineType = lineInfo[
										state.castLinesArray[lineIndex]
									].isYang
										? "Yang"
										: "Yin";
								return (
									<tr
										key={`changin-line-${definition.changing[key]}`}
									>
										<td>{key}</td>
										<td>{lineType}</td>
										<td>{definition.changing[key]}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		);
	}

	return (
		<>
			<header>
				<a
					href="https://fern.haus/"
					className="fern-haus-link"
					target="_blank"
					rel="noreferrer"
				>
					<section className="fern-haus-info">
						<img
							src={fhLogo}
							alt="Fern Haus Logo - House with Port Window and Fern Vines"
						/>
						<h4>fern.haus</h4>
					</section>
				</a>
				<section id="i-ching-header">
					<h1>I-Ching</h1>
					<h2>Consult the Online Oracle</h2>
				</section>
				<h3>
					Learn all about the 8 trigrams and their 64 hexagrams that
					make up the I-Ching.
				</h3>
				<h3>
					Each reading consists of changing and/or unchanging lines.
					The changing lines are gold and they transform the top
					hexagram into the hexagram below. The number of changing
					lines determines which parts of the hexagrams to read.
				</h3>
				<br />
				<a
					id="cast-lines-link"
					href={
						"./?casting=" +
						getLineNumbersStringFromArray(
							getRandomLineNumbersArray()
						) +
						"#hex-container"
					}
				>
					CAST RANDOM LINES
				</a>
				<br />
				<br />
			</header>
			<div id="hex-container">
				<div id="hexagrams">
					{state && (
						<>
							<hr />
							<div>
								<div className="hexagram">
									{state.hexagram1}
									{formatDefinition(state.definition1)}
								</div>
								<div
									className="hexagram"
									style={{
										display:
											state.changingLines.length > 1
												? "block"
												: "none",
									}}
								>
									<div className="header-footer footer">
										Resulting Hexagram
									</div>
									{state.hexagram2}
									{formatDefinition(state.definition2, true)}
								</div>
							</div>
						</>
					)}
				</div>
				{baguaParam && formatBaguaInfo(baguaParam)}
			</div>
			{state && (
				<footer>
					<a
						href="https://fern.haus/"
						className="fern-haus-link"
						target="_blank"
						rel="noreferrer"
					>
						<section className="fern-haus-info">
							<img
								src={fhLogo}
								alt="Fern Haus Logo - House with Port Window and Fern Vines"
							/>
							<h4>fern.haus</h4>
						</section>
					</a>
				</footer>
			)}
		</>
	);
};

function formatBaguaInfo(aBagua) {
	if (!aBagua || !Object.keys(bagua).includes(aBagua)) {
		return <></>;
	}
	const baguaInfo = bagua[aBagua];
	return (
		<div id="bagua-info">
			<hr />
			<table>
				<thead>
					<tr>
						<th colSpan="2">
							<h2>BAGUA INFO</h2>
							<h3>{aBagua}</h3>
						</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(baguaInfo).map((key) => {
						if (key !== "yang booleans") {
							return (
								<tr key={"row-" + key}>
									<td>{key}</td>
									<td>
										{baguaInfo[key] instanceof Array &&
										baguaInfo[key].length > 1 ? (
											<ul>
												{baguaInfo[key]
													.sort()
													.map((item) => (
														<li
															key={
																"bagua-info-" +
																key +
																"-" +
																item
															}
														>
															{item}
														</li>
													))}
											</ul>
										) : (
											baguaInfo[key]
										)}
									</td>
								</tr>
							);
						} else {
							return (
								<tr
									key={"empty-row-" + key}
									style={{ display: "none" }}
								></tr>
							);
						}
					})}
				</tbody>
			</table>
		</div>
	);
}

export default MainApp;
export { formatBaguaInfo };
