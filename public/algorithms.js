import { useState, useEffect, useRef } from 'react';

// each element in array has 2 fields: value and isChosen
// takes in an array, and a function that sets the array

const defaultDelay = 100;
const sleepDelay = 1000000000;

function coroutine(f) {
    var o = f(); // instantiate the coroutine
    o.next(); // execute until the first yield
    return function(x) {
        o.next(x);
    }
}

function coroutineTest(array, addTime) {
	// just chooses and unchoose each bar in the array
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const [index, setIndex] = useState(0);
	const [delay, setDelay] = useState(defaultDelay);
	let tempArr = array;

	var loop = coroutine(function*() {
		let info = yield;
		let localStart = info.start;
		let localEnd = info.end;

		// set the states
		setStart(localStart);
		setEnd(localEnd);

		if (localStart >= localEnd) {
			return;
		} else {
			for (let i = localStart; i <= localEnd; i++) {
				if (i > localStart) {
					tempArr[i - 1].isChosen = false;
				} else {
					tempArr[end].isChosen = false; // unchoose the previous end
				}
				tempArr[i].isChosen = true;
				yield;
			}

			let middle = (localStart +  localEnd);
			loop({start: middle, end: localEnd});
			loop({start: localStart, end: middle - 1});
		}

	});

	useInterval(loop(start, end), delay);
}

function bubbleSort(array, addTime, incrementSwaps, isRunning) {
	const [index, setIndex] = useState(0);
	const [delay, setDelay] = useState(defaultDelay);
	const [sorted, setSorted] = useState(true);
	const [iterationNum, setIterationNum] = useState(0);

	console.log("Bubble sort starts");
	
	useInterval(() => {
		if (!isRunning) {
			// ignore and let it run!?!!??
		} else if (array.length === 1) {
			// already sorted
			array[0].isSorted = true;
			setDelay(null);
		} else {
			console.log("Iteration num: " + iterationNum + ", index: " + index + ", delay: " + delay + ", sorted: " + sorted);
			let tempArr = array;
			let tempSorted = sorted;
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
			console.log("Check order " + tempArr[index].value + " and " + tempArr[index + 1].value);
			if (tempArr[index].value > tempArr[index + 1].value) {
				setSorted(false);
				tempSorted = false;
				// swap these 2 values
				console.log("Swapping!");
				let temp = tempArr[index];
				tempArr[index] = tempArr[index + 1];
				tempArr[index + 1] = temp;
				incrementSwaps();
			}

			let tempIndex = index + 1;
			
			// Consider ending condition
			if (tempIndex === rightLimit) {
				console.log("Reached the end of array")
				setIterationNum(iterationNum + 1);
				// if confirm sorted, set delay to null
				if (tempSorted || (rightLimit - 1 === 0)) {
					// set everything as sorted
					for (let i = 0; i <= rightLimit; i++) {
						tempArr[i].isSorted = true;
					}
					console.log("All sorted. Exit now");
					console.log("Unchoosing the last 2");
					tempArr[rightLimit].isChosen = false;
					tempArr[rightLimit - 1].isChosen = false;
					setDelay(null);
				} else {
					console.log("Not sorted yet. Resetting!");
					setIndex(0);
					setSorted(true);
					// set last element as sorted
					tempArr[rightLimit].isSorted = true;
				}
			} else {
				setIndex(tempIndex);
			}
			addTime(delay);
		}
	}, delay)
}

function insertionSort(array, addTime, incrementSwaps, isRunning) {
	const [cache, setCache] = useState(0); // to save the furthest position that the sort has come to
	const [iterator, setIterator] = useState(0); // cache will always be 1 position lower than iterator
	const [delay, setDelay] = useState(defaultDelay);

	console.log("insertionSort starts");

	useInterval(() => {
		if (isRunning) {
			console.log("cache: " + cache + ", iterator: " + iterator + ", delay: " + delay);
			let tempArr = array;

			if (iterator === 0 || tempArr[iterator].value >= tempArr[iterator - 1].value) {
				let tempIter = iterator;
				tempArr[tempIter].isChosen = false; // unchoose the previous chosen thingy first
				// Check ending condition
				let tempCache = cache;
				tempArr[iterator].isSorted = true;
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
				incrementSwaps();
				setIterator(iterator - 1);
			}
			addTime(delay);
		}
	}, delay);
}

