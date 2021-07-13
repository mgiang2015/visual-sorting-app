import headerStyles from './header.module.css';
import { useState, useEffect } from 'react';

export default function Header({ sortTypes, setSortTypes, setInputArray, isReady, setIsReady, setRunning }) {
	// TODO: Pass in a method that generates the content from the App. When run is pressed, Header should call the method
	const sortingMethods = ["Bubble", "Insertion", "Selection", "Merge", "Quick"];
	const [inputType, setInputType] = useState("random"); // default random
	const [elementNum, setElementNum] = useState(0);
	const [max, setMax] = useState(0);
	const [min, setMin] = useState(0);
	const [customInput, setCustomInput] = useState("");

	const handleInputTypeChange = function(e) {
		console.log("Input type picked: " + e.target.value);
		if (isReady) {
			setIsReady(false);
		}

		setInputType(e.target.value)
	}

	// update the array of methods
	const handleMethodPick = function(e) {
		console.log("Method picked: " + e.target.value);
		let t = sortTypes;
		
		if (t.includes(e.target.value)) {
			t.splice(t.indexOf(e.target.value), 1);
		} else {
			t.push(e.target.value);
		}

		setSortTypes(t);
	}

	const handleElementChange = function(e) {
		console.log("Element num changed to: " + e.target.value);
		setElementNum(e.target.value);
	}

	const handleSetParamClick = function(e) {
		console.log("SetParam clicked. Current elemNum: " + elementNum);
		setInputArray(generateInputArray());
	}

  const handleRunClick = function(e) {
  	console.log("Run clicked. Let sorting begin!");
  	setRunning(true);
  }

  const parseCustomInput = function(str) {
  	const strArray = str.split(" ");
  	const elemArray = [];
  	for (let i = 0; i < strArray.length; i++) {
  		elemArray.push({
  			value: parseInt(strArray[i]),
  			isChosen: false,
  			isSorted: false,
  		});
  	}
  	return elemArray;
  }

  const generateRandomizedArray = function(elemNum, elemMin, elemMax) {
  	let intMin = parseInt(elemMin);
  	let intMax = parseInt(elemMax);
  	let randArray = [];
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

	  for (let i = 0; i < elemNum; i++) {
	  	// generate a random number in range max to min, both inclusive
	    let nextRand = Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
	    randArray.push({
	    	value: nextRand,
	    	isChosen: false,
	    	isSorted: false,
	    });
	  }

		randArray = shuffle(randArray);

		return randArray;
  }

	const generateInputArray = function() {
		// Generate array of random numbers
		if (inputType === "custom") {
			return parseCustomInput(customInput);
		} else {
			return generateRandomizedArray(elementNum, min, max);
		}
	}

	return (
		<div className={headerStyles.container}>
			<div className={headerStyles.randomize_elements}>
				<div>
					<label htmlFor="input_random" className={headerStyles.radio_label}>Generate a random array</label>
					<input id="input_random" type="radio" name="input_type" value="random" onClick={handleInputTypeChange}/>
				</div>
				<div>
					<label htmlFor="element_num">Number of elements</label>
					<input id="element_num" type="number" onChange={handleElementChange}/>
				</div>
				<div>
					<label htmlFor="min">Minimum value</label>
					<input id="min" type="number" onChange={(e) => setMin(e.target.value)} />
				</div>
				<div>
					<label htmlFor="max">Maximum value</label>
					<input id="max" type="number" onChange={(e) => setMax(e.target.value)} />
				</div>
			</div>
			<div className={headerStyles.custom_input}>
				<div>
					<label htmlFor="input_custom" className={headerStyles.radio_label}>Or give us your custom input</label>
					<input id="input_custom" type="radio" name="input_type" value="custom" onClick={handleInputTypeChange} />
				</div>
				<div>
					<label htmlFor="custom">Custom input</label>
					<input id="custom" type="text" onChange={(e) => setCustomInput(e.target.value)} />
				</div>
				<p>Format: integers only, seperated by space character. Eg: 1 5 2 57 8</p>
			</div>
			<div className={headerStyles.sorting_options_container}>
				{sortingMethods.map((method) => 
					(
					<div key={method}>
						<input name="type" type="checkbox" id={method} value={method} onClick={handleMethodPick} />
						<label htmlFor={method}>{method + " Sort"}</label>
					</div>
					))}
			</div>
			<button onClick={handleSetParamClick}>Set Parameters</button>
			<button onClick={handleRunClick}>Run!</button>
		</div>
	)
}