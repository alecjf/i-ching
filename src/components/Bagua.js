import { lineInfo } from "../definitions";

const Bagua = (props) => {
	let keyIndex = 0;

	return (
		<div className="bagua">
			{props.lines.map((line, index) => lineInfo[line].symbol(index))}
		</div>
	);
};

export default Bagua;