function selectionSort(array, addTime, incrementSwaps, isRunning) {
	const [iterationNum, setIterationNum] = useState(0);
	const [findIndex, setFindIndex] = useState(0);
	const [minIndex, setMinIndex] = useState(0);
	const [isSearching, setIsSearching] = useState(true); // start with searching for min element
	const [isMoved, setIsMoved] = useState(false);
	const [delay, setDelay] = useState(defaultDelay);

	useInterval(() => {
		if (isRunning) {
			console.log("Iteration: " + iterationNum + ", findIndex: " + findIndex + ", isSearching: " + isSearching + ", isMoved: " + isMoved + ", delay: " + delay);
			let tempArr = array;
			if (tempArr.length === 1) {
				tempArr[0].isSorted = true;
				setDelay(null);
			} else if (isSearching) {
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
				incrementSwaps();

				tempArr[iterationNum].isSorted = true;

				// check end condition
				if (iterationNum === tempArr.length - 2) {
					console.log("Searching has ended");
					tempArr[tempArr.length - 2].isChosen = false;
					tempArr[tempArr.length - 1].isSorted = true;
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
			addTime(delay);
		}
	}, delay);
}

// Idea: Implement this using a stack, which represents the recursive calls of regular language mergeSort.
// Each stack contains low index and high index. 
// Once low === high (base case), we pop them off the stack and start the "merge" operation. After merging, each can then be merged together.
// When we start to merge, let's have the following colors: highArr,lowArr and sorted. But we'll need to see how that pans out later LMAO.
// For now let's just choose the entire block
function mergeSort(array, addTime, incrementSwaps, isRunning) {
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
		if (isRunning) {
			let tempArr = array;

			if (processing) {
				populateStack(0, tempArr.length - 1);
				setProcessing(false);
			} else if (!merging && stack.length === 0) {
				console.log("No more stack to play with!");
				// Unchoose the previous BLOCKS
				for (let i = 0; i < tempArr.length; i++) {
					tempArr[i].isChosen = false;
					tempArr[i].isSorted = true;
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
					tempArr[i].isSorted = true;
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
						incrementSwaps();
					} else if (highIndex === highArr.length) {
						tempArr[sortedIndex] = lowArr[lowIndex];
						setLowIndex(lowIndex + 1);
						setSortedIndex(sortedIndex + 1);
						incrementSwaps();
					} else if (lowArr[lowIndex].value <= highArr[highIndex].value) {
						tempArr[sortedIndex] = lowArr[lowIndex];
						setLowIndex(lowIndex + 1);
						setSortedIndex(sortedIndex + 1);
						incrementSwaps();
					} else if (lowArr[lowIndex].value > highArr[highIndex].value) {
						tempArr[sortedIndex] = highArr[highIndex];
						setHighIndex(highIndex + 1);
						setSortedIndex(sortedIndex + 1);
						incrementSwaps();
					}
				}
			}
			addTime(delay);
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

function quickSort(array, addTime, incrementSwaps, isRunning) {
	const [delay, setDelay] = useState(defaultDelay);
	const [stack, setStack] = useState([{start: 0, end: array.length - 1}]);
	const [pivot, setPivot] = useState(0);
	const [low, setLow] = useState(0);
	const [high, setHigh] = useState(array.length - 1);

	const [foundLow, setFoundLow] = useState(false);
	const [isChoosingPivot, setChoosingPivot] = useState(true);
	const [pivotSwapped, setPivotSwapped] = useState(false);
	const [isSorting, setIsSorting] = useState(false);

	useInterval(() => {
		if (isRunning) {
			let tempArr = array;
			let info = stack[stack.length - 1];

			if (stack.length === 0) {
				// TODO: Find out what to unchoose
				setDelay(null);
			} else if (isChoosingPivot) {
				console.log("start = " + info.start + ", end = " + info.end);
				if (info.start === info.end) {
					tempArr[info.start].isSorted = true;
					setPivotSwapped(true);
					setIsSorting(false);
				} else {
					let p = generatePivotIndex(info.start, info.end);
					console.log("Choosing pivot and setting up. Pivot chosen at index: " + p);
					setPivot(p);

					// choose the pivot point
					tempArr[p].isChosen = true;
				}
				
				setChoosingPivot(false);
			} else if (!pivotSwapped) {
				// swap pivot to position start
				let t = tempArr[info.start];
				tempArr[info.start] = tempArr[pivot];
				tempArr[pivot] = t;

				// set up for sorting
				setLow(info.end);
				setHigh(info.end + 1); // the right most position that pivot will go to

				setPivotSwapped(true);
				setIsSorting(true);
			} else if (isSorting) {
				console.log("Sorting. low value = " + tempArr[low].value + ", pivot value = " + tempArr[info.start].value);
				// implement the whole quick sort thing here
				let tempLow = low;
				let tempHigh = high;

				if ((tempLow < info.end) && ((tempLow + 1) != tempHigh)) {
					tempArr[tempLow + 1].isChosen = false;
				}

				tempArr[tempLow].isChosen = true;

				if (tempLow === info.start) {
					// right now, only tempLow is chosen. After swapping, tempArr[high - 1] is chosen
					console.log("Sorting ended");
					let t = tempArr[tempLow];
					tempArr[tempLow] = tempArr[tempHigh - 1];
					tempArr[tempHigh - 1] = t;
					setHigh(tempHigh - 1);

					// unchoose from (tempHigh - 1) to end
					for (let i = 0; i <= info.end; i++) {
						tempArr[i].isChosen = false;
					}
					tempArr[tempHigh - 1].isSorted = true;
					setIsSorting(false);
				} else if (!foundLow) {
					if (tempArr[tempLow].value > tempArr[info.start].value) {
						console.log("Found something larger: " + tempArr[tempLow].value);
						setFoundLow(true);
					} else {
						// simply continue
						console.log("Still finding low");
						setLow(tempLow - 1);
					}
				} else {
					console.log("Swapping!");
					// time to swap
					let t = tempArr[tempLow];
					tempArr[tempLow] = tempArr[tempHigh - 1];
					tempArr[tempHigh - 1] = t;
					incrementSwaps();

					// reset
					setFoundLow(false);
					setHigh(tempHigh - 1);
					setLow(tempLow - 1);
				}
			} else {
				// Unchoose last attempt
				tempArr[high].isChosen = false;

				let tempStack = stack;
				tempStack.pop();

				if (info.start !== info.end) {
					if (high < info.end) {
						tempStack.push({start: high + 1, end: info.end});
					}
					if (high > info.start) {
						tempStack.push({start: info.start, end: high - 1});
					}
				}

				setStack(tempStack);
				setChoosingPivot(true);
				setPivotSwapped(false);
				setIsSorting(false);
			}
			addTime(delay);
		}
	}, delay);

	function generatePivotIndex(leftLimit, rightLimit) {
		return Math.floor(Math.random() * (rightLimit - leftLimit + 1)) + leftLimit;
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

export { bubbleSort, insertionSort, selectionSort, mergeSort, quickSort, coroutineTest };