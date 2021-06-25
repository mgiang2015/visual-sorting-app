import headerStyles from './header.module.css';
import { useState } from 'react';

export default function Header({ setSortType, setElement }) {
	// TODO: Pass in a method that generates the content from the App. When run is pressed, Header should call the method
	const sortingMethods = ["Bubble", "Insertion", "Selection", "Merge", "Quick", "Heap"];
	const [chosenMethod, setMethod] = useState("Bubble"); // problem: No way to know that the default is Bubble
	const [elementNum, setElementNum] = useState(0);
	const handleRadioPick = function(e) {
		console.log("Radio button picked: " + e.target.value);
		setMethod(e.target.value);
	}
	const handleElementChange = function(e) {
		console.log("Element num changed to: " + e.target.value);
		setElementNum(e.target.value);
	}
	const handleRunClick = function(e) {
		console.log("Run clicked. Current elemNum: " + elementNum + ", chosenMethod: " + chosenMethod);
		setSortType(chosenMethod);
		setElement(elementNum);
	}

	return (
		<div className={headerStyles.container}>
			<div className={headerStyles.element_option}>
				<label htmlFor="element_num">Number of elements</label>
				<input id="element_num" type="number" placeholder="Enter an integer" onChange={handleElementChange}/>
			</div>
			<div className={headerStyles.sorting_options_container} onChange={handleRadioPick}>
				{sortingMethods.map(method => (
					<div className={headerStyles.sorting_option} key={method}>
						<input type="radio" name="method" id={method} value={method} />
						<label htmlFor={method}>{method + " sort"}</label>
					</div>
				))}
			</div>
			<button onClick={handleRunClick}>Set Parameters</button>
			<button>Run!</button>
		</div>
	)
}