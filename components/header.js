import headerStyles from './header.module.css';
import { useState, useEffect } from 'react';

export default function Header({ sortTypes, setSortTypes, setInputArray, setRunning }) {
	// TODO: Pass in a method that generates the content from the App. When run is pressed, Header should call the method
	const sortingMethods = ["Bubble", "Insertion", "Selection", "Merge", "Quick"];
	const [elementNum, setElementNum] = useState(0);

	// update the array of methods
	const handleMethodPick = function(e) {
		console.log("Method picked: " + e.target.value);
		let t = sortTypes;
		
		if (t.includes(e.target.value)) {
			t.splice(t.indexOf(e.target.value), 1);
		} else {
			t.push(e.target.value);
		}
		/*
		// let's limit the array at 1 for now
		let removedMethod = "";
		if (t.length === 1) {
			removedMethod = t.pop();
		}
		t.push(e.target.value);
		*/
		setSortTypes(t);
	}

	const handleElementChange = function(e) {
		console.log("Element num changed to: " + e.target.value);
		setElementNum(e.target.value);
	}

	const handleSetParamClick = function(e) {
		console.log("SetParam clicked. Current elemNum: " + elementNum);
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
	    	isChosen: false,
	    	isSorted: false,
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
			<div className={headerStyles.sorting_options_container}>
				{sortingMethods.map((method) => 
					(
					<div key={method}>
						<input name="type" type="checkbox" id={method} value={method} onClick={handleMethodPick} />
						<label for={method}>{method + " Sort"}</label>
					</div>
					))}
			</div>
			<button onClick={handleSetParamClick}>Set Parameters</button>
			<button onClick={handleRunClick}>Run!</button>
		</div>
	)
}