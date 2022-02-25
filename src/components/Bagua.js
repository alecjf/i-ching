import { lineInfo } from "../definitions";

function Bagua(props) {
	return (
		<div className="bagua">
			{props.lines.map((line, index) => lineInfo[line].symbol(index))}
		</div>
	);
}

export default Bagua;
