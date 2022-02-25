import Bagua from "./Bagua";

const Hexagram = (props) => {
	function makeHeader() {
		function getLink(aBagua) {
			return (
				<a
					href={`?casting=${props.castLinesArray.join(
						""
					)}&bagua=${aBagua}#bagua-info`}
					target="_self"
					rel="noreferrer"
				>
					{aBagua}
				</a>
			);
		}
		return (
			<div className="bagua-links">
				{getLink(props.top)} / {getLink(props.bottom)}
			</div>
		);
	}

	return (
		<>
			<div className="layered-hexagram">
				<div className="baguas-container"></div>
				<div className="baguas-container shadow"></div>
				<div className="baguas-container lines">
					<Bagua lines={props.topLines} />
					<Bagua lines={props.bottomLines} />
				</div>
			</div>
			{makeHeader()}
		</>
	);
};

export default Hexagram;
