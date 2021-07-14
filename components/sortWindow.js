// Each sortWindow should have properties, passed down from index.js:
// Sorting method
// Element Array
// Each sortWindow should contain:
// Blue sticks
import sortWindowStyles from './sortWindow.module.css';
import { useState, useEffect, useRef } from 'react';
import { Typography } from '@material-ui/core';

export default function SortWindow({ sortMethodName, sortMethodFunction, elementArray, setArray, isRunning }) {
	const [localArr, setLocalArr] = useState(elementArray);
	const [time, setTime] = useState(0.0);
	const [swaps, setSwaps] = useState(0);

	const elemMax = findMax(elementArray);
	const maxHeight = 250;
	const maxWidth = 1000;
	const maxStickWidth = 15;

	function findMax(arr) {
		let max = -1;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].value > max) {
				max = arr[i].value;
			}
		}
		return max;
	}

	function addTime(delay) {
		let currTime = time;
		setTime(currTime + delay / 1000);
	}

	function incrementSwap() {
		setSwaps(swaps + 1);
	}
	
	let localArrDisplay = "Array state: [ ";
	for (let i = 0; i < localArr.length; i++) {
		localArrDisplay += localArr[i].value + " ";
	}
	localArrDisplay += "]";

	sortMethodFunction(localArr, addTime, incrementSwap, isRunning);

	return (
		<div className={sortWindowStyles.main_container}>
			<Typography color='primary'>Algorithm: {sortMethodName + " sort"}</Typography>
			<Typography noWrap='true'>{localArrDisplay}</Typography>
			<Typography>{"Time taken: " + time.toFixed(2) + "s"}</Typography>
			<Typography>{"Writes: " + swaps}</Typography>
			<div className={sortWindowStyles.sort_window_container}>
				{localArr.map((element, index) => <div key={index} className={element.isChosen ? sortWindowStyles.sorting_stick_chosen : (element.isSorted ? sortWindowStyles.sorting_stick_sorted : sortWindowStyles.sorting_stick)} style={{ width: (maxWidth / (elementArray.length)) > maxStickWidth ? maxStickWidth : (maxWidth / (elementArray.length)), height: (element.value / elemMax) * maxHeight }}/>)}
			</div>
		</div>
	);
}