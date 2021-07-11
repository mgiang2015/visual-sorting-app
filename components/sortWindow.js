// Each sortWindow should have properties, passed down from index.js:
// Sorting method
// Element Array
// Each sortWindow should contain:
// Blue sticks
import sortWindowStyles from './sortWindow.module.css';
import { useState, useEffect, useRef } from 'react';

export default function SortWindow({ sortMethodName, sortMethodFunction, elementArray, setArray, isRunning }) {
	if (isRunning) {
		const [localArr, setLocalArr] = useState(elementArray);
		const [time, setTime] = useState(0.0);
		const [swaps, setSwaps] = useState(0);

		function addTime(delay) {
			let currTime = time;
			setTime(currTime + delay / 1000);
		}

		function incrementSwap() {
			setSwaps(swaps + 1);
		}
		
		let localArrDisplay = "Local arr: [ ";
		for (let i = 0; i < localArr.length; i++) {
			localArrDisplay += localArr[i].value + " ";
		}
		localArrDisplay += "]";

		sortMethodFunction(localArr, addTime, incrementSwap);

		return (
			<div>
				<h3>Algorithm: {sortMethodName + " sort"}</h3>
				<p>{localArrDisplay}</p>
				<p>{"Time taken: " + time.toFixed(2) + "s"}</p>
				<p>{"Writes: " + swaps}</p>
				<div className={sortWindowStyles.sort_window_container}>
					{localArr.map(element => <div className={element.isChosen ? sortWindowStyles.sorting_stick_chosen : (element.isSorted ? sortWindowStyles.sorting_stick_sorted : sortWindowStyles.sorting_stick)} style={{ height: element.value * 10 }}/>)}
				</div>
			</div>
		);
	}

	
	return (
		<div>
			<h3>Algorithm: {sortMethodName + " sort"}</h3>
			<div className={sortWindowStyles.sort_window_container}>
				{elementArray.map(element => <div className={element.isChosen ? sortWindowStyles.sorting_stick_chosen : (element.isSorted ? sortWindowStyles.sorting_stick_sorted : sortWindowStyles.sorting_stick)} style={{ height: element.value * 10 }}/>)}
			</div>
		</div>
	);
}