import headerStyles from './header.module.css';
import { useState, useEffect } from 'react';
import { InputLabel, Input, Typography, Button, Divider } from '@material-ui/core';

export default function Header({ sortTypes, setSortTypes, setInputArray, isReady, setIsReady, isRunning, setRunning }) {
	// TODO: Pass in a method that generates the content from the App. When run is pressed, Header should call the method
	const sortingMethods = ["Bubble", "Insertion", "Selection", "Merge", "Quick"];
	const [chosenMethods, setChosenMethods] = useState([...sortTypes]);
	const [inputType, setInputType] = useState("random"); // default random
	const [elementNum, setElementNum] = useState(0);
	const [max, setMax] = useState(0);
	const [min, setMin] = useState(0);
	const [customInput, setCustomInput] = useState("");

	const handleInputTypeChange = function(e) {
		console.log("Input type picked: " + e.currentTarget.value);
		if (isReady) {
			setIsReady(false);
		}

		setInputType(e.currentTarget.value)
	}

	// update the array of methods
	const handleMethodPick = function(e) {
		console.log("Method picked: " + e.currentTarget.value);

		let t = [...sortTypes];

		if (t.includes(e.currentTarget.value)) {
			t.splice(t.indexOf(e.currentTarget.value), 1);
		} else {
			t.push(e.currentTarget.value);
		}

		setChosenMethods(t);
		setSortTypes(t);

		console.log(chosenMethods);
	}

	const handleElementChange = function(e) {
		console.log("Element num changed to: " + e.currentTarget.value);
		setElementNum(e.currentTarget.value);
	}

	const handleSetParamClick = function(e) {
		console.log("SetParam clicked. Current elemNum: " + elementNum);
		setInputArray(generateInputArray());
	}

	const handleResetClick = function(e) {
		setRunning(false);
		setIsReady(false);
	}

  const handleRunClick = function(e) {
  	console.log("Run clicked. Let sorting begin!");
  	setRunning(true);
  }

  const handlePauseClick = function(e) {
  	console.log("Pause!");
  	setRunning(false);
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
					<Button onClick={handleInputTypeChange} color={inputType === "random" ? "primary" : "default"} value="random">Generate a random array</Button>
				</div>
				<div>
					<InputLabel htmlFor="element_num">Number of elements</InputLabel>
					<Input id="element_num" type="number" onChange={handleElementChange}/>
				</div>
				<div>
					<InputLabel htmlFor="min">Minimum value</InputLabel>
					<Input id="min" type="number" onChange={(e) => setMin(e.currentTarget.value)} />
				</div>
				<div>
					<InputLabel htmlFor="max">Maximum value</InputLabel>
					<Input id="max" type="number" onChange={(e) => setMax(e.currentTarget.value)} />
				</div>
			</div>
			<div className={headerStyles.custom_input}>
				<div>
					<Button onClick={handleInputTypeChange} color={inputType === "custom" ? "primary" : "default"} value="random" value="custom">Or give us your custom input</Button>
				</div>
				<div>
					<InputLabel value="custom">Custom input</InputLabel>
					<Input id="custom" type="text" onChange={(e) => setCustomInput(e.currentTarget.value)} />
				</div>
				<Typography>Format: integers only, seperated by space character. Eg: 1 5 2 57 8</Typography>
			</div>
			<div className={headerStyles.sorting_options_container}>
				{sortingMethods.map((method, index) => 
					(
					<div key={method}>
						<Button variant="text" color={chosenMethods.includes(method) ? "primary" : "default"} id={method} value={method} onClick={handleMethodPick}>{method + " Sort"}</Button>
					</div>
					))}
			</div>
			{!isReady 
				? <Button variant='contained' color='primary' size='small' onClick={handleSetParamClick}>Set Parameters</Button>
				: <Button variant='contained' color='primary' size='small' onClick={handleResetClick}>Stop and Reset</Button>
			}

			{!isReady
				? <Button variant='contained' color='secondary' size='small' onClick={handleRunClick} disabled>Run!</Button>
				: !isRunning 
					? <Button variant='contained' color='secondary' size='small' onClick={handleRunClick}>Run!</Button>
					: <Button variant='contained' color='secondary' size='small' onClick={handlePauseClick}>Pause!</Button>
			}
			
			
		</div>
	)
}









