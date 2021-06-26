import { useState, useEffect, useRef } from 'react';

// each element in array has 2 fields: value and isChosen
// takes in an array, and a function that sets the array
function bubbleSort(array, setArray) {
	const [index, setIndex] = useState(0);
	const [delay, setDelay] = useState(100);
	const [sorted, setSorted] = useState(true);

	console.log("Bubble sort starts");
	
	useInterval(() => {
		console.log("index: " + index + ", delay: " + delay + ", sorted: " + sorted);
		let tempArr = array;

		// Unchoose previous 2
		if (index > 0) {
			console.log("Unchoosing the previous 2");
			tempArr[index - 1].isChosen = false;
			tempArr[index].isChosen = false;
			setArray(tempArr);
		} else {
			console.log("Unchoosing the last 2");
			tempArr[tempArr.length - 1].isChosen = false;
			tempArr[tempArr.length - 2].isChosen = false;
			setArray(tempArr);
		}
		
		
		// Choose 2 elements
		console.log("Choosing 2");
		tempArr[index].isChosen = true;
		tempArr[index + 1].isChosen = true;
		setArray(tempArr);

		// Check if these elements are in order
		console.log("Check order");
		if (tempArr[index].value > tempArr[index + 1].value) {
			setSorted(false);
			// swap these 2 values
			let temp = tempArr[index];
			tempArr[index] = tempArr[index + 1];
			tempArr[index + 1] = temp;
			setArray(tempArr);
		}
		
		let tempIndex = index + 1;

		// Consider ending condition
		if (tempIndex === array.length - 1) {
			console.log("Reached the end of array")
			// if confirm sorted, set delay to null
			if (sorted) {
				console.log("All sorted. Exit now");
				console.log("Unchoosing the last 2");
				tempArr[tempArr.length - 1].isChosen = false;
				tempArr[tempArr.length - 2].isChosen = false;
				setArray(tempArr);
				setDelay(null);
			} else {
				console.log("Not sorted yet. Resetting!");
				setIndex(0);
				setSorted(true);
			}
		} else {
			setIndex(tempIndex);
		}
	}, delay)
}

// for using interval with React Hook
// Credit: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export { bubbleSort };