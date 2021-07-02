import { useState, useEffect, useRef } from 'react';

// each element in array has 2 fields: value and isChosen
// takes in an array, and a function that sets the array

const defaultDelay = 100;

function bubbleSort(array, setArray) {
	const [index, setIndex] = useState(0);
	const [delay, setDelay] = useState(defaultDelay);
	const [sorted, setSorted] = useState(true);
	const [iterationNum, setIterationNum] = useState(0);

	console.log("Bubble sort starts");
	
	useInterval(() => {
		console.log("Iteration num: " + iterationNum + ", index: " + index + ", delay: " + delay + ", sorted: " + sorted);
		let tempArr = array;
		let rightLimit = tempArr.length - 1 - iterationNum;

		// Unchoose previous 2
		if (index > 0) {
			console.log("Unchoosing the previous 2");
			tempArr[index - 1].isChosen = false;
			tempArr[index].isChosen = false;
		} else if (iterationNum > 0) {
			console.log("Unchoosing the last 2");
			tempArr[rightLimit + 1].isChosen = false; // new right limit is lower than previous right limit
			tempArr[rightLimit].isChosen = false;
		}
		
		// Choose 2 elements
		console.log("Choosing 2");
		tempArr[index].isChosen = true;
		tempArr[index + 1].isChosen = true;

		// Check if these elements are in order
		console.log("Check order");
		if (tempArr[index].value > tempArr[index + 1].value) {
			setSorted(false);
			// swap these 2 values
			let temp = tempArr[index];
			tempArr[index] = tempArr[index + 1];
			tempArr[index + 1] = temp;
		}

		let tempIndex = index + 1;

		// Consider ending condition
		if (tempIndex === rightLimit) {
			console.log("Reached the end of array")
			setIterationNum(iterationNum + 1);
			// if confirm sorted, set delay to null
			if (sorted) {
				console.log("All sorted. Exit now");
				console.log("Unchoosing the last 2");
				tempArr[rightLimit].isChosen = false;
				tempArr[rightLimit - 1].isChosen = false;
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

function insertionSort(array, setArray) {
	const [cache, setCache] = useState(0); // to save the furthest position that the sort has come to
	const [iterator, setIterator] = useState(0); // cache will always be 1 position lower than iterator
	const [delay, setDelay] = useState(defaultDelay);

	console.log("insertionSort starts");

	useInterval(() => {
		console.log("cache: " + cache + ", iterator: " + iterator + ", delay: " + delay);
		let tempArr = array;

		if (iterator === 0 || tempArr[iterator].value >= tempArr[iterator - 1].value) {
			let tempIter = iterator;
			tempArr[tempIter].isChosen = false; // unchoose the previous chosen thingy first
			// Check ending condition
			let tempCache = cache;
			if (tempCache === tempArr.length - 1) {
				console.log("Met the end of array");
				setDelay(null);
			} else {
				// change iterator and cache
				tempArr[cache + 1].isChosen = true;
				setIterator(cache + 1);
				setCache(cache + 1);
			}
		} else {
			console.log("Wrong order. Swapping this down");
			let temp = tempArr[iterator];
			tempArr[iterator] = tempArr[iterator - 1];
			tempArr[iterator - 1] = temp;
			setIterator(iterator - 1);
		}
	}, delay);
}

function selectionSort(array, setArray) {
	const [iterationNum, setIterationNum] = useState(0);
	const [findIndex, setFindIndex] = useState(0);
	const [minIndex, setMinIndex] = useState(0);
	const [isSearching, setIsSearching] = useState(true); // start with searching for min element
	const [isMoved, setIsMoved] = useState(false);
	const [delay, setDelay] = useState(defaultDelay);

	useInterval(() => {
		console.log("Iteration: " + iterationNum + ", findIndex: " + findIndex + ", isSearching: " + isSearching + ", isMoved: " + isMoved + ", delay: " + delay);
		let tempArr = array;
		if (isSearching) {
			console.log("Searching for smallest element!");
			let tempFind = findIndex;
			if (!(iterationNum === 0 && tempFind === 0)) {
				tempArr[tempFind - 1].isChosen = false;
			}
			tempArr[tempFind].isChosen = true;

			// Find the smallest element
			if (tempArr[tempFind].value < tempArr[minIndex].value) {
				setMinIndex(tempFind);
			}

			// If already at the end
			if (tempFind === tempArr.length - 1) {
				// should not be continued after this
				console.log("Searching done. Index of min number: " + minIndex + " value: " + tempArr[minIndex].value);
				setIsSearching(false);
			} else {
				setFindIndex(tempFind + 1);
			}
		} else if (!isMoved) {
			// found the smallest number but have not moved it
			tempArr[tempArr.length - 1].isChosen = false;
			tempArr[minIndex].isChosen = true;
			setIsMoved(true);
		} else {
			// found the smallest number and have moved it
			let temp = tempArr[minIndex];
			tempArr[minIndex] = tempArr[iterationNum];
			tempArr[iterationNum] = temp;

			// check end condition
			if (iterationNum === tempArr.length - 2) {
				console.log("Searching has ended");
				tempArr[tempArr.length - 2].isChosen = false;
				setDelay(null);
			} else {
				// reset the loop
				let i = iterationNum;
				setIterationNum(i + 1);
				setIsSearching(true);
				setIsMoved(false);
				setFindIndex(i + 1);
				setMinIndex(i + 1);
			}			
		}
	}, delay);
}

// Idea: Implement this using a stack, which represents the recursive calls of regular language mergeSort.
// Each stack contains low index and high index. 
// Once low === high (base case), we pop them off the stack and start the "merge" operation. After merging, each can then be merged together.
// When we start to merge, let's have the following colors: highArr,lowArr and sorted. But we'll need to see how that pans out later LMAO.
// For now let's just choose the entire block
function mergeSort(array, setArray) {
	const [delay, setDelay] = useState(defaultDelay);
	const [stack, setStack] = useState([{low: 0, high: array.length - 1}]);

	const pushElem = function(arr, setFunc, elem) {
		let ta = arr;
		ta.push(elem);
		setFunc(ta);
	}

	const popElem = function(arr, setFunc) {
		let ta = arr;
		let t = ta.pop();
		setFunc(ta);
		return t;
	}

	const [merging, setMerging] = useState(false);
	const [processing, setProcessing] = useState(true);
	const [currLow, setCurrLow] = useState(0);
	const [currHigh, setCurrHigh] = useState(0);
	const [sortedIndex, setSortedIndex] = useState(0);

	// indices for merging
	const [lowIndex, setLowIndex] = useState(0);
	const [highIndex, setHighIndex] = useState(0);

	// auxiliary arrays for merging
	const [lowArr, setLowArr] = useState([]);
	const [highArr, setHighArr] = useState([]);

	useInterval(() => {
		let tempArr = array;

		if (processing) {
			populateStack(0, tempArr.length - 1);
			setProcessing(false);
		} else if (!merging && stack.length === 0) {
			console.log("No more stack to play with!");
			// Unchoose the previous BLOCKS
			for (let i = 0; i < tempArr.length; i++) {
				tempArr[i].isChosen = false;
			}
			setDelay(null);
		} else if (!merging) { // set parameters for mering
			let arrInfo = popElem(stack, setStack);
			let low = arrInfo.low;
			let high = arrInfo.high;
			let middle = Math.floor((low + high) / 2);

			console.log("Merging from " + low + " to " + high);

			// Unchoose the previous BLOCKS
			for (let i = currLow; i <= currHigh; i++) {
				tempArr[i].isChosen = false;
			}

			for (let i = low; i <= high; i++) {
				tempArr[i].isChosen = true;
			}

			setCurrLow(low);
			setLowIndex(0);
			setSortedIndex(low);
			setCurrHigh(high);
			setHighIndex(0); // merging starts from middle + 1 for array with higher index
			setMerging(true);

			setLowArr([]);
			setHighArr([]);

			setStack(stack);
		} else {
			if (sortedIndex > currHigh) {
				setMerging(false);
			} else {
				if (lowArr.length === 0 && highArr.length === 0) {
					// copy array into auxiliary arrays
					let middle = Math.floor((currHigh + currLow) / 2);
					for (let i = currLow; i <= middle; i++) {
						pushElem(lowArr, setLowArr, tempArr[i]);
					}

					for (let i = middle + 1; i <= currHigh; i++) {
						pushElem(highArr, setHighArr, tempArr[i]);
					}
				}
				
				// auxiliary array populated. Compare between lowIndex and highIndex
				if (lowIndex === lowArr.length) {
					tempArr[sortedIndex] = highArr[highIndex];
					setHighIndex(highIndex + 1);
					setSortedIndex(sortedIndex + 1);
				} else if (highIndex === highArr.length) {
					tempArr[sortedIndex] = lowArr[lowIndex];
					setLowIndex(lowIndex + 1);
					setSortedIndex(sortedIndex + 1);
				} else if (lowArr[lowIndex].value <= highArr[highIndex].value) {
					tempArr[sortedIndex] = lowArr[lowIndex];
					setLowIndex(lowIndex + 1);
					setSortedIndex(sortedIndex + 1);
				} else if (lowArr[lowIndex].value > highArr[highIndex].value) {
					tempArr[sortedIndex] = highArr[highIndex];
					setHighIndex(highIndex + 1);
					setSortedIndex(sortedIndex + 1);
				}
			}
		}
	}, delay);

	function populateStack(low, high) {
		if (low < high) {
			let middle = Math.floor((high + low) / 2);
			if (middle + 1 !== high) {
				pushElem(stack, setStack, {low: middle + 1, high: high}); // sort the later part after
				console.log("Added: " + (middle + 1) + " - " + high);
			}
			populateStack(middle + 1, high);

			if (middle !== low) {
				pushElem(stack, setStack, {low: low, high: middle});
				console.log("Added: " + low + " - " + middle);
			}
			populateStack(low, middle);
		}
	}
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

export { bubbleSort, insertionSort, selectionSort, mergeSort };