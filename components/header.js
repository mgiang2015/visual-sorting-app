import headerStyles from './header.module.css';
import { useState } from 'react';

export default function Header({ setSortType, setInputArray, setRunning, inputArray }) {
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
	const handleSetParamClick = function(e) {
		console.log("SetParam clicked. Current elemNum: " + elementNum + ", chosenMethod: " + chosenMethod);
		setSortType(chosenMethod);
		setInputArray(generateInputArray(elementNum));
	}

  const handleRunClick = function(e) {
  	console.log("Run clicked. Let sorting begin!");
  	setRunning(true);
  }

	const generateInputArray = function(num) {
		// Generate array of random numbers
	  var randArray = [];
	  const shuffle = function(array) { // the Fisher–Yates shuffle
	    let m = array.length, t, i;
	    // While there remain elements to shuffle…
	    while (m) {
	      // Pick a remaining element…
	      i = Math.floor(Math.random() * m--);
	      // And swap it with the current element.
	      t = array[m];
	      array[m] = array[i];
	      array[i] = t;
	    }
	    return array;
	  }

	  for (let i = 1; i <= num; i++) {
	    randArray.push({
	    	value: i,
	    	isChosen: false
	    });
	  }
	  randArray = shuffle(randArray);

	  return randArray;
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
			<button onClick={handleSetParamClick}>Set Parameters</button>
			<button onClick={handleRunClick}>Run!</button>
		</div>
	)
}