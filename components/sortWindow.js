// Each sortWindow should have properties, passed down from index.js:
// Sorting method
// Element Array
// Each sortWindow should contain:
// Blue sticks
import sortWindowStyles from './sortWindow.module.css';
import { useState, useEffect, useRef } from 'react';

export default function SortWindow({ sortMethodName, sortMethodFunction, elementArray, setArray, isRunning }) {
	if (isRunning) {
		sortMethodFunction(elementArray, setArray);
	}

	return (
		<div>
			<h3>Algorithm: {sortMethodName + " sort"}</h3>
			<div className={sortWindowStyles.sort_window_container}>
				{elementArray.map(element => <div className={element.isChosen ? sortWindowStyles.sorting_stick_chosen : sortWindowStyles.sorting_stick} style={{ height: element.value * 10 }}/>)}
			</div>
		</div>
	);
}